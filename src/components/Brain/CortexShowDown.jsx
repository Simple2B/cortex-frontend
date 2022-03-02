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
import Model from "./CortexModel";

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
        background:
          "linear-gradient(to right top, #3e3e3e, #444444, #4b4b4b, #515151, #585858, #5d5d5d, #626262, #676767, #6c6c6c, #717171, #767676, #7b7b7b)",
        boxShadow: "-5px -5px -5px #323b49",
      }}
    >
      {/* camera={{ position: [10, 18, 23], fov: 0.5 }} */}
      <Canvas dpr={[1, 2]} shadows>
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" />
        </Suspense>
        <DeviceOrientationControls />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <TransformControls mode="translate" />
        {/* <OrbitControls makeDefault /> */}
      </Canvas>
    </div>
  );
}
