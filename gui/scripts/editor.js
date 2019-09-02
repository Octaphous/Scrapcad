const electron = require("electron");
const {dialog} = electron.remote;

const fs = require("fs");
const mouseWheel = require("mouse-wheel");
const path = require("path");
const Jimp = require("jimp");

let vueMethods = importFunctions();

/*
TODO:
- 3D-view
- Color-picker
- States

* Scrap Mechanic exporter
* Image importer
*/

let app = new Vue({
    el: "#wrapper",
    data: {
        defaults: {
            projectWidth: 16,
            projectHeight: 16,
        },
        plugins: {
            count: 0,
            dialogs: []
        },
        project: {
            width: 0,
            height: 0,
            drawing: null,
        },
        tabs: {
            viewport: "editor",
            sidebar: "layers",
            explorer: "plugins"
        },
        tools: {
            list: [],
            selected: null
        }
    },
    computed: {
        hasDrawingLoaded() {
            return this.project.drawing ? true : false;
        },
        isLayerSelected() {
            return this.project.drawing.layers.selected ? true : false;
        }
    },
    watch: {
        //Draw everytime project.drawing changes
        'project.drawing': {
            handler: function() {
                this.project.drawing.draw();
            }, deep: true
        }
    },
    mounted() {
        //Initialization
        this.project.drawing = new TileCanvas(this.$refs.mainCanvas);
        this.project.drawing.setZoom(50);
        this.changeProjectSize(this.defaults.projectWidth, this.defaults.projectHeight);
        this.createLayer();

        //Run all plugins
        this.loadPlugins();

        this.init3D();
    },
    methods: vueMethods
})

mouseWheel(app.$refs.mainCanvas.parentNode, (dx, dy) => {
    if (dy > 0 && app.project.drawing.zoom > 0)
        app.zoom(-2);

    if (dy < 0)
        app.zoom(2);
}, true);

function importFunctions() {
    let functions = {}
    let scripts = fs.readdirSync("./gui/scripts/vue");
    scripts.forEach(script => {
        let scriptFunctions = require("../scripts/vue/" + script);
        Object.keys(scriptFunctions).forEach(func => {
            functions[func] = scriptFunctions[func];
        })
    })
    return functions;
}