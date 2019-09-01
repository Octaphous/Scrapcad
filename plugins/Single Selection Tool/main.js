instance.createTool(
    "Single Selection", 
    "singleSelection", 
    _plugindir + "/tool-icon.svg"
);

instance.tool_singleSelection = function(x, y) {
    drawing.layers.selected.invertSelectionAt(x, y);
}