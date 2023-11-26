const shell = require("shelljs");
const os = require("os");

shell.config.execPath = shell.which("node").toString();

function emptyTrashWindows() {
    shell.exec("del /f /s /q %temp%*"); // Windows: Supprime les fichiers temporaires
    shell.exec('powershell -command "Clear-RecycleBin -Confirm:$false"'); // Windows: Supprime les fichiers dans la corbeille
}

function emptyTrashMac() {
    shell.exec("rm -rf ~/Library/Caches/*"); // macOS: Supprime les caches
    shell.exec("rm -rf ~/.Trash/*"); // macOS: Supprime les fichiers dans la corbeille
}

function emptyTrashLinux() {
    shell.exec("rm -rf /var/tmp/*"); // Linux: Supprime les fichiers temporaires
    shell.exec("rm -rf ~/.local/share/Trash/*"); // Linux: Supprime les fichiers dans la corbeille
}

function cleanSystem() {
    try {
        switch (process.platform) {
            case "win32":
                emptyTrashWindows();
                break;
            case "darwin":
                emptyTrashMac();
                break;
            case "linux":
                emptyTrashLinux();
                break;
            default:
                console.log(
                    "Système d'exploitation non pris en charge pour cette opération"
                );
        }
        return "Corbeille vidée avec succès.";
    } catch (error) {
        return error;
    }
}

function monitorPerformance() {
    return {
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        cpuCount: os.cpus().length,
        cpuModel: os.cpus()[0].model,
        uptime: os.uptime(),
    };
}

module.exports = { cleanSystem, monitorPerformance };
