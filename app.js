const STORAGE_KEYS = {
  employees: "gngs.employees",
  attendance: "gngs.attendance",
  settings: "gngs.settings",
};

const SUPABASE = {
  url: "https://ecqyuqhudbutofwymwko.supabase.co",
  key: "sb_publishable_PdTZlr9NgnUeuE3K1YgXFw_DjCxJwo5",
  employeesTable: "employees",
};

const DEFAULT_EMPLOYEE_PHOTO = "assets/logo.ico";

const DEFAULT_POSITIONS = [
  "электромонтер",
  "сварщик",
  "токарь",
  "фрезеровщик",
  "обмотчик",
  "трансформаторщик",
  "пропитчик",
  "Начальник участка",
  "Начальник цеха",
  "Мастер",
];

const STATUS_ORDER = ["present", "duty", "absence", "vacation", "timeoff", "administrative", "sick"];

const defaultStatusSettings = {
  present: { name: "Работа", code: "Часы", color: "#047857" },
  duty: { name: "Дежурство", code: "Д", color: "#1d4ed8" },
  absence: { name: "Неявка", code: "Н", color: "#e11d48" },
  vacation: { name: "Отпуск", code: "ОТ", color: "#a16207" },
  timeoff: { name: "Отгул", code: "ОГ", color: "#f97316" },
  administrative: { name: "Административный", code: "А", color: "#334155" },
  sick: { name: "Больничный", code: "Б", color: "#9333ea" },
};

const defaultSettings = {
  theme: "light",
  tableFontSize: 11,
  density: "normal",
  weekendTint: true,
  statusTint: true,
  dutyExtraDates: [],
  positions: DEFAULT_POSITIONS,
  statuses: defaultStatusSettings,
};

const defaultEmployees = [
  {
    id: "e01",
    lastName: "Иванов",
    firstName: "Иван",
    middleName: "Петрович",
    role: "электромонтер",
    phone: "+7 999 100-00-01",
    start: "10.01.2021",
    timeoffBalance: 24,
    status: "Активен",
    note: "Основная бригада участка.",
  },
  {
    id: "e02",
    lastName: "Петров",
    firstName: "Петр",
    middleName: "Иванович",
    role: "сварщик",
    phone: "+7 999 100-00-02",
    start: "14.02.2021",
    timeoffBalance: 16,
    status: "Активен",
    note: "Сварочные работы.",
  },
  {
    id: "e03",
    lastName: "Сидоров",
    firstName: "Сергей",
    middleName: "Николаевич",
    role: "токарь",
    phone: "+7 999 100-00-03",
    start: "03.03.2021",
    timeoffBalance: 8,
    status: "Активен",
    note: "Токарный участок.",
  },
  {
    id: "e04",
    lastName: "Смирнов",
    firstName: "Алексей",
    middleName: "Викторович",
    role: "фрезеровщик",
    phone: "+7 999 100-00-04",
    start: "18.04.2021",
    timeoffBalance: 24,
    status: "Активен",
    note: "Фрезерный участок.",
  },
  {
    id: "e05",
    lastName: "Кузнецов",
    firstName: "Дмитрий",
    middleName: "Сергеевич",
    role: "обмотчик",
    phone: "+7 999 100-00-05",
    start: "25.05.2021",
    timeoffBalance: 16,
    status: "Активен",
    note: "Обмоточный участок.",
  },
  {
    id: "e06",
    lastName: "Васильев",
    firstName: "Андрей",
    middleName: "Павлович",
    role: "трансформаторщик",
    phone: "+7 999 100-00-06",
    start: "09.06.2021",
    timeoffBalance: 24,
    status: "Активен",
    note: "Трансформаторный участок.",
  },
  {
    id: "e07",
    lastName: "Попов",
    firstName: "Михаил",
    middleName: "Андреевич",
    role: "пропитчик",
    phone: "+7 999 100-00-07",
    start: "12.07.2021",
    timeoffBalance: 8,
    status: "Активен",
    note: "Пропиточный участок.",
  },
  {
    id: "e08",
    lastName: "Новиков",
    firstName: "Николай",
    middleName: "Иванович",
    role: "электромонтер",
    phone: "+7 999 100-00-08",
    start: "16.08.2021",
    timeoffBalance: 16,
    status: "Активен",
    note: "Основная бригада участка.",
  },
  {
    id: "e09",
    lastName: "Федоров",
    firstName: "Артем",
    middleName: "Олегович",
    role: "сварщик",
    phone: "+7 999 100-00-09",
    start: "20.09.2021",
    timeoffBalance: 24,
    status: "Активен",
    note: "Сварочные работы.",
  },
  {
    id: "e10",
    lastName: "Морозов",
    firstName: "Павел",
    middleName: "Дмитриевич",
    role: "токарь",
    phone: "+7 999 100-00-10",
    start: "11.10.2021",
    timeoffBalance: 8,
    status: "Активен",
    note: "Токарный участок.",
  },
  {
    id: "e11",
    lastName: "Волков",
    firstName: "Илья",
    middleName: "Сергеевич",
    role: "фрезеровщик",
    phone: "+7 999 100-00-11",
    start: "02.11.2021",
    timeoffBalance: 16,
    status: "Активен",
    note: "Фрезерный участок.",
  },
  {
    id: "e12",
    lastName: "Соколов",
    firstName: "Максим",
    middleName: "Павлович",
    role: "обмотчик",
    phone: "+7 999 100-00-12",
    start: "13.12.2021",
    timeoffBalance: 24,
    status: "Активен",
    note: "Обмоточный участок.",
  },
  {
    id: "e13",
    lastName: "Лебедев",
    firstName: "Кирилл",
    middleName: "Андреевич",
    role: "трансформаторщик",
    phone: "+7 999 100-00-13",
    start: "17.01.2022",
    timeoffBalance: 8,
    status: "Активен",
    note: "Трансформаторный участок.",
  },
  {
    id: "e14",
    lastName: "Козлов",
    firstName: "Денис",
    middleName: "Игоревич",
    role: "пропитчик",
    phone: "+7 999 100-00-14",
    start: "21.02.2022",
    timeoffBalance: 16,
    status: "Активен",
    note: "Пропиточный участок.",
  },
  {
    id: "e15",
    lastName: "Орлов",
    firstName: "Роман",
    middleName: "Викторович",
    role: "электромонтер",
    phone: "+7 999 100-00-15",
    start: "07.03.2022",
    timeoffBalance: 24,
    status: "Активен",
    note: "Основная бригада участка.",
  },
  {
    id: "e16",
    lastName: "Павлов",
    firstName: "Антон",
    middleName: "Сергеевич",
    role: "сварщик",
    phone: "+7 999 100-00-16",
    start: "15.04.2022",
    timeoffBalance: 8,
    status: "Активен",
    note: "Сварочные работы.",
  },
  {
    id: "e17",
    lastName: "Захаров",
    firstName: "Виктор",
    middleName: "Иванович",
    role: "токарь",
    phone: "+7 999 100-00-17",
    start: "19.05.2022",
    timeoffBalance: 16,
    status: "Активен",
    note: "Токарный участок.",
  },
  {
    id: "e18",
    lastName: "Егоров",
    firstName: "Олег",
    middleName: "Николаевич",
    role: "Начальник участка",
    phone: "+7 999 100-00-18",
    start: "23.06.2022",
    timeoffBalance: 24,
    status: "Активен",
    note: "Контроль участка.",
  },
  {
    id: "e19",
    lastName: "Николаев",
    firstName: "Евгений",
    middleName: "Петрович",
    role: "Мастер",
    phone: "+7 999 100-00-19",
    start: "27.07.2022",
    timeoffBalance: 8,
    status: "Активен",
    note: "Сменный мастер.",
  },
  {
    id: "e20",
    lastName: "Андреев",
    firstName: "Александр",
    middleName: "Олегович",
    role: "Начальник цеха",
    phone: "+7 999 100-00-20",
    start: "31.08.2022",
    timeoffBalance: 16,
    status: "Активен",
    note: "Руководство цехом.",
  },
];

let employees = loadEmployees();

const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

function currentMonthDate() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1);
}

const state = {
  selectedEmployeeId: employees[0]?.id ?? "",
  visibleDate: currentMonthDate(),
  attendance: loadAttendance(),
  settings: loadSettings(),
  activeView: "timesheet",
  drawerOpen: false,
  profileEditing: false,
  activeCell: null,
  dutyFilterDates: [],
  updateStatus: null,
  employeesLoading: Boolean(SUPABASE.url && SUPABASE.key),
};

const employeeSearch = document.querySelector("#employeeSearch");
const pageTitle = document.querySelector("#pageTitle");
const timesheetTable = document.querySelector("#timesheetTable");
const employeesList = document.querySelector("#employeesList");
const dutyTable = document.querySelector("#dutyTable");
const statusLegend = document.querySelector("#statusLegend");
const employeeNote = document.querySelector("#employeeNote");
const drawer = document.querySelector("#employeeDrawer");
const drawerOverlay = document.querySelector("#drawerOverlay");
const employeeForm = document.querySelector("#employeeForm");
const employeeModal = document.querySelector("#employeeModal");
const employeeModalOverlay = document.querySelector("#employeeModalOverlay");
const settingsModal = document.querySelector("#settingsModal");
const settingsModalOverlay = document.querySelector("#settingsModalOverlay");
const statusMenu = document.querySelector("#statusMenu");
const statusHours = document.querySelector("#statusHours");
const dutyMenu = document.querySelector("#dutyMenu");
const dutyHours = document.querySelector("#dutyHours");
const dutyFilterPopover = document.querySelector("#dutyFilterPopover");
const profileDetails = document.querySelector(".profile-details");
const profileEditForm = document.querySelector("#profileEditForm");
const profileTimeoffBalanceInput = document.querySelector("#profileTimeoffBalanceInput");
const settingsButton = document.querySelector("#settingsButton");
const searchButton = document.querySelector("#searchButton");
const searchPopover = document.querySelector("#searchPopover");

function init() {
  applySettings();
  if (Object.keys(state.attendance).length === 0) seedAttendance();
  fillPositionSelects();
  bindEvents();
  render();
  syncAppInfo();
  syncEmployeesFromSupabase();
}

function seedAttendance() {
  const statuses = ["present", "present", "present", "absence", "vacation", "timeoff", "administrative", "sick"];
  employees.forEach((employee, employeeIndex) => {
    for (let day = 1; day <= 25; day += 1) {
      const date = new Date(2026, 6, day);
      const weekday = date.getDay();
      const status = weekday === 0 || weekday === 6 ? "duty" : statuses[(day + employeeIndex) % statuses.length];
      setAttendance(employee.id, date, status, defaultHours(status));
    }
  });
  saveAttendance();
}

function fillPositionSelects() {
  [document.querySelector("#newEmployeeRole"), document.querySelector("#editEmployeeRole")].forEach((select) => {
    select.innerHTML = "";
    availablePositions().forEach((position) => {
      const option = document.createElement("option");
      option.value = position;
      option.textContent = position;
      select.append(option);
    });
  });
}

