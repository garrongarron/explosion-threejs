import scene from './Scene.js'
import camera from './basic/Camera.js'
import machine from './basic/Machine.js'
import './controllers/CameraController.js'


let renderer = new THREE.WebGLRenderer(
    { 
        //document.body.appendChild(renderer.domElement);
        canvas: document.getElementById('c'), 
        antialias: true 
    }
);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;//THREE.BasicShadowMap;
renderer.setClearColor(0x333333);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
let resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', resize, false);
// setControls(camera, renderer)
machine.addCallback(() => {
    renderer.render(scene, camera);
})
resize()
machine.run()
