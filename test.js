import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initial cube
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var initialCube = new THREE.Mesh(geometry, material);
scene.add(initialCube);

// Set up the camera position
camera.position.z = 4;
camera.position.y = 1;
camera.position.x = 0;


// Array to store additional cubes
var additionalCubes = [];

// Function to add a new cube and attach it to the initial cube
function addCube() {
    const newCube = new THREE.Mesh(geometry.clone(), material.clone()); // Use a cloned material to avoid sharing color
    newCube.position.set(0,0,1); // Position relative to the initial cube
    additionalCubes.push(newCube);
    scene.add(newCube);
}

// Function to scale the selected cube independently
function scaleSelectedCube(scaleX, scaleY, scaleZ) {
    var selectedCube = additionalCubes[additionalCubes.length - 1]; // Select the last added cube
    if (selectedCube) {
        selectedCube.scale.set(scaleX, scaleY, scaleZ);
        renderer.render(scene, camera);
    }
}

// Add button to add cubes
var addButton = document.getElementById('addCubeButton');
addButton.addEventListener("click", addCube);

// Add input fields to scale the last added cube
var scaleXInput = document.getElementById('NRangeX');
var scaleYInput = document.getElementById('NRangeY');
var scaleZInput = document.getElementById('NRangeZ');

scaleXInput.addEventListener("input", function (e) {
    scaleSelectedCube(parseFloat(e.target.value), 1, 1);
});

scaleYInput.addEventListener("input", function (e) {
    scaleSelectedCube(1, parseFloat(e.target.value), 1 /500);
});

scaleZInput.addEventListener("input", function (e) {
    scaleSelectedCube(1, 1, parseFloat(e.target.value));
});

// Render the scene
renderer.render(scene, camera);