import machine from '../basic/Machine.js'

let vertices = [];
let limit = 50
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
const sprite1 = textureLoader.load('./resources/smokeparticle.png');

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({
	size: 5,
	color: 0x000000,
	map: sprite1,
	blending: THREE.NormalBlending,
	stencilWrite: false,
	depthTest : false,
	blendDstAlpha: .5,
	depthWrite: false,
	transparent: true
});


let particles 
let delta = 0
let config = () => {
	delta = 0
	let scale = 5
	particles.scale.x = scale
	particles.scale.y = scale
	particles.scale.z = scale
	particles.material.opacity = .8
	particles.rotation.y = Math.random() * Math.PI * 2
	material.size = 8

}

// setInterval(config, 1000 *2);


//loop
machine.addCallback(() => {
	if(!particles) return
	let scale = .02
	particles.scale.x += scale
	particles.scale.y += scale
	particles.scale.z += scale
	particles.material.opacity *= .97
	// particles.position.y -= .005 
	// particles.position.z -= .5 
	material.size += 0.005
	// particles.rotation.y += 0.01 
})

let trigger = (scene) => {
	particles = new THREE.Points(geometry, material);
	scene.add(particles)
	config()
	setTimeout(() => {
		scene.remove( particles );
		particles = null
	}, 2000);
}

export default particles

export { trigger }