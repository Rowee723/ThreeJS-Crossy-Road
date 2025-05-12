import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { DirectionalLight } from "./components/DirectionalLight";
import { initializePlayer, player } from "./components/Player";
import { map, initializeMap } from "./components/Map";
import { animateVehicles } from "./animation/animateVehicles";
import { animatePlayer } from "./animation/animatePlayer";
import { hitCheck } from "./utilities/hitChecker";
import "./style.css";
import "./userInput";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const directionalLight = DirectionalLight();
directionalLight.target = player;
player.add(directionalLight);

const camera = Camera();
player.add(camera);

const scoreDOM = document.getElementById("score");
const resultDOM = document.getElementById("result-container");

initializeGame();

document
  .querySelector("#retry")
  ?.addEventListener("click", initializeGame);

function initializeGame(){
  initializePlayer();
  initializeMap();

  if (scoreDOM) scoreDOM.innerText = "0";
  if (resultDOM) resultDOM.style.visibility = "hidden";
}

const renderer = Renderer();
renderer.setAnimationLoop(animate);

function animate(){
  animateVehicles();
  animatePlayer();
  hitCheck();

  renderer.render(scene, camera);
}