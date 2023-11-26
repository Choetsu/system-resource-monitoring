const { app, BrowserWindow, ipcMain } = require("electron");
const { getSystemInfo } = require("./systemInfo");
const { join } = require("node:path");
const { cleanSystem, monitorPerformance } = require("./systemCleaning");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, "../app/preload.js"),
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile(join(__dirname, "../app/index.html"));

    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    if (mainWindow === null) createWindow();
});

// Gestion des événements de communication entre le backend et le frontend
ipcMain.on("requestSystemInfo", (event) => {
    const systemInfo = getSystemInfo();
    event.reply("updateSystemInfo", systemInfo);
});

// Gestion des événements de nettoyage
ipcMain.on("performCleanUp", (event) => {
    cleanSystem();
    event.reply("cleanUpComplete", "Nettoyage terminé.");
});

// Gestion des événements de surveillance des performances
ipcMain.on("startPerformanceMonitor", (event) => {
    const data = monitorPerformance();
    event.reply("performanceData", data);
});
