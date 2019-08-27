const electron = require("electron");
const fs = require("fs");
const mouseWheel = require("mouse-wheel");

const canvas = document.querySelector("#main-canvas");

let vueMethods = importFunctions();

let app = new Vue({
    el: "#wrapper",
    data: {
        tileCanvas: null
    },
    watch: {
        'tileCanvas': {
            handler: function() {
                this.tileCanvas.draw();
            }, deep: true
        }
    },
    mounted() {
        this.tileCanvas = new TileCanvas(this.$refs.mainCanvas);
        this.createLayer();
        this.tileCanvas.setZoom(50);
        this.tileCanvas.draw();
    },
    methods: vueMethods
})

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

mouseWheel(app.$refs.mainCanvas.parentNode, (dx, dy) => {
    if (dy > 0 && app.tileCanvas.zoom > 0)
        app.tileCanvas.setZoom(app.tileCanvas.zoom - 2);

    if (dy < 0)
        app.tileCanvas.setZoom(app.tileCanvas.zoom + 2);

    app.tileCanvas.draw();
}, true);