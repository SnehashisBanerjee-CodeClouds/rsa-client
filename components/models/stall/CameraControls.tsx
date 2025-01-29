import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { animated } from "@react-spring/three";
import { Cone, Line, Text } from "@react-three/drei";
import { useAppDispatch } from "@/hooks/useStore";
import { changeSelectedStall } from "@/lib/slices/roomSlice";
import { calculateZoom } from "@/utils/stall/helpers";
import {
  ADADepth,
  AdaToiletPosition,
  AlcoveDepth,
  Layout,
  OutlineColor,
  OverallRoomWidth,
  StallADAWidth,
  StallColor,
  StallConfig,
  StallWidth,
  StandardDepth,
  View,
} from "@/types/model";

import StallModel from "@/components/models/stall/StallModel";
import AdaStallModel from "@/components/models/stall/AdaStallModel";
import Background from "@/components/models/stall/measurements/Background";
import useDeviceDetection from "@/utils/useDeviceDetection";

export default function CameraControls({
  position,
  adaToiletPosition,
  stallConfig,
  stallColor,
  standardDepth,
  alcoveDepth,
  adaDepth,
  overallRoomWidth,
  zoom,
  layout,
  view,
  overallRoomFraction,
  pulsate,
}: {
  position: [number, number, number];
  adaToiletPosition: AdaToiletPosition;
  stallConfig: StallConfig[];
  stallColor: StallColor;
  standardDepth: StandardDepth;
  alcoveDepth: AlcoveDepth;
  adaDepth: ADADepth;
  overallRoomWidth: OverallRoomWidth;
  overallRoomFraction: string;
  zoom: number;
  layout: Layout;
  view: View;
  pulsate: boolean;
}) {
  // Get Camera
  const { camera, size } = useThree();
  const device = useDeviceDetection();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  // Select Stall Hanlder
  const selectStallHandler = useCallback(
    (stallId: number) => dispatch(changeSelectedStall({ stallId })),
    []
  );
  // If All The Stall Get Selected
  const widthWithFraction = useMemo(() => {
    const result = +overallRoomWidth + +overallRoomFraction;
    return result.toString();
  }, [overallRoomWidth, overallRoomFraction]);
  const {
    allStallSelected,
    startingPoint,
    endingPoint,
    arrowRadius,
    arrowHeight,
  } = useMemo(() => {
    let allStallSelected =
      view === "2D" &&
      (pathname === "/calculate-measurements" ||
        pathname === "/share-contact-details");
    let startingPoint = 0;
    let endingPoint = 0;
    let arrowRadius = 0.15 + +overallRoomWidth / 1000;
    if (stallConfig.length < 1) allStallSelected = false;
    stallConfig.forEach((stall, idx) => {
      if (stall.stallWidth) {
        if (idx === 0) {
          startingPoint = stall.z;
          if (layout.layoutDirection === "Left")
            startingPoint +=
              2.5 +
              (+stall.stallWidth - 27) *
                (stall.stallWidth > "60" ? 0.06 : 0.094);
          else
            startingPoint += -(
              2.5 +
              (+stall.stallWidth - 27) *
                (stall.stallWidth > "60" ? 0.06 : 0.084)
            );
        }
        if (idx === stallConfig.length - 1) {
          endingPoint = stall.z;
          if (layout.layoutDirection === "Left")
            endingPoint += -(2.5 + (+stall.stallWidth - 27) * 0.084);
          else endingPoint += 2.5 + (+stall.stallWidth - 27) * 0.094;
        }
      }
      if (stallConfig.length === 1 && stallConfig[0].type === "ada") {
        const stall = stallConfig[0];
        if (stall.stallWidth) {
          if (layout.layoutDirection === "Left") {
            if (stall.stallWidth > "60")
              startingPoint -= (+stall.stallWidth - 90) * 0.035;
            endingPoint += (+stall.stallWidth - 60) * 0.065;
            startingPoint -= 0.4;
            endingPoint += 0.3;
          } else {
            if (stall.stallWidth > "60")
              startingPoint += (+stall.stallWidth - 90) * 0.025;
            endingPoint -= (+stall.stallWidth - 60) * 0.065;
            startingPoint += 0.4;
            endingPoint -= 1;
          }
        }
      }
      if (!stall.isSelected) allStallSelected = false;
    });
    let arrowHeight = arrowRadius * 2;
    return {
      allStallSelected,
      startingPoint,
      endingPoint,
      arrowRadius,
      arrowHeight,
    };
  }, [pathname, stallConfig, view, layout, overallRoomWidth]);

  // Update Camera Controls
  useEffect(() => {
    const animation = setTimeout(() => {
      // Updating Position
      const startPosition = new Vector3().copy(camera.position);
      const endPosition = new Vector3(...position);
      const duration = 1000;
      const stepTime = 15;
      const steps = duration / stepTime;
      let currentStep = 0;
      const updatingPosition = setInterval(() => {
        currentStep++;
        const t = Math.min(currentStep / steps, 1);
        // Updating Position 1 by 1 so that it will look like an Animation
        const newX = startPosition.x + (endPosition.x - startPosition.x) * t;
        const newY = startPosition.y + (endPosition.y - startPosition.y) * t;
        const newZ = startPosition.z + (endPosition.z - startPosition.z) * t;
        camera.position.set(newX, newY, newZ);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        if (t === 1) clearInterval(updatingPosition);
      }, stepTime);

      // Calculating Zoom
      camera.zoom = calculateZoom(
        size.width,
        stallConfig,
        standardDepth,
        layout.layoutOption.startsWith("alcove"),
        device
      );
      camera.updateProjectionMatrix();
    }, 0);

    return () => clearTimeout(animation);
  }, [camera, size, position, zoom, stallConfig, standardDepth, device]);
  return (
    <>
      {stallConfig.map((stall, idx) =>
        stall.type === "ada" ? (
          <AdaStallModel
            key={idx}
            stallId={idx}
            noOfStalls={stallConfig.length}
            position={{
              x: stall.x,
              y: stall.y,
              z: stall.z,
            }}
            doorSwing={stall.doorSwing}
            toiletPosition={adaToiletPosition}
            stallColor={stallColor}
            isLast={idx + 1 === stallConfig.length}
            layout={layout}
            view={view}
            stallWidth={(stall.stallWidth ?? "60") as StallADAWidth}
            standardDepth={standardDepth}
            adaDepth={adaDepth}
            doorOpening={stall.doorOpening}
            isOpened={
              (pathname === "/calculate-measurements" ||
                pathname === "/share-contact-details") &&
              stall.isOpened
            }
            isSelected={
              (pathname === "/calculate-measurements" ||
                pathname === "/share-contact-details") &&
              stall.isSelected
            }
            allowedMeasurements={
              pathname === "/calculate-measurements" ||
              pathname === "/share-contact-details"
            }
            selectStallHandler={selectStallHandler}
            pulsate={pulsate}
            alcoveDepth={alcoveDepth}
          />
        ) : (
          <StallModel
            key={idx}
            stallId={idx}
            position={{
              x: stall.x,
              y: stall.y,
              z: stall.z,
            }}
            doorSwing={stall.doorSwing}
            stallColor={stallColor}
            isFirst={idx === 0}
            isLast={idx + 1 === stallConfig.length}
            layout={layout}
            view={view}
            stallWidth={(stall.stallWidth ?? "36") as StallWidth}
            standardDepth={standardDepth}
            alcoveDepth={alcoveDepth}
            doorOpening={stall.doorOpening}
            isOpened={
              (pathname === "/calculate-measurements" ||
                pathname === "/share-contact-details") &&
              stall.isOpened
            }
            isSelected={
              (pathname === "/calculate-measurements" ||
                pathname === "/share-contact-details") &&
              stall.isSelected
            }
            allowedMeasurements={
              pathname === "/calculate-measurements" ||
              pathname === "/share-contact-details"
            }
            selectStallHandler={selectStallHandler}
            pulsate={pulsate}
          />
        )
      )}
      {allStallSelected &&
        (pathname === "/calculate-measurements" ||
          pathname === "/share-contact-details") && (
          <>
            <animated.group
              position={[
                -9.2 - (+overallRoomWidth > 56 ? arrowRadius : 0),
                0,
                0,
              ]}
            >
              <Line
                position={[2.75, 4.25, 0]}
                points={[
                  [0, -4, endingPoint],
                  [0, -4, startingPoint],
                ]}
                color={OutlineColor.Back}
                lineWidth={3}
              />
              {/* <animated.group position={[0, 0, startingPoint]}> */}
              <Cone
                args={[arrowRadius, arrowHeight, 3]}
                position={[
                  2.748,
                  0.26,
                  layout.layoutDirection === "Left"
                    ? startingPoint
                    : endingPoint,
                ]}
                rotation={[1.57, 0, 0]}
              >
                <meshStandardMaterial
                  attach="material"
                  color={OutlineColor.Back}
                />
              </Cone>
              {/* </animated.group> */}
              {/* <animated.group position={[0, 0, 0]}> */}
              <Cone
                args={[arrowRadius, arrowHeight, 3]}
                position={[
                  2.748,
                  0.26,
                  layout.layoutDirection === "Left"
                    ? endingPoint
                    : startingPoint,
                ]}
                rotation={[-1.57, 0, 0]}
              >
                <meshStandardMaterial
                  attach="material"
                  color={OutlineColor.Back}
                />
              </Cone>
              {/* </animated.group> */}
              <animated.group
                position={[3.45 - (arrowRadius - 0.1), 0.3, 0.14]}
                rotation={[-1.57, 0, 1.57]}
              >
                <animated.mesh position={[0, 1.35, 0]}>
                  <Background
                    width={4.2 + arrowRadius * 6.5}
                    height={0.8 + arrowRadius}
                    radius={0.1}
                    color={"white"}
                    borderColor={OutlineColor.Back}
                  />
                  <Text
                    position={[0, 0, 0.1]}
                    color="black"
                    fontSize={0.55 + arrowRadius}
                    fontWeight={800}
                    anchorX="center"
                    anchorY="middle"
                  >
                    {widthWithFraction}&rdquo;
                  </Text>
                </animated.mesh>
              </animated.group>
            </animated.group>
          </>
        )}
    </>
  );
}
