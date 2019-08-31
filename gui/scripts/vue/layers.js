module.exports.createLayer = function(name = "New Layer", selectLayer = true) {
    let newLayer = new Layer(this.project.width, this.project.height, name);
    this.project.drawing.layers.add(newLayer);

    if (selectLayer)
        this.project.drawing.layers.select(newLayer);

    return newLayer;
}
module.exports.deleteLayer = function(layer = this.project.drawing.layers.selected) {
    if (!layer) return;

    let zPos = layer.z;
    let layers = this.project.drawing.layers;
    
    this.project.drawing.layers.remove(layer);

    if (layers.length != 0) {
        if (layers.getLayerByZ(zPos)) {
            layers.select(layers.getLayerByZ(zPos));
        } else {
            layers.select(layers.layers[0]);
        }
    }
    
}