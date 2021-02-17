let on = true
class Machine {
    constructor() {
        this.callbacks = []
    }
    addCallback(callback) {
        if (typeof callback === 'function') {
            this.callbacks.push(callback)
        }
    }
    run() {
        machine.callbacks.forEach(func => func())
        if (on) {
            requestAnimationFrame(machine.run)
        }
    }

    off() {
        on = false
    }
    on() {
        on = true
        this.run()
    }
}

const machine = new Machine()
export default machine