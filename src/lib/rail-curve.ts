import * as THREE from "three";

export const railCurve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, 9),
    new THREE.Vector3(8, 0, 6),
    new THREE.Vector3(11, 0, 0),
    new THREE.Vector3(8, 0, -6),
    new THREE.Vector3(0, 0, -9),
    new THREE.Vector3(-8, 0, -6),
    new THREE.Vector3(-11, 0, 0),
    new THREE.Vector3(-8, 0, 6),
  ],
  true,
  "centripetal",
  0.5,
);

export const RAIL_GAUGE = 1.435;
export const SPEED = 0.01;
export const TRAIN_OFFSET = 0.05;
export const trainT = { current: 0 };
