import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function CortexModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/large_size_3d_model.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.0087343, -0.0022007, 0]} scale={0.0068793}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["mid-Mat"].geometry}
          material={nodes["mid-Mat"].material}
        />
      </group>
      <group position={[-0.0099022, -0.0022007, 0]} scale={0.0068793}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Occipital_lope.geometry}
          material={nodes.Occipital_lope.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Temporal_lope.geometry}
          material={nodes.Temporal_lope.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Parietal_lope.geometry}
          material={nodes.Parietal_lope.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Frontal_lope.geometry}
          material={nodes.Frontal_lope.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mid_down.geometry}
          material={nodes.mid_down.material}
        />
      </group>
      <group position={[0.010717, -0.0022007, 0]} scale={0.0068793}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Occipital_lope_1.geometry}
          material={nodes.Occipital_lope_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Temporal_lope_1.geometry}
          material={nodes.Temporal_lope_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Parietal_lope_1.geometry}
          material={nodes.Parietal_lope_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Frontal_lope_1.geometry}
          material={nodes.Frontal_lope_1.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mid_down_1.geometry}
          material={nodes.mid_down_1.material}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Spinal_cord.geometry}
        material={nodes.Spinal_cord.material}
        position={[-0.0037707, -0.0022007, 0]}
        scale={0.0068793}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cerebellum.geometry}
        material={nodes.Cerebellum.material}
        position={[-0.0037707, -0.0022007, 0]}
        scale={0.0068793}
      />
    </group>
  );
}

useGLTF.preload("/large_size_3d_model.gltf");