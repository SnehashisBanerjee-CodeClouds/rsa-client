import React, { useMemo, useState } from "react";
import { Text } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { useAppSelector } from "@/hooks/useStore";
import { DoorSwing, Layout, OutlineColor } from "@/types/model";

import LineArrow from "@/components/models/stall/measurements/LineArrow";
import Background from "@/components/models/stall/measurements/Background";

export default function Measurements({
  stallId,
  depthView,
  measurementsView,
  swing,
  isSelected,
  isFirst = false,
  isLast = false,
  layout,
  isAda,
}: {
  stallId: number;
  depthView: boolean | undefined;
  measurementsView: boolean | undefined;
  swing: DoorSwing;
  isFirst?: boolean; // Pass isFirst only it's first
  isLast?: boolean;
  isSelected?: boolean; // Pass isSelected only it's last
  layout: Layout;
  isAda?: boolean;
}) {
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);
  const {
    stallConfig,
    standardDepth,
    adaDepth,
    alcoveDepth,
    overallRoomWidth,
  } = rooms[selectedRoom.roomIndex].stall;
  const { layoutDirection, layoutOption } = layout;
  const arrowRadius = useMemo(
    () => 0.15 + +overallRoomWidth / 1500,
    [overallRoomWidth]
  );
  // If the Layout is in Alcove option
  const isAlcove = useMemo(
    () => layoutOption.startsWith("alcove"),
    [layoutOption]
  );
  const {
    doorOpeningPositionX,
    doorOpeningPositionY,
    doorOpeningPositionZ,
    doorOpeningRotationX,
    doorOpeningRotationY,
    doorOpeningRotationZ,
    doorInfoPositionX,
    doorInfoPositionY,
    doorInfoPositionZ,
    standardDepthPositionX,
    standardDepthPositionY,
    standardDepthPositionZ,
    standardDepthRotationX,
    standardDepthRotationY,
    standardDepthRotationZ,
    adaDepthPositionX,
    adaDepthPositionY,
    adaDepthPositionZ,
    adaDepthRotationX,
    adaDepthRotationY,
    adaDepthRotationZ,
    alcoveDepthPositionX,
    alcoveDepthPositionY,
    alcoveDepthPositionZ,
  } = useMemo(() => {
    // Initial Matrixs
    const matrix = {
      doorOpeningPositionX: -0.35,
      doorOpeningPositionY: 7,
      doorOpeningPositionZ: isAda?swing.endsWith("Out") ? -0.001: 0:swing.endsWith("Out") ? -0.015: 0,
      doorOpeningRotationX: 0,
      doorOpeningRotationY: 0,
      doorOpeningRotationZ: 0,
      doorInfoPositionX: 0,
      doorInfoPositionY: swing.endsWith("Out") ? 1.4 : 0,
      doorInfoPositionZ: 0,
      standardDepthPositionX: -1,
      standardDepthPositionY: 8,
      standardDepthPositionZ: layoutDirection === "Left" ? -0.455 : 0.755,
      standardDepthRotationX: 0,
      standardDepthRotationY: layoutDirection === "Left" ? 1.57 : -1.57,
      standardDepthRotationZ: 0,
      adaDepthPositionX: -1,
      adaDepthPositionY: 8,
      adaDepthPositionZ: layoutDirection === "Left" ? 2.5 : -2.35,
      adaDepthRotationX: 0,
      adaDepthRotationY: layoutDirection === "Left" ? -1.57 : 1.57,
      adaDepthRotationZ: 0,
      alcoveDepthPositionX: +alcoveDepth <= 98 ? -2.2 : +alcoveDepth<114?-1.5:-1.2,
      alcoveDepthPositionY: 8,
      alcoveDepthPositionZ: layoutDirection === "Left" ? 2.5 : -2.35,
    };
    // Calculating standardDepthPositionX according to standardDepth
    matrix.standardDepthPositionX += parseFloat(
      ((+standardDepth - 62) * 0.055).toFixed(3)
    );
    // Calculating standardDepthPositionX according to adaDepth
    matrix.adaDepthPositionX += parseFloat(
      ((+adaDepth - 62) * 0.055).toFixed(3)
    );
    matrix.alcoveDepthPositionX += parseFloat(
      ((+standardDepth - 62) * 0.055).toFixed(3)
    );
    if (stallConfig[stallId] && stallConfig[stallId].stallWidth) {
      matrix.adaDepthPositionZ +=
        layoutDirection === "Left"
          ? parseFloat(
              ((+stallConfig[stallId].stallWidth - 60) * 0.025).toFixed(3)
            )
          : -parseFloat(
              ((+stallConfig[stallId].stallWidth - 60) * 0.025).toFixed(3)
            );
      matrix.standardDepthPositionZ +=
        layoutDirection === "Left"
          ? -parseFloat(
              ((+stallConfig[stallId].stallWidth - 36) * 0.085).toFixed(3)
            )
          : parseFloat(
              ((+stallConfig[stallId].stallWidth - 36) * 0.085).toFixed(3)
            );
      matrix.alcoveDepthPositionZ =
        layoutDirection === "Left"
          ? parseFloat(
              ((+stallConfig[stallId].stallWidth - 36) * 0.085).toFixed(3)
            )
          : -parseFloat(
              ((+stallConfig[stallId].stallWidth - 36) * 0.085).toFixed(3)
            );
    }
    // If it's ADA
    if (isAda) {
      // Calculating doorOpeningPositionX according to adaDepth
      matrix.doorOpeningPositionX += parseFloat(
        ((+adaDepth - 62) * 0.135).toFixed(3)
      );
    } else {
      // Calculating doorOpeningPositionX according to standardDepth
        matrix.doorOpeningPositionX += parseFloat(
          ((+standardDepth - 62) * 0.135).toFixed(3)
        );
      
    }

    // Is the Layout is Alcove
    if (isAlcove && stallConfig[0].doorOpening) {
      // If the Stall is First Stall
      if (isFirst) {
        // If the Layout Direction is Left
        if (layoutDirection === "Left") {
          matrix.doorOpeningPositionX += parseFloat(
            (((+alcoveDepth - 98) * 0.070)-((+standardDepth - 62) * 0.060)).toFixed(3)
          )-0.300
          matrix.doorOpeningPositionX += ((+stallConfig[0].doorOpening - 22) * 0.010-(+stallConfig[0].doorOpening - 22) * 0.070);
          if (isAda) {
            matrix.doorOpeningRotationY = -Math.PI / 2;
            // matrix.doorOpeningPositionX += 0.8;
            matrix.doorOpeningPositionX +=-parseFloat(
              (((+adaDepth - 112) * 0.030)-((+standardDepth - 62) * 0.120)).toFixed(3)
            )+1.200
            matrix.doorOpeningPositionX += ((+stallConfig[0].doorOpening - 34) * 0.010-(+stallConfig[0].doorOpening - 34) * 0.070);
            matrix.doorOpeningPositionZ += 0;
            if (stallConfig[stallId] && stallConfig[stallId].stallWidth)
              matrix.doorOpeningPositionZ += parseFloat(
                ((+stallConfig[stallId].stallWidth - 60) * 0.055).toFixed(3)
              );
            matrix.doorOpeningPositionZ += 0.2;
            matrix.doorOpeningRotationY = Math.PI / 2;
            // matrix.doorOpeningPositionX -= -5.6;
            matrix.doorOpeningPositionZ += 0.35;
            if (stallConfig[stallId] && stallConfig[stallId].stallWidth)
              matrix.doorOpeningPositionZ += -parseFloat(
                ((+stallConfig[stallId].stallWidth - 36) * 0.085).toFixed(3)
              );
            // Calculating standardDepthPositionX according to adaDepth + 50
            matrix.adaDepthPositionX += parseFloat(((((+adaDepth +50) - 62) * 0.0605) - (((+adaDepth +50) - 112) * 0.0705)).toFixed(3))
            matrix.adaDepthPositionX+=+adaDepth<=116?-0.700:+adaDepth<=122?-0.600:-0.300
            matrix.adaDepthPositionZ += 0.2;
          } else {
            matrix.doorOpeningRotationY = Math.PI / 2;
            matrix.doorOpeningPositionX += 5.6;
            matrix.doorOpeningPositionZ += 0.35;
            if (stallConfig[stallId] && stallConfig[stallId].stallWidth)
              matrix.doorOpeningPositionZ += -parseFloat(
                ((+stallConfig[stallId].stallWidth - 36) * 0.085).toFixed(3)
              );
            // Calculating alcoveDepthPositionZ according to standardDepth + 41
            matrix.alcoveDepthPositionX += parseFloat(
              (
                (+standardDepth + 41 - 62) * 0.0735 -
                (+standardDepth + 41 - 112) * 0.0705
              ).toFixed(3)
            );
            matrix.alcoveDepthPositionZ += 0.9;
          }
        } else {
          matrix.doorOpeningPositionX += parseFloat(
            (((+alcoveDepth - 98) * 0.070)-((+standardDepth - 62) * 0.065)).toFixed(3)
          )-0.300
          matrix.doorOpeningPositionX += ((+stallConfig[0].doorOpening - 22) * 0.010-(+stallConfig[0].doorOpening - 22) * 0.070);
          // If the Layout Direction is Right
          if (isAda) {
            matrix.doorOpeningRotationY = -Math.PI / 2;
            matrix.doorOpeningPositionX +=-parseFloat(
              (((+adaDepth - 112) * 0.030)-((+standardDepth - 62) * 0.120)).toFixed(3)
            )+1.200
            matrix.doorOpeningPositionX += ((+stallConfig[0].doorOpening - 34) * 0.010-(+stallConfig[0].doorOpening - 34) * 0.070);
            // matrix.doorOpeningPositionX += 6.8;
            matrix.doorOpeningPositionZ += 1.95;
            if (stallConfig[stallId] && stallConfig[stallId].stallWidth)
              matrix.doorOpeningPositionZ += parseFloat(
                ((+stallConfig[stallId].stallWidth - 60) * 0.025).toFixed(3)
              );
            matrix.doorOpeningPositionZ += -0.3;
            // Calculating standardDepthPositionX according to adaDepth + 50
            matrix.adaDepthPositionX += parseFloat(((((+adaDepth + 50) - 62) * 0.0605) - (((+adaDepth + 50) - 112) * 0.0705)).toFixed(3));
            matrix.adaDepthPositionX+=-2.00
            matrix.adaDepthPositionZ -= 0.2;
          } else {
            matrix.doorOpeningRotationY = -Math.PI / 2;
            matrix.doorOpeningPositionX += 5.9;
            matrix.doorOpeningPositionZ += 0.1;
            if (stallConfig[stallId] && stallConfig[stallId].stallWidth)
              matrix.doorOpeningPositionZ += parseFloat(
                ((+stallConfig[stallId].stallWidth - 36) * 0.085).toFixed(3)
              );
            // Calculating alcoveDepthPositionZ according to standardDepth + 41
            matrix.alcoveDepthPositionX += parseFloat(
              (
                (+standardDepth + 41 - 62) * 0.0455 -
                (+standardDepth + 41 - 112) * 0.0705
              ).toFixed(3)
            );
            matrix.alcoveDepthPositionZ -= 0.6;
          }
        }
      }
    }
    // Return Matrix...
    return { ...matrix };
  }, [
    isAlcove,
    layoutDirection,
    isAda,
    standardDepth,
    adaDepth,
    stallConfig,
    swing,
    alcoveDepth,
    isFirst,
    isLast,
  ]);

  // Animation on Matrix
  const { doorInfoPosition } = useSpring({
    doorInfoPosition: [
      doorInfoPositionX,
      doorInfoPositionY - arrowRadius,
      doorInfoPositionZ,
    ],
  });

  const isWidthArrow = useMemo(() => {
    let isArrow;
    if (measurementsView) {
      isArrow = true;
    } else {
      isArrow = false;
    }
    return isArrow;
  }, [measurementsView]);
  const WidthColor = useMemo(() => {
    let val;
    if (isSelected) {
      val = OutlineColor.Green;
    } else {
      val = OutlineColor.Selected;
    }
    return val;
  }, [isSelected]);

  return (
    <>
      {/* ADA Depth Line Arrow */}
      {depthView && isAda && adaDepth && (
        <LineArrow
          stallId={stallId}
          position={{
            x: adaDepthPositionX,
            y: adaDepthPositionY,
            z: adaDepthPositionZ,
          }}
          rotation={{
            x: adaDepthRotationX,
            y: adaDepthRotationY,
            z: adaDepthRotationZ,
          }}
          calculus={+adaDepth}
          subtractor={43}
          arrowRadius={arrowRadius}
          type={isAlcove ? "AdaDepthWithAlcove" : "AdaDepth"}
        >
          <animated.group position={[0, -(0.2 + arrowRadius), 0]}>
            <Background
              width={4.77 + arrowRadius * 8.5}
              height={0.9 + arrowRadius}
              radius={0.1}
              color={"white"}
              borderColor={OutlineColor.Selected}
            />
            <Text
              position={[0, 0, 0.1]}
              color="black"
              fontSize={0.55 + arrowRadius}
              fontWeight={800}
              anchorX="center"
              anchorY="middle"
            >
              ADA Depth { +adaDepth}&rdquo;
            </Text>
          </animated.group>
        </LineArrow>
      )}
      {/* Stall Alcove Depth Arrow */}
      {depthView && standardDepth && isAlcove && isFirst && !isAda && (
        <LineArrow
          stallId={stallId}
          position={{
            x: alcoveDepthPositionX,
            y: alcoveDepthPositionY,
            z: alcoveDepthPositionZ,
          }}
          rotation={{
            x: adaDepthRotationX,
            y: adaDepthRotationY,
            z: adaDepthRotationZ,
          }}
          calculus={+alcoveDepth} // Actual value is +50, but for the correct calculation we are using +5 instead
          subtractor={+alcoveDepth < 98 ? 41 : 48}
          arrowRadius={arrowRadius}
          type="AlcoveDepth"
        >
          <animated.group position={[0, -(0.2 + arrowRadius), 0]}>
            <Background
              width={5.3 + arrowRadius * 8.5}
              height={0.9 + arrowRadius}
              radius={0.1}
              color={"white"}
              borderColor={OutlineColor.Selected}
            />
            <Text
              position={[0, 0, 0.1]}
              color="black"
              fontSize={0.55 + arrowRadius}
              fontWeight={800}
              anchorX="center"
              anchorY="middle"
            >
              Alcove Depth {+alcoveDepth}&rdquo;
            </Text>
          </animated.group>
        </LineArrow>
      )}
      {/* Standard Depth Line Arrow */}
      {depthView && isLast && standardDepth && (
        <LineArrow
          stallId={stallId}
          position={{
            x: standardDepthPositionX,
            y: standardDepthPositionY,
            z: standardDepthPositionZ,
          }}
          rotation={{
            x: standardDepthRotationX,
            y: standardDepthRotationY,
            z: standardDepthRotationZ,
          }}
          calculus={+standardDepth}
          subtractor={43}
          arrowRadius={arrowRadius}
        >
          <animated.group position={[0, -(0.2 + arrowRadius), 0]}>
            <Background
              width={5.87 + arrowRadius * 9.5}
              height={0.9 + arrowRadius}
              radius={0.1}
              color={"white"}
              borderColor={OutlineColor.Selected}
            />
            <Text
              position={[0, 0, 0.1]}
              color="black"
              fontSize={0.55 + arrowRadius}
              fontWeight={800}
              anchorX="center"
              anchorY="middle"
            >
              Standard Depth {standardDepth}&rdquo;
            </Text>
          </animated.group>
        </LineArrow>
      )}
      {isWidthArrow && (
        <>
          {/* Stall Width Line Arrow */}
          {stallConfig[stallId]?.stallWidth && (
            <LineArrow
              stallId={stallId}
              position={{
                x: -3.5,
                y: 7.5,
                z: 0,
              }}
              calculus={+stallConfig[stallId]?.stallWidth}
              subtractor={30}
              color={WidthColor}
              arrowRadius={arrowRadius}
              type="StallWidth"
            >
              <animated.group position={[0,standardDepth==="48" || standardDepth==="54"? arrowRadius+1.1:-arrowRadius, 0]}>
                <Background
                  width={
                    stallConfig[stallId]?.stallFraction &&
                    stallConfig[stallId]?.stallFraction != "0"
                      ? 3.2 + arrowRadius
                      : 1.75 + arrowRadius
                  }
                  height={0.8 + arrowRadius}
                  radius={0.1}
                  color={"white"}
                  borderColor={WidthColor}
                />
                <Text
                  position={[0, 0, 0.1]}
                  color="black"
                  fontSize={standardDepth==="48" || standardDepth==="54"?0.40+arrowRadius:0.55 + arrowRadius}
                  fontWeight={800}
                  anchorX="center"
                  anchorY="middle"
                >
                  {stallConfig[stallId]?.stallWidth}
                  {stallConfig[stallId]?.stallFraction != "0" &&
                    ` ${stallConfig[stallId]?.stallFraction}`}
                  &rdquo;
                </Text>
              </animated.group>
            </LineArrow>
          )}
          {/* Door Opening Line Arrow */}
          {stallConfig[stallId]?.doorOpening && (
            <LineArrow
              stallId={stallId}
              position={{
                x: doorOpeningPositionX,
                y: doorOpeningPositionY,
                z: doorOpeningPositionZ,
              }}
              rotation={{
                x: doorOpeningRotationX,
                y: doorOpeningRotationY,
                z: doorOpeningRotationZ,
              }}
              calculus={+stallConfig[stallId]?.doorOpening}
              color={WidthColor}
              subtractor={32}
              arrowRadius={arrowRadius}
              type={isAlcove && isFirst ? "DoorOpeningAlcove" : "DoorOpening"}
            >
              {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
              <animated.group position={doorInfoPosition}>
                <Background
                  width={1.75 + arrowRadius}
                  height={0.8 + arrowRadius}
                  radius={0.1}
                  color={"white"}
                  borderColor={WidthColor}
                />
                <Text
                  position={[0, 0, 0.1]}
                  color="black"
                  fontSize={0.55 + arrowRadius}
                  fontWeight={800}
                  anchorX="center"
                  anchorY="middle"
                >
                  {stallConfig[stallId]?.doorOpening}&rdquo;
                </Text>
              </animated.group>
            </LineArrow>
          )}
        </>
      )}
    </>
  );
}
