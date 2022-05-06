import React, { Suspense } from "react";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import BrainModel from "./BrainModel";

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
        <Suspense fallback={null}>
          <BrainModel />
        </Suspense>
        <OrbitControls makeDefault />
        <TransformControls mode="translate" />
      </Canvas>
    </div>
  );
}
