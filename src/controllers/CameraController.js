import camera from '../basic/Camera.js'
// import box from '../objects/Box.js'
import point from '../objects/ExplosionController.js'
import machine from '../basic/Machine.js'
// let box
point.position.set(0, 0, 0)
camera.lookAt(0,0,0)
// camera.lookAt(0, 0, 0)
machine.addCallback(()=>{
    // if(point)
    // camera.lookAt(point.position)
})
