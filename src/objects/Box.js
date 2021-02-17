const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshStandardMaterial({
        color: 0x006600,
    }));
box.position.set(0, 0, -1);
box.castShadow = true;
box.receiveShadow = true;

export default box