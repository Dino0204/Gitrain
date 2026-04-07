import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { railCurve, trainT, TRAIN_OFFSET } from "@/lib/rail-curve";

const CAR_KEYS = ["engine", "front", "mid", "rear"] as const;
const SCALE = 0.05;

export function TrainEngine() {
  const { nodes } = useGLTF("/hsr_train.glb");
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  const offsetsRef = useRef<number[] | null>(null);
  if (offsetsRef.current === null) {
    const curveLength = railCurve.getLength();
    const engineX = nodes.engine.position.x;
    offsetsRef.current = CAR_KEYS.map((key) => {
      const dx = Math.abs(nodes[key].position.x - engineX);
      return TRAIN_OFFSET + (dx * SCALE * 0.8) / curveLength;
    });
  }

  const offsets = offsetsRef.current;

  useEffect(() => {
    CAR_KEYS.forEach((key) => {
      nodes[key].position.set(0, 0, 0);
    });
  }, [nodes]);

  const _pos = useRef(new THREE.Vector3());
  const _tangent = useRef(new THREE.Vector3());
  const _quat = useRef(new THREE.Quaternion());
  const _forward = useRef(new THREE.Vector3(1, 0, 0));

  useFrame(() => {
    groupRefs.current.forEach((group, i) => {
      if (!group) return;

      const t = (((trainT.current - offsets[i]) % 1) + 1) % 1;

      railCurve.getPointAt(t, _pos.current);
      railCurve.getTangentAt(t, _tangent.current).normalize();
      _quat.current.setFromUnitVectors(_forward.current, _tangent.current);

      group.position.copy(_pos.current);
      group.quaternion.copy(_quat.current);
      group.scale.setScalar(SCALE);
    });
  });

  return (
    <>
      {CAR_KEYS.map((key, i) => (
        <group
          key={key}
          ref={(el) => {
            groupRefs.current[i] = el;
          }}
        >
          <primitive object={nodes[key]} />
        </group>
      ))}
    </>
  );
}

useGLTF.preload("/hsr_train.glb");
