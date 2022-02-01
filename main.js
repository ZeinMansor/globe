import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import './src/index.css';
import atmosphereVertex from './shaders/atmosphereVertex.glsl';
import atmosphereFragment from './shaders/atmosphereFragment.glsl';
import { Float32BufferAttribute } from 'three';

const canvasContainer = document.getElementById('canvas-container');

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




// Create the sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/night_earth.jpg')
      }
    }
  })
);

scene.add(sphere);

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(6, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertex,
    fragmentShader: atmosphereFragment,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  })
);

atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);

const group = new THREE.Group();
group.add(sphere);

scene.add(group);

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


const mouse = {
  x: undefined,
  y: undefined
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sphere.rotation.y += 0.003;

  gsap.to(group.rotation, {
    x: - mouse.y * 0.3  ,
    y: mouse.x * 0.5,
    duration: 2
  })
}

animate();


document.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth ) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
})