module.exports.saveProject = function() {
    //Save Project
}
module.exports.changeProjectSize = function(width, height) {
    if (!(isNaN(width) && width > 0 && isNaN(height) && height > 0)) return;
    
    this.project.width = width;
    this.project.height = height;

    //Update layer sizes
    let layers = this.project.drawing.layers.layers;
    for (let i = 0; layers.length; i++) {
        layers[i].resize(width, height);
    }
}