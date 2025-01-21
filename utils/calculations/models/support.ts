import { DoorOpening, LayoutDirection } from "@/types/model";
import { SUPPORT_LEFT, SUPPORT_RIGHT } from "@/constants/model-matrix";
import { MatrixConfig } from "@/types/calculations";

export const calculateSupportMatrix = (
  support: "Left" | "Right",
  isAlcove: boolean,
  isFirst: boolean,
  isLast: boolean,
  layoutDirection: LayoutDirection,
  doorOpening: DoorOpening,
  isAda?: boolean,
) => {
  // Matrixs
  let matrix: MatrixConfig = {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1
  }
  // Checking Support Position
  switch (support) {
    case "Left":
      matrix = { ...SUPPORT_LEFT[doorOpening].default };
      if (isFirst && layoutDirection === "Left") matrix = { ...SUPPORT_LEFT[doorOpening].left };
      if (isFirst && isAlcove && matrix.positionX != undefined) {
        // matrix.positionX = 0.00001;
        if (layoutDirection === "Left") matrix.positionX = 0.0001 + -((+doorOpening - 22) * 0.105);
        else matrix.positionX = 0.0001 + -((+doorOpening - 22) * 0.235);
      }
      if (isLast && layoutDirection === "Right") matrix = { ...SUPPORT_LEFT[doorOpening].right };
      if (isAda) matrix = layoutDirection === "Left" ? { ...SUPPORT_LEFT[doorOpening].adaLeft } : { ...SUPPORT_LEFT[doorOpening].adaRight };
      break;
    case "Right":
      matrix = { ...SUPPORT_RIGHT[doorOpening].default };
      if (isLast && layoutDirection === "Left") matrix = { ...SUPPORT_RIGHT[doorOpening].left };
      if (isFirst && layoutDirection === "Right") matrix = { ...SUPPORT_RIGHT[doorOpening].right };
      if (isFirst && isAlcove && matrix.positionX != undefined) {
        if (layoutDirection === "Left") matrix.positionX = 0.0001 + ((+doorOpening - 22) * 0.235);
        else matrix.positionX = 0.0001 + ((+doorOpening - 22) * 0.320);
      }
      if (isAda) matrix = layoutDirection === "Left" ? { ...SUPPORT_RIGHT[doorOpening].adaLeft } : { ...SUPPORT_RIGHT[doorOpening].adaRight };
      break;
  }
  // Returning Matrix...
  return { ...matrix };
};

export const calculatePads = (
  pad: "Left" | "Right",
  padVal: number,
  layoutDirection: LayoutDirection,
  isAda?: boolean,
) => {
  let padscaleZ = 0.600;
  // Calculating Scale Z
  padscaleZ = padscaleZ + ((padVal - 3) * 0.150);
  let padPositionX = 0;
  if (pad === "Right") {
    padPositionX = 2.700;
    // Calculating Position X
    padPositionX = padPositionX + ((padVal - 3) * 0.430);
  }
  // ...
  return { padPositionX, padscaleZ };
}

export const calcPosXByPads = (
  swing: "Left" | "Right",
  padVal: number,
  layoutDirection: LayoutDirection,
  isAda?: boolean,
) => {
  let padPositionX = 0;
  padPositionX = 2.700;
  // Calculating Position X
  padPositionX = padPositionX + ((padVal - 3) * (layoutDirection === "Left" ? 0.152 : 0.146));
  if (layoutDirection === "Left") padPositionX += swing === "Left" ? -1.450 : 0;
  else padPositionX += swing === "Right" ? -1.550 : 0;
  // ...
  return padPositionX;
}