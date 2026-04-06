import { Canvas } from "@react-three/fiber";
import { CameraRig } from "@/components/camera-rig";
import { RailTrack } from "@/components/rail-track";
import { TrainEngine } from "@/components/train-engine";
import { WhiteBox } from "@/components/white-box";

const LIGHT_POSITIONS: [number, number, number][] = [
  [40, 5.5, 40],
  [-40, 5.5, 40],
  [40, 5.5, -40],
  [-40, 5.5, -40],
  [0, 5.5, 0],
];

export function TrainScene() {
  return (
    <Canvas
      camera={{ fov: 72, near: 0.1, far: 400 }}
      shadows
      gl={{ antialias: true }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight intensity={100} />
      {LIGHT_POSITIONS.map((pos) => (
        <pointLight
          key={pos.join(",")}
          position={pos}
          intensity={2}
          distance={80}
          decay={2}
          castShadow
        />
      ))}

      <WhiteBox />
      <RailTrack />
      <TrainEngine />
      <CameraRig />
    </Canvas>
  );
}
