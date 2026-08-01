const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const fs = require("fs");
const path = require("path");

let mainWindow = null;
let latestUpdateStatus = { status: "idle", message: "Готово к проверке" };
let updateCheckTimeout = null;
let updateReadyToInstall = false;
const updateFeed = {
  provider: "github",
  owner: "Temowkaaa",
  repo: "gngs-timesheet",
};

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
    sendUpdateStatus("checking", "Проверяем обновления...");
    clearTimeout(updateCheckTimeout);
    updateCheckTimeout = setTimeout(() => {
      if (latestUpdateStatus.status === "checking") {
        sendUpdateStatus("error", "Проверка обновлений заняла слишком много времени. Попробуйте еще раз.");
      }
    }, 30000);
    autoUpdater.checkForUpdates().catch((error) => {
      sendUpdateStatus("error", updateErrorMessage(error));
    });
    return { status: "checking", message: "Проверяем обновления..." };
  } catch (error) {
    const message = updateErrorMessage(error);
    sendUpdateStatus("error", message);
    return { status: "error", message };
  }
});

ipcMain.handle("updates:install", () => {
  if (!updateReadyToInstall) {
    const message = "Обновление еще не скачано. Сначала нажмите проверку и дождитесь готовности к установке.";
    sendUpdateStatus("error", message);
    return { status: "error", message };
  }
  try {
    autoUpdater.quitAndInstall(false, true);
    return { status: "installing", message: "Устанавливаем обновление..." };
  } catch (error) {
    const message = updateErrorMessage(error);
    sendUpdateStatus("error", message);
    return { status: "error", message };
  }
});

function configureAutoUpdater() {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.setFeedURL(updateFeed);

  autoUpdater.on("checking-for-update", () => sendUpdateStatus("checking", "Проверяем обновления..."));
  autoUpdater.on("update-available", (info) => {
    sendUpdateStatus("available", `Найдена версия ${info.version}. Скачиваем обновление...`);
  });
  autoUpdater.on("update-not-available", () => sendUpdateStatus("none", "Установлена последняя версия."));
  autoUpdater.on("download-progress", (progress) => {
    sendUpdateStatus("downloading", `Скачиваем обновление: ${Math.round(progress.percent)}%`);
  });
  autoUpdater.on("update-downloaded", (info) => {
    updateReadyToInstall = true;
    sendUpdateStatus("downloaded", `Версия ${info.version} скачана. Можно установить.`);
  });
  autoUpdater.on("error", (error) => sendUpdateStatus("error", updateErrorMessage(error)));
}

function sendUpdateStatus(status, message) {
  latestUpdateStatus = { status, message };
  if (status !== "downloaded" && status !== "installing") updateReadyToInstall = false;
  if (status !== "checking") clearTimeout(updateCheckTimeout);
  mainWindow?.webContents.send("updates:status", { status, message });
}

function updateErrorMessage(error) {
  const message = String(error?.message ?? error);
  if (message.includes("CHANGE_ME") || message.includes("latest.yml") || message.includes("app-update.yml")) {
    return "Обновления пока недоступны.";
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
    { values: [payload.title], style: 1, height: 24 },
    { values: [], style: 0 },
    { values: ["ФИО", "Должность", ...payload.days.map((day) => day.weekday)], style: 2, height: 22 },
    { values: ["", "", ...payload.days.map((day) => day.day)], style: 2, height: 22 },
    ...payload.rows.map((row) => ({ values: [row.name, row.role, ...row.cells], style: 0, height: 30 })),
    { values: [], style: 0 },
    { values: ["Расшифровка"], style: 5, height: 22 },
    ...payload.legend.map((item) => ({ values: [item.code, item.name], style: 0, height: 20 })),
  ];

  const sheetRows = rows.map((row, rowIndex) => xlsxRow(row.values, rowIndex, row.style, row.height)).join("");
  const lastDayColumn = columnName(payload.days.length + 2);
  const legendStart = payload.rows.length + 7;

  const worksheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="4" topLeftCell="A5" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    <col min="1" max="1" width="30" customWidth="1"/>
    <col min="2" max="2" width="18" customWidth="1"/>
    <col min="3" max="${payload.days.length + 2}" width="5.2" customWidth="1"/>
  </cols>
  <sheetData>${sheetRows}</sheetData>
  <mergeCells count="2">
    <mergeCell ref="A1:${lastDayColumn}1"/>
    <mergeCell ref="A${legendStart}:B${legendStart}"/>
  </mergeCells>
</worksheet>`;

  return buildXlsxPackage("Табель", worksheet);
}

function buildXlsxPackage(sheetName, worksheet) {
  return zipStore({
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
</Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
    "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets><sheet name="${escapeXml(sheetName)}" sheetId="1" r:id="rId1"/></sheets>
</workbook>`,
    "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`,
    "xl/styles.xml": xlsxStyles(),
    "xl/worksheets/sheet1.xml": worksheet,
  });
}

