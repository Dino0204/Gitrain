import * as THREE from "three";

export const railCurve = new THREE.CatmullRomCurve3(
  [
    // 직선 구간 (상단, Z = +18)
    new THREE.Vector3(-25, 0, 18),
    new THREE.Vector3(0, 0, 18),
    new THREE.Vector3(25, 0, 18),
    // 우측 완만한 커브
    new THREE.Vector3(36, 0, 12),
    new THREE.Vector3(40, 0, 0),
    new THREE.Vector3(36, 0, -12),
    // 직선 구간 (하단, Z = -18)
    new THREE.Vector3(25, 0, -18),
    new THREE.Vector3(0, 0, -18),
    new THREE.Vector3(-25, 0, -18),
    // 좌측 완만한 커브
    new THREE.Vector3(-36, 0, -12),
    new THREE.Vector3(-40, 0, 0),
    new THREE.Vector3(-36, 0, 12),
  ],
  true,
  "centripetal",
  0.5,
);

export const RAIL_GAUGE = 1.435;
export const SPEED = 0.001;
export const TRAIN_OFFSET = 0.05;
export const trainT = { current: 0 };