function bindEvents() {
  document.querySelectorAll("[data-view-tab]").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.viewTab));
  });
  employeeSearch.addEventListener("input", render);
  searchButton.addEventListener("click", toggleSearchPopover);
  document.querySelector("#toggleEmployeeForm").addEventListener("click", openEmployeeModal);
  settingsButton.addEventListener("click", openSettingsModal);
  document.querySelector("#closeSettingsModal").addEventListener("click", closeSettingsModal);
  settingsModalOverlay.addEventListener("click", closeSettingsModal);
  document.querySelector("#settingTheme").addEventListener("change", updateSettingsFromForm);
  document.querySelector("#settingTableFontSize").addEventListener("input", updateSettingsFromForm);
  document.querySelector("#settingDensity").addEventListener("change", updateSettingsFromForm);
  document.querySelector("#settingWeekendTint").addEventListener("change", updateSettingsFromForm);
  document.querySelector("#settingStatusTint").addEventListener("change", updateSettingsFromForm);
  document.querySelector("#settingLaunchAtLogin").addEventListener("change", updateLaunchAtLoginSetting);
  document.querySelector("#checkUpdatesButton").addEventListener("click", checkForUpdates);
  document.querySelector("#installUpdateButton").addEventListener("click", installUpdate);
  window.gngsApi?.onUpdateStatus?.(handleUpdateStatus);
  document.querySelector("#settingPositions").addEventListener("change", updateSettingsFromForm);
  document.querySelectorAll("[data-status-setting]").forEach((input) => {
    input.addEventListener("change", updateSettingsFromForm);
  });
  document.querySelector("#closeEmployeeModal").addEventListener("click", closeEmployeeModal);
  document.querySelector("#cancelEmployeeForm").addEventListener("click", closeEmployeeModal);
  employeeModalOverlay.addEventListener("click", closeEmployeeModal);
  employeeForm.addEventListener("submit", addEmployee);
  bindPhoneInput("#newEmployeePhone");
  bindPhoneInput("#editEmployeePhone");
  document.querySelector("#printTimesheet").addEventListener("click", printTimesheet);
  document.querySelector("#exportExcel").addEventListener("click", exportExcel);
  document.querySelector("#exportDocx").addEventListener("click", exportDocx);
  document.querySelector("#printDuty").addEventListener("click", printDutySchedule);
  document.querySelector("#exportDutyExcel").addEventListener("click", exportDutyExcel);
  document.querySelector("#exportDutyDocx").addEventListener("click", exportDutyDocx);
  document.querySelector("#addDutyExtraDate").addEventListener("click", addDutyExtraDate);
  document.querySelector("#openDutyFilter").addEventListener("click", toggleDutyFilterPopover);
  document.querySelector("#clearDutyFilterButton").addEventListener("click", clearDutyFilter);
  document.querySelector("#saveDutyHours").addEventListener("click", applyDutyHours);
  document.querySelector("#clearDutyHours").addEventListener("click", clearDutyHours);
  document.querySelector("#prevMonth").addEventListener("click", () => shiftMonth(-1));
  document.querySelector("#nextMonth").addEventListener("click", () => shiftMonth(1));
  document.querySelector("#todayButton").addEventListener("click", () => {
    state.visibleDate = currentMonthDate();
    render();
  });
  document.querySelector("#closeDrawer").addEventListener("click", closeDrawer);
  document.querySelector("#editEmployee").addEventListener("click", openProfileEdit);
  document.querySelector("#cancelProfileEdit").addEventListener("click", closeProfileEdit);
  profileEditForm.addEventListener("submit", saveProfileEdit);
  document.querySelector("#deleteEmployee").addEventListener("click", deleteSelectedEmployee);
  profileTimeoffBalanceInput.addEventListener("input", updateProfileTimeoffBalance);
  profileTimeoffBalanceInput.addEventListener("change", render);
  drawerOverlay.addEventListener("click", closeDrawer);
  statusMenu.addEventListener("click", applyStatusFromMenu);
  statusHours.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyWorkStatus();
    }
  });
  dutyHours.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyDutyHours();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeStatusMenu();
      closeDutyMenu();
      closeDutyFilterPopover();
      closeEmployeeModal();
      closeSettingsModal();
      closeDrawer();
      closeSearchPopover();
    }
  });

  document.addEventListener("click", (event) => {
    if (!statusMenu.hidden && !statusMenu.contains(event.target) && !event.target.closest("[data-date]")) closeStatusMenu();
    if (!dutyMenu.hidden && !dutyMenu.contains(event.target) && !event.target.closest("[data-duty-date]")) closeDutyMenu();
    if (!dutyFilterPopover.hidden && !dutyFilterPopover.contains(event.target) && !event.target.closest("#openDutyFilter")) closeDutyFilterPopover();
    if (!searchPopover.hidden && !searchPopover.contains(event.target) && !event.target.closest("#searchButton")) closeSearchPopover();
  });

  employeeNote.addEventListener("input", () => {
    const employee = selectedEmployee();
    if (!employee) return;
    employee.note = employeeNote.value;
    saveEmployees();
  });
}

function toggleSearchPopover() {
  if (searchPopover.hidden) {
    openSearchPopover();
    return;
  }
  closeSearchPopover();
}

function openSearchPopover() {
  searchPopover.hidden = false;
  searchButton.classList.add("is-active");
  searchButton.setAttribute("aria-expanded", "true");
  employeeSearch.focus();
  employeeSearch.select();
}

function closeSearchPopover() {
  searchPopover.hidden = true;
  searchButton.classList.remove("is-active");
  searchButton.setAttribute("aria-expanded", "false");
}

function openSettingsModal() {
  syncSettingsForm();
  syncAppInfo();
  settingsModal.hidden = false;
  settingsModalOverlay.hidden = false;
}

function closeSettingsModal() {
  settingsModal.hidden = true;
  settingsModalOverlay.hidden = true;
}

function syncSettingsForm() {
  document.querySelector("#settingTheme").value = state.settings.theme;
  document.querySelector("#settingTableFontSize").value = state.settings.tableFontSize;
  document.querySelector("#settingTableFontSizeValue").textContent = state.settings.tableFontSize;
  document.querySelector("#settingDensity").value = state.settings.density;
  document.querySelector("#settingWeekendTint").checked = state.settings.weekendTint;
  document.querySelector("#settingStatusTint").checked = state.settings.statusTint;
  document.querySelector("#settingPositions").value = availablePositions().join("\n");
  document.querySelectorAll("[data-status-setting]").forEach((input) => {
    const status = input.dataset.statusSetting;
    input.value = state.settings.statuses[status]?.[input.dataset.field] ?? defaultStatusSettings[status][input.dataset.field];
  });
}

async function syncAppInfo() {
  if (!window.gngsApi?.getAppInfo) return;
  try {
    const info = await window.gngsApi.getAppInfo();
    const versionNode = document.querySelector("#appVersion");
    const startupNode = document.querySelector("#appStartupInfo");
    const updateNode = document.querySelector("#appUpdateInfo");
    const startupInput = document.querySelector("#settingLaunchAtLogin");
    if (versionNode) versionNode.textContent = info.version ?? "1.0.0";
    if (startupNode) startupNode.textContent = info.launchAtLogin ? "Включен" : "Выключен";
    if (updateNode && !state.updateStatus) updateNode.textContent = info.isPackaged ? "Готово к проверке" : "Работает после установки";
    if (startupInput) startupInput.checked = Boolean(info.launchAtLogin);
  } catch (error) {
    console.warn("App info skipped:", error.message);
  }
}

async function checkForUpdates() {
  handleUpdateStatus({ status: "checking", message: "Проверяем обновления..." });
  try {
    const result = await window.gngsApi?.checkForUpdates?.();
    if (result?.message) handleUpdateStatus(result);
  } catch (error) {
    handleUpdateStatus({ status: "error", message: `Не удалось проверить обновления: ${error.message}` });
  }
}

function installUpdate() {
  window.gngsApi?.installUpdate?.();
}

function handleUpdateStatus(payload) {
  state.updateStatus = payload;
  const updateNode = document.querySelector("#appUpdateInfo");
  const checkButton = document.querySelector("#checkUpdatesButton");
  const installButton = document.querySelector("#installUpdateButton");
  const status = payload?.status ?? "idle";
  if (updateNode) updateNode.textContent = payload?.message ?? "Готово к проверке";
  if (checkButton) checkButton.disabled = ["checking", "available", "downloading"].includes(status);
  if (installButton) {
    installButton.hidden = status !== "downloaded";
    installButton.disabled = status !== "downloaded";
  }
}

async function updateLaunchAtLoginSetting(event) {
  const checked = event.target.checked;
  const startupNode = document.querySelector("#appStartupInfo");
  event.target.disabled = true;
  try {
    const result = await window.gngsApi?.setLaunchAtLogin?.(checked);
    const enabled = Boolean(result?.launchAtLogin);
    event.target.checked = enabled;
    if (startupNode) startupNode.textContent = enabled ? "Включен" : "Выключен";
  } catch (error) {
    event.target.checked = !checked;
    alert(`Не удалось изменить автозапуск Windows:\n${error.message}`);
  } finally {
    event.target.disabled = false;
  }
}

function updateSettingsFromForm() {
  const statuses = {};
  STATUS_ORDER.forEach((status) => {
    const name = document.querySelector(`[data-status-setting="${status}"][data-field="name"]`).value.trim();
    const color = document.querySelector(`[data-status-setting="${status}"][data-field="color"]`).value.trim();
    statuses[status] = {
      name: name || defaultStatusSettings[status].name,
      code: defaultStatusSettings[status].code,
      color: normalizeColor(color, defaultStatusSettings[status].color),
    };
  });

  state.settings = {
    theme: document.querySelector("#settingTheme").value,
    tableFontSize: Number(document.querySelector("#settingTableFontSize").value),
    density: document.querySelector("#settingDensity").value,
    weekendTint: document.querySelector("#settingWeekendTint").checked,
    statusTint: document.querySelector("#settingStatusTint").checked,
    dutyExtraDates: Array.isArray(state.settings.dutyExtraDates) ? state.settings.dutyExtraDates : [],
    positions: parsePositions(document.querySelector("#settingPositions").value),
    statuses,
  };
  saveSettings();
  applySettings();
  fillPositionSelects();
  render();
}

function applySettings() {
  const settings = state.settings;
  document.body.dataset.theme = settings.theme;
  document.body.dataset.density = settings.density;
  document.body.dataset.weekendTint = settings.weekendTint ? "on" : "off";
  document.body.dataset.statusTint = settings.statusTint ? "on" : "off";
  document.documentElement.style.setProperty("--table-mark-size", `${settings.tableFontSize}px`);
  document.documentElement.style.setProperty("--table-small-size", `${Math.max(8, settings.tableFontSize - 2)}px`);
  document.documentElement.style.setProperty("--table-name-size", `${Math.max(12, settings.tableFontSize + 2)}px`);
  STATUS_ORDER.forEach((status) => {
    document.documentElement.style.setProperty(`--status-${status}`, statusColor(status));
  });
  const fontValue = document.querySelector("#settingTableFontSizeValue");
  if (fontValue) fontValue.textContent = settings.tableFontSize;
}

