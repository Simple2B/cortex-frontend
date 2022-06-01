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
  console.log("!!!!!!!!!LargeCortexModel => ", LargeCortexModel)
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
      {/* <Canvas>
        <Suspense fallback={null}>
          <LargeCortexModel />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas> */}
      {/* <Canvas dpr={[1, 2]} shadows>
        <pointLight position={[10, 10, 10]} intensity={1.3} />
        <Suspense fallback={null}>
          <LargeCortexModel/>
          <Environment preset="city" />
        </Suspense>
        <DeviceOrientationControls />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        <TransformControls mode="translate" />
      </Canvas> */}

      <Canvas frameloop="demand">
        {/* <pointLight position={[10, 10, 10]} intensity={0.3} /> */}

        {/* <ambientLight intensity={0.2} /> */}
        {/* <ambientLight intensity={0.1} /> */}
        {/* <directionalLight intensity={0.4} /> */}

        {/* <Suspense fallback={null}>
          <LargeCortexModel/>
        </Suspense>
        <OrbitControls makeDefault /> */}
        {/* <TransformControls mode="translate" /> */}

        {/* <pointLight position={[10, 10, 10]} />
        <ambientLight intensity={0.4} /> */}
        <Suspense fallback={null}>
          <LargeCortexModel url="mediumModel.glb" />
        </Suspense>
      </Canvas>
    </div>
  );
}
