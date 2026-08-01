const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("gngsApi", {
  saveXlsx: (payload) => ipcRenderer.invoke("export:xlsx", payload),
  saveDocx: (payload) => ipcRenderer.invoke("export:docx", payload),
  getAppInfo: () => ipcRenderer.invoke("app:info"),
  setLaunchAtLogin: (enabled) => ipcRenderer.invoke("app:setLaunchAtLogin", enabled),
  checkForUpdates: () => ipcRenderer.invoke("updates:check"),
  installUpdate: () => ipcRenderer.invoke("updates:install"),
  onUpdateStatus: (callback) => {
    const listener = (event, payload) => callback(payload);
    ipcRenderer.on("updates:status", listener);
    return () => ipcRenderer.removeListener("updates:status", listener);
  },
});
