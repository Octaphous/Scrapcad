const { app, BrowserWindow } = require("electron");

function createWindow () {
    let win = new BrowserWindow({
        frame: false,
        width: 1280,
        height: 720,
        'minHeight': 600,
        'minWidth': 900,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile("gui/html/editor.html");
    //win.setMenu(null);
}

app.on("ready", createWindow);