function buildDocx(payload) {
  if (payload?.type === "employee") return buildEmployeeDocx(payload);

  const dayWidth = 340;
  const nameWidth = 2100;
  const roleWidth = 1700;
  const grid = [nameWidth, roleWidth, ...payload.days.map(() => dayWidth)];
  const headerRows = `
    <w:tr>
      ${docxCell("ФИО", { width: nameWidth, header: true })}
      ${docxCell("Должность", { width: roleWidth, header: true })}
      ${payload.days.map((day) => docxCell(day.weekday, { width: dayWidth, header: true, align: "center", size: 12, noWrap: true })).join("")}
    </w:tr>
    <w:tr>
      ${docxCell("", { width: nameWidth, header: true })}
      ${docxCell("", { width: roleWidth, header: true })}
      ${payload.days.map((day) => docxCell(day.day, { width: dayWidth, header: true, align: "center", size: 12, noWrap: true })).join("")}
    </w:tr>`;
  const bodyRows = payload.rows
    .map(
      (row) => `<w:tr>
        ${docxCell(row.name, { width: nameWidth, size: 13 })}
        ${docxCell(row.role, { width: roleWidth, size: 13 })}
        ${row.cells.map((cell) => docxCell(cell, { width: dayWidth, align: "center", size: 12, noWrap: true })).join("")}
      </w:tr>`
    )
    .join("");

  const legend = payload.legend
    .map((item) => docxParagraph(`${item.code} - ${item.name}`, false, 16))
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
    ${docxParagraph(payload.title, true, 20)}
    <w:tbl>${docxTableProperties("fixed", grid)}${headerRows}${bodyRows}</w:tbl>
    ${docxParagraph("Расшифровка", true, 16)}
    ${legend}
    <w:sectPr><w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/><w:pgMar w:top="420" w:right="360" w:bottom="420" w:left="360" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr>
  </w:body>
</w:document>`,
  });
}

function buildEmployeeXlsx(payload) {
  const [employeeInfo, timeoff, currentStats, monthlyStats] = payload.sections;
  const rows = [
    { values: [payload.title, "", "", "", "", ""], style: 1, height: 28 },
    { values: [], style: 0 },
    { values: [employeeInfo.title, "", "", timeoff.title, "", ""], style: 5, height: 22 },
    ...Array.from({ length: Math.max(employeeInfo.rows.length, timeoff.rows.length) }, (_, index) => ({
      values: [
        employeeInfo.rows[index]?.[0] ?? "",
        employeeInfo.rows[index]?.[1] ?? "",
        "",
        timeoff.rows[index]?.[0] ?? "",
        timeoff.rows[index]?.[1] ?? "",
        "",
      ],
      style: 0,
      height: 24,
    })),
    { values: [], style: 0 },
    { values: [currentStats.title, "", "", "", "", ""], style: 5, height: 22 },
    { values: ["Рабочих дней", "Часов", "", "Дежурств", "", ""], style: 2, height: 22 },
    { values: [currentStats.rows[0]?.[1] ?? "", currentStats.rows[1]?.[1] ?? "", "", currentStats.rows[2]?.[1] ?? "", "", ""], style: 3, height: 24 },
    { values: [], style: 0 },
    { values: [monthlyStats.title, "", "", "", "", ""], style: 5, height: 22 },
    { values: [monthlyStats.headers[0], monthlyStats.headers[1], "", monthlyStats.headers[2], "", ""], style: 2, height: 22 },
    ...monthlyStats.rows.map((row) => ({ values: [row[0], row[1], "", row[2], "", ""], style: 0, height: 22 })),
  ];

  const sheetRows = rows.map((row, rowIndex) => xlsxRow(row.values, rowIndex, row.style, row.height)).join("");
  const merges = [
    "A1:F1",
    "A3:B3",
    "D3:E3",
    "A10:F10",
    "A14:F14",
    "D11:E11",
    "D12:E12",
    "D15:E15",
    ...monthlyStats.rows.map((_, index) => `D${16 + index}:E${16 + index}`),
  ];

  const worksheet = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheetViews><sheetView workbookViewId="0" showGridLines="0"/></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    <col min="1" max="1" width="24" customWidth="1"/>
    <col min="2" max="2" width="34" customWidth="1"/>
    <col min="3" max="3" width="4" customWidth="1"/>
    <col min="4" max="4" width="24" customWidth="1"/>
    <col min="5" max="5" width="22" customWidth="1"/>
    <col min="6" max="6" width="4" customWidth="1"/>
  </cols>
  <sheetData>${sheetRows}</sheetData>
  <mergeCells count="${merges.length}">${merges.map((ref) => `<mergeCell ref="${ref}"/>`).join("")}</mergeCells>
</worksheet>`;

  return buildXlsxPackage("Карточка", worksheet);
}

