import React, { Suspense } from "react";
import {
  OrbitControls,
  Environment,
  DeviceOrientationControls,
  TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { Html, useProgress } from "@react-three/drei";
// import { MeshReflectorMaterial } from "./drei/MeshReflectorMaterial";
import CortexModelGLB from "./CortexModelGLB";

// function Loader() {
//   const { progress } = useProgress();
//   return <Html center>{progress} % loaded</Html>;
// }

export function CortexShowDown(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        elignItem: "center",
        height: "55vh",
        width: "45vw",
      }}
    >
      {/* <Canvas camera={{ position: [10, 18, 23], fov: 0.5 }}>
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <ambientLight intensity={0.2} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.4} />
        <Suspense fallback={null}>
          <CortexModel/>
        </Suspense>
        <OrbitControls makeDefault />
        <TransformControls mode="translate" />
      </Canvas> */}

      <Canvas camera={{ position: [10, 18, 23], fov: 0.6 }}>
        <pointLight position={[8, 8, 8]} intensity={1.3} />
        {/* <spotLight
          position={[10, 10, 10]}
          angle={0.7}
          penumbra={1}
          intensity={2}
          castShadow
        /> */}
        <ambientLight intensity={0.2} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.4} />
        <Suspense fallback={null}>
          <CortexModelGLB />
        </Suspense>
        <OrbitControls makeDefault />
        {/* <TransformControls mode="translate" /> */}
      </Canvas>
    </div>
  );
}
