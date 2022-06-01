import React, { Suspense, useEffect } from "react";
import {
  OrbitControls,
  Environment,
  DeviceOrientationControls,
  TransformControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// import { Html, useProgress } from "@react-three/drei";
// import { MeshReflectorMaterial } from "./drei/MeshReflectorMaterial";
// import LargeCortexModel from "./LargeCortexModel";

import CortexModelGLB from "./CortexModelGLB";

// function Loader() {
//   const { progress } = useProgress();
//   return <Html center>{progress} % loaded</Html>;
// }

export function LargeCortexShowDown(props) {

  // useEffect(() => {
  //   AFRAME.scenes[0].renderer.renderLists.dispose()
  // }, [])
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        elignItem: "center",
        height: "57vh",
        width: "47vw",
      }}
    >
      <Canvas camera={{ position: [10, 18, 23], fov: 0.6 }}>
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        {/* <spotLight
          position={[10, 10, 10]}
          angle={0.7}
          penumbra={1}
          intensity={2}
          castShadow
        /> */}
        <ambientLight intensity={0.2} />
        {/* <ambientLight intensity={0.1} /> */}
        {/* <directionalLight intensity={0.4} /> */}
        <Suspense fallback={null}>
          <CortexModelGLB />
        </Suspense>
        <OrbitControls makeDefault />
        {/* <TransformControls mode="translate" /> */}
      </Canvas>
    </div>
  );
}
