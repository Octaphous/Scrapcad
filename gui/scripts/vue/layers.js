module.exports.createLayer = function(width = 10, height = 10, name = "New Layer", selectLayer = true) {
    let newLayer = new Layer(width, height, name);
    this.tileCanvas.layers.add(newLayer);

    if (selectLayer)
        this.tileCanvas.layers.select(newLayer);

    return newLayer;
}