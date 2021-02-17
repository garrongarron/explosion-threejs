import machine from '../basic/Machine.js'
let vertices = [];

for (let i = 0; i < 30; i++) {
	const x = THREE.MathUtils.randFloatSpread(2*i/50);
	const y = THREE.MathUtils.randFloatSpread(2);
	const z = THREE.MathUtils.randFloatSpread(2);
	if(Math.sqrt( (x*x) + (y*y) + (z*z))>1) continue
	vertices.push(x, y, z);
}

let limit = 15
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
	size: 3,
	// color: 0xD6591A
	// ,
	map: sprite1,
	blending: THREE.NormalBlending,
	// stencilWrite: false,
	// depthTest : false,
	// blendDstAlpha: .5,
	depthWrite : false,
	transparent: true
});


const explosion = new THREE.Points(geometry, material);

setInterval(() => {
	explosion.scale.x = 1
	explosion.scale.y = 1
	explosion.scale.z = 1
	explosion.material.opacity = .5
	// explosion.rotation.x = Math.random() * Math.PI*2
	explosion.rotation.y = Math.random() * Math.PI*2
	// explosion.rotation.z = Math.random() * Math.PI*2
	material.size= 3
	// material.color.r = 1
	// material.color.g = 0
	// material.color.b = 0
	// explosion.position.y = 2 
	console.log(explosion.position);
	material.color.setHSL( Math.random(), Math.random(), Math.random() );

}, 1000 *1);


//loop
machine.addCallback(() => {
	explosion.position.set(-5,2,0)
	explosion.scale.x += .01
	explosion.scale.y += .01
	explosion.scale.z += .01
	explosion.material.opacity -= .01
	// explosion.position.y -= .005 
	// explosion.position.z -= .05 
	material.size += 0.05
	explosion.rotation.y -= 0.1 
})

export default explosion