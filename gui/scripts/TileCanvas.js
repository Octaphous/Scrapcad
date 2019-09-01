//TODO:
//Resize layers
//Change layer order
class TileCanvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.layers = new LayerCollection(canvas);
        this.drawGrid = true;

        this.init();
    }
    init() {
        this.setZoom(20);
    }
    setZoom(zoom) {
        if (zoom < 1) zoom = 1;
        
        this.canvas.zoom = zoom;

        // Set width and height of canvas
        if (this.layers.selected)
            this.layers.select(this.layers.selected);
    }
    get zoom() {
        return this.canvas.zoom;
    }
    draw() {
        //Clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //Draw Layers
        this.layers.draw(this.context, this.canvas.zoom);

        //Draw Grid
        if (this.drawGrid && this.layers.selected) {
            let strokeWidth = .5;
            let zl = this.canvas.zoom;

            for (let x = 0; x < this.layers.selected.width; x++) {
                for (let y = 0; y < this.layers.selected.height; y++) {
                    this.context.strokeStyle = "#b1b1b1";
                    this.context.lineWidth = strokeWidth;
                    this.context.strokeRect((x * zl), (y * zl), zl, zl);
                }
            }
        }
    }
}

class LayerCollection {
    constructor(canvas) {
        this.canvas = canvas;
        this.layers = [];
        this._selectedLayer = null;
    }
    get length() {
        return this.layers.length;
    }
    add(layer) {
        layer._z = this.layers.length;

        if (!this.getLayerByZ(layer.z)) {
            layer._collection = this;
            this.layers.push(layer);

            this.sortZPositions();
            return layer;
        }
    }
    remove(layer) {
        let layerIndex = this.layers.indexOf(layer);

        if (layerIndex != -1)
            this.layers.splice(layerIndex, 1);

        this._selectedLayer = null;
        this.sortZPositions();
    }
    get selected() {
        return this._selectedLayer;
    }
    getLayerByZ(z) {
        return this.layers.find(layer => layer.z == z);
    }
    sortZPositions() {
        this.layers = this.layers.sort((a,b) => a.z - b.z);

        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i]._z = i;
        }
        this.layers.reverse()
    }
    select(layer) {
        let layerIndex = this.layers.indexOf(layer);
        if (layerIndex == -1) return;

        this._selectedLayer = this.layers[layerIndex];

        let c_width = this._selectedLayer.width * this.canvas.zoom;
        let c_height = this._selectedLayer.height * this.canvas.zoom;
        if (this.canvas.width == c_width && this.canvas.height == c_height) return;

        this.canvas.width = c_width;
        this.canvas.height = c_height;
    }
    draw(context, zoom) {
        if (this._selectedLayer)
            this._selectedLayer.draw(context, zoom);
    }
}

class Layer {
    constructor(width = 10, height = 10, name = "New Layer") {
        this.tiles = [];
        this._width = width;
        this._height = height;
        this._z = 0;
        this.name = name;
        this._collection = null;
        this._link = null;

        this._selected = [];
    }
    get z() {
        return this._z;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get linkedLayer() {
        return this._link;
    }
    add(tile, replace = false) {
        if (tile.x >= this._width || tile.y >= this._height) return;

        if (this.tileAt(tile.x, tile.y))
            if (replace)
                this.removeAt(tile.x, tile.y);
            else 
                return;

        tile._layer = this;
        this.tiles.push(tile);
        return tile;
    }
    duplicate(linked = false, autoSelect = false) {
        let duplicate = new Layer(this._width, this._height, this.name);

        duplicate.tiles = linked ? this.tiles : this.tiles.slice(0);
        duplicate._selected = linked ? this._selected : this._selected.slice(0);

        duplicate._link = linked ? this : null;

        this._collection.add(duplicate);
        if (autoSelect)
            this._collection.select(duplicate);
    }
    removeLink() {
        this._link = null;
        this.tiles = this.tiles.slice(0);
        this._selected = this._selected.slice(0);
    }
    remove(tile) {
        let tileIndex = this.tiles.indexOf(tile);

        if (tileIndex != -1)
            this.tiles.splice(tileIndex, 1);
    }
    removeAt(x, y) {
        this.remove(this.tileAt(x, y));
    }
    resize(width, height) {
        this._width = width;
        this._height = height;

        this.tiles = this.tiles.filter(tile => !(tile.x > width || tile.y > height));
        this._selected = this._selected.filter(tile => !(tile.x > width || tile.y > height));

        //Update canvas height and width
        this._collection.select(this);
    }
    swapPosition(z) {
        if (!this._collection.getLayerByZ(z) || z < 0) return;
        let l = this._collection.getLayerByZ(z);
        l._z = this._z;
        this._z = z;
        this._collection.sortZPositions();
    }
    moveUp() {
        this.swapPosition(this._z + 1);
    }
    moveDown() {
        this.swapPosition(this._z - 1);
    }
    tileAt(x, y) {
        return this.tiles.find(tile => tile.x == x && tile.y == y);
    }
    get selectedTiles() {
        return this._selected;
    }
    selectAt(x, y) {
        if (x >= this._width || y >= this._height) return;
        if (this._selected.find(tile => tile.x == x && tile.y == y)) return;

        this._selected.push(new selectionTile(x, y));
    }
    deselectAt(x, y) {
        let tileToDeselect = this._selected.find(tile => tile.x == x && tile.y == y);
        if (!tileToDeselect) return;

        this._selected.splice(this._selected.indexOf(tileToDeselect), 1);
    }
    selectionAt(x, y) {
        return this._selected.find(tile => tile.x == x && tile.y == y)
    }
    selectAll() {
        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                this.selectAt(x, y);
            }
        }
    }
    deselectAll() {
        this._selected.splice(0, this._selected.length);
    }
    invertAll() {
        for (let x = 0; x < this._width; x++) {
            for (let y = 0; y < this._height; y++) {
                this.invertSelectionAt(x, y);
            }
        }
    }
    invertSelectionAt(x, y) {
        if (x != undefined && y != undefined) {
            if (!this.selectionAt(x, y))
                this.selectAt(x, y);
            else
                this.deselectAt(x, y);
        }
    }
    draw(context, zoom) {
        //Draw Tiles
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i].draw(context, zoom);
        }

        //Draw selection tiles
        for (let i = 0; i < this._selected.length; i++) {
            this._selected[i].draw(context, zoom);
        }
    }
}

class Tile {
    constructor(x, y, color = "#000000") {
        this._x = x;
        this._y = y;
        this.color = color;
        this._layer = null;
    }
    get layer() {
        return this._layer;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get isSelected() {
        if (!this._layer) return;
        return this._layer.selectionAt(this._x, this._y) ? true : false;
    }
    select() {
        if (!this._layer) return;
        this._layer.selectAt(this._x, this._y);
    }
    deselect() {
        if (!this._layer) return;
        this._layer.deselectAt(this._x, this._y);
    }
    draw(context, zoom) {
        let startPosX = this._x * zoom;
        let startPosY = this._y * zoom;
        let tileSize = zoom;

        context.fillStyle = this.color;
        context.fillRect(startPosX, startPosY, tileSize, tileSize);
    }
}

class selectionTile {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    draw(context, zoom) {
        let lineWidth = 3, offset = lineWidth / 2;

        context.strokeStyle = "#0000FF";
        context.fillStyle = "#77FFFF55";
        context.lineWidth = lineWidth;

        context.fillRect(this._x * zoom, this._y * zoom, zoom, zoom);
        context.strokeRect((this._x * zoom) + offset, (this._y * zoom) + offset, zoom - offset * 2, zoom - offset * 2);
    }
}