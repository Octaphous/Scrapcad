const { app, BrowserWindow } = require("electron");

function createWindow () {
    let win = new BrowserWindow({
        frame: false,
        width: 1280,
        height: 720,
        'minHeight': 100,
        'minWidth': 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile("frontend/html/editor.html");
    //win.setMenu(null);
}

app.on("ready", createWindow);