import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "./BrainModel";

// function Model() {
//   const { scene } = useGLTF("/Final.gltf");
//   return <primitive object={scene} />;
// }

export function ShowDonut(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        elignItem: "center",
        height: "50vh",
        width: "30vw",
        background: "linear-gradient(0.25turn, #2e2d2d, #858585, #373737)",
      }}
    >
      <Canvas camera={{ position: [10, 18, 23], fov: 0.5 }}>
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
