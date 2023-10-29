import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
async function loadModelAsync(url) {
    const loader = new GLTFLoader();
    let model = await loader.loadAsync(url.href);
    let mesh = model.scene;
    return mesh;
    // loader.loadAsync(
    //     url.href,
    //     (data) => {
    //         const model = data.scene;
    //         return model;
    //     },
    //     undefined,
    //     (err) => {
    //         console.error(err);
    //         return null;
    //     }
    // );
}

export function getMeshFromModel(model) {
    let mesh = model.scene.children[0];
    return mesh;
}

export { loadModelAsync };