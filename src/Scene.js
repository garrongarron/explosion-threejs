import { directionalLight, ambientLight, point as pl } from './basic/Lights.js'
import explosion from './objects/ExplosionController.js'
// import explosion2 from './objects/ExplosionController2.js'
import particles from './objects/ParticlesController.js'
import box from './objects/Box.js'
// import buffer from './objects/BufferGeometryExample.js'

const scene = new THREE.Scene();

//lights
scene.add(directionalLight);
scene.add(ambientLight);
scene.add(pl);


//Box
scene.add(box)
scene.add(explosion);
// scene.add(explosion2);

scene.add(particles);
// scene.add(buffer)


export default scene