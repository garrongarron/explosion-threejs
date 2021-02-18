const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
    }));
box.position.set(0, 1, 0);
box.castShadow = true;
box.receiveShadow = true;

export default box