function buildEmployeeDocx(payload) {
  const [employeeInfo, timeoff, currentStats, monthlyStats] = payload.sections;
  const twoColumnGrid = [2800, 5800];
  const statGrid = [2866, 2866, 2868];
  const infoRows = employeeInfo.rows
    .map((row) => `<w:tr>${docxCell(row[0], { width: twoColumnGrid[0], header: true, size: 20 })}${docxCell(row[1], { width: twoColumnGrid[1], size: 20 })}</w:tr>`)
    .join("");
  const timeoffRows = timeoff.rows
    .map((row) => `<w:tr>${docxCell(row[0], { width: twoColumnGrid[0], header: true, size: 20 })}${docxCell(row[1], { width: twoColumnGrid[1], size: 20 })}</w:tr>`)
    .join("");
  const currentHeader = `<w:tr>${currentStats.rows.map((row) => docxCell(row[0], { width: statGrid[0], header: true, align: "center", size: 20 })).join("")}</w:tr>`;
  const currentValues = `<w:tr>${currentStats.rows.map((row) => docxCell(row[1], { width: statGrid[0], align: "center", size: 22 })).join("")}</w:tr>`;
  const monthGrid = [3600, 2500, 2500];
  const monthHeader = `<w:tr>${monthlyStats.headers.map((cell, index) => docxCell(cell, { width: monthGrid[index], header: true, align: "center", size: 20 })).join("")}</w:tr>`;
  const monthRows = monthlyStats.rows
    .map((row) => `<w:tr>${row.map((cell, index) => docxCell(cell, { width: monthGrid[index], align: index === 0 ? "left" : "center", size: 19 })).join("")}</w:tr>`)
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
    ${docxParagraph(payload.title, true, 28, "center")}
    ${docxParagraph(employeeInfo.title, true, 22, "center")}
    <w:tbl>${docxTableProperties("fixed", twoColumnGrid)}${infoRows}</w:tbl>
    ${docxParagraph(timeoff.title, true, 22, "center")}
    <w:tbl>${docxTableProperties("fixed", twoColumnGrid)}${timeoffRows}</w:tbl>
    ${docxParagraph(currentStats.title, true, 22, "center")}
    <w:tbl>${docxTableProperties("fixed", statGrid)}${currentHeader}${currentValues}</w:tbl>
    ${docxParagraph(monthlyStats.title, true, 22, "center")}
    <w:tbl>${docxTableProperties("fixed", monthGrid)}${monthHeader}${monthRows}</w:tbl>
    <w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr>
  </w:body>
</w:document>`,
  });
}

function xlsxRow(values, rowIndex, rowStyle = 0, height = 20) {
  const cells = values
    .map((value, columnIndex) => {
      const ref = `${columnName(columnIndex + 1)}${rowIndex + 1}`;
      const style = columnIndex < 2 && rowStyle === 0 ? 4 : rowStyle || 3;
      return `<c r="${ref}" s="${style}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`;
    })
    .join("");
  return `<row r="${rowIndex + 1}" ht="${height}" customHeight="1">${cells}</row>`;
}

