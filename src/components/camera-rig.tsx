import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { railCurve, SPEED } from "@/lib/rail-curve";

const _pos = new THREE.Vector3();
const _lookAt = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);

export function CameraRig() {
  const { camera } = useThree();
  const tRef = useRef(0);

  useFrame((_state, delta) => {
    tRef.current = (tRef.current + SPEED * delta * 60) % 1;

    railCurve.getPoint(tRef.current, _pos);
    railCurve.getPoint((tRef.current + 0.03) % 1, _lookAt);

    camera.position.set(_pos.x, _pos.y + 2.8, _pos.z);
    camera.up.copy(_up);
    camera.lookAt(_lookAt.x, _lookAt.y + 2.8, _lookAt.z);
  });

  return null;
}
