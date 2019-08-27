module.exports.closeApplication = function() {
    electron.remote.BrowserWindow.getFocusedWindow().close();
}
module.exports.maximize = function() {
    let window = electron.remote.BrowserWindow.getFocusedWindow();
    if(window.isMaximized()) {
        window.unmaximize();
    } else {
        window.maximize(); 
    }
}
module.exports.minimize = function() {
    electron.remote.BrowserWindow.getFocusedWindow().minimize();
}