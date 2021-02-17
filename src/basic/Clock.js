import machine from './Machine.js'

let clock = new THREE.Clock();
let n = 0
machine.addCallback(() => {
    n = clock.getDelta();
    clock.delta = n
})

let getDelta = () => {
    return n
}

export { clock, getDelta }