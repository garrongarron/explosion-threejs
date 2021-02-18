import { directionalLight, ambientLight } from './basic/Lights.js'
import texture from './basic/Cube.js'
import plane from './objects/Plane.js'
import box from './objects/Box.js'
import fire from './particles/ParticleSystemDemo.js'

import explosion, { trigger as triggerExplosion } from './particles/ExplosionController.js'
import particles, { trigger as triggerParticles } from './particles/ParticlesController.js'


const scene = new THREE.Scene();

scene.add(directionalLight);
scene.add(ambientLight);

scene.add(plane);
scene.add(box);


setTimeout(() => {
    triggerExplosion(scene)//scene.add(explosion)
    triggerParticles(scene)//scene.add(particles)
    box.geometry.dispose();
    box.material.dispose();
    scene.remove(box);
}, 1000 * 4);


setTimeout(() => {
    let fire1 = fire(scene)
    let fire2 = fire(scene, true)
}, 1000*2);

scene.background = texture;

export default scene