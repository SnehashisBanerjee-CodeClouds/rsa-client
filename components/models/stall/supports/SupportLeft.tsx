import { useMemo, useState } from "react";
import { Edges } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { ADADepth, AlcoveDepth, DoorOpening, GLTFAdaStall, GLTFStall, Layout, OutlineColor, StallADAWidth, StallColor, StallWidth, StandardDepth } from "@/types/model";
import { calcPosXByPads, calculatePads, calculateSupportMatrix } from "@/utils/calculations/models/support";
import { useAppSelector } from "@/hooks/useStore";
import * as THREE from 'three';
export default function SupportLeft({
  nodesData,
  stallId,
  stallColor = StallColor.LightGolden,
  isFirst = false,
  isLast = false,
  layout,
  isAda,
  adaDepth = "62",
  stallWidth,
  standardDepth,
  alcoveDepth,
  doorOpening,
}: {
  nodesData: GLTFStall | GLTFAdaStall;
  stallId: number;
  stallColor?: StallColor;
  isFirst?: boolean;
  isLast?: boolean;
  layout: Layout;
  isAda?: boolean;
  adaDepth?: ADADepth;
  stallWidth: StallWidth | StallADAWidth;
  standardDepth: StandardDepth;
  alcoveDepth?: AlcoveDepth;
  doorOpening?: DoorOpening;
}) {
  const { nodes, materials } = nodesData;
  const { layoutDirection, layoutOption } = layout;
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);
  const { noOfStalls } = rooms[selectedRoom.roomIndex].stall;
  // WILL REMOVE THIS LATER
  const [isHidden, setIsHidden] = useState(false);
  // If the Layout is in Alcove option
  const isAlcove = useMemo(() => layoutOption.startsWith("alcove"), [layoutOption]);
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
    // Matrixs
    const matrix = calculateSupportMatrix("Left", isAlcove, isFirst, isLast, layoutDirection, doorOpening ?? "24", isAda);
    // Is the Layout is Alcove
    if (isAlcove) {
      if((isFirst||isLast) && noOfStalls===1 && layoutDirection==="Right") {
       matrix.rotationY=-1.569
     matrix.positionZ=2
     matrix.positionX=-3.4
      }
  
      // If the Stall is First Stall
      if (isFirst && alcoveDepth && doorOpening && matrix.positionX) {
        const prevPositionZ = matrix.positionZ ? matrix.positionZ + 0.1 : 0;
        // Calculating positionZ according to stallWidth
        let positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.195);
        if (+stallWidth > 40 && +stallWidth < 60) positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.223);
        matrix.positionZ = 0;
        // Door Pad
        let doorPad = 3;
        if (standardDepth && doorOpening) {
          // Single Door Pad Calculation
          doorPad = (+alcoveDepth - +standardDepth - +doorOpening) / 2;
        }

        // If the Layout Direction is Left
        if (layoutDirection === "Left") {
          // Updating...
          matrix.positionZ += -parseFloat(positionZ.toFixed(3));
          matrix.rotationY = 1.569;
          matrix.positionX += 3.100 + ((+alcoveDepth - 98) * 0.095) - ((+standardDepth - 62) * 0.071)
          matrix.positionX += (+doorOpening - 22) * 0.105;

     
          if (doorPad < 3) setIsHidden(true);
          doorPad = 7;
          if (doorPad >= 3 && doorPad <= 7) {
            setIsHidden(false);
            const { padscaleZ } = calculatePads("Left", doorPad, layoutDirection);
            matrix.positionX += -(0.480 * (doorPad - 7));
            matrix.scaleZ = padscaleZ;
          }
        } else {
          // If the Layout Direction is Right
          matrix.rotationY = -1.569;
          // Updating...
          matrix.positionZ += parseFloat(positionZ.toFixed(3));
          matrix.positionZ += 0.335;
          // Checking Door Pad
          if (doorPad >= 3) {
            setIsHidden(false);
            const { padPositionX, padscaleZ } = calculatePads("Right", doorPad, layoutDirection);
            // ...
            matrix.positionX += 2.700 + (prevPositionZ + padPositionX) + (0.040 * (doorPad - 3));
            matrix.scaleZ = padscaleZ;
          } else setIsHidden(true);
        }
      } else if (matrix.positionZ && matrix.scaleZ) {
        // Calculating positionZ & scaleZ according to stallWidth
        let positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.095);
        let scaleZ = (+stallWidth - 36) * 0.109 - ((+stallWidth - 36) * 0.014);
        if (+stallWidth > 40 && +stallWidth < 60) {
          positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.124);
          scaleZ = (+stallWidth - 36) * 0.089 - ((+stallWidth - 36) * 0.008);
        }

        // Updating...
        matrix.positionZ += -parseFloat(positionZ.toFixed(3));
        matrix.scaleZ += parseFloat(scaleZ.toFixed(3));
      }

      // If the Stall is Ada Stall
      if (isAda && doorOpening) {
        const prevPositionX = matrix.positionX ? matrix.positionX : 0;
        // Calculating positionZ according to stallWidth
        let positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.195);
        if (+stallWidth >= 60 && +stallWidth <= 90) positionZ = (+stallWidth - 60) * 0.025;
        matrix.positionZ = 0;

        // Door Pad
        let doorPad = 3;
        if (standardDepth && doorOpening) {
          // Single Door Pad Calculation
          doorPad = (+adaDepth - +standardDepth - +doorOpening) / 2;
        }

        // If the Layout Direction is Left
        if (layoutDirection === "Left") {
          matrix.positionZ = -1.935;
          matrix.rotationY = 1.569;
          matrix.positionX = 6.000;
          matrix.positionX += ((+adaDepth - 112) * 0.127) - ((+standardDepth - 62) * 0.071);
          matrix.positionX += (+doorOpening - 34) * 0.105;
        
      
          if (doorPad < 3) setIsHidden(true);
          doorPad = 7;
          if (doorPad >= 3 && doorPad <= 7) {
            setIsHidden(false);
            const { padscaleZ } = calculatePads("Left", doorPad, layoutDirection);
            matrix.positionX += -(0.480 * (doorPad - 7));
            matrix.scaleZ = padscaleZ;
          }
          // Updating...
          matrix.positionZ += -parseFloat(positionZ.toFixed(3));
        } else {
          // If the Layout Direction is Right
          matrix.positionX =  1.665;
          if (doorPad >= 3) {
            setIsHidden(false);
            const { padPositionX, padscaleZ } = calculatePads("Right", doorPad, layoutDirection);
            matrix.positionX += padPositionX;
            matrix.scaleZ = padscaleZ;
          } else setIsHidden(true);
          matrix.positionZ = 2.090;
          matrix.rotationY = -1.569;
          // Updating...
          matrix.positionZ += parseFloat(positionZ.toFixed(3));
        }
      }
    } else if (matrix.positionZ && matrix.scaleZ) {
      // Calculating positionZ & scaleZ according to stallWidth
      let positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.095);
      let scaleZ = (+stallWidth - 36) * 0.109 - ((+stallWidth - 36) * 0.014);
      if (+stallWidth > 40 && +stallWidth < 60) {
        positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.124);
        scaleZ = (+stallWidth - 36) * 0.089 - ((+stallWidth - 36) * 0.008);
      }
      if (+stallWidth >= 60 && +stallWidth <= 90) {
        positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.222);
        scaleZ = (+stallWidth - 36) * 0.0410 - ((+stallWidth - 36) * 0.006);
      }
      // Updating...
      matrix.positionZ += -parseFloat(positionZ.toFixed(3));
      matrix.scaleZ += parseFloat(scaleZ.toFixed(3));
    }
    // If it's ADA
    if (isAda && !isAlcove) {
      // Calculating positionX according to adaDepth
      matrix.positionX = matrix.positionX ? matrix.positionX + parseFloat(((+adaDepth - 62) * 0.135).toFixed(3)) : parseFloat(((+adaDepth - 62) * 0.135).toFixed(3));
    } else {
      // Calculating positionX according to standardDepth
      matrix.positionX = matrix.positionX ? matrix.positionX + parseFloat(((+standardDepth - 62) * 0.135).toFixed(3)) : parseFloat(((+standardDepth - 62) * 0.135).toFixed(3));
    }

    // Return Matrix...
    return { ...matrix }
  }, [isAlcove, isFirst, isLast, layoutDirection, stallWidth, standardDepth, doorOpening, isAda, adaDepth, alcoveDepth,noOfStalls]);

  // Animation on Matrix
  const { position, rotation, scale } = useSpring({
    position: [positionX, positionY, positionZ],
    rotation: [rotationX, rotationY, rotationZ],
    scale: [scaleX, scaleY, scaleZ],
  });


  // If there is any error on Calculation
  if (isHidden) return <></>;

  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.group position={position} rotation={rotation} scale={scale}>
      <animated.mesh
        geometry={nodes.SupportLeft.geometry}
        material={nodes.SupportLeft.material}
        position={[2.301, 3.412, 2.654]}
        rotation={[0, 1.569, 0]}
      >
        <meshStandardMaterial color={stallColor} />
        {/* <Edges color={OutlineColor.Default} /> */}
      </animated.mesh>
     
      <animated.group>
        <animated.mesh
          geometry={nodes.SupportLeftBelowDesign.geometry}
          material={materials["_defaultMat.002"]}
          position={[2.365, 6.309, 2.66]}
          scale={[0.05, 1, 1]}
          rotation={[Math.PI, 0.002, -Math.PI / 2]}
        >
          <meshStandardMaterial color={OutlineColor.Darker} />
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
        <animated.mesh
          geometry={nodes.SupportLeftBelowDesign.geometry}
          material={materials["_defaultMat.002"]}
          position={[2.365, 0.379, 2.66]}
          scale={[0.05, 1, 1]}
          rotation={[Math.PI, 0.002, -Math.PI / 2]}
        >
          <meshStandardMaterial color={OutlineColor.Darker} />
          <Edges color={OutlineColor.Default} />
        </animated.mesh>
        <animated.mesh
          geometry={nodes.SupportLeftBelow.geometry}
          material={materials["_defaultMat.002"]}
          position={[2.302, 0.208, 2.649]}
          rotation={[0, 1.569, 0]}
        >
          <meshStandardMaterial color={stallColor} />
        </animated.mesh>
        <animated.mesh
          geometry={nodes.SupportLeftBelowDesign.geometry}
          material={materials["_defaultMat.002"]}
          position={[2.365, 0.209, 2.67]}
          rotation={[Math.PI, 0.002, -Math.PI / 2]}
        />
      </animated.group>
    </animated.group>
  )
}