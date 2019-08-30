module.exports.saveProject = function() {
    //Save Project
}
module.exports.changeProjectSize = function(width, height) {
    if (!(width > 0 && height > 0)) return;

    this.project.width = width;
    this.project.height = height;

    //Update layer sizes
    let layers = this.project.drawing.layers.layers;
    for (let i = 0; i < layers.length; i++) {
        layers[i].resize(width, height);
    }
}