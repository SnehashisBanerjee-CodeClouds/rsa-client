import { useMemo } from "react";
import { animated, useSpring } from "@react-spring/three";
import { MeshDistortMaterial } from "@react-three/drei";
import { useAppSelector } from "@/hooks/useStore";
import { ADADepth, GLTFAdaStall, GLTFStall, Layout, LayoutDirection, OutlineColor, StallADAWidth, StallWidth, StandardDepth } from "@/types/model";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);

export default function LayoutSideWall({
  nodesData,
  placeAt,
  layout,
  stallWidth,
  standardDepth,
  adaDepth = "62",
  isAda,
}: {
  nodesData: GLTFStall | GLTFAdaStall;
  placeAt: LayoutDirection;
  layout: Layout;
  stallWidth: StallWidth | StallADAWidth;
  standardDepth: StandardDepth;
  adaDepth?: ADADepth;
  isAda?: boolean;
}) {
  const { nodes } = nodesData;
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);
  const { noOfStalls, alcoveDepth } = rooms[selectedRoom.roomIndex].stall;

  const { layoutDirection, layoutOption } = layout;
  // If the Layout is in Alcove option
  const isAlcove = useMemo(() => layoutOption.startsWith("alcove"), [layoutOption]);
  // If the Wall is Primary | In case of Alcove Between
  const isPrimary = useMemo(() => layoutOption.startsWith("alcoveBetween") ? placeAt === layoutDirection : true, [layoutDirection, layoutOption]);
  // Matrix Calculations
  const { positionX, positionY, positionZ, scaleX, scaleY, scaleZ } =
    useMemo(() => {
      // Matrixs
      const matrix = {
        positionX: -0.208,
        positionY: 3.803,
        positionZ: 3.014,
        scaleX: 0.8,
        scaleY: 1.4,
        scaleZ: 1,
      };

      // Calculating positionZ according to stallWidth
      let positionZ = (+stallWidth - 36) * 0.11;
      if (+stallWidth > 40 && +stallWidth < 60)
        positionZ = (+stallWidth - 36) * 0.077;
      if (+stallWidth >= 60 && +stallWidth <= 90)
        positionZ = (+stallWidth - 36) * 0.025;

      // If placeAt is Left
      if (placeAt === "Left") {
        matrix.positionZ = 3.014;
        matrix.positionZ += parseFloat(positionZ.toFixed(3));
        // If it's ADA
        if (isAda) {
          matrix.positionX = matrix.positionX + 0.044;
          matrix.positionZ = 4.078;
          matrix.positionZ += parseFloat(positionZ.toFixed(3));
          // Calculating scaleZ according to adaDepth
          matrix.scaleX = parseFloat(
            (0.8 + (+adaDepth - 62) * 0.01).toFixed(3)
          );
          // Calculating positionX according to adaDepth
          matrix.positionX += parseFloat(((+adaDepth - 62) * 0.064).toFixed(3));
        } else {
          // Calculating scaleZ according to standardDepth
          matrix.scaleX = parseFloat(
            (0.8 + (+standardDepth - 62) * 0.01).toFixed(3)
          );
          // Calculating positionX according to standardDepth
          matrix.positionX += parseFloat(
            ((+standardDepth - 62) * 0.064).toFixed(3)
          );
        }
      } else {
        matrix.positionZ = -2.716;
        matrix.positionZ += -parseFloat(positionZ.toFixed(3));
        // If it's ADA
        if (isAda) {
          matrix.positionX = matrix.positionX + 0.044;
          matrix.positionZ = -3.929;
          matrix.positionZ += -parseFloat(positionZ.toFixed(3));
          // Calculating scaleZ according to adaDepth
          matrix.scaleX = parseFloat(
            (0.8 + (+adaDepth - 62) * 0.01).toFixed(3)
          );
          // Calculating positionX according to adaDepth
          matrix.positionX += parseFloat(((+adaDepth - 62) * 0.064).toFixed(3));
        } else {
          // Calculating scaleZ according to standardDepth
          matrix.scaleX = parseFloat(
            (0.8 + (+standardDepth - 62) * 0.01).toFixed(3)
          );
          // Calculating positionX according to standardDepth
          matrix.positionX += parseFloat(
            ((+standardDepth - 62) * 0.064).toFixed(3)
          );
        }
      }
      // Is the Layout is Alcove
      if (isAlcove) {
        // If the Wall is Primary
        if (isPrimary) {
          matrix.scaleX = parseFloat(
            (0.985 + ((+alcoveDepth - 98) * 0.008) + ((+standardDepth - 62) * 0.0049)).toFixed(3)
          );
          matrix.positionX += parseFloat(
            (1.200 + ((+alcoveDepth - 98) * 0.051) - ((+standardDepth - 62) * 0.032)).toFixed(3)
          );

          // If it's ADA
          if (isAda) {
            matrix.positionX = 2.496;
      
            matrix.scaleX = parseFloat(
              (1.218+ ((+adaDepth - 112) * 0.0098) + ((+standardDepth - 62) * 0.0049)).toFixed(3)
            );
       
            matrix.positionX += parseFloat(
              (0.052 + ((+adaDepth - 112) * 0.064) + ((+standardDepth - 62) * 0.032)).toFixed(3)
            );
          }
        } else {
          matrix.positionX = -0.856;
          matrix.scaleX = 0.7;
          if (+standardDepth >= 74) {
            matrix.positionX = -0.2;
            matrix.scaleX = 0.8;
          }
          // If Room has only 1 Stall
          if (noOfStalls === 1) {
            matrix.positionX = -1.502;

            // If placeAt is Left
            if (placeAt === "Left") {
              matrix.positionZ = (+stallWidth - 10) * 0.11;
              if (+stallWidth > 40 && +stallWidth < 60)
                matrix.positionZ = (+stallWidth) * 0.078;

              matrix.scaleX = 0.6;

              matrix.scaleX = 0.6;
              if (+standardDepth > 64 && +standardDepth <= 68) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.9
              }
              if (+standardDepth > 68 && +standardDepth <= 70) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 70 && +standardDepth <= 74) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 74 && +standardDepth <= 76) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 76) {
                matrix.scaleX = 0.8;
                matrix.positionX = -0.2
              }
            } else {
              matrix.positionZ = -(+stallWidth - 13) * 0.11;
              if (+stallWidth > 40 && +stallWidth < 60)
                matrix.positionZ = -(+stallWidth - 4) * 0.077;



              matrix.scaleX = 0.6;
              if (+standardDepth > 64 && +standardDepth <= 68) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 68 && +standardDepth <= 70) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 70 && +standardDepth <= 74) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 74 && +standardDepth <= 76) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 76) {
                matrix.scaleX = 0.8;
                matrix.positionX = -0.2
              }
            }


            // If it's ADA
            if (isAda) {
              // If placeAt is Left
              if (placeAt === "Left") {
                if (+stallWidth >= 60 && +stallWidth <= 90) {
                  // Calculating positionZ according to stallWidth
                  positionZ += ((+stallWidth - 36) * 0.070) - ((+stallWidth - 90) * 0.07);
                  // Updating Positions...
                  matrix.positionZ = parseFloat(positionZ.toFixed(3));
                }
                matrix.scaleX = 0.6;
              if (+standardDepth > 64 && +standardDepth <= 68) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.9
              }
              if (+standardDepth > 68 && +standardDepth <= 70) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 70 && +standardDepth <= 74) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 74 && +standardDepth <= 76) {
                matrix.scaleX = 0.7;
                matrix.positionX = -0.8
              }
              if (+standardDepth > 76) {
                matrix.scaleX = 0.8;
                matrix.positionX = -0.2
              }
              } else {
                matrix.positionZ = -3.43;
                if (+stallWidth >= 60 && +stallWidth <= 90) {
                  // Calculating positionZ according to stallWidth
                  positionZ += ((+stallWidth - 36) * 0.070) - ((+stallWidth - 90) * 0.07);
                  // Updating Positions...
                  matrix.positionZ = -parseFloat(positionZ.toFixed(3));
                  // matrix.scaleX = 0.6;

                  // if (+adaDepth >= 64 && +adaDepth < 68) {
                  //   matrix.scaleX = 0.6;
                  //   matrix.positionX = -1
                  // }
                  // if (+adaDepth >= 68 && +adaDepth < 70) {
                  //   matrix.scaleX = 0.6;
                  //   matrix.positionX = -0.8
                  // }
                  // if (+adaDepth >= 70 && +adaDepth < 74) {
                  //   matrix.scaleX = 0.7;
                  //   matrix.positionX = -0.8
                  // }
                  // if (+adaDepth >= 74 && +adaDepth < 76) {
                  //   matrix.scaleX = 0.7;
                  //   matrix.positionX = -0.6
                  // }
                  // if (+adaDepth >= 76) {
                  //   matrix.scaleX = 0.7;
                  //   matrix.positionX = -0.2
                  // }
                }
                // matrix.scaleX = parseFloat(
                //   (1.580 + (+adaDepth - 125) * 0.08).toFixed(3)
                // );
                // matrix.positionX += parseFloat(
                //   ((+adaDepth - 112) * 0.064).toFixed(3)
                // );
                matrix.scaleX = 0.6;
                if (+standardDepth > 64 && +standardDepth <= 68) {
                  matrix.scaleX = 0.7;
                  matrix.positionX = -0.8
                }
                if (+standardDepth > 68 && +standardDepth <= 70) {
                  matrix.scaleX = 0.7;
                  matrix.positionX = -0.8
                }
                if (+standardDepth > 70 && +standardDepth <= 74) {
                  matrix.scaleX = 0.7;
                  matrix.positionX = -0.8
                }
                if (+standardDepth > 74 && +standardDepth <= 76) {
                  matrix.scaleX = 0.7;
                  matrix.positionX = -0.8
                }
                if (+standardDepth > 76) {
                  matrix.scaleX = 0.8;
                  matrix.positionX = -0.2
                }

              }
            }
          }
        }
      }
      // Return Matrix...
      return { ...matrix };
    }, [
      isAlcove,
      isPrimary,
      layoutDirection,
      isAda,
      stallWidth,
      standardDepth,
      alcoveDepth,
      adaDepth,
    ]);

  // Animation on Matrix
  const { position, scale } = useSpring({
    position: [positionX, positionY, positionZ],
    scale: [scaleX, scaleY, scaleZ],
  });

  return (
    //  @ts-ignore: Spring type is Vector3 Type (Typescript return error on position)
    <animated.mesh geometry={nodes.WallLayoutLeft.geometry} material={nodes.WallLayoutLeft.material} position={position} rotation={[Math.PI / 2, 0, 0.002]} scale={scale}>
      <AnimatedMeshDistortMaterial speed={0} distort={0} color={OutlineColor.Secondary} />
    </animated.mesh>
  )
}