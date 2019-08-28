module.exports.createLayer = function(name = "New Layer", selectLayer = true) {
    let newLayer = new Layer(this.project.width, this.project.height, name);
    this.project.drawing.layers.add(newLayer);

    if (selectLayer)
        this.project.drawing.layers.select(newLayer);

    return newLayer;
}