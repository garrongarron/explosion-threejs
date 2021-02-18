import LinearSpline from './LinearSpline.js'
import shaders from './Shaders.js'
import camera from '../basic/Camera.js'

class ParticleSystem {
    constructor(params) {
        this._params = params;
        this._off = false
        const uniforms = {
            diffuseTexture: {
                value: new THREE.TextureLoader().load('./resources/' + this._params.texture + '.png')
            },
            pointMultiplier: {
                value: this._params.pointMultiplier
            }
        };

        this._material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: shaders._VS,
            fragmentShader: shaders._FS,
            blending: this._params.blending,
            depthTest: true,
            depthWrite: false,
            // depthTest : false,
            transparent: true,
            vertexColors: true
        });

        this._camera = camera;
        this._particles = [];

        this._geometry = new THREE.BufferGeometry();
        this._geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
        this._geometry.setAttribute('size', new THREE.Float32BufferAttribute([], 1));
        this._geometry.setAttribute('colour', new THREE.Float32BufferAttribute([], 4));
        this._geometry.setAttribute('angle', new THREE.Float32BufferAttribute([], 1));

        this._points = new THREE.Points(this._geometry, this._material);

        params.parent.add(this._points);

        this._alphaSpline = new LinearSpline((t, a, b) => {
            return a + t * (b - a);
        });
        this._alphaSpline.AddPoint(0.0, 0.0);
        this._alphaSpline.AddPoint(0.1, 1.0);
        this._alphaSpline.AddPoint(0.6, 1.0);
        this._alphaSpline.AddPoint(1.0, 0.0);

        this._colourSpline = new LinearSpline((t, a, b) => {
            const c = a.clone();
            return c.lerp(b, t);
        });
        this._colourSpline.AddPoint(0.0, this._params.colors[0]);
        this._colourSpline.AddPoint(1.0, this._params.colors[1]);

        this._sizeSpline = new LinearSpline((t, a, b) => {
            return a + t * (b - a);
        });
        this._sizeSpline.AddPoint(0.0, 1.0);
        this._sizeSpline.AddPoint(0.5, 5.0);
        this._sizeSpline.AddPoint(1.0, 1.0);

        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);

        this._UpdateGeometry();
    }

    _onKeyUp(event) {
        switch (event.keyCode) {
            case 32: // SPACE
                this._AddParticles();
                break;
        }
    }
    off(){
        this._off = true
    }

    _AddParticles(timeElapsed) {
        if (this._off) {
            if (this._particles.length < 1) {
                this._points.geometry.dispose();
                this._points.material.dispose();
                this._params.parent.remove(this._points);
            }
            return
        }

        if (!this.gdfsghk) {
            this.gdfsghk = 0.0;
        }
        this.gdfsghk += timeElapsed;
        const n = Math.floor(this.gdfsghk * this._params.quantity);
        this.gdfsghk -= n / this._params.quantity;
        // console.log(n);
        for (let i = 0; i < n; i++) {
            const life = (Math.random() * 0.75 + 0.25) * this._params.life;
            this._particles.push({
                position: new THREE.Vector3(
                    (Math.random() * 2 - 1) * 1.0,
                    (Math.random() * 2 - 1) * 1.0,
                    (Math.random() * 2 - 1) * 1.0),
                size: (Math.random() * 0.5 + 0.5) * 4.0,
                colour: new THREE.Color(),
                alpha: 1.0,
                life: life,
                maxLife: life,
                rotation: Math.random() * 2.0 * Math.PI,
                velocity: this._params.velocity,
            });

        }
    }

    _UpdateGeometry() {
        const positions = [];
        const sizes = [];
        const colours = [];
        const angles = [];

        for (let p of this._particles) {
            positions.push(p.position.x, p.position.y, p.position.z);
            colours.push(p.colour.r, p.colour.g, p.colour.b, p.alpha);
            sizes.push(p.currentSize);
            angles.push(p.rotation);
        }

        this._geometry.setAttribute(
            'position', new THREE.Float32BufferAttribute(positions, 3));
        this._geometry.setAttribute(
            'size', new THREE.Float32BufferAttribute(sizes, 1));
        this._geometry.setAttribute(
            'colour', new THREE.Float32BufferAttribute(colours, 4));
        this._geometry.setAttribute(
            'angle', new THREE.Float32BufferAttribute(angles, 1));

        this._geometry.attributes.position.needsUpdate = true;
        this._geometry.attributes.size.needsUpdate = true;
        this._geometry.attributes.colour.needsUpdate = true;
        this._geometry.attributes.angle.needsUpdate = true;
    }

    _UpdateParticles(timeElapsed) {

        for (let p of this._particles) {
            p.life -= timeElapsed;
        }
        // let l1 = this._particles.length
        this._particles = this._particles.filter(p => {
            return p.life > 0.0;
        });
        // let l2 = this._particles.length
        // console.log(l1-l2, l2);

        for (let p of this._particles) {
            const t = 1.0 - p.life / p.maxLife;

            p.rotation += timeElapsed * 0.5;
            p.alpha = this._alphaSpline.Get(t);
            p.currentSize = p.size * this._sizeSpline.Get(t);
            p.colour.copy(this._colourSpline.Get(t));
            p.position.add(p.velocity.clone().multiplyScalar(timeElapsed));
        }

        this._particles.sort((a, b) => {
            const d1 = this._camera.position.distanceTo(a.position);
            const d2 = this._camera.position.distanceTo(b.position);

            if (d1 > d2) {
                return -1;
            }

            if (d1 < d2) {
                return 1;
            }

            return 0;
        });
    }

    Step(timeElapsed) {
        this._AddParticles(timeElapsed);
        this._UpdateParticles(timeElapsed);
        this._UpdateGeometry();
    }
}

export default ParticleSystem