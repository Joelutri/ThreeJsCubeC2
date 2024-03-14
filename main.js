import * as THREE from 'three';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { makeClipAdditive } from 'three/src/animation/AnimationUtils';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const originalCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
scene.add(originalCube);

camera.position.z = 5;

// Range inputs for rotating the original cube
document.getElementById('RangeX').addEventListener("input", function (e) {
    originalCube.rotation.x = e.target.value / 50;
    renderer.render(scene, camera);
});

document.getElementById('RangeY').addEventListener("input", function (e) {
    originalCube.rotation.y = e.target.value / 50;
    renderer.render(scene, camera);
});

document.getElementById('RangeZ').addEventListener("input", function (e) {
    originalCube.rotation.z = e.target.value / 50;
    renderer.render(scene, camera);
});

// Resizing Range Inputs for the original cube
document.getElementById('RangeWX').addEventListener("input", function (e) {
    originalCube.scale.x = e.target.value / 50;
    renderer.render(scene, camera);
});

document.getElementById('RangeWY').addEventListener("input", function (e) {
    originalCube.scale.y = e.target.value / 50;
    renderer.render(scene, camera);
});

document.getElementById('RangeWZ').addEventListener("input", function (e) {
    originalCube.scale.z = e.target.value / 50;
    renderer.render(scene, camera);
});

document.getElementById('addCubeButton').addEventListener("click", function () {
    const newCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    newCube.position.set(1, 0, 0); 
    originalCube.add(newCube);

    const newCubeControls = new THREE.Object3D();
    originalCube.add(newCubeControls);
    newCubeControls.add(newCube);

    // Width inputs for the newCube
    document.getElementById('NRangeX').addEventListener("input", function (e) {
        newCubeControls.scale.x = e.target.value / 50;
        renderer.render(scene, camera);
    });

    document.getElementById('NRangeY').addEventListener("input", function (e) {
        newCubeControls.scale.y = e.target.value / 50;
        renderer.render(scene, camera);
    });

    document.getElementById('NRangeZ').addEventListener("input", function (e) {
        newCubeControls.scale.z = e.target.value / 50;
        renderer.render(scene, camera);
    });

    renderer.render(scene, camera);
});

renderer.render(scene, camera);