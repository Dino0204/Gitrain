import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { railCurve, trainT, TRAIN_OFFSET } from "@/lib/rail-curve";

const _pos = new THREE.Vector3();
const _tangent = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _forward = new THREE.Vector3(1, 0, 0);

export function TrainEngine() {
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef<number>(0.05);
  const yOffsetRef = useRef<number>(0);
  const { scene } = useGLTF("/engine.glb");

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const t = (((trainT.current - TRAIN_OFFSET) % 1) + 1) % 1;

    railCurve.getPoint(t, _pos);
    railCurve.getTangent(t, _tangent).normalize();
    _quat.setFromUnitVectors(_forward, _tangent);

    group.position.copy(_pos);
    group.position.y += yOffsetRef.current;
    group.quaternion.copy(_quat);
    group.scale.setScalar(scaleRef.current);
  });

  return (
    <group ref={groupRef} scale={0.05}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/engine.glb");
