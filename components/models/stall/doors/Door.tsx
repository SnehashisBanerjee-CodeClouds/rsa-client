import { Edges } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import {
  ADADepth,
  AlcoveDepth,
  DoorOpening,
  DoorSwing,
  GLTFAdaStall,
  GLTFStall,
  Layout,
  OutlineColor,
  StallADAWidth,
  StallColor,
  StallWidth,
  StandardDepth,
} from "@/types/model";
import { useEffect, useMemo } from "react";
import { calculateDoorSwingMatrix } from "@/utils/calculations/models/doorSwing";
import { calcPosXByPads } from "@/utils/calculations/models/support";
import * as THREE from 'three';
export default function Door({
  nodesData,
  swing,
  stallColor = StallColor.LightGolden,
  edgeColor = OutlineColor.Default,
  isFirst = false,
  isLast = false,
  layout,
  doorOpening,
  isAda = false,
  adaDepth = "62",
  stallWidth,
  standardDepth,
  alcoveDepth,
}: {
  nodesData: GLTFStall | GLTFAdaStall;
  swing: DoorSwing;
  stallColor: StallColor;
  edgeColor?: OutlineColor;
  isFirst?: boolean;
  isLast?: boolean;
  layout: Layout;
  doorOpening?: DoorOpening;
  isAda?: boolean;
  adaDepth?: ADADepth;
  stallWidth: StallWidth | StallADAWidth;
  standardDepth: StandardDepth;
  alcoveDepth?: AlcoveDepth;

}) {
  const { nodes, materials } = nodesData;
  const { layoutDirection, layoutOption } = layout;

  // If the Layout is in Alcove option
  const isAlcove = useMemo(() => layoutOption.startsWith("alcove"), [layoutOption]);
  // Calculating Door Scale
  const doorScale = useMemo(() => {
    if (doorOpening) {
      // Calculate the base value as 0.60 when input is 20
      const baseValue = isAda ? 0.40 : 0.60;
      // Calculate the increment based on the series, 0.05 for every 2 units
      const increment = 0.05;
      const difference = (+doorOpening - 20) / 2;
      // Returning calculated value dynamically
      return baseValue + (increment * difference);
    }
    return 0.70;
  }, [doorOpening, isAda]);

  // Matrix Calculations
  const {
    positionX,
    positionY,
    positionZ,
    doorX,
    doorY,
    doorZ,
    doorHandleX,
    doorHandleY,
    doorHandleZ,
    rotationX,
    rotationY,
    rotationZ
  } = useMemo(() => {
    // Door Swing Direction
    const isSwingRight = swing.startsWith("right");
    // Matrixs
    const matrix = calculateDoorSwingMatrix(swing, isSwingRight ? "Right" : "Left", isAlcove, isFirst, isLast, layoutDirection, doorOpening ?? "24");

    // Is the Layout is Alcove
    if (isAlcove) {
      // If the Stall is First Stall
      if (isFirst && doorOpening) {
        const prevPositionZ = matrix.positionZ ? matrix.positionZ + 0.1 : 0;
        // Calculating positionZ according to stallWidth
        let positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.195);
        if (+stallWidth > 40 && +stallWidth < 60) positionZ = (+stallWidth - 36) * 0.299 - ((+stallWidth - 36) * 0.223);
        matrix.positionZ = 0;
        // Door Pad
        let doorPad = 3;
        if (alcoveDepth && standardDepth && doorOpening) {
          // Single Door Pad Calculation
          doorPad = (+alcoveDepth - +standardDepth - +doorOpening) / 2;
        }
        // If the Layout Direction is Left
        if (layoutDirection === "Left") {
          matrix.rotationY = 1.569;
          // Updating...
          matrix.positionZ += -parseFloat(positionZ.toFixed(3));
          matrix.positionX = 2.035 + calcPosXByPads(isSwingRight ? "Right" : "Left", doorPad, layoutDirection);
          matrix.positionX += isSwingRight ?-(+doorOpening - 22) * 0.060:(+doorOpening - 22) * 0.080;
        } else {
          // If the Layout Direction is Right
          matrix.rotationY = -1.569;
          // Updating...
          matrix.positionZ += parseFloat(positionZ.toFixed(3));
          matrix.positionZ += 0.365;
          matrix.positionX = 2.370 + calcPosXByPads(isSwingRight ? "Right" : "Left", doorPad, layoutDirection);
          matrix.positionX += isSwingRight ?(+doorOpening - 22) * 0.080:-(+doorOpening - 22) * 0.040;
        }
        // If it's ADA
        if (isAda) {
          if (standardDepth && doorOpening) {
            // Single Door Pad Calculation
            doorPad = (+adaDepth - +standardDepth - +doorOpening) / 2;
          }
          if (+stallWidth >= 60 && +stallWidth <= 90) positionZ = (+stallWidth - 60) * 0.025;
          if (layoutDirection === "Left") {
            matrix.positionZ = -1.865;
            matrix.rotationY = 1.569;
            if (isSwingRight) matrix.positionX = -0.42 - ((+adaDepth - 112) * 0.059) + ((+standardDepth - 62) * 0.059);
            else matrix.positionX = -(doorOpening === "34" ? 1.02 : 0.82) - ((+adaDepth - 112) * 0.0075) + ((+standardDepth - 62) * 0.0635);
            // Updating...
            matrix.positionZ += -parseFloat(positionZ.toFixed(3));
          } else {
            // If the Layout Direction is Right
            matrix.positionZ = 2.020;
            matrix.rotationY = -1.569;
            if (isSwingRight) matrix.positionX = -(doorOpening === "34" ? 0.94 : 0.74) - ((+adaDepth - 112) * 0.0075) + ((+standardDepth - 62) * 0.0635);
            else matrix.positionX = -0.19 - ((+adaDepth - 112) * 0.075) + ((+standardDepth - 62) * 0.081);
            // Updating...
            matrix.positionZ += parseFloat(positionZ.toFixed(3));
          }
        }
      }
    }
    // If it's ADA
    if (isAda) {
      // Calculating positionX according to standardDepth
      matrix.positionX = matrix.positionX ? matrix.positionX + parseFloat(((+adaDepth - 62) * 0.135).toFixed(3)) : parseFloat(((+adaDepth - 62) * 0.135).toFixed(3));
    } else {
      // Calculating positionX according to standardDepth
      matrix.positionX = matrix.positionX ? matrix.positionX + parseFloat(((+standardDepth - 62) * 0.135).toFixed(3)) : parseFloat(((+standardDepth - 62) * 0.135).toFixed(3));
    }
    // Return Matrix...
    return { ...matrix }
  }, [isAlcove, isFirst, layoutDirection, swing, doorOpening, isAda, stallWidth, standardDepth, alcoveDepth, adaDepth]);

  // Animation on Matrix
  const { position, doorPosition, rotation } = useSpring({
    position: [positionX, positionY, positionZ],
    doorPosition: [doorX, doorY, doorZ],
    rotation: [rotationX, rotationY, rotationZ],
  });

  // Doors Configurations
  const [doorSprings, doorApi] = useSpring(() => ({
    position: [1.168, 3.352, -0.206],
    rotation: [0, 0.949, 0],
    scale: [doorScale, 1, 1],
  }))
  const [doorDesignSprings, doorDesignApi] = useSpring(() => ({
    position: [1.186, 3.359, -0.183],
    rotation: [Math.PI, 0.622, -Math.PI / 2],
    scale: [1, 1, doorScale],
  }))
  const [doorHandleSprings, doorHandleApi] = useSpring(() => ({
    position: [doorHandleX, doorHandleY, doorHandleZ],
    rotation: [Math.PI, 0.642, -Math.PI / 2]
  }))
  const [doorClipLeftUpSprings, doorClipLeftUpApi] = useSpring(() => ({
    position: [2.321, 5.704, -1.686],
    rotation: [Math.PI, 0.622, -Math.PI / 2]
  }))
  const [doorClipLeftDownSprings, doorClipLeftDownApi] = useSpring(() => ({
    position: [2.319, 1.091, -1.685],
    rotation: [Math.PI, 0.622, -Math.PI / 2]
  }))
  const [doorClipRightUpSprings, doorClipRightUpApi] = useSpring(() => ({
    position: [2.39, 5.704, -1.929],
    rotation: [Math.PI, 0.002, -Math.PI / 2]
  }))
  const [doorClipRightDownSprings, doorClipRightDownApi] = useSpring(() => ({
    position: [2.39, 1.091, -1.934],
    rotation: [Math.PI, 0.002, -Math.PI / 2]
  }))

  useEffect(() => {
    if (isAda) {
      switch (swing) {
        case "rightIn":
          // Door - Left In
          doorApi.start({
            position: [0.93, 3.424, -0.297],
            rotation: [0, 1.029, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [1.004, 3.437, -0.251],
            rotation: [Math.PI, 0.541, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [-3.12, 0.594, -1.581]
          })
          doorClipLeftUpApi.start({
            position: [2.407, 5.704, -2.554],
            rotation: [Math.PI, 0.539, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.404, 1.091, -2.552],
            rotation: [Math.PI, 0.539, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.442, 5.704, -2.811],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.442, 1.091, -2.815],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          break;
        case "rightOut":
          // Door - Left Out
          doorApi.start({
            position: [3.785, 3.424, -0.267],
            rotation: [0, 2.112, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [3.864, 3.437, -0.291],
            rotation: [Math.PI, -0.541, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [-3.12, -0.594, -1.581]
          })
          doorClipLeftUpApi.start({
            position: [2.492, 5.704, -2.612],
            rotation: [Math.PI, -0.539, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.492, 1.091, -2.612],
            rotation: [Math.PI, -0.539, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.442, 5.704, -2.811],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.442, 1.091, -2.815],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          break;
        case "leftIn":
          // Door - Right In
          doorApi.start({
            position: [0.93, 3.424, 0.410],
            rotation: [0, 2.112, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [0.99, 3.437, 0.350],
            rotation: [Math.PI, -0.541, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [-3.12, -0.594, -1.581]
          })
          doorClipLeftUpApi.start({
            position: [2.382, 5.704, 2.642],
            rotation: [Math.PI, -0.539, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.382, 1.091, 2.642],
            rotation: [Math.PI, -0.539, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.442, 5.704, 2.945],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.442, 1.091, 2.945],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          break;
        case "leftOut":
          // Door - Right Out
          doorApi.start({
            position: [3.785, 3.424, 0.410],
            rotation: [0, 1.029, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [3.864, 3.437, 0.410],
            rotation: [Math.PI, 0.541, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [-3.12, 0.594, -1.581]
          })
          doorClipLeftUpApi.start({
            position: [2.495, 5.704, 2.732],
            rotation: [Math.PI, 0.539, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.495, 1.091, 2.732],
            rotation: [Math.PI, 0.539, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.442, 5.704, 2.945],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.442, 1.091, 2.945],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          break;
        case "closed":
          // Door - Closed
          break;
        default:
          doorApi.start({
            position: [0.93, 3.424, -0.297],
            rotation: [0, 1.029, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [1.004, 3.437, -0.251],
            rotation: [Math.PI, 0.541, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [-3.12, 0.594, -1.581]
          })
          doorClipLeftUpApi.start({
            position: [2.407, 5.704, -2.554],
            rotation: [Math.PI, 0.539, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.404, 1.091, -2.552],
            rotation: [Math.PI, 0.539, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.442, 5.704, -2.811],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.442, 1.091, -2.815],
            rotation: [-Math.PI, -0.001, -Math.PI / 2]
          })
          break;
      }
    } else {
      switch (swing) {
        case "rightIn":
          // Door - Right In
          doorApi.start({
            position: [1.168, 3.352, -0.206],
            rotation: [0, 0.949, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [1.186, 3.359, -0.183],
            rotation: [Math.PI, 0.622, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [Math.PI, 0.642, -Math.PI / 2]
          })
          doorClipLeftUpApi.start({
            position: [2.321, 5.704, -1.686],
            rotation: [Math.PI, 0.622, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.319, 1.091, -1.685],
            rotation: [Math.PI, 0.622, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.39, 5.704, -1.929],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.39, 1.091, -1.934],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          break;
        case "rightOut":
          // Door - Right Out
          doorApi.start({
            position: [3.466, 3.352, -0.185],
            rotation: [0, 2.192, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [3.506, 3.359, -0.198],
            rotation: [Math.PI, -0.622, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [Math.PI, -0.642, -Math.PI / 2]
          })
          doorClipLeftUpApi.start({
            position: [2.473, 5.704, -1.733],
            rotation: [Math.PI, -0.622, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.473, 1.091, -1.733],
            rotation: [Math.PI, -0.622, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.39, 5.704, -1.929],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.39, 1.091, -1.934],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          break;
        case "leftIn":
          // Door - Left In
          doorApi.start({
            position: [1.158, 3.352, 0.500],
            rotation: [0, 2.192, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [1.180, 3.359, 0.475],
            rotation: [Math.PI, -0.622, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [Math.PI, -0.642, -Math.PI / 2]
          })
          doorClipLeftUpApi.start({
            position: [2.310, 5.704, 1.945],
            rotation: [Math.PI, -0.622, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.310, 1.091, 1.945],
            rotation: [Math.PI, -0.622, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.376, 5.704, 2.245],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.376, 1.091, 2.245],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          break;
        case "leftOut":
          // Door - Left Out
          doorApi.start({
            position: [3.468, 3.352, 0.486],
            rotation: [0, 0.949, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [3.516, 3.359, 0.483],
            rotation: [Math.PI, 0.622, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [Math.PI, 0.642, -Math.PI / 2]
          })
          doorClipLeftUpApi.start({
            position: [2.448, 5.704, 2.055],
            rotation: [Math.PI, 0.622, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.448, 1.091, 2.055],
            rotation: [Math.PI, 0.622, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.376, 5.704, 2.245],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.376, 1.091, 2.245],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          break;
        case "closed":
          // Door - Closed
          break;
        default:
          doorApi.start({
            position: [1.168, 3.352, -0.206],
            rotation: [0, 0.949, 0],
            scale: [doorScale, 1, 1],
          })
          doorDesignApi.start({
            position: [1.186, 3.359, -0.183],
            rotation: [Math.PI, 0.622, -Math.PI / 2],
            scale: [1, 1, doorScale],
          })
          doorHandleApi.start({
            position: [doorHandleX, doorHandleY, doorHandleZ],
            rotation: [Math.PI, 0.642, -Math.PI / 2]
          })
          doorClipLeftUpApi.start({
            position: [2.321, 5.704, -1.686],
            rotation: [Math.PI, 0.622, -Math.PI / 2]
          })
          doorClipLeftDownApi.start({
            position: [2.319, 1.091, -1.685],
            rotation: [Math.PI, 0.622, -Math.PI / 2]
          })
          doorClipRightUpApi.start({
            position: [2.39, 5.704, -1.929],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          doorClipRightDownApi.start({
            position: [2.39, 1.091, -1.934],
            rotation: [Math.PI, 0.002, -Math.PI / 2]
          })
          break;
      }
    }
  }, [
    isAda,
    swing,
    doorScale,
    doorHandleX,
    doorHandleY,
    doorHandleZ
  ]);
  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.group position={position} rotation={rotation}>
      {/* Door with Design */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={doorPosition}>
        {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
        <animated.mesh geometry={nodes.Door.geometry} material={nodes.Door.material} position={doorSprings.position} rotation={doorSprings.rotation} scale={doorSprings.scale}>
     <meshStandardMaterial color={stallColor} />
       <meshStandardMaterial color={stallColor} />
       
        </animated.mesh>
        {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
        <animated.mesh geometry={nodes.DoorDesign.geometry} material={nodes.DoorDesign.material} position={doorDesignSprings.position} rotation={doorDesignSprings.rotation} scale={doorDesignSprings.scale}>
        <meshStandardMaterial color={stallColor} />
          <Edges color={edgeColor} />
        </animated.mesh>
      </animated.group>
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.DoorHandle.geometry} material={materials['_defaultMat.002']} position={doorHandleSprings.position} rotation={doorHandleSprings.rotation}>
        <Edges color={edgeColor} />
      </animated.mesh>
      {/* Clips */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.DoorClipLeftUp.geometry} material={materials['_defaultMat.002']} position={doorClipLeftUpSprings.position} rotation={doorClipLeftUpSprings.rotation}>
        <Edges color={edgeColor} />
      </animated.mesh>
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.DoorClipLeftDown.geometry} material={materials['_defaultMat.002']} position={doorClipLeftDownSprings.position} rotation={doorClipLeftDownSprings.rotation}>
        <Edges color={edgeColor} />
      </animated.mesh>
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.DoorClipRightUp.geometry} material={materials['_defaultMat.002']} position={doorClipRightUpSprings.position} rotation={doorClipRightUpSprings.rotation}>
        <Edges color={edgeColor} />
      </animated.mesh>
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.DoorClipRightDown.geometry} material={materials['_defaultMat.002']} position={doorClipRightDownSprings.position} rotation={doorClipRightDownSprings.rotation}>
        <Edges color={edgeColor} />
      </animated.mesh>
    </animated.group>
  );
}