function availablePositions() {
  return Array.isArray(state.settings.positions) && state.settings.positions.length > 0
    ? state.settings.positions
    : DEFAULT_POSITIONS;
}

function parsePositions(value) {
  const positions = String(value)
    .split(/\r?\n/)
    .map((position) => position.trim())
    .filter(Boolean);
  return [...new Set(positions)].length > 0 ? [...new Set(positions)] : DEFAULT_POSITIONS;
}

function statusName(status) {
  return state.settings.statuses?.[status]?.name || defaultStatusSettings[status]?.name || status;
}

function statusCode(status) {
  return state.settings.statuses?.[status]?.code || defaultStatusSettings[status]?.code || "";
}

function statusColor(status) {
  return normalizeColor(state.settings.statuses?.[status]?.color, defaultStatusSettings[status]?.color || "#64748b");
}

function normalizeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(String(value)) ? value : fallback;
}

function renderLegend() {
  statusLegend.innerHTML = STATUS_ORDER.map((status) => {
    const label = status === "present" ? statusName(status) : statusName(status);
    return `<span><i class="dot ${status}"></i>${escapeHtml(label)}</span>`;
  }).join("");
}

function renderStatusMenuLabels() {
  statusMenu.querySelectorAll("[data-status]").forEach((button) => {
    const status = button.dataset.status;
    if (!status) return;
    if (status === "present") {
      button.title = statusName(status);
      return;
    }
    button.innerHTML = `<span class="dot ${status}"></span>${escapeHtml(statusName(status))}`;
  });
}

async function addEmployee(event) {
  event.preventDefault();
  const lastName = document.querySelector("#newEmployeeLastName").value.trim();
  const firstName = document.querySelector("#newEmployeeFirstName").value.trim();
  const middleName = document.querySelector("#newEmployeeMiddleName").value.trim();
  if (!lastName || !firstName) return;

  const employee = {
    id: `e${Date.now()}`,
    lastName,
    firstName,
    middleName,
    role: document.querySelector("#newEmployeeRole").value,
    grade: normalizeGradeInput(document.querySelector("#newEmployeeGrade").value),
    phone: normalizedPhoneValue("#newEmployeePhone"),
    start: new Date().toLocaleDateString("ru-RU"),
    timeoffBalance: daysToHours(readNumberInput("#newEmployeeTimeoffBalance")),
    status: "Активен",
    note: "",
    photo: "",
  };

  const submitButton = employeeForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  try {
    await saveEmployeeRecordToSupabase(employee);
    employees.push(employee);
    state.selectedEmployeeId = employee.id;
    employeeForm.reset();
    closeEmployeeModal();
    state.drawerOpen = true;
    render();
  } catch (error) {
    alert(supabaseUserMessage(error));
  } finally {
    submitButton.disabled = false;
  }
}

function shiftMonth(step) {
  state.visibleDate = new Date(state.visibleDate.getFullYear(), state.visibleDate.getMonth() + step, 1);
  render();
}

function render() {
  renderTitle();
  renderLegend();
  renderStatusMenuLabels();
  syncActiveView();
  renderTimesheet();
  renderEmployeesList();
  renderDutySchedule();
  renderProfile();
  renderEmployeeTotals();
  syncDrawer();
}

function renderTitle() {
  pageTitle.textContent = `${monthNames[state.visibleDate.getMonth()]} ${state.visibleDate.getFullYear()}`;
}

function switchView(view) {
  if (!["timesheet", "employees", "duty"].includes(view)) return;
  state.activeView = view;
  closeStatusMenu();
  syncActiveView();
}

