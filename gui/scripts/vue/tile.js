module.exports.selectAllTiles = function() {
    if (!this.isLayerSelected) return;
    this.project.drawing.layers.selected.selectAll();
}
module.exports.deleteSelectedTiles = function() {
    if (!this.isLayerSelected) return;
    this.project.drawing.layers.selected.selectedTiles.forEach(tile => {
        this.project.drawing.layers.selected.removeAt(tile.x, tile.y);
    })
}

//Testing function, remove later
module.exports.fillTiles = function() {
    if (!this.isLayerSelected) return;
    let selectedLayer = this.project.drawing.layers.selected;

    if (!selectedLayer) return;
    selectedLayer.selectedTiles.forEach(tile => {
        selectedLayer.add(new Tile(tile.x, tile.y, '#0000FF'));
    });
}