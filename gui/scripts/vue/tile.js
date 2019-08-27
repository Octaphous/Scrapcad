module.exports.toggleSelect = function(x, y){
    let selectedLayer = this.drawing.layers.selected;
    if (selectedLayer.selectionAt(x, y))
        selectedLayer.deselectAt(x, y);
    else
        selectedLayer.selectAt(x, y);
}
module.exports.selectAll = function() {
    this.drawing.layers.selected.selectAll();
}