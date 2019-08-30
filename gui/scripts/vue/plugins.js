module.exports.loadPlugins = function() {
    let pluginFolders = fs.readdirSync("./plugins");

    pluginFolders.forEach(plugin => {
        let pluginCode = fs.readFileSync("./plugins/" + plugin + "/main.js");
        let pluginFunction = new Function("instance", "_relPluginDir", "drawing", pluginCode);
        
        //instance = vue instance
        //_relPluginDir = plugin directory

        pluginFunction(this, "../../plugins/" + plugin, this.project.drawing);
    })

    this.pluginCount = pluginFolders.length;
}