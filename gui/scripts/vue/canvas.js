module.exports.canvasClickHandler = function (event) {
    if (!this.isLayerSelected) return;
    let canvas = this.$refs.mainCanvas;
    let mPosX = Math.floor((event.pageX - canvas.offsetLeft) / this.project.drawing.zoom);
    let mPosY = Math.floor((event.pageY - canvas.offsetTop) / this.project.drawing.zoom);
    
    this.runTool(this.tools.selected, mPosX, mPosY);
}
module.exports.zoom = function(level) {
    this.project.drawing.setZoom(this.project.drawing.zoom + level);
    this.project.drawing.draw();
}