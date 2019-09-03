instance.createTool(
    "Single Selection", 
    "singleSelection", 
    _plugindir + "/tool-icon.svg"
);

instance.tool_singleSelection = function(x, y) {
    instance.project.drawing.layers.selected.invertSelectionAt(x, y);
}