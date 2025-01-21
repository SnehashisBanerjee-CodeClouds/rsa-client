import React, { useMemo } from "react";
import { animated, useSpring } from "@react-spring/three";
import { useAppSelector } from "@/hooks/useStore";
import { ADADepth, GLTFAdaStall, GLTFStall, Layout, StallADAWidth, StallWidth, StandardDepth } from "@/types/model";
import { calculateAlcovePositionZ, calculateScaleX } from "@/utils/calculations/models/stallWidth";

export default function Headrail({
  nodesData,
  stallId,
  isFirst = false,
  isLast = false,
  layout,
  stallWidth,
  standardDepth,
  adaDepth = "62",
  isAda,
}: {
  nodesData: GLTFStall | GLTFAdaStall;
  stallId: number;
  isFirst?: boolean;
  isLast?: boolean;
  layout: Layout;
  stallWidth: StallWidth | StallADAWidth;
  standardDepth: StandardDepth;
  adaDepth?: ADADepth;
  isAda?: boolean;
}) {
  const { nodes, materials } = nodesData;
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);
  const { noOfStalls,alcoveDepth } = rooms[selectedRoom.roomIndex].stall;

  const { layoutDirection, layoutOption } = layout;
  // If the Layout is in Alcove option
  const isAlcove = useMemo(() => layoutOption.startsWith("alcove"), [layoutOption]);
  const isPrimary=useMemo(()=>layoutOption.startsWith("alcoveBetween"), [layoutOption]);
  // Matrix Calculations
  const {
    positionX,
    positionY,
    positionZ,
    leftPositionX,
    leftPositionY,
    leftPositionZ,
    rightPositionX,
    rightPositionY,
    rightPositionZ,
    rotationX,
    rotationY,
    rotationZ,
    scaleX,
    scaleY,
    scaleZ,
    rightScaleX,
    rightScaleY,
    rightScaleZ,
    leftScaleX,
    leftScaleY,
    leftScaleZ,
  } = useMemo(() => {
    // Matrixs
    const matrix = {
      positionX: 2.305,
      positionY: 6.473,
      positionZ: 0.153,
      leftPositionX: -1.205,
      leftPositionY: 6.473,
      leftPositionZ: 3.065,
      rightPositionX: -1.209,
      rightPositionY: 6.472,
      rightPositionZ: -2.785,
      rotationX: 0,
      rotationY: 1.57,
      rotationZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      rightScaleX: 1,
      rightScaleY: 1,
      rightScaleZ: 1,
      leftScaleX: 1,
      leftScaleY: 1,
      leftScaleZ: 1,
    };
    // Getting Scale X
    matrix.scaleX = calculateScaleX(1, 40, stallWidth);
    if (isLast) matrix.scaleX += 0.12;
    // Calculating positionZ according to stallWidth
    let positionZ = (+stallWidth - 36) * 0.099;
    if (+stallWidth > 40 && +stallWidth < 60)
      positionZ = (+stallWidth - 36) * 0.079;
    // if (+stallWidth >= 60 && +stallWidth <= 90) positionZ = (+stallWidth - 40) * 0.017;

    // Updating Positions...
    matrix.leftPositionZ += parseFloat(positionZ.toFixed(3));
    matrix.rightPositionZ += -parseFloat(positionZ.toFixed(3));

    // If it's ADA Stall, set initial matrixs
    if (isAda) {
      matrix.positionX = 2.365;
      matrix.positionZ = layoutDirection === "Left" ? -1.500 : -0.883;
      matrix.leftPositionX = -1.148;
      matrix.rightPositionX = -1.409;
      matrix.leftPositionZ = 3.791;
      matrix.rightPositionZ = -3.669;
      if (noOfStalls === 1) {
        matrix.rightPositionX += 0.2;
        matrix.rightPositionZ += -0.935;
        matrix.leftPositionZ += 0.2;
        matrix.leftPositionZ += 0.935;
        if (layoutDirection === "Left") {
          matrix.positionZ += 0.500;
          matrix.scaleX += -0.05;

          if (+stallWidth >= 60 && +stallWidth <= 65) {
            // Calculating leftPositionZ according to stallWidth
            matrix.rightPositionZ +=
              (+stallWidth - 36) * 0.020 - (+stallWidth - 90) * -0.01;
            matrix.positionZ+=(+stallWidth - 36) * 0.015 - (+stallWidth - 90) * -0.01
            matrix.scaleX += parseFloat(
              (
                (+alcoveDepth - 98) * 0.01 +
                (+standardDepth - 62) * 0.01
              ).toFixed(3)
            ) + -0.1;

          }
          if (+stallWidth > 65 && +stallWidth <= 70) {
            // Calculating leftPositionZ according to stallWidth
            matrix.rightPositionZ +=
              (+stallWidth - 36) * 0.012 - (+stallWidth - 90) * -0.01;
            matrix.positionZ+=(+stallWidth - 36) * 0.009 - (+stallWidth - 90) * -0.01

            matrix.scaleX += parseFloat(
              (
                (+alcoveDepth - 98) * 0.01 +
                (+standardDepth - 62) * 0.01
              ).toFixed(3)
            ) + -0.15;
          }
          if (+stallWidth > 70 && +stallWidth <= 75) {
            // Calculating leftPositionZ according to stallWidth
            matrix.rightPositionZ +=
              (+stallWidth - 36) * 0.003 - (+stallWidth - 90) * -0.01;
            matrix.positionZ+=(+stallWidth - 36) * 0.009 - (+stallWidth - 90) * -0.01

            matrix.scaleX += parseFloat(
              (
                (+alcoveDepth - 98) * 0.01 +
                (+standardDepth - 62) * 0.01
              ).toFixed(3)
            ) + -0.11;

          }
          if (+stallWidth > 75 && +stallWidth <= 80) {
            // Calculating leftPositionZ according to stallWidth
            matrix.rightPositionZ +=
            (+stallWidth - 36) * -0.007 - (+stallWidth - 90) * -0.01;
            matrix.positionZ+=(+stallWidth - 36) * 0.003 - (+stallWidth - 90) * -0.01

            matrix.scaleX += parseFloat(
              (
                (+alcoveDepth - 98) * 0.01 +
                (+standardDepth - 62) * 0.01
              ).toFixed(3)
            ) + -0.13;

          }

          if (+stallWidth > 80 && +stallWidth <= 85) {
            // Calculating leftPositionZ according to stallWidth
            matrix.rightPositionZ +=
            (+stallWidth - 36) * -0.009 - (+stallWidth - 90) * -0.01;
            matrix.positionZ+=(+stallWidth - 36) * -0.001 - (+stallWidth - 90) * -0.01

            matrix.scaleX += parseFloat(
              (
                (+alcoveDepth - 98) * 0.01 +
                (+standardDepth - 62) * 0.01
              ).toFixed(3)
            ) + -0.15;

          }

          if (+stallWidth > 85 && +stallWidth <= 90) {
            // Calculating leftPositionZ according to stallWidth
            matrix.rightPositionZ +=
            (+stallWidth - 36) * -0.010 - (+stallWidth - 90) * -0.01;
            matrix.positionZ+=(+stallWidth - 36) * -0.001 - (+stallWidth - 90) * -0.01

            matrix.scaleX += parseFloat(
              (
                (+alcoveDepth - 98) * 0.01 +
                (+standardDepth - 62) * 0.01
              ).toFixed(3)
            ) + -0.15;
          }
         
        } else {
          matrix.scaleX += -0.22;
          matrix.leftPositionZ += -0.6;

          if (+stallWidth >= 60 && +stallWidth <= 65) {
            // Calculating leftPositionZ according to stallWidth
            matrix.leftPositionZ +=
              (+stallWidth - 36) * 0.01 - (+stallWidth - 90) * -0.01;
          }

          if (+stallWidth >= 66 && +stallWidth <= 70) {
            // Calculating leftPositionZ according to stallWidth
            matrix.leftPositionZ +=
              (+stallWidth - 36) * 0.015 - (+stallWidth - 90) * -0.01;
          }

          if (+stallWidth >= 71 && +stallWidth <= 80) {
            // Calculating leftPositionZ according to stallWidth
            matrix.leftPositionZ +=
              (+stallWidth - 36) * 0.018 - (+stallWidth - 90) * -0.01;
          }

          if (+stallWidth >= 81 && +stallWidth <= 90) {
            // Calculating leftPositionZ according to stallWidth
            matrix.leftPositionZ +=
              (+stallWidth - 36) * 0.014 - (+stallWidth - 90) * 0.02;
          }
        }
      }
    }
    // Is the Layout is Alcove
    if (isAlcove) {
      // If the Stall is First Stall
      if (isFirst) {
        matrix.scaleX += 0.14;
        // If the Layout Direction is Left
        if (layoutDirection === "Left") {
          matrix.scaleX =
            parseFloat(
              (
                (+alcoveDepth - 98) * 0.01 +
                (+standardDepth - 62) * 0.01
              ).toFixed(3)
            ) + 2.1;
          matrix.positionX =
            parseFloat(
              (
                (+alcoveDepth - 98) * 0.07 -
                (+standardDepth - 62) * 0.12
              ).toFixed(3)
            ) + 1.0;
          matrix.positionZ = calculateAlcovePositionZ(
            -1.6,
            27,
            stallWidth,
            "Left",
            noOfStalls
          );

          if (noOfStalls === 1) {
            if (isPrimary) {
              matrix.positionZ = calculateAlcovePositionZ(
                -1.6,
                27,
                stallWidth,
                "Left",
                noOfStalls
              );
            }
            matrix.scaleX =
              parseFloat(
                (
                  (+alcoveDepth - 98) * 0.01 +
                  (+standardDepth - 62) * 0.01
                ).toFixed(3)
              ) + 2.1;
            matrix.positionX =
              parseFloat(
                (
                  (+alcoveDepth - 98) * 0.07 -
                  (+standardDepth - 62) * 0.12
                ).toFixed(3)
              ) + 1;
          }

          matrix.rightPositionZ = -2.306;
          matrix.rotationY = 0;
        } else {
          // If the Layout Direction is Right
          matrix.scaleX =
            parseFloat(
              (
                (+alcoveDepth - 98) * 0.01 +
                (+standardDepth - 62) * 0.01
              ).toFixed(3)
            ) + 2.1;
          matrix.positionX =
            parseFloat(
              (
                (+alcoveDepth - 98) * 0.07 -
                (+standardDepth - 62) * 0.12
              ).toFixed(3)
            ) + 1.0;
          if (noOfStalls === 1) {
            if (isPrimary) {
              matrix.positionZ = calculateAlcovePositionZ(
                1.9,
                27,
                stallWidth,
                "Right",
                noOfStalls
              );
            }
            matrix.scaleX =
              parseFloat(
                (
                  (+alcoveDepth - 98) * 0.01 +
                  (+standardDepth - 62) * 0.01
                ).toFixed(3)
              ) + 2.1;
            matrix.positionX =
              parseFloat(
                (
                  (+alcoveDepth - 98) * 0.07 -
                  (+standardDepth - 62) * 0.12
                ).toFixed(3)
              ) + 1;
          }
          // matrix.positionX = 5.215;
          matrix.positionZ = calculateAlcovePositionZ(
            1.9,
            27,
            stallWidth,
            "Right"
          );
          matrix.leftPositionZ = 2.661;
          matrix.rotationY = 0;
        }
      } else if (stallId === 1) {
        // If the Stall is in 2nd place
        matrix.scaleX = 0.869;
        // If the Layout Direction is Left
        if (layoutDirection === "Left") {
          matrix.scaleX = calculateScaleX(1, 40, stallWidth) + 0.1;
        }
        if (layoutDirection === "Right") {
          matrix.scaleX = calculateScaleX(1, 40, stallWidth) + 0.01;
        }
        // If the noOfStalls is only 2
        if (noOfStalls === 2) {
          matrix.scaleX = 0.91;
          // If the Layout Direction is Left
          if (layoutDirection === "Left") {
            matrix.positionZ = matrix.positionZ + -0.1;
            matrix.scaleX = calculateScaleX(1, 40, stallWidth) + 0.1;
          } else {
            matrix.positionZ = matrix.positionZ + 0.2;
            matrix.scaleX = calculateScaleX(1, 40, stallWidth) + 0.01;
          }
        }
      }
      // If the Stall is Ada Stall
      if (isAda) {
        matrix.scaleX -= 0.16;
        // If the Layout Direction is Left
        if (layoutDirection === "Left") {
          matrix.scaleX =
            parseFloat(
              ((+adaDepth - 112) * 0.01 + (+standardDepth - 62) * 0.01).toFixed(
                3
              )
            ) + 2.0;
          matrix.positionX =
            parseFloat(
              (
                (+adaDepth - 112) * 0.085 -
                (+standardDepth - 62) * 0.12
              ).toFixed(3)
            ) + 4.0;
          // matrix.positionZ = -4.225;
          matrix.positionZ = calculateAlcovePositionZ(-4.0, 60, stallWidth,"Left");
          
          matrix.rightPositionZ = -3.209;
          matrix.rotationY = 0;

          if (noOfStalls === 1) {
            // matrix.positionZ = -4.225;
            matrix.positionZ = calculateAlcovePositionZ(
              -4.0,
              60,
              stallWidth,
              "Left"
            );

            if (isPrimary) {
              matrix.positionZ = calculateAlcovePositionZ(
                -4.3,
                60,
                stallWidth,
                "Left",
                noOfStalls,
                isPrimary //only for ADA Alcove Between 
              );
            }
            
            matrix.scaleX =
              parseFloat(
                (
                  (+adaDepth - 112) * 0.01 +
                  (+standardDepth - 62) * 0.01
                ).toFixed(3)
              ) + 2.0;
            matrix.positionX =
              parseFloat(
                (
                  (+adaDepth - 112) * 0.085 -
                  (+standardDepth - 62) * 0.12
                ).toFixed(3)
              ) + 4.0;
          }
          
        } else {
          // If the Layout Direction is Right
          matrix.scaleX =
            parseFloat(
              ((+adaDepth - 112) * 0.01 + (+standardDepth - 62) * 0.01).toFixed(
                3
              )
            ) + 2.0;
          matrix.positionX =
            parseFloat(
              (
                (+adaDepth - 112) * 0.085 -
                (+standardDepth - 62) * 0.12
              ).toFixed(3)
            ) + 4.0;

          // matrix.positionZ = 4.370;
          matrix.positionZ = calculateAlcovePositionZ(
            4.3,
            60,
            stallWidth,
            "Right"
          );
          matrix.leftPositionZ = 3.331;
          matrix.rotationY = 0;
          
          if (noOfStalls === 1) {
            matrix.scaleX =
              parseFloat(
                (
                  (+adaDepth - 112) * 0.016 +
                  (+standardDepth - 62) * 0.01
                ).toFixed(3)
              ) + 2.0;
            matrix.positionX =
              parseFloat(
                (
                  (+adaDepth - 112) * 0.08 -
                  (+standardDepth - 62) * 0.12
                ).toFixed(3)
              ) + 4.4;

              if (isPrimary) {
                matrix.positionZ = calculateAlcovePositionZ(
                  4.3,
                  60,
                  stallWidth,
                  "Right",
                  noOfStalls,
                  isPrimary //only for ADA Alcove Between 
                );
              }
          }
          
        }
      }
    }
    // If it's ADA
    if (isAda && !isAlcove) {
      // Calculating positionX according to standardDepth
      matrix.positionX = matrix.positionX
        ? matrix.positionX + parseFloat(((+adaDepth - 62) * 0.135).toFixed(3))
        : parseFloat(((+adaDepth - 62) * 0.135).toFixed(3));

      // Calculating rightPositionX,rightScaleZ,leftPositionX,leftScaleZ  according to standardDepth for Ada
      if (layoutDirection === "Left") {
        matrix.rightPositionX += (+adaDepth - 62) * 0.05;
        matrix.rightScaleZ += (+adaDepth - 62) * 0.023;
      } else {
        matrix.leftPositionX += (+adaDepth - 62) * 0.069;
        matrix.leftScaleZ += (+adaDepth - 62) * 0.017;
      }
    } else if (!isAda && !isAlcove) {
      // Calculating positionX according to standardDepth
      matrix.positionX = matrix.positionX
        ? matrix.positionX +
          parseFloat(((+standardDepth - 62) * 0.135).toFixed(3))
        : parseFloat(((+standardDepth - 62) * 0.135).toFixed(3));
      // Calculating rightPositionX,rightScaleZ,leftPositionX,leftScaleZ  according to standardDepth
      if (layoutDirection === "Left") {
        matrix.rightPositionX += (+standardDepth - 62) * 0.05;
        matrix.rightScaleZ += (+standardDepth - 62) * 0.023;
      } else {
        matrix.leftPositionX += (+standardDepth - 62) * 0.061;
        matrix.leftScaleZ += (+standardDepth - 62) * 0.021;
      }
    } else {
      // Calculating positionX according to standardDepth
      matrix.positionX = matrix.positionX
        ? matrix.positionX +
          parseFloat(((+standardDepth - 62) * 0.135).toFixed(3))
        : parseFloat(((+standardDepth - 62) * 0.135).toFixed(3));

      // Calculating rightPositionX,rightScaleZ,leftPositionX,leftScaleZ  according to standardDepth for alcove
      if (layoutDirection === "Left") {
        matrix.rightPositionX += (+standardDepth - 62) * 0.05;
        matrix.rightScaleZ += (+standardDepth - 62) * 0.023;
      } else {
        // Calculating leftScaleZ, leftPositionZ according to standardDepth for alcove only in the range 60 to 68
        if (+standardDepth > 60 && +standardDepth <= 68)
           matrix.leftScaleZ += (+standardDepth - 62) * 0.032;
           matrix.leftPositionX += (+standardDepth - 62) * 0.021;
        // Calculating leftScaleZ, leftPositionZ according to standardDepth for alcove only in the range 68 to 78

        if (+standardDepth > 68 && +stallWidth <= 78)
           matrix.leftScaleZ += (+standardDepth - 62) * 0.023;
           matrix.leftPositionX += (+standardDepth - 62) * 0.020;
      }
    }
    // Return Matrix...
    return { ...matrix };
  }, [
    isAlcove,
    isFirst,
    layoutDirection,
    isAda,
    stallWidth,
    standardDepth,
    adaDepth,
    alcoveDepth,
    isPrimary,
  ]);

  // Animation on Matrix
  const {
    position,
    leftPosition,
    rightPosition,
    rotation,
    scale,
    leftScale,
    rightScale,
  } = useSpring({
    position: [positionX, positionY, positionZ],
    leftPosition: [leftPositionX, leftPositionY, leftPositionZ],
    rightPosition: [rightPositionX, rightPositionY, rightPositionZ],
    rotation: [rotationX, rotationY, rotationZ],
    scale: [scaleX, scaleY, scaleZ],
    leftScale: [leftScaleX, leftScaleY, leftScaleZ],
    rightScale: [rightScaleX, rightScaleY, rightScaleZ],
  });

  return (
    <>
      {/* @ts-ignore: Spring type is Vector3 Type (Typescript return error on position) */}
      <animated.mesh geometry={nodes.HeadrailFront.geometry} material={materials["_defaultMat.002"]} position={position} rotation={rotation} scale={scale} />
        
        {noOfStalls > 1?
        <>
          {(isLast && layoutDirection === "Left" && (layoutOption === "inCornerLeft" || layoutOption === "alcoveCornerLeft")) && (
            // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
            <animated.mesh geometry={nodes.HeadrailRight.geometry} material={materials["_defaultMat.002"]} position={rightPosition} rotation={[0, 1.569, 0]} scale={rightScale} />
          )}
          {(isLast && layoutDirection === "Right" && (layoutOption === "inCornerRight" || layoutOption === "alcoveCornerRight")) && (
            // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
            <animated.mesh geometry={nodes.HeadrailLeft.geometry} material={materials["_defaultMat.002"]} position={leftPosition} rotation={[0, 1.569, 0]} scale={leftScale} />
          )}
        </>
        :
        <>
          {(isLast && layoutDirection === "Left" && (layoutOption === "inCornerLeft" )) && (
            // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
            <animated.mesh geometry={nodes.HeadrailRight.geometry} material={materials["_defaultMat.002"]} position={rightPosition} rotation={[0, 1.569, 0]} scale={rightScale} />
          )}
          {(isLast && layoutDirection === "Right" && (layoutOption === "inCornerRight")) && (
            // @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
            <animated.mesh geometry={nodes.HeadrailLeft.geometry} material={materials["_defaultMat.002"]} position={leftPosition} rotation={[0, 1.569, 0]} scale={leftScale} />
          )}
        </>
        }
       
    </>
  );
}