function emptyEmployeesState(title, text = "Добавьте первого сотрудника, чтобы начать вести табель.", showButton = true) {
  return `
    <div class="empty-state">
      <div class="empty-state-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4c1.1 0 2.1 .4 2.9 1.1" />
          <path d="M16 11a3 3 0 1 0 0 -6" />
          <path d="M18 18h4" />
          <path d="M20 16v4" />
        </svg>
      </div>
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(text)}</span>
      ${showButton ? `<button type="button" class="text-button primary-action" data-empty-add-employee><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0" /><path d="M3 21v-2a4 4 0 0 1 4-4h4" /><path d="M16 19h6" /><path d="M19 16v6" /></svg><span>Добавить сотрудника</span></button>` : ""}
    </div>
  `;
}

function employeesLoadingState(text = "Загружаем сотрудников...") {
  return `
    <div class="empty-state loading-state" aria-live="polite">
      <div class="loading-spinner" aria-hidden="true"></div>
      <strong>${escapeHtml(text)}</strong>
      <span>Подождите немного, данные загружаются из общей базы.</span>
    </div>
  `;
}

function bindEmptyStateActions(root) {
  root.querySelectorAll("[data-empty-add-employee]").forEach((button) => {
    button.addEventListener("click", openEmployeeModal);
  });
}

function syncActiveView() {
  document.querySelectorAll("[data-view-tab]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewTab === state.activeView);
  });
  document.querySelectorAll("[data-view]").forEach((view) => {
    view.hidden = view.dataset.view !== state.activeView;
  });
}

function renderTimesheet() {
  const employeesToShow = filteredEmployees();
  if (employeesToShow.length === 0) {
    timesheetTable.innerHTML = "";
    timesheetTable.parentElement.querySelector(".empty-state")?.remove();
    if (state.employeesLoading) {
      timesheetTable.insertAdjacentHTML("afterend", employeesLoadingState());
      return;
    }
    const hasSearch = employeeSearch.value.trim().length > 0;
    timesheetTable.insertAdjacentHTML(
      "afterend",
      emptyEmployeesState(
        hasSearch ? "Поиск ничего не нашел" : "В табеле пока нет сотрудников",
        hasSearch ? "Измените строку поиска, чтобы увидеть сотрудников." : "Добавьте первого сотрудника, чтобы начать вести табель.",
        !hasSearch
      )
    );
    bindEmptyStateActions(timesheetTable.parentElement);
    return;
  }
  timesheetTable.parentElement.querySelector(".empty-state")?.remove();
  const days = daysInVisibleMonth();
  const weekdayHeaderCells = days
    .map((date) => `<th class="day-header weekday-header ${isWeekend(date) ? "weekend" : ""}">${weekdayLabel(date)}</th>`)
    .join("");
  const dayHeaderCells = days
    .map((date) => `<th class="day-header date-header ${isWeekend(date) ? "weekend" : ""}">${dayLabel(date)}</th>`)
    .join("");

  const rows = employeesToShow
    .map((employee) => {
      const nameLine = [employee.firstName, employee.middleName].filter(Boolean).join(" ");
      const dayCells = days
        .map((date) => {
          const entry = getAttendanceEntry(employee.id, date);
          const status = entry?.status;
          const statusClass = status ? `status-${status}` : "";
          const cellContent = attendanceCellContent(entry);
          return `
            <td class="day-cell ${isWeekend(date) ? "weekend" : ""}">
              <button class="mark-button ${statusClass}" type="button" data-employee-id="${employee.id}" data-date="${dateKey(date)}" title="Выбрать отметку">
                ${cellContent}
              </button>
            </td>
          `;
        })
        .join("");

      return `
        <tr>
          <td class="employee-name-cell">
            <button class="employee-name-button ${employee.id === state.selectedEmployeeId ? "is-selected" : ""}" type="button" data-profile-id="${employee.id}">
              <strong>${employee.lastName}</strong>
              <strong>${nameLine}</strong>
              <span>${employee.role}</span>
            </button>
          </td>
          ${dayCells}
        </tr>
      `;
    })
    .join("");

  timesheetTable.innerHTML = `
    <thead>
      <tr>
        <th class="name-header" rowspan="2">Фамилия<br />Имя</th>
        ${weekdayHeaderCells}
      </tr>
      <tr>
        ${dayHeaderCells}
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  `;

  timesheetTable.querySelectorAll("[data-profile-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedEmployeeId = button.dataset.profileId;
      state.drawerOpen = true;
      state.profileEditing = false;
      render();
    });
  });

  timesheetTable.querySelectorAll("[data-date]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const employeeId = button.dataset.employeeId;
      state.selectedEmployeeId = employeeId;
      openStatusMenu(button);
    });
  });
}

function renderEmployeesList() {
  const employeesToShow = filteredEmployees();
  if (employeesToShow.length === 0) {
    if (state.employeesLoading) {
      employeesList.innerHTML = employeesLoadingState();
      return;
    }
    const hasSearch = employeeSearch.value.trim().length > 0;
    employeesList.innerHTML = emptyEmployeesState(
      hasSearch ? "Поиск ничего не нашел" : "Сотрудники не найдены",
      hasSearch ? "Измените строку поиска, чтобы увидеть сотрудников." : "Добавьте первого сотрудника, чтобы карточки появились в общей базе.",
      !hasSearch
    );
    bindEmptyStateActions(employeesList);
    return;
  }

  const selectedEmployee = employeesToShow.find((employee) => employee.id === state.selectedEmployeeId) ?? employeesToShow[0];
  state.selectedEmployeeId = selectedEmployee.id;
  const usedTimeoff = timeoffUsed(selectedEmployee.id);
  const dutyEarnedTimeoff = dutyTimeoffEarned(selectedEmployee.id);
  const leftTimeoff = Math.max(0, timeoffBalance(selectedEmployee) - usedTimeoff);
  const stats = employeeMonthStats(selectedEmployee.id);
  const monthlyRows = employeeMonthlyBreakdown(selectedEmployee.id)
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.month)}</td>
          <td>${formatHours(row.workHours)}</td>
          <td>${row.dutyDays}</td>
        </tr>
      `
    )
    .join("");
  const photo = employeeAvatar(selectedEmployee);

  employeesList.innerHTML = `
    <div class="employee-directory">
      <div class="employee-directory-head">
        <strong>${employeesToShow.length} сотрудников</strong>
      </div>
      <div class="employee-directory-list">
        ${employeesToShow
          .map(
            (employee) => `
              <button class="employee-row ${employee.id === selectedEmployee.id ? "is-selected" : ""}" type="button" data-profile-id="${employee.id}">
                <span class="employee-row-avatar">${employeeAvatar(employee)}</span>
                <span class="employee-row-main">
                  <strong>${escapeHtml(fullName(employee))}</strong>
                  <small>${escapeHtml(employee.role)}</small>
                </span>
              </button>
            `
          )
          .join("")}
      </div>
    </div>

    <article class="employee-detail-page">
      <header class="employee-detail-hero">
        <div class="employee-photo">
          ${photo}
          <input id="employeePhotoInput" type="file" accept="image/*" hidden>
          <div class="photo-actions">
            <button type="button" class="photo-action-button" data-photo-upload aria-label="Добавить фото" title="Добавить фото">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h3l2-2h6l2 2h3v12H4z" />
                <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              </svg>
            </button>
            ${
              selectedEmployee.photo
                ? `<button type="button" class="photo-action-button danger" data-photo-clear aria-label="Удалить фото" title="Удалить фото">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 6l-12 12" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>`
                : ""
            }
          </div>
        </div>
        <div>
          <span class="kicker">Личная карточка</span>
          <h3>${escapeHtml(fullName(selectedEmployee))}</h3>
          <p>${escapeHtml(selectedEmployee.role)}</p>
        </div>
        <div class="employee-detail-actions">
          <button type="button" class="employee-edit-button" data-open-profile>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
            <span>Редактировать</span>
          </button>
          <div class="employee-export-actions" aria-label="Экспорт карточки">
            <button type="button" class="secondary-button compact" data-print-employee>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9V2h12v7" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><path d="M6 14h12v8H6z" /></svg>
              <span>Печать</span>
            </button>
            <button type="button" class="secondary-button compact" data-export-employee-excel>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z" /><path d="M4 10h16" /><path d="M10 4v16" /><path d="M14 14l3 3" /><path d="M17 14l-3 3" /></svg>
              <span>Excel</span>
            </button>
            <button type="button" class="secondary-button compact" data-export-employee-docx>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h9l5 5v15H6z" /><path d="M14 2v6h6" /><path d="M9 13h8" /><path d="M9 17h5" /></svg>
              <span>DOCX</span>
            </button>
          </div>
        </div>
      </header>

      <div class="employee-detail-grid">
        <section class="employee-info-panel">
          <h4>Данные сотрудника</h4>
          <dl class="employee-info-list">
            <div><dt>Телефон</dt><dd>${escapeHtml(selectedEmployee.phone)}</dd></div>
            <div><dt>Дата приема</dt><dd>${escapeHtml(selectedEmployee.start)}</dd></div>
            <div><dt>Разряд</dt><dd>${escapeHtml(formatGrade(selectedEmployee.grade))}</dd></div>
            <div><dt>Статус</dt><dd>${escapeHtml(selectedEmployee.status)}</dd></div>
            <div><dt>Примечание</dt><dd>${escapeHtml(selectedEmployee.note || "Не указано")}</dd></div>
          </dl>
        </section>

        <section class="employee-info-panel">
          <h4>Отгулы</h4>
          <div class="timeoff-overview">
            <div class="timeoff-main ${leftTimeoff <= 0 ? "is-empty" : ""}">
              <span>Доступно сейчас</span>
              <strong>${formatHours(hoursToDays(leftTimeoff))} дн.</strong>
              <small>${formatHours(leftTimeoff)} ч.</small>
            </div>
            <div class="timeoff-flow">
              <div>
                <span>Вручную</span>
                <strong>${formatHours(hoursToDays(baseTimeoffBalance(selectedEmployee)))} дн.</strong>
                <small>${formatHours(baseTimeoffBalance(selectedEmployee))} ч.</small>
              </div>
              <div>
                <span>За дежурства</span>
                <strong>${formatHours(hoursToDays(dutyEarnedTimeoff))} дн.</strong>
                <small>${formatHours(dutyEarnedTimeoff)} ч.</small>
              </div>
              <div>
                <span>Использовано</span>
                <strong>${formatHours(hoursToDays(usedTimeoff))} дн.</strong>
                <small>${formatHours(usedTimeoff)} ч.</small>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="employee-info-panel">
        <h4>Статистика за ${monthNames[state.visibleDate.getMonth()].toLowerCase()} ${state.visibleDate.getFullYear()}</h4>
        <div class="employee-stat-grid">
          <div><span>Рабочих дней</span><strong>${stats.workDays}</strong></div>
          <div><span>Часов</span><strong>${formatHours(stats.workHours)}</strong></div>
          <div><span>Дежурств</span><strong>${stats.dutyDays}</strong></div>
        </div>
      </section>

      <section class="employee-info-panel">
        <h4>Статистика по месяцам</h4>
        <div class="employee-month-scroller">
          <table class="employee-month-table">
            <thead>
              <tr>
                <th>Месяц</th>
                <th>Часы</th>
                <th>Дежурства</th>
              </tr>
            </thead>
            <tbody>${monthlyRows}</tbody>
          </table>
        </div>
      </section>
    </article>
  `;

  employeesList.querySelectorAll("[data-profile-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedEmployeeId = button.dataset.profileId;
      state.drawerOpen = false;
      state.profileEditing = false;
      render();
    });
  });

  employeesList.querySelector("[data-open-profile]")?.addEventListener("click", () => {
    state.drawerOpen = true;
    syncDrawer();
    openProfileEdit();
  });

  employeesList.querySelector("[data-print-employee]")?.addEventListener("click", printEmployeeReport);
  employeesList.querySelector("[data-export-employee-excel]")?.addEventListener("click", exportEmployeeExcel);
  employeesList.querySelector("[data-export-employee-docx]")?.addEventListener("click", exportEmployeeDocx);

  employeesList.querySelector("[data-photo-upload]")?.addEventListener("click", () => {
    employeesList.querySelector("#employeePhotoInput")?.click();
  });

  employeesList.querySelector("#employeePhotoInput")?.addEventListener("change", saveEmployeePhoto);

  employeesList.querySelector("[data-photo-clear]")?.addEventListener("click", () => {
    selectedEmployee.photo = "";
    saveEmployees();
    render();
  });
}

function employeeMonthStats(employeeId) {
  return daysInVisibleMonth().reduce(
    (stats, date) => {
      const entry = getAttendanceEntry(employeeId, date);
      if (!entry) return stats;
      if (entry.status === "present") {
        stats.workDays += 1;
        stats.workHours += entry.hours;
      }
      if (entry.status === "duty") {
        stats.dutyDays += 1;
        stats.workHours += entry.hours;
      }
      if (entry.status === "absence") stats.absenceDays += 1;
      if (entry.status === "vacation") stats.vacationDays += 1;
      if (entry.status === "timeoff") stats.timeoffHours += entry.hours;
      if (entry.status === "administrative") stats.administrativeDays += 1;
      if (entry.status === "sick") stats.sickDays += 1;
      return stats;
    },
    {
      workDays: 0,
      workHours: 0,
      dutyDays: 0,
      absenceDays: 0,
      vacationDays: 0,
      timeoffHours: 0,
      administrativeDays: 0,
      sickDays: 0,
    }
  );
}

function employeeMonthlyBreakdown(employeeId) {
  const rows = [];
  const year = state.visibleDate.getFullYear();
  for (let month = 0; month < 12; month += 1) {
    const stats = Object.entries(state.attendance[employeeId] ?? {}).reduce(
      (total, [key, value]) => {
        const entryDate = parseDateKey(key);
        if (!entryDate || entryDate.getFullYear() !== year || entryDate.getMonth() !== month) return total;
        const entry = normalizeAttendanceEntry(value, entryDate);
        if (!entry) return total;
        if (entry.status === "present" || entry.status === "duty") total.workHours += entry.hours;
        if (entry.status === "duty") total.dutyDays += 1;
        if (entry.status === "absence") total.absenceDays += 1;
        if (entry.status === "vacation") total.vacationDays += 1;
        if (entry.status === "timeoff") total.timeoffHours += entry.hours;
        return total;
      },
      { workHours: 0, dutyDays: 0, absenceDays: 0, vacationDays: 0, timeoffHours: 0 }
    );
    rows.push({
      month: `${monthNames[month]} ${year}`,
      ...stats,
    });
  }
  return rows;
}

function bindPhoneInput(selector) {
  const input = document.querySelector(selector);
  if (!input) return;
  input.addEventListener("focus", () => {
    if (!input.value.trim()) input.value = "+7 ";
  });
  input.addEventListener("input", () => {
    input.value = formatRussianPhone(input.value);
  });
  input.addEventListener("blur", () => {
    input.value = normalizedPhoneValue(selector) === "-" ? "" : normalizedPhoneValue(selector);
  });
}

function normalizedPhoneValue(selector) {
  const input = document.querySelector(selector);
  const value = formatRussianPhone(input?.value ?? "");
  return phoneDigits(value).length === 0 ? "-" : value;
}

function formatRussianPhone(value) {
  const digits = phoneDigits(value).slice(0, 10);
  if (!digits) return "";
  const parts = ["+7"];
  parts.push(` ${digits.slice(0, 3)}`);
  if (digits.length > 3) parts.push(` ${digits.slice(3, 6)}`);
  if (digits.length > 6) parts.push(`-${digits.slice(6, 8)}`);
  if (digits.length > 8) parts.push(`-${digits.slice(8, 10)}`);
  return parts.join("");
}

function phoneDigits(value) {
  let digits = String(value).replace(/\D/g, "");
  if (digits.startsWith("8")) digits = digits.slice(1);
  if (digits.startsWith("7")) digits = digits.slice(1);
  return digits;
}

function saveEmployeePhoto(event) {
  const [file] = event.target.files ?? [];
  const employee = selectedEmployee();
  if (!file || !employee) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    employee.photo = String(reader.result ?? "");
    saveEmployees();
    render();
  });
  reader.readAsDataURL(file);
}

function renderDutySchedule() {
  const allDays = dutyDaysInVisibleMonth();
  syncDutyFilterWithMonth(allDays);
  const days = dutyVisibleDays();
  const employeesToShow = employeesForDutyDays(days);
  renderDutyExtraDays();
  renderDutyFilterDays(allDays);
  if (employees.length === 0) {
    dutyTable.innerHTML = "";
    dutyTable.parentElement.querySelector(".empty-state")?.remove();
    if (state.employeesLoading) {
      dutyTable.insertAdjacentHTML("afterend", employeesLoadingState());
      return;
    }
    dutyTable.insertAdjacentHTML("afterend", emptyEmployeesState("В графике пока нет сотрудников"));
    bindEmptyStateActions(dutyTable.parentElement);
    return;
  }
  if (employeesToShow.length === 0) {
    dutyTable.innerHTML = "";
    dutyTable.parentElement.querySelector(".empty-state")?.remove();
    dutyTable.insertAdjacentHTML(
      "afterend",
      emptyEmployeesState("Дежурные не найдены", "Измените поиск или фильтр дней, чтобы увидеть сотрудников.", false)
    );
    return;
  }
  dutyTable.parentElement.querySelector(".empty-state")?.remove();
  const weekdayHeaderCells = days
    .map((date) => `<th class="day-header weekday-header weekend ${isDutyExtraDate(date) ? "extra-duty-day" : ""}">${weekdayLabel(date)}</th>`)
    .join("");
  const dayHeaderCells = days
    .map((date) => `<th class="day-header date-header weekend ${isDutyExtraDate(date) ? "extra-duty-day" : ""}">${dayLabel(date)}</th>`)
    .join("");

  const rows = employeesToShow
    .map((employee) => {
      const nameLine = [employee.firstName, employee.middleName].filter(Boolean).join(" ");
      const dayCells = days
        .map((date) => {
          const entry = getAttendanceEntry(employee.id, date);
          const isDuty = entry?.status === "duty";
          const statusClass = isDuty ? "status-duty" : "";
          const cellContent = isDuty ? dutyCellContent(entry) : "";
          return `
            <td class="day-cell weekend ${isDutyExtraDate(date) ? "extra-duty-day" : ""}">
              <button class="mark-button ${statusClass}" type="button" data-employee-id="${employee.id}" data-duty-date="${dateKey(date)}" title="Поставить часы дежурства">
                ${cellContent}
              </button>
            </td>
          `;
        })
        .join("");

      return `
        <tr>
          <td class="employee-name-cell">
            <button class="employee-name-button ${employee.id === state.selectedEmployeeId ? "is-selected" : ""}" type="button" data-profile-id="${employee.id}">
              <strong>${employee.lastName}</strong>
              <strong>${nameLine}</strong>
              <span>${employee.role}</span>
            </button>
          </td>
          ${dayCells}
        </tr>
      `;
    })
    .join("");

  dutyTable.innerHTML = `
    <thead>
      <tr>
        <th class="name-header" rowspan="2">Фамилия<br />Имя</th>
        ${weekdayHeaderCells}
      </tr>
      <tr>
        ${dayHeaderCells}
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  `;

  dutyTable.querySelectorAll("[data-profile-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedEmployeeId = button.dataset.profileId;
      state.drawerOpen = true;
      state.profileEditing = false;
      render();
    });
  });

  dutyTable.querySelectorAll("[data-duty-date]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      state.selectedEmployeeId = button.dataset.employeeId;
      openDutyMenu(button);
    });
  });
}

function openStatusMenu(button) {
  closeStatusMenu();
  closeDutyMenu();
  const entry = getAttendanceEntry(button.dataset.employeeId, parseDateKey(button.dataset.date));
  const date = parseDateKey(button.dataset.date);
  const dutyButton = statusMenu.querySelector('[data-status="duty"]');
  state.activeCell = {
    employeeId: button.dataset.employeeId,
    date: button.dataset.date,
  };
  button.classList.add("is-menu-open");
  statusHours.value = entry ? entry.hours : 8;
  dutyButton.disabled = !isDutyAvailableDate(date);
  dutyButton.title = isDutyAvailableDate(date) ? "" : `${statusName("duty")} доступно только в выходные и дополнительные дни`;

  const rect = button.getBoundingClientRect();
  statusMenu.hidden = false;
  const menuWidth = statusMenu.offsetWidth;
  const menuHeight = statusMenu.offsetHeight;
  const left = Math.min(rect.left, window.innerWidth - menuWidth - 8);
  const top = rect.bottom + menuHeight + 8 > window.innerHeight ? rect.top - menuHeight - 6 : rect.bottom + 6;
  statusMenu.style.left = `${Math.max(8, left)}px`;
  statusMenu.style.top = `${Math.max(8, top)}px`;
}

function openDutyMenu(button) {
  closeStatusMenu();
  closeDutyMenu();
  const date = parseDateKey(button.dataset.dutyDate);
  const entry = getAttendanceEntry(button.dataset.employeeId, date);
  state.activeCell = {
    employeeId: button.dataset.employeeId,
    date: button.dataset.dutyDate,
  };
  button.classList.add("is-menu-open");
  dutyHours.value = entry?.status === "duty" ? entry.hours : 8;

  const rect = button.getBoundingClientRect();
  dutyMenu.hidden = false;
  const menuWidth = dutyMenu.offsetWidth;
  const menuHeight = dutyMenu.offsetHeight;
  const left = Math.min(rect.left, window.innerWidth - menuWidth - 8);
  const top = rect.bottom + menuHeight + 8 > window.innerHeight ? rect.top - menuHeight - 6 : rect.bottom + 6;
  dutyMenu.style.left = `${Math.max(8, left)}px`;
  dutyMenu.style.top = `${Math.max(8, top)}px`;
}

function applyStatusFromMenu(event) {
  const button = event.target.closest("[data-status]");
  if (!button || !state.activeCell) return;
  const date = parseDateKey(state.activeCell.date);
  const status = button.dataset.status;
  if (status) {
    if (status === "duty" && !isDutyAvailableDate(date)) {
      alert(`${statusName("duty")} можно ставить только в выходные и дополнительные дни.`);
      return;
    }
    const hours = readStatusHours(status);
    if (status === "timeoff" && !canSpendTimeoff(state.activeCell.employeeId, date, hours)) return;
    setAttendance(state.activeCell.employeeId, date, status, hours);
  } else {
    clearAttendance(state.activeCell.employeeId, date);
  }
  closeStatusMenu();
  render();
}

function applyDutyHours() {
  if (!state.activeCell) return;
  setAttendance(state.activeCell.employeeId, parseDateKey(state.activeCell.date), "duty", readDutyHours());
  closeDutyMenu();
  render();
}

function clearDutyHours() {
  if (!state.activeCell) return;
  clearAttendance(state.activeCell.employeeId, parseDateKey(state.activeCell.date));
  closeDutyMenu();
  render();
}

function applyWorkStatus() {
  if (!state.activeCell) return;
  const date = parseDateKey(state.activeCell.date);
  setAttendance(state.activeCell.employeeId, date, "present", readStatusHours("present"));
  closeStatusMenu();
  render();
}

function closeStatusMenu() {
  document.querySelectorAll(".is-menu-open").forEach((button) => button.classList.remove("is-menu-open"));
  statusMenu.hidden = true;
  state.activeCell = null;
}

function closeDutyMenu() {
  document.querySelectorAll(".is-menu-open").forEach((button) => button.classList.remove("is-menu-open"));
  dutyMenu.hidden = true;
  state.activeCell = null;
}

function attendanceCellContent(entry) {
  if (!entry?.status) return "";
  const hours = entry.hours > 0 ? formatHours(entry.hours) : "";
  if (entry.status === "present") return hours ? `<span>${hours}</span>` : "";
  if (entry.status === "timeoff" && entry.hours === defaultHours("timeoff")) {
    return `<span>${escapeHtml(statusCode(entry.status))}</span>`;
  }
  const hoursText = hours ? `<small>${hours}</small>` : "";
  return `<span>${escapeHtml(statusCode(entry.status))}</span>${hoursText}`;
}

function dutyCellContent(entry) {
  return entry?.hours > 0 ? `<span>${formatHours(entry.hours)}</span>` : "";
}

function buildExportPayload() {
  const days = daysInVisibleMonth();
  return buildSchedulePayload(`ГНГС табель учета за ${pageTitle.textContent}`, pageTitle.textContent, days, false);
}

function buildDutyExportPayload() {
  const days = dutyVisibleDays();
  return buildSchedulePayload(`ГНГС график дежурств за ${pageTitle.textContent}`, `Дежурства - ${pageTitle.textContent}`, days, true);
}

function buildSchedulePayload(title, monthLabel, days, dutyOnly) {
  return {
    title,
    monthLabel,
    legend: dutyOnly ? [{ code: statusCode("duty"), name: `${statusName("duty")} (${formatHours(4)} ч. отгула за каждое)` }] : exportLegend(),
    days: days.map((date) => ({
      day: dayLabel(date),
      weekday: weekdayLabel(date),
      isWeekend: isWeekend(date) || isDutyExtraDate(date),
    })),
    rows: (dutyOnly ? employeesForDutyDays(days) : filteredEmployees()).map((employee) => ({
      name: fullName(employee),
      role: employee.role,
      cells: days.map((date) => {
        const entry = getAttendanceEntry(employee.id, date);
        return dutyOnly ? dutyExportValue(entry) : attendanceExportValue(entry);
      }),
    })),
  };
}

function exportLegend() {
  return STATUS_ORDER.map((status) => ({ code: statusCode(status), name: statusName(status) }));
}

function attendanceExportValue(entry) {
  if (!entry?.status) return "";
  const hours = entry.hours > 0 ? formatHours(entry.hours) : "";
  if (entry.status === "present") return hours;
  if (entry.status === "timeoff" && entry.hours === defaultHours("timeoff")) return statusCode("timeoff");
  return hours ? `${statusCode(entry.status)} ${hours}` : statusCode(entry.status);
}

function dutyExportValue(entry) {
  if (entry?.status !== "duty") return "";
  return entry.hours > 0 ? formatHours(entry.hours) : statusCode("duty");
}

function printTimesheet() {
  const printWindow = window.open("", "_blank", "width=1200,height=800");
  if (!printWindow) {
    alert("Не удалось открыть окно печати.");
    return;
  }
  printWindow.document.write(buildPrintHtml(buildExportPayload()));
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 250);
}

async function exportExcel() {
  if (!window.gngsApi?.saveXlsx) {
    alert("Экспорт Excel недоступен в этом режиме запуска.");
    return;
  }
  const result = await window.gngsApi.saveXlsx(buildExportPayload());
  if (result?.filePath) alert(`Excel сохранен:\n${result.filePath}`);
}

async function exportDocx() {
  if (!window.gngsApi?.saveDocx) {
    alert("Экспорт DOCX недоступен в этом режиме запуска.");
    return;
  }
  const result = await window.gngsApi.saveDocx(buildExportPayload());
  if (result?.filePath) alert(`DOCX сохранен:\n${result.filePath}`);
}

function printDutySchedule() {
  const printWindow = window.open("", "_blank", "width=1200,height=800");
  if (!printWindow) {
    alert("Не удалось открыть окно печати.");
    return;
  }
  printWindow.document.write(buildPrintHtml(buildDutyExportPayload()));
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 250);
}

async function exportDutyExcel() {
  if (!window.gngsApi?.saveXlsx) {
    alert("Экспорт Excel недоступен в этом режиме запуска.");
    return;
  }
  const result = await window.gngsApi.saveXlsx(buildDutyExportPayload());
  if (result?.filePath) alert(`Excel сохранен:\n${result.filePath}`);
}

async function exportDutyDocx() {
  if (!window.gngsApi?.saveDocx) {
    alert("Экспорт DOCX недоступен в этом режиме запуска.");
    return;
  }
  const result = await window.gngsApi.saveDocx(buildDutyExportPayload());
  if (result?.filePath) alert(`DOCX сохранен:\n${result.filePath}`);
}

function printEmployeeReport() {
  const printWindow = window.open("", "_blank", "width=900,height=800");
  if (!printWindow) {
    alert("Не удалось открыть окно печати.");
    return;
  }
  printWindow.document.write(buildEmployeePrintHtml(buildEmployeeReportPayload()));
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 250);
}

async function exportEmployeeExcel() {
  if (!window.gngsApi?.saveXlsx) {
    alert("Экспорт Excel недоступен в этом режиме запуска.");
    return;
  }
  const result = await window.gngsApi.saveXlsx(buildEmployeeReportPayload());
  if (result?.filePath) alert(`Excel сохранен:\n${result.filePath}`);
}

async function exportEmployeeDocx() {
  if (!window.gngsApi?.saveDocx) {
    alert("Экспорт DOCX недоступен в этом режиме запуска.");
    return;
  }
  const result = await window.gngsApi.saveDocx(buildEmployeeReportPayload());
  if (result?.filePath) alert(`DOCX сохранен:\n${result.filePath}`);
}

function buildEmployeeReportPayload() {
  const employee = selectedEmployee();
  const usedTimeoff = timeoffUsed(employee.id);
  const dutyEarned = dutyTimeoffEarned(employee.id);
  const leftTimeoff = Math.max(0, timeoffBalance(employee) - usedTimeoff);
  const stats = employeeMonthStats(employee.id);
  const monthRows = employeeMonthlyBreakdown(employee.id).map((row) => [
    row.month,
    `${formatHours(row.workHours)} ч.`,
    `${row.dutyDays}`,
  ]);

  return {
    type: "employee",
    title: `Личная карточка сотрудника - ${fullName(employee)}`,
    monthLabel: `${fullName(employee)} - ${pageTitle.textContent}`,
    sections: [
      {
        title: "Данные сотрудника",
        rows: [
          ["ФИО", fullName(employee)],
          ["Должность", employee.role],
          ["Разряд", formatGrade(employee.grade)],
          ["Телефон", employee.phone],
          ["Дата приема", employee.start],
        ],
      },
      {
        title: "Отгулы",
        rows: [
          ["Начислено вручную", `${formatHours(hoursToDays(baseTimeoffBalance(employee)))} дн. / ${formatHours(baseTimeoffBalance(employee))} ч.`],
          ["Начислено за дежурства", `${formatHours(hoursToDays(dutyEarned))} дн. / ${formatHours(dutyEarned)} ч.`],
          ["Использовано", `${formatHours(hoursToDays(usedTimeoff))} дн. / ${formatHours(usedTimeoff)} ч.`],
          ["Доступно сейчас", `${formatHours(hoursToDays(leftTimeoff))} дн. / ${formatHours(leftTimeoff)} ч.`],
        ],
      },
      {
        title: `Статистика за ${pageTitle.textContent}`,
        rows: [
          ["Рабочих дней", `${stats.workDays}`],
          ["Часов", `${formatHours(stats.workHours)}`],
          ["Дежурств", `${stats.dutyDays}`],
        ],
      },
      {
        title: "Статистика по месяцам",
        headers: ["Месяц", "Часы", "Дежурства"],
        rows: monthRows,
      },
    ],
  };
}

function buildPrintHtml(payload) {
  const weekdayCells = payload.days
    .map((day) => `<th class="${day.isWeekend ? "weekend" : ""}">${escapeHtml(day.weekday)}</th>`)
    .join("");
  const dayCells = payload.days
    .map((day) => `<th class="${day.isWeekend ? "weekend" : ""}">${escapeHtml(day.day)}</th>`)
    .join("");
  const rows = payload.rows
    .map(
      (row) => `<tr><td class="name">${escapeHtml(row.name)}<br><small>${escapeHtml(row.role)}</small></td>${row.cells
        .map((cell) => `<td>${escapeHtml(cell)}</td>`)
        .join("")}</tr>`,
    )
    .join("");
  const legend = payload.legend.map((item) => `<span>${escapeHtml(item.code)} - ${escapeHtml(item.name)}</span>`).join("");

  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(payload.title)}</title>
  <style>
    @page { size: A4 landscape; margin: 10mm; }
    body { font-family: "Times New Roman", serif; color: #111; }
    h1 { font-family: Arial, sans-serif; font-size: 18px; margin: 0 0 10px; }
    table { border-collapse: collapse; width: 100%; table-layout: fixed; }
    th, td { border: 1px solid #555; text-align: center; padding: 3px; font-size: 10px; }
    th { background: #f1f5f9; font-weight: 700; }
    .weekend { background: #fff1f2; color: #b91c1c; }
    .name { width: 120px; text-align: left; font-weight: 700; }
    small { color: #475569; font-weight: 400; }
    .legend { display: flex; gap: 10px; flex-wrap: wrap; margin: 12px 0; font-family: Arial, sans-serif; font-size: 11px; }
  </style>
</head>
<body>
  <h1>${escapeHtml(payload.title)}</h1>
  <div class="legend">${legend}</div>
  <table>
    <thead>
      <tr><th class="name" rowspan="2">Фамилия<br>Имя</th>${weekdayCells}</tr>
      <tr>${dayCells}</tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}

function buildEmployeePrintHtml(payload) {
  const sections = payload.sections
    .map((section) => {
      const header = section.headers ? `<tr>${section.headers.map((item) => `<th>${escapeHtml(item)}</th>`).join("")}</tr>` : "";
      const rows = section.rows
        .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
        .join("");
      return `<section><h2>${escapeHtml(section.title)}</h2><table>${header}${rows}</table></section>`;
    })
    .join("");

  return `<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(payload.title)}</title>
  <style>
    @page { size: A4 portrait; margin: 14mm; }
    body { font-family: Arial, sans-serif; color: #111; }
    h1 { font-size: 20px; margin: 0 0 16px; }
    h2 { font-size: 14px; margin: 16px 0 8px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #94a3b8; text-align: left; padding: 7px 8px; font-size: 12px; }
    th { background: #f1f5f9; }
    section { break-inside: avoid; }
  </style>
</head>
<body>
  <h1>${escapeHtml(payload.title)}</h1>
  ${sections}
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProfile() {
  const employee = selectedEmployee();
  if (!employee) {
    document.querySelector("#profileAvatar").textContent = "";
    document.querySelector("#profileName").textContent = "Сотрудник не выбран";
    document.querySelector("#profileRole").textContent = "";
    document.querySelector("#profilePhone").textContent = "-";
    document.querySelector("#profileStart").textContent = "-";
    document.querySelector("#profileGrade").textContent = "-";
    profileTimeoffBalanceInput.value = "0";
    document.querySelector("#profileTimeoffBalanceHours").textContent = "0 ч.";
    employeeNote.value = "";
    profileDetails.hidden = state.profileEditing;
    profileEditForm.hidden = !state.profileEditing;
    document.querySelector("#editEmployee").hidden = true;
    return;
  }
  document.querySelector("#profileAvatar").innerHTML = employeeAvatar(employee);
  document.querySelector("#profileName").textContent = fullName(employee);
  document.querySelector("#profileRole").textContent = employee.role;
  document.querySelector("#profilePhone").textContent = employee.phone;
  document.querySelector("#profileStart").textContent = employee.start;
  document.querySelector("#profileGrade").textContent = formatGrade(employee.grade);
  if (document.activeElement !== profileTimeoffBalanceInput) {
    profileTimeoffBalanceInput.value = formatHours(hoursToDays(baseTimeoffBalance(employee)));
  }
  document.querySelector("#profileTimeoffBalanceHours").textContent = `${formatHours(baseTimeoffBalance(employee))} ч.`;
  employeeNote.value = employee.note;
  profileDetails.hidden = state.profileEditing;
  profileEditForm.hidden = !state.profileEditing;
  document.querySelector("#editEmployee").hidden = state.profileEditing;
}

function renderEmployeeTotals() {
  if (!selectedEmployee()) {
    document.querySelector("#workedDays").textContent = "0 дн.";
    document.querySelector("#workedHours").textContent = "0 ч.";
    document.querySelector("#timeoffLeftDays").textContent = "0 дн.";
    document.querySelector("#timeoffLeftHours").textContent = "0 ч.";
    return;
  }
  const employeeEntries = monthAttendance(state.selectedEmployeeId);
  const workedDays = employeeEntries.filter((entry) => entry.status === "present" || entry.status === "duty").length;
  const workedHours = employeeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const employee = selectedEmployee();
  const accruedTimeoff = timeoffBalance(employee);
  document.querySelector("#workedDays").textContent = `${workedDays} дн.`;
  document.querySelector("#workedHours").textContent = `${formatHours(workedHours)} ч.`;
  document.querySelector("#timeoffLeftDays").textContent = `${formatHours(hoursToDays(accruedTimeoff))} дн.`;
  document.querySelector("#timeoffLeftHours").textContent = `${formatHours(accruedTimeoff)} ч.`;
}

function updateProfileTimeoffBalance() {
  const employee = selectedEmployee();
  if (!employee) return;
  employee.timeoffBalance = daysToHours(parseHours(profileTimeoffBalanceInput.value));
  document.querySelector("#profileTimeoffBalanceHours").textContent = `${formatHours(employee.timeoffBalance)} ч.`;
  saveEmployees();
  renderEmployeeTotals();
}

function syncDrawer() {
  drawer.classList.toggle("is-open", state.drawerOpen);
  drawer.setAttribute("aria-hidden", String(!state.drawerOpen));
  drawerOverlay.hidden = !state.drawerOpen;
}

function closeDrawer() {
  state.drawerOpen = false;
  state.profileEditing = false;
  syncDrawer();
  renderProfile();
}

function openProfileEdit() {
  const employee = selectedEmployee();
  if (!employee) return;
  state.profileEditing = true;
  document.querySelector("#editEmployeeLastName").value = employee.lastName;
  document.querySelector("#editEmployeeFirstName").value = employee.firstName;
  document.querySelector("#editEmployeeMiddleName").value = employee.middleName ?? "";
  document.querySelector("#editEmployeeRole").value = employee.role;
  document.querySelector("#editEmployeeGrade").value = gradeInputValue(employee.grade);
  document.querySelector("#editEmployeePhone").value = employee.phone === "-" ? "" : employee.phone;
  document.querySelector("#editEmployeeTimeoffBalance").value = hoursToDays(baseTimeoffBalance(employee));
  renderProfile();
  document.querySelector("#editEmployeeLastName").focus();
}

function closeProfileEdit() {
  state.profileEditing = false;
  renderProfile();
}

async function saveProfileEdit(event) {
  event.preventDefault();
  const employee = selectedEmployee();
  if (!employee) return;

  const lastName = document.querySelector("#editEmployeeLastName").value.trim();
  const firstName = document.querySelector("#editEmployeeFirstName").value.trim();
  if (!lastName || !firstName) return;

  const previousEmployee = { ...employee };
  const submitButton = profileEditForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  employee.lastName = lastName;
  employee.firstName = firstName;
  employee.middleName = document.querySelector("#editEmployeeMiddleName").value.trim();
  employee.role = document.querySelector("#editEmployeeRole").value;
  employee.grade = normalizeGradeInput(document.querySelector("#editEmployeeGrade").value);
  employee.phone = normalizedPhoneValue("#editEmployeePhone");
  employee.timeoffBalance = daysToHours(readNumberInput("#editEmployeeTimeoffBalance"));

  try {
    await saveEmployeeRecordToSupabase(employee);
    state.profileEditing = false;
    saveEmployees({ remote: false });
    render();
  } catch (error) {
    Object.assign(employee, previousEmployee);
    alert(supabaseUserMessage(error));
    renderProfile();
  } finally {
    submitButton.disabled = false;
  }
}

function deleteSelectedEmployee() {
  const employee = selectedEmployee();
  if (!employee) return;
  if (employees.length <= 1) {
    state.selectedEmployeeId = "";
  }

  const confirmed = confirm(`Удалить сотрудника "${fullName(employee)}" и все его отметки в табеле?`);
  if (!confirmed) return;

  employees = employees.filter((item) => item.id !== employee.id);
  delete state.attendance[employee.id];
  state.selectedEmployeeId = employees[0]?.id ?? "";
  state.drawerOpen = false;
  state.profileEditing = false;
  saveEmployees();
  deleteEmployeeFromSupabase(employee.id).catch((error) => console.warn("Supabase employee delete skipped:", error.message));
  saveAttendance();
  render();
}

function openEmployeeModal() {
  employeeModal.hidden = false;
  employeeModalOverlay.hidden = false;
  document.querySelector("#newEmployeeLastName").focus();
}

function closeEmployeeModal() {
  employeeForm.reset();
  employeeModal.hidden = true;
  employeeModalOverlay.hidden = true;
}

function filteredEmployees() {
  const search = employeeSearch.value.trim().toLowerCase();
  return employees.filter((employee) => {
    return `${fullName(employee)} ${employee.role}`.toLowerCase().includes(search);
  });
}

function daysInVisibleMonth() {
  const year = state.visibleDate.getFullYear();
  const month = state.visibleDate.getMonth();
  const count = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: count }, (_, index) => new Date(year, month, index + 1));
}

function monthAttendance(employeeId) {
  const year = state.visibleDate.getFullYear();
  const month = state.visibleDate.getMonth();
  return Object.entries(state.attendance[employeeId] ?? {})
    .filter(([key]) => {
      const [keyYear, keyMonth] = key.split("-").map(Number);
      return keyYear === year && keyMonth === month + 1;
    })
    .map(([key, entry]) => normalizeAttendanceEntry(entry, parseDateKey(key)));
}

function selectedEmployee() {
  return employees.find((employee) => employee.id === state.selectedEmployeeId) ?? employees[0] ?? null;
}

function setAttendance(employeeId, date, status, hours = defaultHours(status)) {
  state.attendance[employeeId] = state.attendance[employeeId] ?? {};
  state.attendance[employeeId][dateKey(date)] = {
    status,
    hours,
  };
  saveAttendance();
}

function clearAttendance(employeeId, date) {
  if (!state.attendance[employeeId]) return;
  delete state.attendance[employeeId][dateKey(date)];
  saveAttendance();
}

function getAttendance(employeeId, date) {
  return state.attendance[employeeId]?.[dateKey(date)];
}

function getAttendanceEntry(employeeId, date) {
  return normalizeAttendanceEntry(getAttendance(employeeId, date), date);
}

function normalizeAttendanceEntry(entry, date = null) {
  if (!entry) return null;
  if (typeof entry === "string") {
    const status = normalizeStatus(entry, date);
    return {
      status,
      hours: defaultHours(status),
    };
  }
  const status = normalizeStatus(entry.status, date);
  return {
    status,
    hours: Number.isFinite(Number(entry.hours)) ? Number(entry.hours) : defaultHours(status),
  };
}

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(key) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(key))) return null;
  const [year, month, day] = key.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

