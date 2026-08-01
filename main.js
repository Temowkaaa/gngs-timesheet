const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const fs = require("fs");
const path = require("path");

let mainWindow = null;

if (process.platform === "win32") {
  app.setAppUserModelId("ru.gngs.timesheet");
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 860,
    minWidth: 980,
    minHeight: 680,
    title: "ГНГС табель учета",
    backgroundColor: "#eef2f5",
    icon: path.join(__dirname, "assets", "logo.ico"),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
  configureAutoUpdater();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("export:xlsx", async (event, payload) => {
  const filePath = await chooseSavePath(event, payload, "xlsx");
  if (!filePath) return { canceled: true };
  fs.writeFileSync(filePath, buildXlsx(payload));
  return { canceled: false, filePath };
});

ipcMain.handle("export:docx", async (event, payload) => {
  const filePath = await chooseSavePath(event, payload, "docx");
  if (!filePath) return { canceled: true };
  fs.writeFileSync(filePath, buildDocx(payload));
  return { canceled: false, filePath };
});

ipcMain.handle("app:info", () => {
  const loginSettings = app.getLoginItemSettings();
  return {
    version: app.getVersion(),
    launchAtLogin: Boolean(loginSettings.openAtLogin),
    isPackaged: app.isPackaged,
  };
});

ipcMain.handle("app:setLaunchAtLogin", (event, enabled) => {
  if (process.platform !== "win32") {
    return { launchAtLogin: false };
  }
  app.setLoginItemSettings({
    openAtLogin: Boolean(enabled),
    path: process.execPath,
  });
  return { launchAtLogin: Boolean(app.getLoginItemSettings().openAtLogin) };
});

ipcMain.handle("updates:check", async () => {
  if (!app.isPackaged) {
    return { status: "dev", message: "Проверка обновлений работает в установленной версии приложения." };
  }
  try {
    await autoUpdater.checkForUpdates();
    return { status: "checking", message: "Проверяем обновления..." };
  } catch (error) {
    const message = updateErrorMessage(error);
    sendUpdateStatus("error", message);
    return { status: "error", message };
  }
});

ipcMain.handle("updates:install", () => {
  autoUpdater.quitAndInstall(false, true);
});

function configureAutoUpdater() {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on("checking-for-update", () => sendUpdateStatus("checking", "Проверяем обновления..."));
  autoUpdater.on("update-available", (info) => {
    sendUpdateStatus("available", `Найдена версия ${info.version}. Скачиваем обновление...`);
  });
  autoUpdater.on("update-not-available", () => sendUpdateStatus("none", "Установлена последняя версия."));
  autoUpdater.on("download-progress", (progress) => {
    sendUpdateStatus("downloading", `Скачиваем обновление: ${Math.round(progress.percent)}%`);
  });
  autoUpdater.on("update-downloaded", (info) => {
    sendUpdateStatus("downloaded", `Версия ${info.version} скачана. Можно установить.`);
  });
  autoUpdater.on("error", (error) => sendUpdateStatus("error", updateErrorMessage(error)));
}

function sendUpdateStatus(status, message) {
  mainWindow?.webContents.send("updates:status", { status, message });
}

function updateErrorMessage(error) {
  const message = String(error?.message ?? error);
  if (message.includes("CHANGE_ME") || message.includes("latest.yml") || message.includes("app-update.yml")) {
    return "Канал обновлений GitHub еще не настроен.";
  }
  return `Не удалось проверить обновления: ${message}`;
}

async function chooseSavePath(event, payload, extension) {
  const safeTitle = String(payload?.monthLabel || "табель").replace(/[\\/:*?"<>|]/g, "_");
  const title = payload?.type === "employee" ? "Сохранить карточку сотрудника" : "Сохранить табель";
  const defaultName = payload?.type === "employee" ? `ГНГС карточка сотрудника - ${safeTitle}.${extension}` : `ГНГС табель учета - ${safeTitle}.${extension}`;
  const result = await dialog.showSaveDialog(BrowserWindow.fromWebContents(event.sender), {
    title: `${title} в ${extension === "xlsx" ? "Excel" : "DOCX"}`,
    defaultPath: defaultName,
    filters: [
      extension === "xlsx"
        ? { name: "Excel", extensions: ["xlsx"] }
        : { name: "Word", extensions: ["docx"] },
    ],
  });
  return result.canceled ? "" : result.filePath;
}

function buildXlsx(payload) {
  if (payload?.type === "employee") return buildEmployeeXlsx(payload);

  const rows = [
    [payload.title],
    [],
    ["ФИО", "Должность", ...payload.days.map((day) => day.weekday)],
    ["", "", ...payload.days.map((day) => day.day)],
    ...payload.rows.map((row) => [row.name, row.role, ...row.cells]),
    [],
    ["Расшифровка"],
    ...payload.legend.map((item) => [item.code, item.name]),
  ];

  const sheetRows = rows
    .map((row, rowIndex) => {
      const cells = row
        .map((value, columnIndex) => {
          const ref = `${columnName(columnIndex + 1)}${rowIndex + 1}`;
          return `<c r="${ref}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`;
        })
        .join("");
      return `<row r="${rowIndex + 1}">${cells}</row>`;
    })
    .join("");

  const worksheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetData>${sheetRows}</sheetData>
</worksheet>`;

  return zipStore({
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
    "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Табель" sheetId="1" r:id="rId1"/></sheets>
</workbook>`,
    "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>`,
    "xl/worksheets/sheet1.xml": worksheet,
  });
}

function buildDocx(payload) {
  if (payload?.type === "employee") return buildEmployeeDocx(payload);

  const headerCells = ["ФИО", "Должность", ...payload.days.map((day) => `${day.weekday}\n${day.day}`)];
  const tableRows = [
    headerCells,
    ...payload.rows.map((row) => [row.name, row.role, ...row.cells]),
  ]
    .map((row) => `<w:tr>${row.map((cell) => docxCell(cell)).join("")}</w:tr>`)
    .join("");

  const legend = payload.legend
    .map((item) => `<w:p><w:r><w:t>${escapeXml(`${item.code} - ${item.name}`)}</w:t></w:r></w:p>`)
    .join("");

  return zipStore({
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
    "word/document.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>${escapeXml(payload.title)}</w:t></w:r></w:p>
    <w:tbl>${tableRows}</w:tbl>
    <w:p><w:r><w:t>Расшифровка</w:t></w:r></w:p>
    ${legend}
    <w:sectPr><w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/></w:sectPr>
  </w:body>
</w:document>`,
  });
}

function buildEmployeeXlsx(payload) {
  const rows = [[payload.title], []];
  payload.sections.forEach((section) => {
    rows.push([section.title]);
    if (section.headers) rows.push(section.headers);
    section.rows.forEach((row) => rows.push(row));
    rows.push([]);
  });

  const sheetRows = rows
    .map((row, rowIndex) => {
      const cells = row
        .map((value, columnIndex) => {
          const ref = `${columnName(columnIndex + 1)}${rowIndex + 1}`;
          return `<c r="${ref}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`;
        })
        .join("");
      return `<row r="${rowIndex + 1}">${cells}</row>`;
    })
    .join("");

  const worksheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetData>${sheetRows}</sheetData>
