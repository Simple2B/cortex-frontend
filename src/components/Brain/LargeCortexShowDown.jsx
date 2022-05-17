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
import LargeCortexModel from "./LargeCortexModel";

// function Loader() {
//   const { progress } = useProgress();
//   return <Html center>{progress} % loaded</Html>;
// }

export function LargeCortexShowDonut(props) {
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
      {/* <Canvas dpr={[1, 2]} shadows>
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <Suspense fallback={null}>
          <CortexModel/>
          <Environment preset="city" />
        </Suspense>
        <DeviceOrientationControls />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <TransformControls mode="translate" />
      </Canvas> */}

      <Canvas camera={{ position: [10, 18, 23], fov: 0.5 }}>
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <Suspense fallback={null}>
          <LargeCortexModel/>
        </Suspense>
        <OrbitControls makeDefault />
        <TransformControls mode="translate" />
      </Canvas>
    </div>
  );
}
