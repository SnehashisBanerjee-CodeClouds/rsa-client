import { useMemo } from "react";
import { Edges, MeshDistortMaterial } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { calculateScaleX } from "@/utils/calculations/models/stallWidth";
import { ADADepth, AlcoveDepth, DoorOpening, GLTFAdaStall, Layout, LayoutDirection, OutlineColor, StallADAWidth, StallColor, StandardDepth } from "@/types/model";
import LayoutSideWall from "@/components/models/stall/walls/LayoutSideWall";
import LayoutFrontWall from "@/components/models/stall/walls/LayoutFrontWall";
import { useAppSelector } from "@/hooks/useStore";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

function AdaStallSeparatorWall({
  nodesData,
  stallColor = StallColor.LightGolden,
  layoutDirection,
  adaDepth,
  stallWidth,
  standardDepth,
  isAlcove,

}: {
  nodesData: GLTFAdaStall;
  stallColor?: StallColor;
  layoutDirection: LayoutDirection;
  adaDepth: ADADepth;
  stallWidth: StallADAWidth,
  standardDepth: StandardDepth,
  isAlcove: boolean;

}) {
  const { nodes, materials } = nodesData;
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);
  const { noOfStalls } = rooms[selectedRoom.roomIndex].stall;
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
    if (layoutDirection === "Left") {
      // Calculating positionZ according to stallWidth
      let positionZ = +stallWidth * (-0.017);
      if (+stallWidth > 60 && +stallWidth <= 65) positionZ = +stallWidth * (-0.017)
      if (+stallWidth > 65 && +stallWidth <= 77) positionZ = (+stallWidth) * (-0.019)
      if (+stallWidth > 77 && +stallWidth <= 80) positionZ = (+stallWidth) * (-0.020)
      if (+stallWidth > 80 && +stallWidth <= 90) positionZ = (+stallWidth) * (-0.021)
      // if (+stallWidth >= 60 && +stallWidth <= 90) positionZ = (+stallWidth - 40) * 0.017;

      // Updating Positions...

      matrix.positionZ = parseFloat(positionZ.toFixed(3));
      matrix.frontClipsPositionZ = parseFloat(positionZ.toFixed(3));
      matrix.backClipsPositionZ = parseFloat(positionZ.toFixed(3));

      if (+standardDepth > +adaDepth || isAlcove) {
        matrix.scaleX = parseFloat((1 + (+standardDepth - 62) * 0.02).toFixed(3));
        // Calculating positionX according to standardDepth
        matrix.positionX = parseFloat(((+standardDepth - 62) * 0.093).toFixed(3));
        // Calculating frontClipsPositionX according to standardDepth
        matrix.frontClipsPositionX = parseFloat(((+standardDepth - 62) * 0.135).toFixed(3));
      } else {
        matrix.scaleX = parseFloat((1 + (+adaDepth - 62) * 0.02).toFixed(3));
        // Calculating positionX according to standardDepth
        matrix.positionX = parseFloat(((+adaDepth - 62) * 0.093).toFixed(3));
        // Calculating frontClipsPositionX according to standardDepth
        matrix.frontClipsPositionX = parseFloat(((+adaDepth - 62) * 0.135).toFixed(3));
      }
      if (noOfStalls === 1 && !isAlcove) {
        matrix.scaleX = parseFloat((1 + (+adaDepth - 62) * 0.02).toFixed(3));
        // Calculating positionX according to standardDepth
        matrix.positionX = parseFloat(((+adaDepth - 62) * 0.093).toFixed(3));
        // Calculating frontClipsPositionX according to standardDepth
        matrix.frontClipsPositionX = parseFloat(((+adaDepth - 62) * 0.135).toFixed(3));
      }
      // Calculating scaleZ according to standardDepth

      // Calculating scaleZ according to standardDepth

    } else {
      // Calculating positionZ according to stallWidth
      let positionZ = +stallWidth * (-0.015);
      if (+stallWidth > 60 && +stallWidth <= 65) positionZ = +stallWidth * (-0.017)
      if (+stallWidth > 65 && +stallWidth <= 71) positionZ = (+stallWidth) * (-0.018)
      if (+stallWidth > 71 && +stallWidth <= 83) positionZ = (+stallWidth) * (-0.020)
      if (+stallWidth > 83 && +stallWidth <= 90) positionZ = (+stallWidth) * (-0.021)
      // if (+stallWidth > 65 && +stallWidth <=90) positionZ = (+stallWidth - 60) * (-0.450);
      // if (+stallWidth >= 60 && +stallWidth <= 90) positionZ = (+stallWidth - 40) * 0.017;

      matrix.positionZ = -parseFloat(positionZ.toFixed(3));
      matrix.frontClipsPositionZ = -parseFloat(positionZ.toFixed(3));
      matrix.backClipsPositionZ = -parseFloat(positionZ.toFixed(3));

      // Updating Positions...


      if (+standardDepth > +adaDepth || isAlcove) {
        matrix.scaleX = parseFloat((1 + (+standardDepth - 62) * 0.02).toFixed(3));
        // Calculating positionX according to standardDepth
        matrix.positionX = parseFloat(((+standardDepth - 62) * 0.093).toFixed(3));
        // Calculating frontClipsPositionX according to standardDepth
        matrix.frontClipsPositionX = parseFloat(((+standardDepth - 62) * 0.135).toFixed(3));
      } else {
        matrix.scaleX = parseFloat((1 + (+adaDepth - 62) * 0.02).toFixed(3));
        // Calculating positionX according to standardDepth
        matrix.positionX = parseFloat(((+adaDepth - 62) * 0.093).toFixed(3));
        // Calculating frontClipsPositionX according to standardDepth
        matrix.frontClipsPositionX = parseFloat(((+adaDepth - 62) * 0.135).toFixed(3));
      }
      if (noOfStalls === 1 && !isAlcove) {
        matrix.scaleX = parseFloat((1 + (+adaDepth - 62) * 0.02).toFixed(3));
        // Calculating positionX according to standardDepth
        matrix.positionX = parseFloat(((+adaDepth - 62) * 0.093).toFixed(3));
        // Calculating frontClipsPositionX according to standardDepth
        matrix.frontClipsPositionX = parseFloat(((+adaDepth - 62) * 0.135).toFixed(3));
      }
    }
    // // Calculating scaleZ according to adaDepth
    // matrix.scaleX = parseFloat((1 + (+adaDepth - 62) * 0.02).toFixed(3));

    // // Calculating positionX according to adaDepth
    // matrix.positionX = parseFloat(((+adaDepth - 62) * 0.093).toFixed(3));
    // // Calculating frontClipsPositionX according to adaDepth
    // matrix.frontClipsPositionX = parseFloat(((+adaDepth - 62) * 0.135).toFixed(3));

    // Return Matrix...
    return { ...matrix }
  }, [adaDepth, stallWidth, layoutDirection, standardDepth]);

  // Animation on Matrix
  const { position, frontClipsPosition, backClipsPosition, scale } = useSpring({
    position: [positionX, positionY, positionZ],
    frontClipsPosition: [frontClipsPositionX, frontClipsPositionY, frontClipsPositionZ],
    backClipsPosition: [backClipsPositionX, backClipsPositionY, backClipsPositionZ],
    scale: [scaleX, scaleY, scaleZ],
  });

  if (layoutDirection === "Left") return (
    <>
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={position} scale={scale}>
        <animated.mesh geometry={nodes.WallRight.geometry} material={nodes.WallRight.material} position={[-1.196, 3.335, -3.227]} rotation={[-Math.PI, 1.57, -Math.PI]}>
          <meshStandardMaterial color={stallColor} />
        </animated.mesh>
        <animated.mesh geometry={nodes.WallRightDesignInside.geometry} material={nodes.WallRightDesignInside.material} position={[-1.197, 3.363, -3.171]} rotation={[Math.PI / 2, 0, -0.001]}>
          <meshStandardMaterial color={stallColor} />
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
        <animated.mesh geometry={nodes.WallRightDesignOutside.geometry} material={nodes.WallRightDesignOutside.material} position={[-1.185, 3.363, -3.279]} rotation={[Math.PI / 2, 0, -0.001]}>
          <meshStandardMaterial color={stallColor} />
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
      </animated.group>
      {/* Front Clips */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={frontClipsPosition}>
        <animated.mesh geometry={nodes.ClipFrontRightDown.geometry} material={materials['_defaultMat.002']} position={[2.277, 1.427, -3.226]} rotation={[-Math.PI, -0.001, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
        <animated.mesh geometry={nodes.ClipFrontRightUp.geometry} material={materials['_defaultMat.002']} position={[2.277, 5.257, -3.226]} rotation={[-Math.PI, -0.001, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
      </animated.group>
      {/* Back Clips */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={backClipsPosition}>
        <animated.mesh geometry={nodes.ClipBackRightDown.geometry} material={materials['_defaultMat.002']} position={[-4.67, 1.427, -3.219]} rotation={[-Math.PI, -0.001, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
        <animated.mesh geometry={nodes.ClipBackRightUp.geometry} material={materials['_defaultMat.002']} position={[-4.67, 5.257, -3.219]} rotation={[-Math.PI, -0.001, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
      </animated.group>
    </>
  )
  return (
    <>
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={position} scale={scale}>
        <animated.mesh geometry={nodes.WallLeft.geometry} material={nodes.WallLeft.material} position={[-1.19, 3.335, 3.405]} rotation={[-Math.PI, 1.57, -Math.PI]}>
          <meshStandardMaterial color={stallColor} />
        </animated.mesh>
        <animated.mesh geometry={nodes.WallLeftDesignInside.geometry} material={nodes.WallLeftDesignInside.material} position={[-1.202, 3.363, 3.353]} rotation={[Math.PI / 2, 0, -0.001]}>
          <meshStandardMaterial color={stallColor} />
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
        <animated.mesh geometry={nodes.WallLeftDesignOutside.geometry} material={nodes.WallLeftDesignOutside.material} position={[-1.18, 3.363, 3.462]} rotation={[Math.PI / 2, 0, -0.001]}>
          <meshStandardMaterial color={stallColor} />
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
      </animated.group>
      {/* Front Clips */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={frontClipsPosition}>
        <animated.mesh geometry={nodes.ClipFrontLeftDown.geometry} material={materials['_defaultMat.002']} position={[2.283, 1.427, 3.405]} rotation={[-Math.PI, -0.001, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
        <animated.mesh geometry={nodes.ClipFrontLeftUp.geometry} material={materials['_defaultMat.002']} position={[2.283, 5.257, 3.405]} rotation={[-Math.PI, -0.001, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
      </animated.group>
      {/* Back Clips */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={backClipsPosition}>
        <animated.mesh geometry={nodes.ClipBackLeftDown.geometry} material={materials['_defaultMat.002']} position={[-4.664, 1.427, 3.412]} rotation={[-Math.PI, -0.001, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
        <animated.mesh geometry={nodes.ClipBackLeftUp.geometry} material={materials['_defaultMat.002']} position={[-4.664, 5.257, 3.412]} rotation={[-Math.PI, -0.001, -Math.PI / 2]}>
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
      </animated.group>
    </>
  )
}

export default function AdaStallWall({
  nodesData,
  noOfStalls,
  stallColor = StallColor.LightGolden,
  isLast = false,
  layout,
  stallWidth,
  standardDepth,
  adaDepth,
  alcoveDepth,
  doorOpening
}: {
  nodesData: GLTFAdaStall;
  noOfStalls: number;
  stallColor?: StallColor;
  isLast?: boolean;
  layout: Layout;
  stallWidth: StallADAWidth;
  standardDepth: StandardDepth;
  adaDepth: ADADepth;
  alcoveDepth: AlcoveDepth,
  doorOpening?: DoorOpening
}) {
  const { nodes } = nodesData;
  const { layoutDirection, layoutOption } = layout;
  const isAlcoveBetween = useMemo(() => layoutOption && layoutOption.startsWith("alcoveBetween"), [layoutOption]);
  const isAlcove = useMemo(() => layoutOption && layoutOption.startsWith("alcove"), [layoutOption]);

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
      positionX: -5.014,
      positionY: 3.830,
      positionZ: -0.157,
      scaleX: 1,
      scaleY: 0.98,
      scaleZ: 1
    }
    // Getting Scale X
    matrix.scaleX = noOfStalls === 1 ? calculateScaleX(1, 60, stallWidth, "BackWall") : calculateScaleX(1, 42, stallWidth);
    if (isLast) matrix.scaleX += 0.21;
    if (layoutDirection.startsWith("Left")) matrix.scaleX += 0.05;
    if (isLast && isAlcoveBetween) matrix.scaleX -= 0.05;
    // if (isLast && isAlcoveBetween && layoutDirection.startsWith("Left")) matrix.scaleX -= 0.05;

    // Return Matrix...
    return { ...matrix }
  }, [stallWidth, standardDepth, noOfStalls, layoutDirection, isAlcoveBetween]);

  // Animations...
  const { backWallPosition, backWallScale } = useSpring({
    backWallPosition: [positionX, positionY, positionZ],
    backWallScale: [scaleX, scaleY, scaleZ],
  });

  return (
    <>
      {/* Back Wall */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.WallBack.geometry} material={nodes.WallBack.material} position={backWallPosition} scale={backWallScale} rotation={[-Math.PI, 1.57, -Math.PI]}>
        <AnimatedMeshDistortMaterial speed={0} distort={0} color={OutlineColor.Secondary} />
      </animated.mesh>
      <LayoutSideWall nodesData={nodesData} placeAt={layoutDirection} layout={layout} stallWidth={stallWidth} standardDepth={standardDepth} adaDepth={adaDepth} isAda />
      {isLast && (layoutOption === "betweenWallLeft" || layoutOption === "betweenWallRight" || layoutOption === "alcoveBetweenWallLeft" || layoutOption === "alcoveBetweenWallRight") ? <LayoutSideWall nodesData={nodesData} placeAt={layoutDirection === "Left" ? "Right" : "Left"} layout={layout} stallWidth={stallWidth} standardDepth={standardDepth} adaDepth={adaDepth} isAda /> : <AdaStallSeparatorWall nodesData={nodesData} stallColor={stallColor} layoutDirection={layoutDirection} adaDepth={adaDepth} stallWidth={stallWidth} standardDepth={standardDepth} isAlcove={isAlcove} />}
      {(layoutOption === "alcoveCornerLeft" || layoutOption === "alcoveCornerRight" || layoutOption === "alcoveBetweenWallLeft" || layoutOption === "alcoveBetweenWallRight") && <LayoutFrontWall nodesData={nodesData} layoutDirection={layoutDirection} stallWidth={stallWidth} standardDepth={standardDepth} adaDepth={adaDepth} isAda alcoveDepth={alcoveDepth}
        doorOpening={doorOpening} />}
    </>
  )
}