</worksheet>`;

  return zipStore({
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
    "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="Карточка" sheetId="1" r:id="rId1"/></sheets>
</workbook>`,
    "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
</Relationships>`,
    "xl/worksheets/sheet1.xml": worksheet,
  });
}

function buildEmployeeDocx(payload) {
  const sections = payload.sections
    .map((section) => {
      const header = section.headers ? `<w:tr>${section.headers.map((cell) => docxCell(cell)).join("")}</w:tr>` : "";
      const rows = section.rows.map((row) => `<w:tr>${row.map((cell) => docxCell(cell)).join("")}</w:tr>`).join("");
      return `<w:p><w:r><w:t>${escapeXml(section.title)}</w:t></w:r></w:p><w:tbl>${header}${rows}</w:tbl>`;
    })
    .join("");

  return zipStore({
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`,
    "word/document.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>${escapeXml(payload.title)}</w:t></w:r></w:p>
    ${sections}
    <w:sectPr><w:pgSz w:w="11906" w:h="16838"/></w:sectPr>
  </w:body>
</w:document>`,
  });
}

function docxCell(value) {
  const lines = String(value ?? "").split("\n");
  return `<w:tc><w:p>${lines
    .map((line, index) => `<w:r>${index ? "<w:br/>" : ""}<w:t>${escapeXml(line)}</w:t></w:r>`)
    .join("")}</w:p></w:tc>`;
}

function columnName(index) {
  let name = "";
  while (index > 0) {
    const rem = (index - 1) % 26;
    name = String.fromCharCode(65 + rem) + name;
    index = Math.floor((index - 1) / 26);
  }
  return name;
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function zipStore(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  Object.entries(files).forEach(([name, content]) => {
    const nameBuffer = Buffer.from(name);
    const data = Buffer.from(content);
    const crc = crc32(data);
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt32LE(0, 10);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(data.length, 18);
    localHeader.writeUInt32LE(data.length, 22);
    localHeader.writeUInt16LE(nameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28);
    localParts.push(localHeader, nameBuffer, data);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt32LE(0, 12);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(data.length, 20);
    centralHeader.writeUInt32LE(data.length, 24);
    centralHeader.writeUInt16LE(nameBuffer.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt32LE(0, 34);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);
    centralParts.push(centralHeader, nameBuffer);
    offset += localHeader.length + nameBuffer.length + data.length;
  });

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(Object.keys(files).length, 8);
  end.writeUInt16LE(Object.keys(files).length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, ...centralParts, end]);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let c = index;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});
