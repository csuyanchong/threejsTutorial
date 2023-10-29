import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadModelAsync } from './modelLoader';

// 导入资源
const birdModelUrl = new URL("../../res/models/phoenix_bird/phoenix_bird.glb", import.meta.url);
const pandaModelUrl = new URL("../../res/models/panda/kung_fu_panda_po_v2.glb", import.meta.url);

// three

// scene
const scene = new THREE.Scene();

// 射线投射，用于拾取
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

mainAsync();

async function mainAsync() {


    const canvas = document.querySelector("#canvas3d");

    const render = this.render = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });

    //渲染器设置
    render.setSize(window.innerWidth, window.innerHeight);
    render.shadowMap.enabled = true;
    render.shadowMap.type = THREE.PCFSoftShadowMap;

    // --灯光相关管理--

    // 环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // 平行光
    const lightDir = new THREE.DirectionalLight(0xffffff, 2);
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
    let box = this.box = new THREE.Mesh(geometryBox, matBox);
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

    // 加载自定义模型   
    await addDefinedModelsAsync();

    // const bird = await loadModelAsync(birdModelUrl);
    // if (bird) {
    //     console.log(bird);
    //     bird.scale.set(0.001, 0.001, 0.001);
    //     bird.position.set(3, 1, 2);
    //     scene.add(bird);
    // }
    // const loader = new GLTFLoader();
    // loader.load(
    //     birdModelUrl.href,
    //     (data) => {
    //         const model = data.scene;
    //         console.log(model);
    //         scene.add(model);
    //         model.scale.set(0.001, 0.001, 0.001);
    //         model.position.set(3, 1, 2);
    //     },
    //     undefined,
    //     (err) => {
    //         console.error(err);
    //     }
    // );

    // 加载功夫熊猫


    // camera.position.z = 5;
    // camera.position.y = 2;
    // render.setAnimationLoop(animateBox);
    render.setAnimationLoop(() => {
        // box.rotation.x += 0.01;
        // box.rotation.y = time / 1000;
        box.rotation.y += 0.01;

        // 射线投射
        // raycastStuff(raycaster, camera);
        // console.log(intersects);
        render.render(scene, camera);
    });

    // 注册鼠标移动事件
    window.addEventListener("pointermove", onPointerMover);

    // 窗口变化事件
}

async function addDefinedModelsAsync() {
    console.log("loading models...");
    await addBirdAsync();

    await addPandaAsync();
};

async function addBirdAsync() {
    const bird = await loadModelAsync(birdModelUrl);
    if (bird) {
        console.log(bird);
        bird.scale.set(0.001, 0.001, 0.001);
        bird.position.set(3, 1, 2);
        // TODO: 播放动画
        scene.add(bird);
    }
}

async function addPandaAsync() {
    const panda = await loadModelAsync(pandaModelUrl);
    if (panda) {
        console.log(panda);
        panda.scale.set(1, 1, 1);
        panda.position.set(2, 0.005, 0);

        // 投射阴影
        panda.traverse((node) => {
            if (node instanceof THREE.Mesh) {
                console.log(node);
                node.castShadow = true;
            }
        });

        scene.add(panda);
    }
}

function animateBox(time, frame) {
    // box.rotation.x += 0.01;
    // box.rotation.y = time / 1000;
    this.box.rotation.y += 0.01;

    // 射线投射
    // raycastStuff(raycaster, camera);
    // console.log(intersects);
    this.render.render(scene, camera);
}

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
