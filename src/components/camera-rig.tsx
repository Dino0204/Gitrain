import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useControls } from "leva";
import { railCurve, SPEED, trainT } from "@/lib/rail-curve";

const _pos = new THREE.Vector3();
const _lookAt = new THREE.Vector3();
const _upY = new THREE.Vector3(0, 1, 0);
const _upZ = new THREE.Vector3(0, 0, -1);

export function CameraRig() {
  const tRef = useRef(0);

  const { view, height, lookAheadOffset, speed, fov, topHeight, topFov } =
    useControls("Camera", {
      view: {
        value: "기차 시점",
        options: ["기차 시점", "탑뷰"],
        label: "뷰",
      },
      height: {
        value: 2.8,
        min: 0,
        max: 10,
        step: 0.1,
        label: "높이",
        render: (get) => get("Camera.view") === "기차 시점",
      },
      lookAheadOffset: {
        value: 0.03,
        min: 0.001,
        max: 0.1,
        step: 0.001,
        label: "전방 시점",
        render: (get) => get("Camera.view") === "기차 시점",
      },
      speed: {
        value: SPEED,
        min: 0,
        max: 0.05,
        step: 0.001,
        label: "속도",
      },
      fov: {
        value: 72,
        min: 20,
        max: 120,
        step: 1,
        label: "FOV",
        render: (get) => get("Camera.view") === "기차 시점",
      },
      topHeight: {
        value: 80,
        min: 20,
        max: 150,
        step: 1,
        label: "탑뷰 높이",
        render: (get) => get("Camera.view") === "탑뷰",
      },
      topFov: {
        value: 80,
        min: 20,
        max: 120,
        step: 1,
        label: "탑뷰 FOV",
        render: (get) => get("Camera.view") === "탑뷰",
      },
    });

  useFrame((state, delta) => {
    tRef.current = (tRef.current + speed * delta * 60) % 1;
    trainT.current = tRef.current;

    const cam = state.camera as THREE.PerspectiveCamera;

    if (view === "탑뷰") {
      state.camera.position.set(0, topHeight, 0);
      state.camera.up.copy(_upZ);
      state.camera.lookAt(0, 0, 0);
      cam.fov = topFov;
    } else {
      railCurve.getPoint(tRef.current, _pos);
      railCurve.getPoint((tRef.current + lookAheadOffset) % 1, _lookAt);

      state.camera.position.set(_pos.x, _pos.y + height, _pos.z);
      state.camera.up.copy(_upY);
      state.camera.lookAt(_lookAt.x, _lookAt.y + height, _lookAt.z);
      cam.fov = fov;
    }

    cam.updateProjectionMatrix();
  });

  return null;
}
