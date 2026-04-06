import * as THREE from "three";

const whiteMat = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  roughness: 0.85,
  side: THREE.DoubleSide,
});

const SIZE = 100;
const HALF = SIZE / 2;
const WALL_HEIGHT = 60;

const floorGeo = new THREE.PlaneGeometry(SIZE, SIZE);
const ceilingGeo = new THREE.PlaneGeometry(SIZE, SIZE);
const wallGeo = new THREE.PlaneGeometry(SIZE, WALL_HEIGHT);

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
        position={[0, WALL_HEIGHT, 0]}
        receiveShadow
      />
      {/* 앞벽 (z = -HALF) */}
      <mesh
        geometry={wallGeo}
        material={whiteMat}
        position={[0, WALL_HEIGHT / 2, -HALF]}
        receiveShadow
      />
      {/* 뒷벽 (z = +HALF) */}
      <mesh
        geometry={wallGeo}
        material={whiteMat}
        rotation={[0, Math.PI, 0]}
        position={[0, WALL_HEIGHT / 2, HALF]}
        receiveShadow
      />
      {/* 좌벽 (x = -HALF) */}
      <mesh
        geometry={wallGeo}
        material={whiteMat}
        rotation={[0, Math.PI / 2, 0]}
        position={[-HALF, WALL_HEIGHT / 2, 0]}
        receiveShadow
      />
      {/* 우벽 (x = +HALF) */}
      <mesh
        geometry={wallGeo}
        material={whiteMat}
        rotation={[0, -Math.PI / 2, 0]}
        position={[HALF, WALL_HEIGHT / 2, 0]}
        receiveShadow
      />
    </group>
  );
}
