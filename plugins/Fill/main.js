instance.pluginDialog("Fill", "fill", [
    {
        title: "Fill Mode",
        type: "alternatives",
        values: ["Layer", "Selection"],
        selected: "Layer"
    },
    {
        title: "Color",
        type: "color-input",
        values: ["#FFFFFF"]
    }
]);

instance.plugin_fill = function(parameters) {
    let fillMode = parameters[0].selected;
    let color = parameters[1].values[0];
 
    let layer = instance.project.drawing.layers.selected;
    if (!layer) return;

    for (let x = 0; x < layer.width; x++) {
        for (let y = 0; y < layer.height; y++) {

            if (fillMode == "Selection") {
                if (layer.selectionAt(x, y)) {
                    layer.removeAt(x, y);
                    layer.add(new Tile(x, y, color));
                }
            }
            if (fillMode == "Layer") {
                layer.removeAt(x, y);
                layer.add(new Tile(x, y, color));
            }
        }
    }
}