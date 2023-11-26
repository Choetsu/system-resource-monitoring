const { ipcRenderer } = require("electron");

// Utilisez la fonction ipcRenderer.on pour écouter les événements du backend
ipcRenderer.on("updateSystemInfo", (event, systemInfo) => {
    // Mettez à jour votre interface graphique avec les informations système
    document.getElementById("computerName").innerText = systemInfo.computerName;
    document.getElementById("osType").innerText = systemInfo.osType;
    document.getElementById("uptime").innerText = systemInfo.uptime;
    document.getElementById("totalMemory").innerText = systemInfo.totalMemory;
    document.getElementById("freeMemory").innerText = systemInfo.freeMemory;
});

// Utilisez la fonction ipcRenderer.send pour envoyer un événement au backend
ipcRenderer.send("requestSystemInfo");

// Ajoutez des listeners pour les nouvelles fonctionnalités
document.getElementById("cleanSystem").addEventListener("click", () => {
    ipcRenderer.send("performCleanUp");
});

document.getElementById("monitorPerformance").addEventListener("click", () => {
    ipcRenderer.send("startPerformanceMonitor");
});

// Recevez des mises à jour du backend
ipcRenderer.on("cleanUpComplete", (event, message) => {
    console.log(message);
});

ipcRenderer.on("performanceData", (event, data) => {
    console.log("Données de performance: ", data);
    // document
    //     .getElementById("monitorPerformance")
    //     .appendChild(document.createElement("p")).innerText =
    //     JSON.stringify(data);
});
