import { Canvas } from "@react-three/fiber";
import { CameraRig } from "@/components/camera-rig";
import { RailTrack } from "@/components/rail-track";
import { WhiteBox } from "@/components/white-box";

export function TrainScene() {
  return (
    <Canvas
      camera={{ fov: 72, near: 0.1, far: 60 }}
      shadows
      gl={{ antialias: true }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight
        position={[10, 5.5, 10]}
        intensity={1.2}
        distance={28}
        decay={2}
        castShadow
      />
      <pointLight
        position={[-10, 5.5, 10]}
        intensity={1.2}
        distance={28}
        decay={2}
        castShadow
      />
      <pointLight
        position={[10, 5.5, -10]}
        intensity={1.2}
        distance={28}
        decay={2}
        castShadow
      />
      <pointLight
        position={[-10, 5.5, -10]}
        intensity={1.2}
        distance={28}
        decay={2}
        castShadow
      />

      <WhiteBox />
      <RailTrack />
      <CameraRig />
    </Canvas>
  );
}
