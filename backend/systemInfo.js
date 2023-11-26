const os = require("os");

function getSystemInfo() {
    return {
        computerName: os.hostname(),
        osType: os.type(),
        uptime: os.uptime(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
    };
}

module.exports = { getSystemInfo };
