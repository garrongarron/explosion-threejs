const fov = 60;
const aspect = screen.width / screen.height; //1920 / 1080;
const near = 1.0;
const far = 1000.0;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 12, 25);
// camera.lookAt(0,0,0);

export default camera