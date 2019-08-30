module.exports.runTool = function(tool, x, y) {
    if (!this.isLayerSelected) return;

    let functionName = "tool_" + tool.functionName;

    let deselect = this.project.drawing.layers.selected.selectionAt(x, y) == undefined ? false : true;

    if (this[functionName])
        this[functionName](x, y, deselect);
}
module.exports.createTool = function(name = "Unnamed Tool", functionName = "tool_singleSelection", icon = "../images/default-tool-icon") {
    this.tools.list.push({ name, functionName, icon });
}

module.exports.tool_singleSelection = function(x, y) {
    this.project.drawing.layers.selected.invertSelectionAt(x, y);
}