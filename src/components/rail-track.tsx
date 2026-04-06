import { useRef, useEffect } from "react";
import * as THREE from "three";
import { railCurve, RAIL_GAUGE } from "@/lib/rail-curve";

const SAMPLE_COUNT = 300;
const SLEEPER_COUNT = 200;

// FrenetFrames로 정확한 레일 오프셋 계산
const frames = railCurve.computeFrenetFrames(SAMPLE_COUNT, true);
const basePoints = railCurve.getPoints(SAMPLE_COUNT);

function makeOffsetCurve(side: number): THREE.CatmullRomCurve3 {
  const points = basePoints.map((p, i) => {
    const binormal = frames.binormals[i];
    return new THREE.Vector3(
      p.x + binormal.x * side,
      p.y + binormal.y * side,
      p.z + binormal.z * side,
    );
  });
  return new THREE.CatmullRomCurve3(points, true, "centripetal");
}

const leftCurve = makeOffsetCurve(-RAIL_GAUGE / 2);
const rightCurve = makeOffsetCurve(RAIL_GAUGE / 2);

const leftRailGeo = new THREE.TubeGeometry(
  leftCurve,
  SAMPLE_COUNT,
  0.05,
  8,
  true,
);
const rightRailGeo = new THREE.TubeGeometry(
  rightCurve,
  SAMPLE_COUNT,
  0.05,
  8,
  true,
);

const railMat = new THREE.MeshStandardMaterial({
  color: "#9a9a9a",
  metalness: 0.85,
  roughness: 0.25,
});

const sleeperGeo = new THREE.BoxGeometry(1, 1, 1);
const sleeperMat = new THREE.MeshStandardMaterial({
  color: "#4a3220",
  roughness: 0.95,
});

// 침목 배치 데이터 (커브 위 균등 분포)
interface SleeperData {
  pos: THREE.Vector3;
  quat: THREE.Quaternion;
}

const sleeperData: SleeperData[] = [];
const _dummy = new THREE.Object3D();

for (let i = 0; i < SLEEPER_COUNT; i++) {
  const t = i / SLEEPER_COUNT;
  const pos = railCurve.getPoint(t);
  const tangent = railCurve.getTangent(t).normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    tangent,
  );
  sleeperData.push({ pos: pos.clone(), quat: quat.clone() });
}

export function RailTrack() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const mat = new THREE.Matrix4();
    sleeperData.forEach(({ pos, quat }, i) => {
      _dummy.position.copy(pos);
      _dummy.quaternion.copy(quat);
      _dummy.scale.set(RAIL_GAUGE * 2.2, 0.14, 0.18);
      _dummy.updateMatrix();
      mat.copy(_dummy.matrix);
      mesh.setMatrixAt(i, mat);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <mesh
        geometry={leftRailGeo}
        material={railMat}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={rightRailGeo}
        material={railMat}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={meshRef}
        args={[sleeperGeo, sleeperMat, SLEEPER_COUNT]}
        castShadow
        receiveShadow
      />
    </group>
  );
}
