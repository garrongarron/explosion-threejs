const setControls = (camera, renderer) => {
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();
}

export default setControls
