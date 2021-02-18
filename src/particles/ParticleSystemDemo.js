import ParticleSystem from './ParticleSystem.js'
import machine from '../basic/Machine.js'
import {getDelta} from '../basic/Clock.js'


let textureArr = [
    'smokeparticle', 
    'fire'
]
let blendingArr = [
    THREE.NormalBlending,
    THREE.AdditiveBlending
]
let params1 = {
    parent: null,
    life: 1,
    pointMultiplier: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))/2,//15,
    quantity: 50,
    texture: textureArr[1],
    blending: blendingArr[0],
    velocity: new THREE.Vector3(0, 5, 0),
    colors:[ new THREE.Color(0xFFFF80),new THREE.Color(0xFF8080) ]
}
let params2 = {
    parent: null,
    life: 3,
    pointMultiplier: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))/3,//280 *15,
    quantity: 15,
    texture: textureArr[0],
    blending: blendingArr[0],
    velocity: new THREE.Vector3(0, 5, 0),
    colors:[ new THREE.Color(0x000000),new THREE.Color(0xcccccc) ]
}
let setFire = (scene, flag)=>{
    let ps
    let params = params1
    if(flag){
        params = params2    
    }
    
    params.parent = scene
    ps = new ParticleSystem(params);
    machine.addCallback(()=>{
        if(ps){
            ps.Step(getDelta());
        }
    })
    setTimeout(() => {
        ps.off()
    }, 1000*2);
    return ps._points
}




export default setFire