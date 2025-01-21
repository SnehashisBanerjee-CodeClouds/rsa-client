import { useMemo, useState } from "react";
import { Vector3 } from "@react-three/fiber";
import { Edges, MeshDistortMaterial, useGLTF } from "@react-three/drei";
import { animated, config, useSpring } from "@react-spring/three";
import {
  GLTFUrinalScreen,
  OutlineColor,
  Position,
  StallColor,
  UrinalScreenDepth,
  View,
} from "@/types/model";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export default function UrinalScreenModel({

  urinalScreenId,
  position,
  stallColor = StallColor.LightBlue,
  isFirst = false,
  isLast = false,
  view,
  isSelected,
  allowedMeasurements,
  selectStallHandler,
  urinalScreensDepth,
}: {
  urinalScreenId: number;
  position: Position;
  stallColor?: StallColor;
  isFirst?: boolean;
  isLast?: boolean;
  view: View;
  isSelected?: boolean;
  allowedMeasurements?: boolean,
  selectStallHandler: (urinalScreenId: number) => void,
  urinalScreensDepth:UrinalScreenDepth|string
}) {
  const nodesData = useGLTF("/models/urinal-screen-model.glb") as GLTFUrinalScreen;
  const { nodes, materials } = nodesData;
  // Hover...
  const [isHovered, setHover] = useState(false);
  // Hovered View | Only visible in 2D mode
  const hoveredView = useMemo(() => ((isSelected || isHovered) && allowedMeasurements && view === "2D"), [isSelected, isHovered, view]);
  // Measurements View | Only visible in 2D mode
  const measurementsView = useMemo(() => ((isSelected) && allowedMeasurements && view === "2D"), [isSelected, view]);
  // Stall Numbers View
  const screenNumbersView = useMemo(() => (allowedMeasurements && !isSelected), [isSelected, allowedMeasurements]);
  // Using Springs for Animations
  const screenSprings = useSpring({
    position: [position.x, (measurementsView ? (position.y + 0.85) : position.y), position.z] as Vector3,
    baseColor: isSelected ? OutlineColor.Selected : "white",
    config: config.gentle
  });
  const screenDepth=useSpring({
    position:[urinalScreensDepth==="24"?-3.396:-3.9, 3.333, -1.474] as Vector3,
    scale:[urinalScreensDepth==="24"?0.8:0.5, 1, 1]
  })

  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.group position={screenSprings.position}
      dispose={null}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => selectStallHandler(urinalScreenId)}
    >
      {/* Back Wall */}
      <animated.mesh geometry={nodes.WallBack.geometry} material={nodes.WallBack.material} position={[-5.066, 3.794, 0.142]} rotation={[0, Math.PI / 2, 0]} />
      {/* Floor */}
      <animated.mesh geometry={nodes.Floor.geometry} material={materials['Material.001']} position={[-2.339, -0.03, 0.136]} rotation={[0, 1.569, 3.142]} />
      {/* Separator with Clips */}
   {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.Separator.geometry} material={nodes.Separator.material} position={screenDepth.position} rotation={[Math.PI / 2, 0, -3.139]} scale={screenDepth.scale}>
        <meshStandardMaterial color={stallColor} />
      </animated.mesh>
         {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.SeparatorLeft.geometry} material={nodes.SeparatorLeft.material} position={screenDepth.position} rotation={[Math.PI / 2, 0, -3.139]} scale={screenDepth.scale}>
        <meshStandardMaterial color={stallColor} />
        <Edges color={OutlineColor.Default} />
      </animated.mesh>
         {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.SeparatorRight.geometry} material={nodes.SeparatorRight.material} position={screenDepth.position} rotation={[Math.PI / 2, 0, -3.139]} scale={screenDepth.scale}>
        <meshStandardMaterial color={stallColor} />
        <Edges color={OutlineColor.Default} />
      </animated.mesh>
      <animated.mesh geometry={nodes.ClipBackDown.geometry} material={nodes.ClipBackDown.material} position={[-4.721, 1.427, -1.477]} rotation={[Math.PI, 0.002, -Math.PI / 2]}>
        <AnimatedMeshDistortMaterial speed={0} distort={0} color={"white"} />
        <Edges color={OutlineColor.Default} />
      </animated.mesh>
      <animated.mesh geometry={nodes.ClipBackUp.geometry} material={nodes.ClipBackUp.material} position={[-4.721, 5.257, -1.477]} rotation={[Math.PI, 0.002, -Math.PI / 2]}>
        <AnimatedMeshDistortMaterial speed={0} distort={0} color={"white"} />
        <Edges color={OutlineColor.Default} />
      </animated.mesh>

      {/* Support with Clips  */}
      {/* <animated.mesh geometry={nodes.Support.geometry} material={nodes.Support.material} position={[-1.385, 3.412, -1.471]} rotation={[0, 1.569, 0]}>
        <meshStandardMaterial color={stallColor} />
        <Edges color={OutlineColor.Default} />
      </animated.mesh>
      <animated.mesh geometry={nodes.ClipFrontDown.geometry} material={nodes.ClipFrontDown.material} position={[-1.471, 1.427, -1.471]} rotation={[Math.PI, 0.002, -Math.PI / 2]}>
        <AnimatedMeshDistortMaterial speed={0} distort={0} color={"white"} />
        <Edges color={OutlineColor.Default} />
      </animated.mesh>
      <animated.mesh geometry={nodes.ClipFrontUp.geometry} material={nodes.ClipFrontUp.material} position={[-1.471, 5.257, -1.471]} rotation={[Math.PI, 0.002, -Math.PI / 2]}>
        <AnimatedMeshDistortMaterial speed={0} distort={0} color={"white"} />
        <Edges color={OutlineColor.Default} />
      </animated.mesh> */}
    </animated.group>
  );
}

useGLTF.preload("/models/urinal-screen-model.glb");
