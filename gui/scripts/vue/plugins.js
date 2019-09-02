module.exports.loadPlugins = function() {
    let pluginFolders = fs.readdirSync("./plugins");

    pluginFolders.forEach(plugin => {
        let pluginCode = fs.readFileSync("./plugins/" + plugin + "/main.js");
        let pluginFunction = new Function("instance", "_plugindir", "drawing", pluginCode);
        
        //instance = vue instance
        //_relPluginDir = plugin directory

        pluginFunction(this, "../../plugins/" + plugin, this.project.drawing);
    })

    this.plugins.count = pluginFolders.length;
}
module.exports.pluginDialog = function(title, functionName, parameters) {
    this.plugins.dialogs.push({ title, functionName, parameters});
}
module.exports.runPluginDialog = function(plugin) {
    let functionName = "plugin_" + plugin.functionName;
    
    if (this[functionName]);
        this[functionName](plugin.parameters);
}