import * as THREE from 'three';

const canvasContainer = document.getElementById('hero-content');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  canvasContainer.offsetWidth / canvasContainer.offsetHeight,
  0.1,
  1000
);

camera.position.z = 12;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById('canvas-2')
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(canvasContainer.offsetWidth , canvasContainer.offsetHeight);


// stars 

const starsVertices = []

for (let i = 0; i < 5000; i++) {
  const x = (Math.random() - 0.5) * 1500;
  const y = (Math.random() - 0.5) * 1500;
  const z = -Math.random() * 1500;  
  starsVertices.push(x, y, z)
}

const starGeometry = new THREE.BufferGeometry();

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));  

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
});

const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(stars);



function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

animate();


