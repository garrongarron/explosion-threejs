let directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
directionalLight.position.set(20, 100, 10);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.bias = -0.001;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 500.0;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500.0;
directionalLight.shadow.camera.left = 100;
directionalLight.shadow.camera.right = -100;
directionalLight.shadow.camera.top = 100;
directionalLight.shadow.camera.bottom = -100;

let ambientLight = new THREE.AmbientLight(0x101010);


export {directionalLight, ambientLight}