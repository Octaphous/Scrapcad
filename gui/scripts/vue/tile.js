module.exports.selectAllTiles = function() {
    this.project.drawing.layers.selected.selectAll();
}
module.exports.deleteSelectedTiles = function() {
    this.project.drawing.layers.selected.selectedTiles.forEach(tile => {
        this.project.drawing.layers.selected.removeAt(tile.x, tile.y);
    })
}

//Testing function, remove later
module.exports.fillTiles = function() {
    let selectedLayer = this.project.drawing.layers.selected;

    if (!selectedLayer) return;
    selectedLayer.selectedTiles.forEach(tile => {
        selectedLayer.add(new Tile(tile.x, tile.y, '#0000FF'));
    });
}