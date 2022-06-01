import React, { Suspense } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import BrainModelGLB from "./BrainModelGLB";

export function ShowDonut(props) {
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
          <BrainModelGLB />
        </Suspense>
        <OrbitControls makeDefault />
        {/* <TransformControls mode="translate" /> */}
      </Canvas>
    </div>
  );
}
