import { useRef, useEffect } from "react";
import * as THREE from "three";
import { railCurve } from "@/lib/rail-curve";

const TREE_COUNT = 400;
const TRUNK_COUNT = 400;

const foliageGeo = new THREE.ConeGeometry(2.2, 7, 7);
const foliageMat = new THREE.MeshStandardMaterial({
  color: "#2a5c1a",
  roughness: 0.9,
});

const trunkGeo = new THREE.CylinderGeometry(0.25, 0.38, 2.5, 7);
const trunkMat = new THREE.MeshStandardMaterial({
  color: "#5c3a1a",
  roughness: 0.95,
});

// 나무 위치 미리 계산 (모듈 스코프)
interface TreeTransform {
  position: THREE.Vector3;
  scale: number;
}

const treeTransforms: TreeTransform[] = [];
const rng = { seed: 42 };

function rand(): number {
  rng.seed = (rng.seed * 1664525 + 1013904223) & 0xffffffff;
  return (rng.seed >>> 0) / 0xffffffff;
}

for (let i = 0; i < TREE_COUNT; i++) {
  const t = rand();
  const base = railCurve.getPoint(t);
  const side = rand() > 0.5 ? 1 : -1;
  const dist = 8 + rand() * 55;
  const tangent = railCurve.getTangent(t);
  const perp = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

  treeTransforms.push({
    position: new THREE.Vector3(
      base.x + perp.x * side * dist,
      base.y,
      base.z + perp.z * side * dist,
    ),
    scale: 0.7 + rand() * 0.9,
  });
}

export function Trees() {
  const foliageRef = useRef<THREE.InstancedMesh>(null);
  const trunkRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const foliage = foliageRef.current;
    const trunk = trunkRef.current;
    if (!foliage || !trunk) return;

    const dummy = new THREE.Object3D();

    treeTransforms.forEach(({ position, scale }, i) => {
      // 나뭇잎 (위쪽)
      dummy.position.set(position.x, position.y + scale * 4.5, position.z);
      dummy.scale.setScalar(scale);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      foliage.setMatrixAt(i, dummy.matrix);

      // 나무 기둥 (아래쪽)
      dummy.position.set(position.x, position.y + scale * 1.2, position.z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      trunk.setMatrixAt(i, dummy.matrix);
    });

    foliage.instanceMatrix.needsUpdate = true;
    trunk.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <instancedMesh
        ref={foliageRef}
        args={[foliageGeo, foliageMat, TREE_COUNT]}
        castShadow
      />
      <instancedMesh
        ref={trunkRef}
        args={[trunkGeo, trunkMat, TRUNK_COUNT]}
        castShadow
      />
    </group>
  );
}
