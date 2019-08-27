const electron = require("electron");
const fs = require("fs");

const canvas = document.querySelector("#main-canvas");

let vueMethods = importFunctions();

new Vue({
    el: "#wrapper",
    data: {

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