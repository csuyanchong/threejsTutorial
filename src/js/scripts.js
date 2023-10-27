import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as DAT from 'dat.gui';
// import * as HDRLOADER from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import * as textureBox from '../../res/texture/water.jpg';

const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFSoftShadowMap;
render.setClearColor(0x00000f);

document.body.appendChild(render.domElement);

// scene
const scene = new THREE.Scene();

// light
let ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

let directLight = new THREE.DirectionalLight(0Xffffff, 1.2);
directLight.position.set(-10, 10, 5);
directLight.castShadow = true;
scene.add(directLight);

const directLightHelper = new THREE.DirectionalLightHelper(directLight, 1);
scene.add(directLightHelper);

let spotLight = new THREE.SpotLight(0xff0000, 50, 5);
spotLight.position.set(0, 3, 0);
spotLight.castShadow = true;
spotLight.angle = Math.PI / 6;
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

// shadow camera helper
// const shadowHelper = new THREE.CameraHelper(directLight.shadow.camera);
// scene.add(shadowHelper);

// axes
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// grid helper
// const gridHelper = new THREE.GridHelper();
// scene.add(gridHelper);

// sky

// scene.background = new THREE.CubeTextureLoader()
//     .setPath("res/texture/background/")
//     .load()
// box
let geometryBox = new THREE.BoxGeometry(1);
let matBox = new THREE.MeshStandardMaterial({ color: '#00ff00' });
let box = new THREE.Mesh(geometryBox, matBox);
box.castShadow = true;
box.position.set(0, 1, 0);
scene.add(box);

// box.rotation.x = 5;
// box.rotation.y = 5;

// box with texture
let geometryBox2 = new THREE.BoxGeometry(1);

const textureBox2 = new THREE.TextureLoader().load(textureBox);

let matBox2 = new THREE.MeshStandardMaterial({ map: textureBox2 });
let box2 = new THREE.Mesh(geometryBox2, matBox2);
box2.castShadow = true;
box2.position.set(-2, 1, 2);
scene.add(box2);

// plane
let planeGeometry = new THREE.PlaneGeometry(10, 10);
let planeMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    side: THREE.DoubleSide
});

let plane = new THREE.Mesh(planeGeometry, planeMat);
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// sphere
let sphereGeo = new THREE.SphereGeometry(1, 32, 32);
let sphereMat = new THREE.MeshStandardMaterial({
    color: "#0000ff",
    wireframe: false
});
let sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(0, 0, 2);
sphere.castShadow = true;
scene.add(sphere);

// cylinder
let cylinderGeo = new THREE.CylinderGeometry(1, 1, 2);
let cylinderMat = new THREE.MeshStandardMaterial({
    color: "#ffff01"
});
let cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
cylinder.position.set(-2, 1, -2);
cylinder.castShadow = true;
scene.add(cylinder);

const options = {
    sphereColor: "#ffea00",
    wireframe: false,
    speed: 0.01
};

const gui = new DAT.GUI();
gui.addColor(options, "sphereColor").onChange((e) => {
    sphere.material.color.set(e);
});
gui.add(options, "wireframe").onChange((e) => {
    sphere.material.wireframe = e;
});

gui.add(options, "speed", 0, 0.1).onChange((e) => {
    speed = e;
});

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 10, 10);

const orbitControl = new OrbitControls(camera, render.domElement);
orbitControl.update();

// camera.position.z = 5;
// camera.position.y = 2;
render.setAnimationLoop(animateBox);

let step = 0;
let speed = 0.01;

function animateBox(time, frame) {
    // box.rotation.x += 0.01;
    // box.rotation.y = time / 1000;
    box.rotation.y += 0.01;

    step += speed;
    sphere.position.y = 5 * Math.abs(Math.sin(step));
    render.render(scene, camera);
}

// 监听窗口事件
window.addEventListener("resize", resizeWindow);

function resizeWindow(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
}