function dayLabel(date) {
  return String(date.getDate()).padStart(2, "0");
}

function weekdayLabel(date) {
  return ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][date.getDay()];
}

function isWeekend(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function isDutyExtraDate(date) {
  return (state.settings.dutyExtraDates ?? []).includes(dateKey(date));
}

function isDutyAvailableDate(date) {
  return isWeekend(date) || isDutyExtraDate(date);
}

function dutyDaysInVisibleMonth() {
  return daysInVisibleMonth().filter(isDutyAvailableDate);
}

function dutyVisibleDays() {
  const selected = new Set(state.dutyFilterDates);
  const days = dutyDaysInVisibleMonth();
  if (selected.size === 0) return days;
  return days.filter((date) => selected.has(dateKey(date)));
}

function employeesForDutyDays(days) {
  const employeesToShow = filteredEmployees();
  if (state.dutyFilterDates.length === 0) return employeesToShow;
  return employeesToShow.filter((employee) => {
    return days.some((date) => getAttendanceEntry(employee.id, date)?.status === "duty");
  });
}

function syncDutyFilterWithMonth(days) {
  const availableKeys = new Set(days.map(dateKey));
  state.dutyFilterDates = state.dutyFilterDates.filter((key) => availableKeys.has(key));
}

function toggleDutyFilterDate(key) {
  const selected = new Set(state.dutyFilterDates);
  if (selected.has(key)) selected.delete(key);
  else selected.add(key);
  state.dutyFilterDates = [...selected].sort();
  render();
}

function clearDutyFilter() {
  state.dutyFilterDates = [];
  closeDutyFilterPopover();
  render();
}

function renderDutyFilterDays(days) {
  const container = document.querySelector("#dutyFilterDays");
  if (!container) return;
  const selected = new Set(state.dutyFilterDates);
  const trigger = document.querySelector("#openDutyFilter");
  trigger.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16" /><path d="M7 12h10" /><path d="M10 18h4" /></svg><span>${selected.size > 0 ? `Дни: ${selected.size}` : "Дни"}</span>`;
  trigger.classList.toggle("is-active", selected.size > 0);
  container.innerHTML = days
    .map((date) => {
      const key = dateKey(date);
      return `<button type="button" class="duty-filter-chip ${selected.has(key) ? "is-active" : ""}" data-duty-filter-date="${key}">${weekdayLabel(date)} ${dayLabel(date)}</button>`;
    })
    .join("");
  container.querySelectorAll("[data-duty-filter-date]").forEach((button) => {
    button.addEventListener("click", () => toggleDutyFilterDate(button.dataset.dutyFilterDate));
  });
}

function toggleDutyFilterPopover() {
  if (!dutyFilterPopover.hidden) {
    closeDutyFilterPopover();
    return;
  }
  const trigger = document.querySelector("#openDutyFilter");
  const rect = trigger.getBoundingClientRect();
  dutyFilterPopover.hidden = false;
  const left = Math.min(rect.left, window.innerWidth - dutyFilterPopover.offsetWidth - 8);
  dutyFilterPopover.style.left = `${Math.max(8, left)}px`;
  dutyFilterPopover.style.top = `${rect.bottom + 6}px`;
}

function closeDutyFilterPopover() {
  dutyFilterPopover.hidden = true;
}

function addDutyExtraDate() {
  const input = document.querySelector("#dutyExtraDate");
  const date = parseDateKey(input.value);
  if (!input.value || !date) {
    alert("Выберите дату для дополнительного дежурства.");
    return;
  }
  const key = dateKey(date);
  const dates = new Set(state.settings.dutyExtraDates ?? []);
  dates.add(key);
  state.settings.dutyExtraDates = [...dates].sort();
  state.visibleDate = new Date(date.getFullYear(), date.getMonth(), 1);
  input.value = "";
  saveSettings();
  render();
}

function removeDutyExtraDate(key) {
  state.settings.dutyExtraDates = (state.settings.dutyExtraDates ?? []).filter((item) => item !== key);
  saveSettings();
  render();
}

function renderDutyExtraDays() {
  const container = document.querySelector("#dutyExtraDays");
  if (!container) return;
  const currentMonthKeys = (state.settings.dutyExtraDates ?? []).filter((key) => {
    const date = parseDateKey(key);
    return date && date.getFullYear() === state.visibleDate.getFullYear() && date.getMonth() === state.visibleDate.getMonth();
  });
  container.innerHTML = currentMonthKeys
    .map((key) => `<button type="button" class="duty-extra-chip" data-remove-duty-extra="${key}">${dayLabel(parseDateKey(key))}<span>×</span></button>`)
    .join("");
  container.querySelectorAll("[data-remove-duty-extra]").forEach((button) => {
    button.addEventListener("click", () => removeDutyExtraDate(button.dataset.removeDutyExtra));
  });
}

function defaultHours(status) {
  if (status === "present" || status === "duty") return 8;
  if (status === "timeoff") return 8;
  return 0;
}

function normalizeStatus(status, date = null) {
  if (status === "remote") return date && isWeekend(date) ? "duty" : "present";
  if (status === "duty" && date && !isDutyAvailableDate(date)) return "present";
  return status;
}

function readStatusHours(status) {
  if (status === "absence" || status === "vacation" || status === "administrative" || status === "sick") return 0;
  const value = Number(String(statusHours.value).replace(",", "."));
  if (!Number.isFinite(value)) return defaultHours(status);
  return Math.round(Math.min(24, Math.max(0, value)) * 100) / 100;
}

function readDutyHours() {
  const value = Number(String(dutyHours.value).replace(",", "."));
  if (!Number.isFinite(value)) return defaultHours("duty");
  return Math.round(Math.min(24, Math.max(0, value)) * 100) / 100;
}

function canSpendTimeoff(employeeId, date, nextHours) {
  const employee = employees.find((item) => item.id === employeeId);
  const currentEntry = getAttendanceEntry(employeeId, date);
  const currentHours = currentEntry?.status === "timeoff" ? currentEntry.hours : 0;
  const usedWithoutCurrent = timeoffUsed(employeeId) - currentHours;
  const left = timeoffBalance(employee) - usedWithoutCurrent;
  if (nextHours <= left) return true;
  alert(`Недостаточно часов "${statusName("timeoff")}". Остаток: ${formatHours(Math.max(0, left))} ч.`);
  return false;
}

function timeoffUsed(employeeId) {
  return Object.entries(state.attendance[employeeId] ?? {})
    .map(([key, entry]) => normalizeAttendanceEntry(entry, parseDateKey(key)))
    .filter((entry) => entry?.status === "timeoff")
    .reduce((sum, entry) => sum + entry.hours, 0);
}

function baseTimeoffBalance(employee) {
  return Number.isFinite(Number(employee?.timeoffBalance)) ? Number(employee.timeoffBalance) : 0;
}

function dutyTimeoffEarned(employeeId) {
  return Object.entries(state.attendance[employeeId] ?? {})
    .map(([key, entry]) => normalizeAttendanceEntry(entry, parseDateKey(key)))
    .filter((entry) => entry?.status === "duty")
    .length * 4;
}

function timeoffBalance(employee) {
  if (!employee) return 0;
  return baseTimeoffBalance(employee) + dutyTimeoffEarned(employee.id);
}

function readNumberInput(selector) {
  return parseHours(document.querySelector(selector).value);
}

function parseHours(value) {
  const parsed = Number(String(value).replace(",", "."));
  return Number.isFinite(parsed) ? Math.round(Math.max(0, parsed) * 100) / 100 : 0;
}

function hoursToDays(hours) {
  return Math.round((Number(hours) / 8) * 100) / 100;
}

function daysToHours(days) {
  return Math.round(Number(days) * 8 * 100) / 100;
}

function formatHours(hours) {
  return Number.isInteger(hours) ? String(hours) : String(hours).replace(".", ",");
}

function employeeAvatar(employee) {
  if (employee?.photo) {
    return `<img src="${escapeHtml(employee.photo)}" alt="${escapeHtml(fullName(employee))}">`;
  }
  return `<img class="default-avatar" src="${DEFAULT_EMPLOYEE_PHOTO}" alt="${escapeHtml(fullName(employee))}">`;
}

function fullName(employee) {
  if (!employee) return "";
  return [employee.lastName, employee.firstName, employee.middleName].filter(Boolean).join(" ");
}

function normalizeEmployee(employee) {
  if (employee.lastName && employee.firstName) {
    const middleName = employee.middleName || knownMiddleName(employee.lastName, employee.firstName);
    const { number, ...employeeData } = employee;
    return {
      ...employeeData,
      role: normalizePosition(employee.role),
      grade: normalizeGradeInput(employee.grade),
      middleName,
      timeoffBalance: baseTimeoffBalance(employee),
      photo: typeof employee.photo === "string" ? employee.photo : "",
    };
  }

  const parts = String(employee.name ?? "").trim().split(/\s+/).filter(Boolean);
  const lastName = parts[0] ?? "Сотрудник";
  const firstName = parts[1] ?? "";
  const middleName = parts.slice(2).join(" ") || knownMiddleName(lastName, firstName);
  const { number, ...employeeData } = employee;
  return {
    ...employeeData,
    lastName,
    firstName,
    middleName,
    role: normalizePosition(employee.role),
    grade: normalizeGradeInput(employee.grade),
    timeoffBalance: baseTimeoffBalance(employee),
    photo: typeof employee.photo === "string" ? employee.photo : "",
  };
}

function defaultGrade(role) {
  const normalized = normalizePosition(role);
  if (normalized === "Начальник участка" || normalized === "Начальник цеха" || normalized === "Мастер") return "";
  const grades = {
    "электромонтер": "4",
    "сварщик": "5",
    "токарь": "4",
    "фрезеровщик": "4",
    "обмотчик": "3",
    "трансформаторщик": "4",
    "пропитчик": "3",
  };
  return grades[normalized] ?? "4";
}

function normalizeGradeInput(value) {
  const normalized = String(value ?? "").trim().replace(",", ".");
  const match = normalized.match(/\d+(?:\.\d+)?/);
  return match ? match[0] : "";
}

function gradeInputValue(value) {
  return normalizeGradeInput(value);
}

function formatGrade(value) {
  const grade = normalizeGradeInput(value);
  return grade ? `${grade} разряд` : "";
}

function normalizePosition(role) {
  const positions = positionsForNormalize();
  if (positions.includes(role)) return role;
  const normalized = String(role ?? "").trim().toLowerCase();
  const aliases = {
    "мастер участка": "Мастер",
    "мастер": "Мастер",
    "инженер пто": "Начальник участка",
    "электромонтер": "электромонтер",
    "бухгалтер": "обмотчик",
    "водитель": "токарь",
    "специалист по кадрам": "Начальник цеха",
    "оператор": "пропитчик",
  };
  return aliases[normalized] ?? positions[0] ?? DEFAULT_POSITIONS[0];
}

function positionsForNormalize() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings));
    return Array.isArray(saved?.positions) && saved.positions.length > 0 ? saved.positions : DEFAULT_POSITIONS;
  } catch {
    return DEFAULT_POSITIONS;
  }
}

