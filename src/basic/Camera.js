const fov = 40;
const aspect = screen.width / screen.height; //1920 / 1080;
const near = .1;
const far = 1000.0;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 2, 15);

export default camera