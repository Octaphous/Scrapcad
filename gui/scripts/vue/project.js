module.exports.saveProject = function() {
    hideMenu();
    let defaultPath = path.join(__dirname, "../../../projects/New Project.scrcad");
    let dialogOptions = {
        title: "Save Project",
        defaultPath: defaultPath,
        filters: [
            { name: 'Scrapcad Project', extensions: ['scrcad'] },
        ]
    }

    let filePath = dialog.showSaveDialogSync(dialogOptions);
    if (!filePath) return;

    let projectFile = {
        width: this.project.width,
        height: this.project.height,
        layers: []
    }

    //Store tiles, selected tiles and layers in the project file
    this.project.drawing.layers.layers.forEach(layer => {
        let tiles = [];
        let selectedTiles = [];
        layer.tiles.forEach(tile => {
            tiles.push({
                x: tile.x,
                y: tile.y,
                color: tile.color
            });
        })
        layer.selectedTiles.forEach(stile => {
            selectedTiles.push({
                x: stile.x,
                y: stile.y
            })
        })
        projectFile.layers.unshift({
            z: layer.z,
            name: layer.name,
            tiles: tiles,
            selected: selectedTiles,
            link: layer.linkedLayer ? layer.linkedLayer.z : -1
        })
    })

    fs.writeFileSync(filePath, JSON.stringify(projectFile));
}
module.exports.openProject = function() {
    hideMenu();
    let defaultPath = path.join(__dirname, "../../../projects");
    let dialogOptions = {
        title: "Open Project",
        defaultPath: defaultPath,
        properties: ["openFile, openDirectory"],
        filters: [
            { name: 'Scrapcad Project', extensions: ['scrcad'] },
        ]
    }

    let filePath = dialog.showOpenDialogSync(dialogOptions);
    if (!filePath) return;

    let projectToLoad = JSON.parse(fs.readFileSync(filePath[0]));
    
    //Remove all layers before loading a new project
    this.project.drawing.layers.layers = [];

    this.changeProjectSize(projectToLoad.width, projectToLoad.height);

    //Load all layers and tiles
    projectToLoad.layers.forEach(layer => {
        let newLayer = this.createLayer(layer.name, true);

        if (layer.link != -1) return;

        layer.tiles.forEach(tile => {
            newLayer.add(new Tile(tile.x, tile.y, tile.color));
        })
        layer.selected.forEach(stile => {
            newLayer.selectAt(stile.x, stile.y);
        })
    })
    
    //Link all linked layers
    projectToLoad.layers.forEach(layer => {
        if (layer.link != -1) {
            let child = this.project.drawing.layers.getLayerByZ(layer.z);
            let parent = this.project.drawing.layers.getLayerByZ(layer.link);

            child._link = parent;
            child.tiles = parent.tiles;
            child._selected = parent._selected;
        }
    })
    

}
module.exports.newProject = function() {
    hideMenu();
    this.changeProjectSize(10, 10);
    this.project.drawing = new TileCanvas(this.$refs.mainCanvas);
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