function knownMiddleName(lastName, firstName) {
  const key = `${lastName} ${firstName}`.toLowerCase();
  const names = {
    "власов андрей": "Сергеевич",
    "евдокимов дмитрий": "Олегович",
    "галушка макар": "Андреевич",
    "мищенко александра": "Павловна",
    "мищенко евгения": "Игоревна",
    "мищенко мария": "Викторовна",
    "морозова самира": "Рустамовна",
  };
  return names[key] ?? "";
}

function loadEmployees() {
  if (SUPABASE.url && SUPABASE.key) return [];
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.employees));
    const source = Array.isArray(saved) && saved.length > 0 ? saved : defaultEmployees;
    return withDefaultEmployees(source).map(normalizeEmployee);
  } catch {
    return defaultEmployees.map(normalizeEmployee);
  }
}

function withDefaultEmployees(source) {
  const defaultById = new Map(defaultEmployees.map((employee) => [employee.id, employee]));
  const merged = source.map((employee) => {
    const replacement = defaultById.get(employee.id);
    if (!replacement || !isLegacyDemoEmployee(employee)) return employee;
    return {
      ...employee,
      lastName: replacement.lastName,
      firstName: replacement.firstName,
      middleName: replacement.middleName,
      role: replacement.role,
      phone: replacement.phone,
      start: replacement.start,
      timeoffBalance: replacement.timeoffBalance,
      status: replacement.status,
      note: replacement.note,
      photo: employee.photo || replacement.photo || "",
    };
  });
  const ids = new Set(merged.map((employee) => employee.id));
  defaultEmployees.forEach((employee) => {
    if (merged.length < 20 && !ids.has(employee.id)) {
      merged.push(employee);
      ids.add(employee.id);
    }
  });
  return merged;
}

