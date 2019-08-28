module.exports.runTool = function(tool, x, y) {
    let functionName = tool.name.replace(" ", "");
    functionName = "tool_" + functionName.charAt(0).toLowerCase() + functionName.slice(1);

    let deselect = this.project.drawing.layers.selected.selectionAt(x, y) == undefined ? false : true;

    if (this[functionName])
        this[functionName](x, y, deselect);
}

module.exports.tool_singleSelection = function(x, y) {
    this.project.drawing.layers.selected.invertSelection(x, y);
}

module.exports.tool_colorSelection = function(x, y, deselect) {
    let selectedLayer = this.project.drawing.layers.selected;
    let clickedTile = selectedLayer.tileAt(x, y);

    if (!clickedTile)
        clickedTile = {color: null}

    for (let lx = 0; lx < selectedLayer.width; lx++) {
        for (let ly = 0; ly < selectedLayer.height; ly++) {

            let tile = selectedLayer.tileAt(lx, ly);

            if (!tile)
                tile = {color: null};

            if (tile.color == clickedTile.color) {
                if (deselect)
                    selectedLayer.deselectAt(lx, ly);
                else
                    selectedLayer.selectAt(lx, ly);
            }

        }
    }
}