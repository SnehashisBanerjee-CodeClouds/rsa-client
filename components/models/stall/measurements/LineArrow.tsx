import React, { ReactNode, useMemo } from 'react';
import { Line, Cone } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import { OutlineColor, Position, Rotation } from '@/types/model';

export default function LineArrow({
  children,
  stallId,
  position,
  calculus,
  subtractor,
  color = OutlineColor.Selected,
  rotation = {
    x: 0,
    y: 0,
    z: 0,
  },
  arrowRadius = 0.2,
  type,
}: {
  children: ReactNode;
  stallId?: number;
  position: Position;
  calculus: number;
  subtractor: number;
  color?: OutlineColor;
  rotation?: Rotation;
  arrowRadius?: number;
  type?: "StallWidth" | "OverallWidth" | "AdaDepth" | "AdaDepthWithAlcove" | "AlcoveDepth"|"DoorOpening"|"DoorOpeningAlcove";
}) {
  // Matrix Calculations
  const {
    distanceScaleX,
    distanceScaleY,
    distanceScaleZ,
    leftArrowPositionX,
    leftArrowPositionY,
    leftArrowPositionZ,
    rightArrowPositionX,
    rightArrowPositionY,
    rightArrowPositionZ,
  } = useMemo(() => {
    // Matrixs
    const matrix = {
      distanceScaleX: 1,
      distanceScaleY: 1,
      distanceScaleZ: 1,
      leftArrowPositionX: 0,
      leftArrowPositionY: 0,
      leftArrowPositionZ: 0,
      rightArrowPositionX: 0,
      rightArrowPositionY: 0,
      rightArrowPositionZ: 0,
    }
    // Calculating Distance according to calculus
    matrix.distanceScaleZ = +(1 + (calculus - subtractor) * 0.05).toFixed(3);
    // Re-Calculating with Types for Scale
    switch (type) {
      case "StallWidth":
        if (calculus >= 60 && calculus <= 90) matrix.distanceScaleZ = +(2.25 + ((calculus - subtractor) * 0.0115) + (calculus - 90) * 0.0075).toFixed(3);
        break;
      case "OverallWidth":
        matrix.distanceScaleZ = (-0.04409375 * (calculus + subtractor));
        break;
      case "AdaDepth":
        break;
      case "AdaDepthWithAlcove":
        break;
    }
    // Calculating Arrows according to Distance
    matrix.leftArrowPositionZ = +((matrix.distanceScaleZ - 1) * 1.65).toFixed(3);
    // Transform in Negative
    matrix.rightArrowPositionZ = -((matrix.distanceScaleZ - 1) * 1.55).toFixed(3);
    // Re-Calculating Arrows
    switch (type) {
      case "AdaDepthWithAlcove":
        matrix.leftArrowPositionZ += +((matrix.distanceScaleZ - 1) * 0.12).toFixed(3);
        matrix.rightArrowPositionZ -= -((matrix.distanceScaleZ - 1) * 0.08).toFixed(3);
        break;
      case "AlcoveDepth":
        matrix.leftArrowPositionZ += +((matrix.distanceScaleZ - 1) * 0.08).toFixed(3);
        matrix.rightArrowPositionZ -= -((matrix.distanceScaleZ - 1) * 0.08).toFixed(3);
        break;
    }
switch (type) {
  case "DoorOpening":    
    break;
case "DoorOpeningAlcove":
  // matrix.distanceScaleZ = +((1 + (calculus - subtractor) * 0.05)-(+calculus-22)*0.050).toFixed(3);
  // matrix.rightArrowPositionZ -= -((matrix.distanceScaleZ - 1) * 0.08).toFixed(3);
  break;
  default:
    break;
}
    // Return Matrix...
    return { ...matrix }
  }, [calculus, subtractor, type]);

  // Animation on Matrix
  const { arrowPosition, distanceScale, leftArrowPosition, rightArrowPosition } = useSpring({
    arrowPosition: [position.x, position.y, position.z],
    distanceScale: [distanceScaleX, distanceScaleY, distanceScaleZ],
    leftArrowPosition: [leftArrowPositionX, leftArrowPositionY, leftArrowPositionZ],
    rightArrowPosition: [rightArrowPositionX, rightArrowPositionY, rightArrowPositionZ],
  });

  /**
   * Wrapping "animated.group" for every elements, just to show Animation.
   */
  return (
    // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.group position={arrowPosition} rotation={[rotation.x, rotation.y, rotation.z]}>
      {/* Distance */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group scale={distanceScale}>
        <Line position={[2.75, 4.25, 0]} points={[
          [0, -4, -1.5],
          [0, -4, 1.8],
        ]}
          color={color}
          lineWidth={3} />
      </animated.group>
      {/* Left Arrow */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={leftArrowPosition}>
        <Cone args={[arrowRadius, arrowRadius * 2, 3]} position={[2.748, 0.26, 1.93]} rotation={[1.57, 0, 0]}>
          <meshStandardMaterial attach="material" color={color} />
        </Cone>
      </animated.group>
      {/* Right Arrow */}
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.group position={rightArrowPosition}>
        <Cone args={[arrowRadius, arrowRadius * 2, 3]} position={[2.748, 0.26, -1.63]} rotation={[-1.57, 0, 0]}>
          <meshStandardMaterial attach="material" color={color} />
        </Cone>
      </animated.group>
      {/* Measurement View */}
      <animated.group position={[3.35, 0.3, 0.14]} rotation={[-1.57, 0, 1.57]}>
        {children}
      </animated.group>
    </animated.group>
  )
}