function isLegacyDemoEmployee(employee) {
  const legacyNames = {
    e01: "Власов Андрей Сергеевич",
    e02: "Евдокимов Дмитрий Олегович",
    e03: "Галушка Макар Андреевич",
    e04: "Мищенко Александра Павловна",
    e05: "Мищенко Евгения Игоревна",
    e06: "Мищенко Мария Викторовна",
    e07: "Морозова Самира Рустамовна",
  };
  return legacyNames[employee.id] === fullName(employee);
}

function loadAttendance() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.attendance)) ?? {};
  } catch {
    return {};
  }
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.settings));
    const legacyTheme = localStorage.getItem("gngs.theme");
    const savedStatuses = saved?.statuses && typeof saved.statuses === "object" ? saved.statuses : {};
    const statuses = {};
    STATUS_ORDER.forEach((status) => {
      statuses[status] = {
        ...defaultStatusSettings[status],
        ...(savedStatuses[status] && typeof savedStatuses[status] === "object" ? savedStatuses[status] : {}),
        code: defaultStatusSettings[status].code,
      };
    });
    return {
      ...defaultSettings,
      ...(saved && typeof saved === "object" ? saved : {}),
      theme: saved?.theme ?? (legacyTheme === "dark" ? "dark" : defaultSettings.theme),
      positions: Array.isArray(saved?.positions) && saved.positions.length > 0 ? saved.positions : DEFAULT_POSITIONS,
      dutyExtraDates: Array.isArray(saved?.dutyExtraDates) ? saved.dutyExtraDates.filter((key) => /^\d{4}-\d{2}-\d{2}$/.test(key)) : [],
      statuses,
    };
  } catch {
    return { ...defaultSettings, positions: [...DEFAULT_POSITIONS], dutyExtraDates: [], statuses: { ...defaultStatusSettings } };
  }
}

