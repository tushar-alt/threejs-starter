/**
 * main.js -- 3D Phone Viewer
 *
 * Sets up a Three.js scene to display a Samsung Galaxy S21 Ultra FBX model
 * with orbit controls, PBR materials, and dynamic lighting.
 */

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

// ---------------------------------------------------------------------------
// Scene
// ---------------------------------------------------------------------------
const scene = new THREE.Scene();

// ---------------------------------------------------------------------------
// Camera
// Perspective camera with a 60-degree FOV positioned to frame the phone model
// ---------------------------------------------------------------------------
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-2.78, 1.044, 1.425);
camera.rotation.set(0.016, -0.629, 0.009);
scene.add(camera);

// Axes helper -- useful for debugging; kept commented out
const axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

// ---------------------------------------------------------------------------
// Lights
// Two orbiting point lights for dynamic highlights, plus two opposing
// directional lights to fill in shadows from both sides.
// ---------------------------------------------------------------------------
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 0.5, 5);
scene.add(light);

const light1 = new THREE.PointLight(0xffffff, 1, 100);
light1.position.set(5, 0.5, 5);
scene.add(light1);

// Point-light helpers (commented out -- enable for debugging)
const sphereSize = 0.1;
const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
//scene.add(pointLightHelper);

const sphereSize2 = 0.1;
const pointLightHelper1 = new THREE.PointLightHelper(light1, sphereSize2);
//scene.add(pointLightHelper1);

// Directional lights from opposite sides for even illumination
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(5, 0, 0);
scene.add(dl);

const dl2 = new THREE.DirectionalLight(0xffffff, 1);
dl2.position.set(-5, 0, 0);
scene.add(dl2);

// ---------------------------------------------------------------------------
// Model Loader
// Loads the FBX model and applies materials once loading is complete.
// ---------------------------------------------------------------------------
const loadingmanager = new THREE.LoadingManager();
let obj = new THREE.Object3D();

const loader = new FBXLoader(loadingmanager);
loader.load("data/pp5.fbx", (fbx) => {
  // Rotate and scale the model so it appears upright and at a reasonable size
  fbx.rotation.y = -Math.PI / 2;
  fbx.scale.multiplyScalar(0.02);
  console.log(obj);
  fbx.position.set(0, 0, 0);
  obj = fbx;
});

// ---------------------------------------------------------------------------
// Materials for model parts
// Each material targets a specific mesh in the phone model by name.
// ---------------------------------------------------------------------------

/** Back panel -- flat-shaded noise texture */
const texture = new THREE.TextureLoader().load("data/noise.png", (tex) => {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
});
const materialb = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: texture,
  flatShading: true,
});

/** Frame (S21ULTRA mesh) -- metallic silver */
const materialp = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  roughness: 0.224,
  metalness: 0.7,
});

/** Camera module frame -- noise texture with moderate metalness */
const texturecmf = new THREE.TextureLoader().load("data/noise.png", (tex) => {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
});
const materialcmf = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: texturecmf,
  roughness: 0.4,
  metalness: 0.3,
});

/** Camera lens borders -- shared texture, lower metalness */
const materialcm = new THREE.MeshStandardMaterial({
  map: texturecmf,
  side: THREE.DoubleSide,
  roughness: 0.5,
  metalness: 0,
});

/** Logo at the back -- fully metallic white */
const materiallogo = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  metalness: 1,
  roughness: 0,
  color: 0xffffff,
});

/** Third camera lens -- black, highly metallic */
const materialcam3 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  color: 0x000000,
  roughness: 0.3,
  metalness: 1,
});

/** Screen -- displays a wallpaper texture */
const textscreen = new THREE.TextureLoader().load(
  "data/wallpaper.png",
  (tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  }
);
const materialscreen = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  roughness: 0.6,
  metalness: 1,
  map: textscreen,
});

/** Front camera lens -- uses the cam2 texture */
const textfcam = new THREE.TextureLoader().load("data/cam2.png", (tex) => {});
const materialcamfront = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: textfcam,
  roughness: 0,
  metalness: 1,
});

// ---------------------------------------------------------------------------
// Assign materials after the model finishes loading
// ---------------------------------------------------------------------------
loadingmanager.onLoad = function () {
  obj.traverse(function (child) {
    if (child.isMesh) {
      console.log(child.name);

      // Map each mesh name to its corresponding material
      if (child.name == "Back") {
        child.material = materialb;
      }
      if (child.name === "S21ULTRA") {
        child.material = materialp;
      }
      if (child.name === "CamModuleFrame") {
        child.material = materialcmf;
      }
      if (child.name === "CamModule") {
        child.material = materialcm;
      }
      if (child.name === "Logo") {
        child.material = materiallogo;
      }
      if (child.name === "Camera3") {
        child.material = materialcam3;
      }
      if (child.name === "Screen") {
        child.material = materialscreen;
      }
      if (child.name === "ScreenBezel") {
        child.material = materialcmf;
      }
      if (child.name === "PowerButton") {
        child.material = materialcmf;
      }
      if (child.name === "FrontCamera") {
        child.material = materialcamfront;
      }
      if (child.name === "LensFC") {
        child.material = materialcamfront;
      }
    }
  });

  scene.add(obj);
  console.log("Loading complete!");
};

// ---------------------------------------------------------------------------
// Renderer & Controls
// ---------------------------------------------------------------------------
const canvas = document.getElementById("web");
const controller = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Listen for window resize to keep the viewport in sync
window.addEventListener("resize", onWindowResize, false);

// Start the render loop
animate();

// ---------------------------------------------------------------------------
// Animation Loop
// Continuously orbits the two point lights around the model and re-renders.
// ---------------------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  // Orbit the point lights in opposite directions for dynamic highlights
  light.position.x = 2 * Math.cos(Date.now() * 0.0002);
  light.position.z = 2 * Math.sin(Date.now() * 0.0002);
  light1.position.x = -2 * Math.sin(Date.now() * 0.0002);
  light1.position.z = -2 * Math.cos(Date.now() * 0.0002);

  renderer.render(scene, camera);
}

// ---------------------------------------------------------------------------
// Resize Handler
// Updates camera aspect ratio and renderer size when the window is resized.
// ---------------------------------------------------------------------------
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}


