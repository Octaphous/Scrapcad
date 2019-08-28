module.exports.toggleSelectTile = function(x, y){
    let selectedLayer = this.drawing.layers.selected;
    if (selectedLayer.selectionAt(x, y))
        selectedLayer.deselectAt(x, y);
    else
        selectedLayer.selectAt(x, y);
}
module.exports.selectAllTiles = function() {
    this.drawing.layers.selected.selectAll();
}
module.exports.deleteSelectedTiles = function() {
    this.drawing.layers.selected.selectedTiles.forEach(tile => {
        this.drawing.layers.selected.removeAt(tile.x, tile.y);
    })
}
module.exports.invertTileSelection = function() {
    let selectedLayer = this.drawing.layers.selected
    for (let x = 0; x < selectedLayer.width; x++) {
        for (let y = 0; y < selectedLayer.height; y++) {
            this.toggleSelectTile(x, y);
        }
    }
}

//Testing function, remove later
module.exports.fillTiles = function() {
    let selectedLayer = this.drawing.layers.selected;

    if (!selectedLayer) return;
    selectedLayer.selectedTiles.forEach(tile => {
        selectedLayer.add(new Tile(tile.x, tile.y, '#0000FF'));
    });
}