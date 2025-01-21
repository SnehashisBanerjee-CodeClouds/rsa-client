import { useMemo } from "react";
import { GLTFStall, LayoutOption, OutlineColor, StallWidth, StandardDepth } from "@/types/model";
import { animated, useSpring } from "@react-spring/three";
import { MeshDistortMaterial } from "@react-three/drei";
import { calculateScaleX } from "@/utils/calculations/models/stallWidth";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export default function StallBackWall({
  nodesData,
  standardDepth,
  stallWidth,
  layoutOption,
  isFirst,
  isLast,
}: {
  nodesData: GLTFStall;
  standardDepth: StandardDepth;
  stallWidth: StallWidth;
  layoutOption?: LayoutOption;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const { nodes } = nodesData;
  const isAlcoveBetween = useMemo(() => layoutOption && layoutOption.startsWith("alcoveBetween"), [layoutOption]);

  // Matrix Calculations
  const {
    positionX,
    positionY,
    positionZ,
    scaleX,
    scaleY,
    scaleZ
  } = useMemo(() => {
    // Initial Matrixs
    const matrix = {
      positionX: -5.066,
      positionY: 3.794,
      positionZ: 0.142,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    }
    // Getting Scale X
    matrix.scaleX = calculateScaleX(1, 40, stallWidth);
    if (isLast) matrix.scaleX += 0.2;
    if (isFirst && isLast && isAlcoveBetween) matrix.scaleX -= 0.2;

    // Return Matrix...
    return { ...matrix }
  }, [stallWidth, standardDepth, isAlcoveBetween]);

  // Animation on Matrix
  const { position, scale } = useSpring({
    position: [positionX, positionY, positionZ],
    scale: [scaleX, scaleY, scaleZ],
  });

  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.mesh geometry={nodes.WallBack.geometry} material={nodes.WallBack.material} position={position} rotation={[0, Math.PI / 2, 0]} scale={scale}>
      <AnimatedMeshDistortMaterial speed={0} distort={0} color={OutlineColor.Secondary} />
    </animated.mesh>
  )
}