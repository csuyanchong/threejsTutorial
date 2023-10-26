import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const render = new THREE.WebGLRenderer();
document.body.appendChild(render.domElement);

//渲染器设置
render.setSize(window.innerWidth, window.innerHeight);
render.shadowMap.enabled = true;
render.shadowMap.type = THREE.PCFSoftShadowMap;

// scene
const scene = new THREE.Scene();

// --灯光相关管理--

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// 平行光
const lightDir = new THREE.DirectionalLight(0xffffff, 1);
lightDir.castShadow = true;
lightDir.position.set(-4, 4, 4);
scene.add(lightDir);

// 增加平行光帮助器
// const helperLightDir = new THREE.DirectionalLightHelper(lightDir, 1);
// scene.add(helperLightDir);

// 坐标轴帮助器
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

// grid helper
// const gridHelper = new THREE.GridHelper();
// scene.add(gridHelper);

// 创建立方体盒子
let geometryBox = new THREE.BoxGeometry(1);
let matBox = new THREE.MeshStandardMaterial({ color: '#00ff00' });
let box = new THREE.Mesh(geometryBox, matBox);
box.name = "box";
box.position.set(0, 0.6, 0);
box.castShadow = true;
scene.add(box);

// box.rotation.x = 5;
// box.rotation.y = 5;
// camera

// 创建平面
let planeGeometry = new THREE.PlaneGeometry(10, 10);
let planeMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    side: THREE.DoubleSide
});

let plane = new THREE.Mesh(planeGeometry, planeMat);
plane.name = "plane";
plane.rotation.x = -Math.PI / 2;
plane.receiveShadow = true;
scene.add(plane);

// 创建一个球体
const sphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMat = new THREE.MeshStandardMaterial({
    color: 0x00ffff
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.name = "sphere";
sphere.position.set(2, 0.6, 2);
sphere.castShadow = true;
scene.add(sphere);

// 创建一个圆柱
const cylinderGeo = new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 12);
const cylinderMat = new THREE.MeshStandardMaterial({
    color: 0xffff00
});
const cylinder = new THREE.Mesh(cylinderGeo, cylinderMat);
cylinder.name = "cylinder";
cylinder.position.set(-2, 0.51, 2);
cylinder.castShadow = true;
scene.add(cylinder);


// 创建相机
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(6, 6, 6);

// 相机控制器
const orbitControl = new OrbitControls(camera, render.domElement);
orbitControl.update();

// 射线投射，用于拾取
let pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

// camera.position.z = 5;
// camera.position.y = 2;
render.setAnimationLoop(animateBox);

function animateBox(time, frame) {
    // box.rotation.x += 0.01;
    // box.rotation.y = time / 1000;
    box.rotation.y += 0.01;

    // 射线投射
    raycastStuff(raycaster, camera);
    // console.log(intersects);
    render.render(scene, camera);
}


// 注册鼠标移动事件
window.addEventListener("pointermove", onPointerMover);

function onPointerMover(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // console.log(pointer);
}

function raycastStuff(raycaster, camera) {
    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        let hitObj = intersects[i].object;
        // console.log(hitObj.name);
    }
}