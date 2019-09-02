let renderer, scene, camera;
let previewWidth, previewHeight;

module.exports.init3D = function() {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setClearColor (0xffffff, 0);
    
    let previewViewport = document.getElementById("three-viewport");
    previewViewport.appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(75, previewViewport.clientWidth / previewViewport.clientHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 10;
    
    let controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();

    this.updateViewportSize();
}
module.exports.updateViewportSize = function() {
    let previewViewport = document.getElementById("three-viewport");
    previewWidth = previewViewport.clientWidth;
    previewHeight = previewViewport.clientHeight;

    renderer.setSize(previewWidth, previewHeight);
    console.log(previewWidth + " " + previewHeight);
    camera.aspect = previewWidth / previewHeight;
    camera.updateProjectionMatrix();
}
module.exports.build3DScene = function() {
    if (!scene) return;
    this.updateViewportSize();
    clear3DScene();

    let layers = this.project.drawing.layers;

    let currentLayer = null;
    let offset = 0;

    for (let i = 0; i < layers.layers.length; i++) {
        currentLayer = layers.layers[i];
        offset = currentLayer.width / 2;

        for (let x = 0; x < currentLayer.width; x++) {
            for (let y = 0; y < currentLayer.height; y++) {
                let tileAtPos = currentLayer.tileAt(x, y);
                
                if (tileAtPos) {
                    create3DCube(x - offset, y - offset, currentLayer.z, tileAtPos.color);
                }
            } 
        }
    }
}
function clear3DScene() {
    if (!scene) return;
    while (scene.children.length)
    {
        scene.remove(scene.children[0]);
    }
    directional3DLight(10, 15, 20, 1.2);
    directional3DLight(-10, -15, -20, 1.2);
}
function directional3DLight(x, y, z, intensity) {
    if (!scene) return;
    let light = new THREE.DirectionalLight(0xFFFFFF, intensity);
    light.position.set(x, y, z);
    light.target.position.set(0, 0, 0);
    scene.add(light);
    scene.add(light.target);
    
}
function create3DCube(x, y, z, color) {
    if (!scene) return;

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    let cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;
    cube.position.z = y;
    cube.position.y = z;
    scene.add(cube);
}
window.onresize = function(event) {
    if (!scene) return;
    app.updateViewportSize();
};

function render() {
    requestAnimationFrame(render);
    if (!renderer) return;
    renderer.render(scene, camera);
}
render();