import machine from '../basic/Machine.js'
let vertices = [];



let limit = 45
let n = 0
vertices = [];
while (n < limit) {
	const x = THREE.MathUtils.randFloatSpread(2);
	const y = THREE.MathUtils.randFloatSpread(2);
	const z = THREE.MathUtils.randFloatSpread(2);
	if (Math.sqrt((x * x) + (y * y) + (z * z)) > 1) continue
	vertices.push(x, y, z);
	n++
}

const textureLoader = new THREE.TextureLoader();
const sprite1 = textureLoader.load('./resources/fire.png');

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({
	size: 50,
	// color: 0x333333,
	map: sprite1,
	blending: THREE.NormalBlending,
	stencilWrite: false,
	// depthTest : true,
	// blendDstAlpha: .5,
	depthWrite: false,
	transparent: true,
	vertexColor: true
});
let explosion



// console.log(geometry, material);
let setup = () => {
	let scale = 1
	explosion.scale.x = scale
	explosion.scale.y = scale
	explosion.scale.z = scale
	explosion.material.opacity = .91
	explosion.rotation.y = Math.random() * Math.PI * 2
	explosion.position.set(0, 0, 0)
}
// setInterval(setup, 1000 *2);




//loop
machine.addCallback(() => {
	if (!explosion) return
	explosion.material.opacity *= .8
	explosion.rotation.y += .1
	let scale = .01
	explosion.scale.x -= scale
	explosion.scale.y -= scale
	explosion.scale.z -= scale
})

let trigger = (scene) => {
	explosion = new THREE.Points(geometry, material);
	scene.add(explosion)
	setup()
	setTimeout(() => {
		scene.remove( explosion );
		explosion = null
	}, 1000);
}

export default explosion
export { trigger }