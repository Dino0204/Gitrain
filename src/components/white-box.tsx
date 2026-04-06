import * as THREE from "three";

const whiteMat = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.85,
  side: THREE.DoubleSide,
});

const floorGeo = new THREE.PlaneGeometry(30, 30);
const ceilingGeo = new THREE.PlaneGeometry(30, 30);
const wallWideGeo = new THREE.PlaneGeometry(30, 6);
const wallDeepGeo = new THREE.PlaneGeometry(30, 6);

export function WhiteBox() {
  return (
    <group>
      {/* 바닥 */}
      <mesh
        geometry={floorGeo}
        material={whiteMat}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      />
      {/* 천장 */}
      <mesh
        geometry={ceilingGeo}
        material={whiteMat}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 6, 0]}
        receiveShadow
      />
      {/* 앞벽 (z = -15) */}
      <mesh
        geometry={wallWideGeo}
        material={whiteMat}
        position={[0, 3, -15]}
        receiveShadow
      />
      {/* 뒷벽 (z = +15) */}
      <mesh
        geometry={wallWideGeo}
        material={whiteMat}
        rotation={[0, Math.PI, 0]}
        position={[0, 3, 15]}
        receiveShadow
      />
      {/* 좌벽 (x = -15) */}
      <mesh
        geometry={wallDeepGeo}
        material={whiteMat}
        rotation={[0, Math.PI / 2, 0]}
        position={[-15, 3, 0]}
        receiveShadow
      />
      {/* 우벽 (x = +15) */}
      <mesh
        geometry={wallDeepGeo}
        material={whiteMat}
        rotation={[0, -Math.PI / 2, 0]}
        position={[15, 3, 0]}
        receiveShadow
      />
    </group>
  );
}
