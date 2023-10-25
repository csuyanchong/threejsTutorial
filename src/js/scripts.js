import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const render = new THREE.WebGLRenderer();

render.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(render.domElement);

// scene
const scene = new THREE.Scene();


// axes
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// grid helper
const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

// box
let geometryBox = new THREE.BoxGeometry(1);
let matBox = new THREE.MeshBasicMaterial({ color: '#00ff00' });
let box = new THREE.Mesh(geometryBox, matBox);
scene.add(box);

// box.rotation.x = 5;
// box.rotation.y = 5;
// camera

// plane
let planeGeometry = new THREE.PlaneGeometry(10, 10);
let planeMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    side: THREE.DoubleSide
});

let plane = new THREE.Mesh(planeGeometry, planeMat);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 30, 30);

const orbitControl = new OrbitControls(camera, render.domElement);
orbitControl.update();

// camera.position.z = 5;
// camera.position.y = 2;
render.setAnimationLoop(animateBox);

function animateBox(time, frame) {
    // box.rotation.x += 0.01;
    // box.rotation.y = time / 1000;
    box.rotation.y += 0.01;
    render.render(scene, camera);
}
