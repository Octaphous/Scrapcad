module.exports.canvasClickHandler = function (event) {
    let canvas = this.$refs.mainCanvas;
    let mPosX = Math.floor((event.pageX - canvas.offsetLeft) / this.drawing.zoom);
    let mPosY = Math.floor((event.pageY - canvas.offsetTop) / this.drawing.zoom);
    
    this.runTool(this.tools.selected, mPosX, mPosY);
}