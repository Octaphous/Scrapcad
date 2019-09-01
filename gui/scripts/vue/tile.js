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