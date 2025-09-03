import * as THREE from "three";
const MOVEMENT_SPEED = 0.1;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, // FOV
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near
  1000, // Far
);

camera.position.set(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Light.
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(1, 5, 3);
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);

// Cube.
const loader = new THREE.TextureLoader();
const texture = loader.load("/potato.jpg");
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: texture,
});
const geometry = new THREE.BoxGeometry(1, 1, 1);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

addEventListener("keydown", (event) => {
  const key = event.key;
  const positionAttribute = cube.geometry.getAttribute("position");

  for (let i = 0; i < positionAttribute.count; i++) {
    let x = positionAttribute.getX(i);
    let y = positionAttribute.getY(i);
    if (key === "ArrowUp") {
      y += MOVEMENT_SPEED;
      positionAttribute.setY(i, y);
    } else if (key === "ArrowDown") {
      y -= MOVEMENT_SPEED;
      positionAttribute.setY(i, y);
    } else if (key === "ArrowRight") {
      x += MOVEMENT_SPEED;
      positionAttribute.setX(i, x);
    } else if (key === "ArrowLeft") {
      x -= MOVEMENT_SPEED;
      positionAttribute.setX(i, x);
    }
  }

  cube.geometry.setAttribute("position", positionAttribute);
  positionAttribute.needsUpdate = true;
});

function animate() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
