module.exports.pluginDialog = function(title, functionName, parameters) {
    this.plugins.dialogs.push({ title, functionName, parameters});
}
module.exports.runPluginDialog = function(plugin) {
    let functionName = "plugin_" + plugin.functionName;
    
    if (this[functionName]);
        this[functionName](plugin.parameters);
}