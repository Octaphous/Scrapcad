instance.createTool(
    "Color Selection", 
    "colorSelection", 
    _relPluginDir + "/icon.svg"
);

instance.tool_colorSelection = function(x, y, deselect) {
    let selectedLayer = instance.project.drawing.layers.selected;
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