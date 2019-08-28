module.exports.selectAllTiles = function() {
    this.drawing.layers.selected.selectAll();
}
module.exports.deleteSelectedTiles = function() {
    this.drawing.layers.selected.selectedTiles.forEach(tile => {
        this.drawing.layers.selected.removeAt(tile.x, tile.y);
    })
}

//Testing function, remove later
module.exports.fillTiles = function() {
    let selectedLayer = this.drawing.layers.selected;

    if (!selectedLayer) return;
    selectedLayer.selectedTiles.forEach(tile => {
        selectedLayer.add(new Tile(tile.x, tile.y, '#0000FF'));
    });
}