import * as THREE from "three";
const MOVEMENT_SPEED = 0.1;
const MOVEMENT = 1;

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

let targetX = cube.position.x;
let targetY = cube.position.y;

addEventListener("keydown", (event) => {
  const key = event.key;

  let x = cube.position.x;
  let y = cube.position.y;

  if (key === "ArrowUp") {
    targetY += MOVEMENT;
  } else if (key === "ArrowDown") {
    targetY -= MOVEMENT;
  } else if (key === "ArrowRight") {
    targetX += MOVEMENT;
  } else if (key === "ArrowLeft") {
    targetX -= MOVEMENT;
  }
});

function animate() {
  updatePositions();

  renderer.render(scene, camera);
}

function updatePositions() {
  let x = cube.position.x;
  let y = cube.position.y;

  if (x !== targetX && Math.abs(x - targetX) < MOVEMENT_SPEED) {
    cube.position.x = targetX;
    cube.position.needsUpdate = true;
  } else if (x < targetX) {
    cube.position.x += MOVEMENT_SPEED;
    cube.position.needsUpdate = true;
  } else if (x > targetX) {
    cube.position.x -= MOVEMENT_SPEED;
    cube.position.needsUpdate = true;
  }

  if (y !== targetY && Math.abs(y - targetY) < MOVEMENT_SPEED) {
    cube.position.y = targetY;
    cube.position.needsUpdate = true;
  } else if (y < targetY) {
    cube.position.y += MOVEMENT_SPEED;
    cube.position.needsUpdate = true;
  } else if (y > targetY) {
    cube.position.y -= MOVEMENT_SPEED;
    cube.position.needsUpdate = true;
  }
}