function xlsxStyles() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="3"><font><sz val="10"/><name val="Arial"/></font><font><b/><sz val="14"/><name val="Arial"/></font><font><b/><sz val="10"/><name val="Arial"/></font></fonts>
  <fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFEFF6F4"/><bgColor indexed="64"/></patternFill></fill></fills>
  <borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFB8C3D1"/></left><right style="thin"><color rgb="FFB8C3D1"/></right><top style="thin"><color rgb="FFB8C3D1"/></top><bottom style="thin"><color rgb="FFB8C3D1"/></bottom><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="6">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>
    <xf numFmtId="0" fontId="2" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="1" xfId="0" applyFont="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1"/>
  </cellXfs>
</styleSheet>`;
}

function docxParagraph(value, bold = false, size = 20, align = "") {
  const paragraphProps = align ? `<w:pPr><w:jc w:val="${align}"/></w:pPr>` : "";
  return `<w:p>${paragraphProps}<w:r><w:rPr>${bold ? "<w:b/>" : ""}<w:sz w:val="${size}"/></w:rPr><w:t>${escapeXml(value)}</w:t></w:r></w:p>`;
}

function docxTableProperties(layout = "auto", grid = []) {
  const tableWidth = grid.reduce((sum, width) => sum + width, 0);
  const gridXml = grid.length ? `<w:tblGrid>${grid.map((width) => `<w:gridCol w:w="${width}"/>`).join("")}</w:tblGrid>` : "";
  return `<w:tblPr><w:tblLayout w:type="${layout}"/><w:jc w:val="center"/><w:tblW w:w="${tableWidth || 0}" w:type="${grid.length ? "dxa" : "auto"}"/><w:tblBorders><w:top w:val="single" w:sz="4" w:color="B8C3D1"/><w:left w:val="single" w:sz="4" w:color="B8C3D1"/><w:bottom w:val="single" w:sz="4" w:color="B8C3D1"/><w:right w:val="single" w:sz="4" w:color="B8C3D1"/><w:insideH w:val="single" w:sz="4" w:color="B8C3D1"/><w:insideV w:val="single" w:sz="4" w:color="B8C3D1"/></w:tblBorders><w:tblCellMar><w:top w:w="45" w:type="dxa"/><w:left w:w="35" w:type="dxa"/><w:bottom w:w="45" w:type="dxa"/><w:right w:w="35" w:type="dxa"/></w:tblCellMar></w:tblPr>${gridXml}`;
}

function docxCell(value, options = {}) {
  const lines = String(value ?? "").split("\n");
  const shading = options.header ? '<w:shd w:fill="EFF6F4"/>' : "";
  const width = options.width ? `<w:tcW w:w="${options.width}" w:type="dxa"/>` : "";
  const noWrap = options.noWrap ? "<w:noWrap/>" : "";
  const align = options.align ? `<w:jc w:val="${options.align}"/>` : "";
  const bold = options.header ? "<w:b/>" : "";
  const size = options.size ?? 18;
  return `<w:tc><w:tcPr>${width}${shading}${noWrap}</w:tcPr><w:p><w:pPr>${align}</w:pPr>${lines
    .map((line, index) => `<w:r><w:rPr>${bold}<w:sz w:val="${size}"/></w:rPr>${index ? "<w:br/>" : ""}<w:t>${escapeXml(line)}</w:t></w:r>`)
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
