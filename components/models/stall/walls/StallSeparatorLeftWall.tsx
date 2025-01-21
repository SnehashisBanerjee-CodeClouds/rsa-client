import React, { useMemo } from "react";
import { Edges } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { AlcoveDepth, GLTFStall, Layout, OutlineColor, StallColor, StallWidth, StandardDepth } from "@/types/model";

export default function StallSeparatorLeftWall({
  nodesData,
  stallColor = StallColor.LightGolden,
  stallWidth,
  standardDepth,
  alcoveDepth,
  layout,
  isFirst = false,
}: {
  nodesData: GLTFStall;
  stallColor?: StallColor;
  stallWidth: StallWidth;
  standardDepth: StandardDepth;
  alcoveDepth: AlcoveDepth;
  layout: Layout;
  isFirst?: boolean;
}) {
  const { nodes, materials } = nodesData;

  // Matrix Calculations
  const {
    positionX,
    positionY,
    positionZ,
    frontClipsPositionX,
    frontClipsPositionY,
    frontClipsPositionZ,
    backClipsPositionX,
    backClipsPositionY,
    backClipsPositionZ,
    scaleX,
    scaleY,
    scaleZ
  } = useMemo(() => {
    // Initial Matrixs
    const matrix = {
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      frontClipsPositionX: 0,
      frontClipsPositionY: 0,
      frontClipsPositionZ: 0,
      backClipsPositionX: 0,
      backClipsPositionY: 0,
      backClipsPositionZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1
    }

    // Calculating positionZ according to stallWidth
    let positionZ = (+stallWidth - 36) * 0.099;
    if (+stallWidth > 40 && +stallWidth < 60) positionZ = (+stallWidth - 36) * 0.079;
    // if (+stallWidth >= 60 && +stallWidth <= 90) positionZ = (+stallWidth - 40) * 0.017;

    // Updating Positions...
    matrix.positionZ = parseFloat(positionZ.toFixed(3));
    matrix.frontClipsPositionZ = parseFloat(positionZ.toFixed(3));
    matrix.backClipsPositionZ = parseFloat(positionZ.toFixed(3));


    // Calculating scaleX according to standardDepth
    matrix.scaleX = parseFloat((1 + (+standardDepth - 62) * 0.02).toFixed(3));
    // Calculating positionX according to standardDepth
    matrix.positionX = parseFloat(((+standardDepth - 62) * 0.093).toFixed(3));
    // Calculating frontClipsPositionX according to standardDepth
    matrix.frontClipsPositionX = parseFloat(((+standardDepth - 62) * 0.135).toFixed(3));

    // Return Matrix...
    return { ...matrix }
  }, [stallWidth, standardDepth]);

  // Animation on Matrix
  const { position, frontClipsPosition, backClipsPosition, scale } = useSpring({
    position: [positionX, positionY, positionZ],
    frontClipsPosition: [frontClipsPositionX, frontClipsPositionY, frontClipsPositionZ],
    backClipsPosition: [backClipsPositionX, backClipsPositionY, backClipsPositionZ],
    scale: [scaleX, scaleY, scaleZ],
  });

  return (
    <>
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={position} scale={scale}>
        <mesh geometry={nodes.WallLeft.geometry} material={nodes.WallLeft.material} position={[-1.258, 3.335, 2.685]} rotation={[0, 1.569, 0]}>
          <meshStandardMaterial color={stallColor} />
        </mesh>
        <mesh geometry={nodes.WallLeftDesignInside.geometry} material={nodes.WallLeftDesignInside.material} position={[-1.27, 3.363, 2.633]} rotation={[Math.PI / 2, 0, 0.002]}>
          <meshStandardMaterial color={stallColor} />
          <Edges color={OutlineColor.Default} />
        </mesh>
        <mesh geometry={nodes.WallLeftDesignOutside.geometry} material={nodes.WallLeftDesignOutside.material} position={[-1.249, 3.363, 2.742]} rotation={[Math.PI / 2, 0, 0.002]}>
          <meshStandardMaterial color={stallColor} />
          <Edges color={OutlineColor.Default} />
        </mesh>
      </animated.group>
      {/* Front Clips */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={frontClipsPosition}>
        <mesh geometry={nodes.ClipFrontLeftDown.geometry} material={materials['_defaultMat.002']} position={[2.215, 1.427, 2.697]} rotation={[Math.PI, 0.002, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </mesh>
        <mesh geometry={nodes.ClipFrontLeftUp.geometry} material={materials['_defaultMat.002']} position={[2.215, 5.257, 2.697]} rotation={[Math.PI, 0.002, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </mesh>
      </animated.group>
      {/* Back Clips */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={backClipsPosition}>
        <mesh geometry={nodes.ClipBackLeftDown.geometry} material={materials['_defaultMat.002']} position={[-4.732, 1.427, 2.681]} rotation={[Math.PI, 0.002, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </mesh>
        <mesh geometry={nodes.ClipBackLeftUp.geometry} material={materials['_defaultMat.002']} position={[-4.732, 5.257, 2.681]} rotation={[Math.PI, 0.002, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </mesh>
      </animated.group>
    </>
  )
}