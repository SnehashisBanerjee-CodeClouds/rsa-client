import { useEffect, useMemo, useState } from "react";
import { Edges, MeshDistortMaterial, Text, useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { animated, config, useSpring } from "@react-spring/three";
import {
  ADADepth,
  AdaToiletPosition,
  AlcoveDepth,
  DoorOpening,
  DoorSwing,
  GLTFAdaStall,
  Layout,
  OutlineColor,
  Position,
  StallADAWidth,
  StallColor,
  StandardDepth,
  View,
} from "@/types/model";

import Measurements from "@/components/models/stall/measurements/Measurements";
import Floor from "@/components/models/stall/floors/Floor";
import Door from "@/components/models/stall/doors/Door";
import AdaStallWall from "@/components/models/stall/walls/AdaStallWall";
import Headrail from "@/components/models/stall/headrails/Headrail";
import Support from "@/components/models/stall/supports/Support";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export default function AdaStallModel({
  stallId,
  noOfStalls,
  position,
  doorSwing = "rightIn",
  toiletPosition,
  stallColor = StallColor.LightGolden,
  isLast = false,
  layout,
  view,
  stallWidth,
  standardDepth,
  adaDepth,
  doorOpening,
  isOpened,
  isSelected,
  allowedMeasurements,
  selectStallHandler,
  pulsate,
  alcoveDepth,
}: {
  stallId: number;
  noOfStalls: number;
  position: Position;
  doorSwing?: DoorSwing;
  toiletPosition?: AdaToiletPosition;
  stallColor?: StallColor;
  isLast?: boolean;
  layout: Layout;
  view: View;
  stallWidth: StallADAWidth;
  standardDepth: StandardDepth;
  adaDepth: ADADepth;
  doorOpening?: DoorOpening;
  isOpened?: boolean;
  isSelected?: boolean;
  allowedMeasurements?: boolean;
  selectStallHandler: (stallId: number) => void;
  pulsate?: boolean;
  alcoveDepth:AlcoveDepth,
}) {
  const nodesData = useGLTF("/models/ada-updated-25-NOV-24.glb") as GLTFAdaStall;
  const { nodes, materials } = nodesData;
  const [isHovered, setHover] = useState(false);
  // Hovered View | Only visible in 2D mode
  const hoveredView = useMemo(() => ((isOpened || isHovered) && allowedMeasurements && view === "2D"), [isOpened, isHovered, view]);
  // Measurements View | Only visible in 2D mode
  const measurementsView = useMemo(() => (allowedMeasurements && view === "2D"), [isOpened, view,isSelected,allowedMeasurements]);
  // Stall Numbers View
  const stallNumbersView = useMemo(() => (allowedMeasurements && !isOpened), [isOpened, allowedMeasurements]);
  // Using Springs for Animations
  const stallSprings = useSpring({
    position: [position.x, position.y, position.z] as Vector3,
    baseColor: isOpened ? OutlineColor.Selected : "white",
    config: config.gentle
  });
  // Toilet Springs
  const toiletSprings = useSpring({
    position: toiletPosition === "Right" ? [1.088, -0.075, layout.layoutDirection === "Left" ? -0.025 : -1.9] : [1.088, -0.075, layout.layoutDirection === "Left" ? 1.825 : 2.225],
  });

  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.group position={stallSprings.position}
      dispose={null}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={() => allowedMeasurements && selectStallHandler(stallId)}
    >
      {/* Measurements */}
      {allowedMeasurements && (
        <Measurements
          stallId={stallId}
          depthView={allowedMeasurements && view === "2D"}
          measurementsView={measurementsView}
          swing={doorSwing}
          layout={layout}
          isSelected={isSelected}
          isFirst
          isAda
        />
      )}
      {/* Floor */}
      <Floor
        nodesData={nodesData}
        stallId={stallId}
        hoveredView={hoveredView}
        layout={layout}
        stallWidth={stallWidth}
        standardDepth={standardDepth}
        adaDepth={adaDepth}
        pulsate={pulsate}
        isAda
      />
      {/* Urinal */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={toiletSprings.position} scale={1.2}>
              <Text
                position={[-3.3, 1.6, 0.10]}
                rotation={[1.55, -3.1, -1.55]}
                fontSize={0.9}
                fontWeight={800}
                color={isOpened ? OutlineColor.Selected : OutlineColor.Default}
                anchorX="center"
                anchorY="middle"
              >
                {stallId + 1}
              </Text>
          
          <animated.mesh geometry={nodes.Toilet.geometry} material={materials.Toilet} position={[-3.372, 0.83, 0.09]} scale={[0.463, 0.143, 0.318]}>
            <animated.mesh geometry={nodes.ToiletCover001.geometry} material={materials.Toilet} position={[0, -1.18, 0]} scale={1.032}>
              <AnimatedMeshDistortMaterial speed={0} distort={0} color={"white"} />
              <Edges color={OutlineColor.Default} />
            </animated.mesh>
            <animated.mesh geometry={nodes.ToiletInnerCover.geometry} material={materials.Toilet} position={[0.047, -0.708, 0]} scale={1.085}>
              <Edges color={OutlineColor.Default} />
            </animated.mesh>
            <animated.mesh geometry={nodes.ToiletSupport.geometry} material={materials.Toilet} position={[0, -5.156, 0.009]} rotation={[Math.PI, 0, Math.PI]} scale={[-1.145, -0.206, -1.669]}>
              <Edges color={OutlineColor.Default} />
            </animated.mesh>
            <animated.mesh geometry={nodes.ToiletTank.geometry} material={materials.Toilet} position={[-2.445, 7.955, 0.037]} scale={[0.486, 3.353, 2.306]}>
            <Edges color={OutlineColor.Default} />
            </animated.mesh>
          </animated.mesh>
      </animated.group>
      {/* Door */}
      {doorSwing != "removed" && (
        <Door
          nodesData={nodesData}
          swing={doorSwing}
          stallColor={stallColor}
          edgeColor={OutlineColor.Default}
          layout={layout}
          stallWidth={stallWidth}
          standardDepth={standardDepth}
          adaDepth={adaDepth}
          doorOpening={doorOpening}
          isFirst
          isAda
        />
      )}
      {/* Supports */}
      <Support
        nodesData={nodesData}
        stallId={stallId}
        stallColor={stallColor}
        layout={layout}
        stallWidth={stallWidth}
        standardDepth={standardDepth}
        adaDepth={adaDepth}
        doorOpening={doorOpening}
        isFirst
        isAda
      />
      {/* Walls */}
      <AdaStallWall
        nodesData={nodesData}
        noOfStalls={noOfStalls}
        stallColor={stallColor}
        isLast={isLast}
        layout={layout}
        stallWidth={stallWidth}
        standardDepth={standardDepth}
        adaDepth={adaDepth}
        alcoveDepth={alcoveDepth}
        doorOpening={doorOpening}
      />
      {/* Headrails */}
      {view === "3D" && (
        <Headrail
          nodesData={nodesData}
          stallId={stallId}
          isLast={isLast}
          layout={layout}
          standardDepth={standardDepth}
          stallWidth={stallWidth}
          adaDepth={adaDepth}
          isAda
        />
      )}
    </animated.group>
  );
}

useGLTF.preload("/models/ada-updated-25-NOV-24.glb");