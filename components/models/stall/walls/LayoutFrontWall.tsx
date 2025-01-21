import { useEffect, useMemo, useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import { MeshDistortMaterial } from "@react-three/drei";
import { ADADepth, GLTFAdaStall, GLTFStall, LayoutDirection, StallADAWidth, OutlineColor, StallWidth, StandardDepth, DoorOpening, AlcoveDepth } from "@/types/model";
import { calculateScaleX } from "@/utils/calculations/models/stallWidth";
import { calcPosXByPads, calculatePads } from "@/utils/calculations/models/support";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export default function LayoutFrontWall({
  nodesData,
  layoutDirection,
  standardDepth,
  adaDepth = "62",
  stallWidth,
  isAda,
  alcoveDepth,
  doorOpening
}: {
  nodesData: GLTFStall | GLTFAdaStall;
  layoutDirection: LayoutDirection;
  standardDepth: StandardDepth;
  adaDepth?: ADADepth;
  stallWidth: StallWidth | StallADAWidth;
  isAda?: boolean;
  alcoveDepth: AlcoveDepth,
  doorOpening?: DoorOpening
}) {
  const { nodes } = nodesData;
  // Checking Component load for Animation
  const [loaded, setLoaded] = useState(false);
  // Matrix Calculations
  const { positionX, positionY, positionZ, scaleX, scaleY, scaleZ } =
    useMemo(() => {
      // Matrixs
      const matrix = {
        positionX: 0,
        positionY: 3.794,
        positionZ: layoutDirection === "Left" ? 0.061 : 0.264,
        scaleX: loaded ? 1.1 : 1,
        scaleY: 1,
        scaleZ: 1,
      };
      let doorPad = 3;
      if (alcoveDepth && standardDepth && doorOpening) {
        // Single Door Pad Calculation
        doorPad = (+alcoveDepth - +standardDepth - +doorOpening) / 2;
      }

      // Getting Scale X
      matrix.scaleX = 
        calculateScaleX(1, 40, stallWidth, "FrontWall");
      matrix.scaleX += 0.23;

      // If it's ADA
      if (isAda) {
        matrix.positionX = 10.094;
        matrix.positionY = 3.761;
        matrix.positionZ = layoutDirection === "Left" ? -0.36 : 0.54;
        // Calculating positionX according to adaDepth
        matrix.positionX += parseFloat((((+adaDepth - 112) * 0.128) + ((+standardDepth - 62) * 0.064)).toFixed(3));
      } else {
        // Calculating positionX according to standardDepth
        matrix.positionX += parseFloat((7.200 + ((+alcoveDepth - 98) * 0.095) + ((+standardDepth - 62) * 0.064)).toFixed(3));
        matrix.positionZ = layoutDirection === "Left" ? 0.1 : 0.23;
      }

      // Return Matrix...
      return { ...matrix };
    }, [
      loaded,
      layoutDirection,
      isAda,
      stallWidth,
      standardDepth,
      adaDepth,
      alcoveDepth,
    ]);

  // Animation
  const { position, scale } = useSpring({
    position: [positionX, positionY, positionZ],
    scale: [scaleX, scaleY, scaleZ],
  });
  // ...
  useEffect(() => setLoaded(true), []);

  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.mesh geometry={nodes.WallLayoutFront.geometry} material={nodes.WallLayoutFront.material} position={position} rotation={[0, Math.PI / 2, 0]} scale={scale}>
      <AnimatedMeshDistortMaterial speed={0} distort={0} color={OutlineColor.Secondary} />
    </animated.mesh>
  )
}