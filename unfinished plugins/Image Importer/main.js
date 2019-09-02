instance.pluginDialog("Image Importer", "imageImporter", [
    {
        title: "Width",
        type: "alternatives",
        values: ["Layer Width", "Custom"],
        selected: "Layer Width"
    },
    {
        title: "Custom Width",
        type: "text-input",
        values: ["10"]
    },
    {
        title: "Height",
        type: "alternatives",
        values: ["Auto", "Same as width"],
        selected: "Auto"
    },
]);

instance.plugin_imageImporter = function(parameters) {
    let dialogOptions = {
        title: "Select Image",
        properties: ["openFile"],
        filters: [
            { name: 'Image', extensions: ['jpg', 'jpeg', 'png', 'bmp'] },
        ]
    }

    let filePath = dialog.showOpenDialogSync(dialogOptions);
    if (!filePath) return;

    filePath = filePath[0];

    let imageWidth = parameters[0].selected == 'Layer Width' ? instance.project.width : parseInt(parameters[1].values[0]);
    let imageHeight = parameters[2].selected == 'Auto' ? Jimp.AUTO : parseInt(parameters[1].values[0]);
    
    Jimp.read(filePath, (err, image) => {
        if (err) console.log(err);
        image.resize(imageWidth, imageHeight);

        for (let x = 0; x < image.bitmap.width; x++) {
            for (let y = 0; y < image.bitmap.height; y++) {
                let color = "#" + image.getPixelColor(x, y).toString(16);
                console.log(color);
                drawing.layers.selected.add(new Tile(x, y, color), true);
            }
        }
    })
}