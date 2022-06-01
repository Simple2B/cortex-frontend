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
import CortexModel from "./CortexModel";

// function Loader() {
//   const { progress } = useProgress();
//   return <Html center>{progress} % loaded</Html>;
// }

export function CortexShowDonut(props) {
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
      <Canvas camera={{ position: [10, 18, 23], fov: 0.5 }}>
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <ambientLight intensity={0.2} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.4} />
        <Suspense fallback={null}>
          <CortexModel/>
        </Suspense>
        <OrbitControls makeDefault />
        {/* <TransformControls mode="translate" /> */}
      </Canvas>
    </div>
  );
}
