import machine from '../basic/Machine.js'
let vertices = [];

for (let i = 0; i < 30; i++) {
	const x = THREE.MathUtils.randFloatSpread(2*i/50);
	const y = THREE.MathUtils.randFloatSpread(2);
	const z = THREE.MathUtils.randFloatSpread(2);
	if(Math.sqrt( (x*x) + (y*y) + (z*z))>1) continue
	vertices.push(x, y, z);
}

let limit = 45
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
const sprite1 = textureLoader.load('images/fire.png');

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({
	size: 50,
	// color: 0x333333,
	map: sprite1,
	blending: THREE.NormalBlending,
	// stencilWrite: false,
	// depthTest : false,
	// blendDstAlpha: .5,
	depthWrite : false,
	transparent: true
});


const explosion = new THREE.Points(geometry, material);
console.log(geometry, material);
let setup = () => {
	let scale = 1
	explosion.scale.x = scale
	explosion.scale.y = scale
	explosion.scale.z = scale
	explosion.material.opacity = 1
	// explosion.rotation.x = Math.random() * Math.PI*2
	explosion.rotation.y = Math.random() * Math.PI*2
	// explosion.rotation.z = Math.random() * Math.PI*2
	// material.size= 50
	// material.color.r = 1
	// material.color.g = 0
	// material.color.b = 0
	// explosion.position.y = 2 
	// material.color.setHSL( Math.random(), Math.random(), Math.random() );
	explosion.position.set(0,0,0)
}
// setInterval(setup, 1000 *2);
setup()

//loop
machine.addCallback(() => {
	
	// explosion.scale.x += .05
	// explosion.scale.y += .05
	// explosion.scale.z += .05
	explosion.material.opacity *= .9
	// explosion.position.y -= .01 
	// explosion.position.z -= .05 
	// material.size -= .5
	explosion.rotation.y += .01 
	// explosion.rotation.x += 1
})

export default explosion