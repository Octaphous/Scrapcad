module.exports.runTool = function(tool, x, y) {
    let functionName = tool.name.replace(" ", "");
    functionName = functionName.charAt(0).toLowerCase() + functionName.slice(1);

    if (this[functionName])
        this[functionName](x, y);
}

module.exports.singleSelection = function(x, y) {
    this.toggleSelect(x, y);
}