async function syncEmployeesFromSupabase() {
  if (!SUPABASE.url || !SUPABASE.key) {
    state.employeesLoading = false;
    return;
  }
  state.employeesLoading = true;
  render();
  try {
    const remoteEmployees = await fetchSupabaseEmployees();
    employees = remoteEmployees.map(normalizeEmployee);
    if (!employees.find((employee) => employee.id === state.selectedEmployeeId)) {
      state.selectedEmployeeId = employees[0]?.id ?? "";
    }
    fillPositionSelects();
  } catch (error) {
    console.warn("Supabase employees sync skipped:", error.message);
  } finally {
    state.employeesLoading = false;
    render();
  }
}

async function fetchSupabaseEmployees() {
  const rows = await supabaseRequest(`${SUPABASE.employeesTable}?select=id,data,updated_at&order=updated_at.asc`);
  if (!Array.isArray(rows)) return [];
  return rows.map((row) => ({ id: row.id, ...(row.data ?? {}) }));
}

function saveEmployees(options = {}) {
  if (!SUPABASE.url || !SUPABASE.key) {
    localStorage.setItem(STORAGE_KEYS.employees, JSON.stringify(employees));
  }
  if (options.remote !== false) queueEmployeesSync();
}

let employeesSyncTimer = null;

function queueEmployeesSync() {
  window.clearTimeout(employeesSyncTimer);
  employeesSyncTimer = window.setTimeout(() => {
    syncEmployeesToSupabase().catch((error) => console.warn("Supabase employees save skipped:", error.message));
  }, 350);
}

async function syncEmployeesToSupabase() {
  if (!SUPABASE.url || !SUPABASE.key || employees.length === 0) return;
  await supabaseRequest(`${SUPABASE.employeesTable}?on_conflict=id`, {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: employees.map((employee) => ({
      id: employee.id,
      data: employee,
      updated_at: new Date().toISOString(),
    })),
  });
}

async function saveEmployeeRecordToSupabase(employee) {
  if (!SUPABASE.url || !SUPABASE.key || !employee) return;
  await supabaseRequest(`${SUPABASE.employeesTable}?on_conflict=id`, {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: {
      id: employee.id,
      data: employee,
      updated_at: new Date().toISOString(),
    },
  });
}

async function deleteEmployeeFromSupabase(employeeId) {
  if (!SUPABASE.url || !SUPABASE.key || !employeeId) return;
  await supabaseRequest(`${SUPABASE.employeesTable}?id=eq.${encodeURIComponent(employeeId)}`, {
    method: "DELETE",
    headers: {
      Prefer: "return=minimal",
    },
  });
}

async function supabaseRequest(path, options = {}) {
  const response = await fetch(`${SUPABASE.url}/rest/v1/${path}`, {
    method: options.method ?? "GET",
    headers: {
      apikey: SUPABASE.key,
      Authorization: `Bearer ${SUPABASE.key}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function supabaseUserMessage(error) {
  const message = String(error?.message ?? error);
  if (message.includes("HTTP 404") || message.includes("PGRST") || message.toLowerCase().includes("schema cache")) {
    return "Не удалось сохранить сотрудника в Supabase: таблица employees не найдена.\nВыполните файл supabase-employees.sql в Supabase SQL Editor.";
  }
  if (message.includes("HTTP 401") || message.includes("HTTP 403")) {
    return "Не удалось сохранить сотрудника в Supabase: нет доступа к таблице employees.\nПроверьте политики RLS для select, insert, update и delete.";
  }
  return `Не удалось сохранить сотрудника в Supabase:\n${message}`;
}

function saveAttendance() {
  localStorage.setItem(STORAGE_KEYS.attendance, JSON.stringify(state.attendance));
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
}

init();
