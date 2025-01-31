import { useEffect, useMemo, useState } from "react";
import { MeshDistortMaterial } from "@react-three/drei";
import { animated, config, update, useSpring } from "@react-spring/three";
import { calculateScaleX } from "@/utils/calculations/models/stallWidth";
import {
  ADADepth,
  AlcoveDepth,
  GLTFAdaStall,
  GLTFStall,
  Layout,
  OutlineColor,
  StallADAWidth,
  StallWidth,
  StandardDepth,
} from "@/types/model";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { updatePulsate } from "@/lib/slices/roomSlice";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export default function Floor({
  nodesData,
  stallId,
  hoveredView,
  isFirst = false,
  layout,
  stallWidth,
  standardDepth,
  alcoveDepth,
  adaDepth = "62",
  isAda,
  pulsate,
}: {
  nodesData: GLTFStall | GLTFAdaStall;
  stallId: number;
  hoveredView: boolean | undefined;
  isFirst?: boolean; // Pass isFirst only it's first and not an ADA stall
  layout: Layout;
  stallWidth: StallWidth | StallADAWidth;
  standardDepth: StandardDepth;
  alcoveDepth?: AlcoveDepth;
  adaDepth?: ADADepth;
  isAda?: boolean;
  pulsate?: boolean;
}) {
  const { nodes, materials } = nodesData;
  const { layoutOption } = layout;
  const { selectedRoom, rooms } = useAppSelector((state) => state.room)
  const { roomIndex } = selectedRoom
  const { isPulsate } = rooms[roomIndex].stall
  const dispatch = useAppDispatch()
  // If the Layout is in Alcove option
  const isAlcove = useMemo(() => layoutOption.startsWith("alcove"), [layoutOption]);
  const initialColor = OutlineColor.FloorSelected;
  const colors = [OutlineColor.FloorSelected, OutlineColor.FloorPulsateSelected];
  const maxCycles = 6;
  // Matrix Calculations
  const {
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
    scaleX,
    scaleY,
    scaleZ
  } = useMemo(() => {
    // Initial Matrixs
    const matrix = {
      positionX: -0.659,
      positionY: 0.003,
      positionZ: 0.145,
      rotationX: 0,
      rotationY: 1.569,
      rotationZ: 3.142,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    }
    // Getting Scale X
    matrix.scaleX = calculateScaleX(1, 40, stallWidth);

    // If it's ADA Stall, set initial matrixs
    if (isAda) {
      matrix.positionX = -0.46;
      matrix.positionY = 0.036;
      matrix.positionZ = 0.020;
      matrix.rotationX = 3.142;
      matrix.rotationY = 1.57;
      matrix.rotationZ = 0;
      matrix.scaleX = calculateScaleX(1, 45, stallWidth);

      // Calculating scaleZ according to adaDepth
      matrix.scaleZ = parseFloat((1 + (+adaDepth - 67) * 0.03).toFixed(3));
      if (+adaDepth > 62 && +adaDepth <= 66) matrix.scaleZ = parseFloat((1 + (+adaDepth - 68) * 0.02).toFixed(3));
      if (+adaDepth > 66 && +adaDepth < 70) matrix.scaleZ = parseFloat((1 + (+adaDepth - 69) * 0.02).toFixed(3));
      if (+adaDepth >= 70 && +adaDepth <= 74) matrix.scaleZ = parseFloat((1 + (+adaDepth - 70) * 0.02).toFixed(3));
      if (+adaDepth > 74 && +adaDepth <= 78) matrix.scaleZ = parseFloat((1 + (+adaDepth - 71) * 0.02).toFixed(3));
      // Re-Calculating positionX according to adaDepth
      matrix.positionX -= -parseFloat(((+adaDepth - 70) * 0.081).toFixed(3));
      switch (+adaDepth) {
        case 72:
          if (+adaDepth === 72) matrix.positionX -= -parseFloat(((+adaDepth - 73) * 0.081).toFixed(3));
          break;
        case 74:
          matrix.positionX -= -parseFloat(((+adaDepth - 75) * 0.081).toFixed(3));
          break;
        case 76:
          matrix.positionX -= -parseFloat(((+adaDepth - 78) * 0.081).toFixed(3));
          break;
        case 78:
          matrix.positionX -= -parseFloat(((+adaDepth - 80) * 0.081).toFixed(3));
          break;
        default:
          break;
      }
    } else {
      // Calculating scaleZ according to standardDepth
      matrix.scaleZ = parseFloat((1.01 + (+standardDepth - 62) * 0.0089 + ((+standardDepth - 78) * 0.0089)).toFixed(3));
      // Re-Calculating positionX according to standardDepth
      matrix.positionX -= -parseFloat(((+standardDepth - 62) * 0.032 + ((+standardDepth - 78) * 0.032)).toFixed(3));
    }

    // Is the Layout is Alcove
    if (isAlcove) {
      // If the Stall is First Stall
      if (isFirst && alcoveDepth) {
        matrix.positionX = 1.484;
        // Calculating scaleZ according to alcoveDepth
        matrix.scaleZ = parseFloat((1.532 + (((+alcoveDepth - 98) * 0.02) - ((+alcoveDepth - 90) * 0.007)) + ((+standardDepth - 62) * 0.0061)).toFixed(3));
        // Re-Calculating positionX according to alcoveDepth
        matrix.positionX -= -parseFloat((((+alcoveDepth - 98) * 0.086) - ((+alcoveDepth - 90) * 0.031)).toFixed(3));
      }
      // If the Stall is Ada Stall
      if (isAda) {
        matrix.positionX = 2.544;
        // Calculating scaleZ according to adaDepth
        matrix.scaleZ = parseFloat(((1.778 + (+adaDepth - 112) * 0.025) - (((+adaDepth - 112) * 0.007)) + ((+standardDepth - 62) * 0.005)).toFixed(3));
        // Re-Calculating positionX according to adaDepth
        matrix.positionX -= -parseFloat((((+adaDepth - 112) * 0.096) - ((+adaDepth - 112) * 0.009)).toFixed(3));
      }
    }
    // Return Matrix...
    return { ...matrix }
  }, [isAlcove, isFirst, stallWidth, standardDepth, alcoveDepth, isAda, adaDepth]);

  // Animation on Matrix
  const { position, rotation, scale } = useSpring({
    position: [positionX, positionY, positionZ],
    rotation: [rotationX, rotationY, rotationZ],
    scale: [scaleX, scaleY, scaleZ],
  });

  const [pulsateColor, setPulsateColor] = useState(OutlineColor.FloorSelected);
  // Pulsating Floor Color
  useEffect(() => {
    if (pulsate && stallId === 0 && isPulsate) {

      let cycleCount = 0;

      const intervalId = setInterval(() => {
        if (cycleCount < maxCycles) {
          setPulsateColor(prevColor => (prevColor === colors[0] ? colors[1] : colors[0]));
          cycleCount += 1;
        } else {
          // Once completed, reset to the initial color
          setPulsateColor(initialColor);
          dispatch(updatePulsate({ pulsateBool: false }))
          clearInterval(intervalId);
        }
      }, 300);

      return () => clearInterval(intervalId); // 
    }
  }, [stallId, pulsate, isPulsate]);
  // Animation on Color
  const { floorColor } = useSpring({
    floorColor: pulsateColor,
    config: config.molasses
  });
  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.mesh geometry={nodes.Floor.geometry} material={isAda ? materials['Material.002'] : materials.Material} position={position} rotation={rotation} scale={scale}>
      {hoveredView && <AnimatedMeshDistortMaterial speed={1.5} distort={0} color={floorColor} />}
    </animated.mesh>
  )
}