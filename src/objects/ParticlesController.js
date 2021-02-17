import machine from '../basic/Machine.js'
let vertices = [];
let limit = 150
let n = 0
vertices = [];
while(n<limit) {
	const x = THREE.MathUtils.randFloatSpread(2);
	const y = THREE.MathUtils.randFloatSpread(2);
	const z = THREE.MathUtils.randFloatSpread(2);
	if(Math.sqrt( (x*x) + (y*y) + (z*z))>1) continue
	vertices.push(x, y, z);
	n++
}

const textureLoader = new THREE.TextureLoader();
const sprite1 = textureLoader.load('images/smokeparticle.png');

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({
	size: 5,
	color: 0x000000,
	map: sprite1,
	blending: THREE.NormalBlending,
	// stencilWrite: false,
	// depthTest : false,
	// blendDstAlpha: .5,
	depthWrite : false,
	transparent: true
});


const particles = new THREE.Points(geometry, material);
let delta = 0
let config = () => {
	delta = 0
	let scale = 3
	particles.scale.x = scale
	particles.scale.y = scale
	particles.scale.z = scale
	particles.material.opacity = .3
	// particles.rotation.x = Math.random() * Math.PI*2
	particles.rotation.y = Math.random() * Math.PI*2
	// particles.rotation.z = Math.random() * Math.PI*2
	material.size= 5
	// material.color.r = 1
	// material.color.g = 0
	// material.color.b = 0
	// particles.position.y = 2 
	// console.log(particles.position);
	// material.color.setHSL( Math.random(), Math.random(), Math.random() );

}
config()
// setInterval(config, 1000 *2);

particles.position.set(0,0,0)
//loop
machine.addCallback(() => {
	let scale  = .02
	particles.scale.x += scale
	particles.scale.y += scale
	particles.scale.z += scale
	particles.material.opacity *= .96 
	// particles.position.y -= .005 
	// particles.position.z -= .5 
	material.size += 0.005
	// particles.rotation.y += 0.01 
})

export default particles