import { Stall, StallADAWidth, StallConfig, StallWidth } from "@/types/model";

export const calculateScaleX = (
  initialValue: number,
  subtractor: number,
  stallWidth: StallWidth | StallADAWidth,
  type?: "BackWall" | "FrontWall"|"Headrail"
) => {
  // Calculating scaleX according to stallWidth
  let scaleX = initialValue + (+stallWidth - subtractor) * 0.035;
  if (+stallWidth > 40 && +stallWidth < 60)
    scaleX = initialValue + (+stallWidth - subtractor) * 0.023;
  if (+stallWidth >= 60 && +stallWidth <= 90)
    scaleX = initialValue + (+stallWidth - subtractor) * 0.0098;
  switch (type) {
    case "BackWall":
      if (+stallWidth >= 60 && +stallWidth <= 66)
        scaleX = initialValue + (+stallWidth - subtractor) * 0.009;
      if (+stallWidth > 66 && +stallWidth <= 78)
        scaleX = initialValue + (+stallWidth - subtractor) * 0.0082;
      if (+stallWidth > 78 && +stallWidth <= 90)
        scaleX = initialValue + (+stallWidth - subtractor) * 0.0078;
      break;
    case "FrontWall":
      if (+stallWidth >= 27 && +stallWidth < 36)
        scaleX = initialValue + (+stallWidth - subtractor) * 0.037;
      if (+stallWidth >= 40 && +stallWidth <= 45)
        scaleX = initialValue + (+stallWidth - subtractor) * 0.015;
      if (+stallWidth >= 46 && +stallWidth <= 48)
        scaleX = initialValue + (+stallWidth - subtractor) * 0.02;
      // if (+stallWidth > 40 && +stallWidth < 60) scaleX = initialValue + (+stallWidth - subtractor) * 0.023;
      if (+stallWidth >= 60 && +stallWidth <= 66)
        scaleX = initialValue + (+stallWidth - subtractor) * 0.009;
      if (+stallWidth > 66 && +stallWidth <= 78)
        scaleX = initialValue + (+stallWidth - subtractor) * 0.0082;
      if (+stallWidth > 78 && +stallWidth <= 90)
        scaleX = initialValue + (+stallWidth - subtractor) * 0.0078;
      break;
  

  }

  // Returning...
  return parseFloat(scaleX.toFixed(3));
};

// Re-Calculation for Stalls Positions
export const reCalculatePositions = (
  stall: Stall,
  stallId: number,
  stallWidth: StallWidth | StallADAWidth,
  prevStallWidth: StallWidth | StallADAWidth
) => {
  let updatedStallConfig: StallConfig[] = [];
  // Calculating positionZ according to stallWidth
  let positionZ = (+stallWidth - 36) * 0.099;
  if (+stallWidth > 40 && +stallWidth < 60)
    positionZ = (+stallWidth - 36) * 0.079;
  if (+stallWidth >= 60 && +stallWidth <= 90)
    positionZ = (+stallWidth - 36) * 0.029;
  // Calculating prevPositionZ according to prevStallWidth
  let prevPositionZ = (+prevStallWidth - 36) * 0.099;
  if (+prevStallWidth > 40 && +prevStallWidth < 60)
    prevPositionZ = (+prevStallWidth - 36) * 0.079;
  if (+stallWidth >= 60 && +stallWidth <= 90)
    prevPositionZ = (+prevStallWidth - 36) * 0.029;
  // ...
  positionZ -= prevPositionZ;
  // Round...
  positionZ = parseFloat(positionZ.toFixed(3));

  updatedStallConfig = stall.stallConfig.map((stallInfo, idx) => {
    // Skip updating the provided stallId
    if (idx === stallId) return stallInfo;

    // ...
    let zBase = stallInfo.z;

    // Determine the direction and update Z accordingly
    if (stall.layout.layoutDirection === "Left") {
      if (idx < stallId) {
        zBase += positionZ;
      } else {
        zBase -= positionZ;
      }
      // For 'Left' direction
      return {
        ...stallInfo,
        z: zBase,
      };
    } else {
      // For 'Right' direction
      if (idx < stallId) {
        zBase -= positionZ;
      } else {
        zBase += positionZ;
      }
      return {
        ...stallInfo,
        z: zBase,
      };
    }
  });
  return updatedStallConfig;
};

export const calculateAlcovePositionZ = (
  initialValue: number,
  subtractor: number,
  stallWidth: StallWidth | StallADAWidth,
  type?: "Left" | "Right",
  noOfStalls?: number,
  isPrimary?: boolean | false //only for ADA Alcove Between it should be true else false. 
) => {
  // Calculating positionZ according to stallWidth for Alcove
  let positionZ = initialValue + (+stallWidth - subtractor) * 0.035;

  switch (type) {
    case "Left":
      switch (noOfStalls) {
        case 1:

          if(isPrimary){
            if (+stallWidth > 60 && +stallWidth <= 63)
              positionZ = initialValue + (+stallWidth - subtractor) * -0.090;

            if (+stallWidth > 63 && +stallWidth <= 67)
              positionZ = initialValue + (+stallWidth - subtractor) * -0.065;

            if (+stallWidth > 67 && +stallWidth <= 69)
              positionZ = initialValue + (+stallWidth - subtractor) * -0.055;

            if (+stallWidth > 69 && +stallWidth <= 75)
              positionZ = initialValue + (+stallWidth - subtractor) * -0.042;

            if (+stallWidth > 75 && +stallWidth <= 80)
              positionZ = initialValue + (+stallWidth - subtractor) * -0.038;

            if (+stallWidth > 80 && +stallWidth <= 85)
              positionZ = initialValue + (+stallWidth - subtractor) * -0.035;

            if (+stallWidth > 85 && +stallWidth <= 90)
              positionZ = initialValue + (+stallWidth - subtractor) * -0.030;

            
          }else{
            positionZ = -(+stallWidth - 13) * 0.11;
            if (+stallWidth > 40 && +stallWidth < 60)
            positionZ = -(+stallWidth - 4) * 0.077;
          }
        

          break;
        default:
          if (+stallWidth >= 20 && +stallWidth <= 25)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.009;
          if (+stallWidth > 25 && +stallWidth <= 30)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.0082;
          if (+stallWidth > 30 && +stallWidth <= 35)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.04;
          if (+stallWidth > 35 && +stallWidth <= 40)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.061;
          if (+stallWidth > 40 && +stallWidth <= 50)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.081;
          if (+stallWidth > 50 && +stallWidth <= 60)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.081;
          //Calculationg positionZ according to stallWidth for Alcove Ada
          if (+stallWidth > 60 && +stallWidth <= 65)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.081;
          if (+stallWidth > 65 && +stallWidth <= 70)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.071;
          if (+stallWidth > 70 && +stallWidth <= 75)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.061;
          if (+stallWidth > 75 && +stallWidth <= 80)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.051;
          if (+stallWidth > 80 && +stallWidth <= 85)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.041;
          if (+stallWidth > 85 && +stallWidth <= 90)
            positionZ = initialValue + (+stallWidth - subtractor) * -0.041;
          break;
      }

      break;
    case "Right":
      switch (noOfStalls) {
        case 1:

        if(isPrimary){
          if (+stallWidth > 60 && +stallWidth <= 63)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.090;

          if (+stallWidth > 63 && +stallWidth <= 67)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.065;

          if (+stallWidth > 67 && +stallWidth <= 69)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.055;

          if (+stallWidth > 69 && +stallWidth <= 75)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.030;

          if (+stallWidth > 75 && +stallWidth <= 80)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.038;

          if (+stallWidth > 80 && +stallWidth <= 85)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.035;

          if (+stallWidth > 85 && +stallWidth <= 90)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.030;

        }else{
          positionZ = (+stallWidth - 10) * 0.11;
          if (+stallWidth > 40 && +stallWidth < 60)
            positionZ = (+stallWidth) * 0.078;
        }
        break;

        default:
          if (+stallWidth > 25 && +stallWidth <= 30)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.09;
          if (+stallWidth > 30 && +stallWidth <= 35)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.1;
          if (+stallWidth > 35 && +stallWidth <= 40)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.1;
          if (+stallWidth > 40 && +stallWidth <= 50)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.08;
          if (+stallWidth > 50 && +stallWidth <= 60)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.08;

          //Calculationg positionZ according to stallWidth for Alcove Ada
          if (+stallWidth > 60 && +stallWidth <= 65)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.01;
          if (+stallWidth > 65 && +stallWidth <= 70)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.012;
          if (+stallWidth > 70 && +stallWidth <= 75)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.01;
          if (+stallWidth > 75 && +stallWidth <= 80)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.01;
          if (+stallWidth > 80 && +stallWidth <= 85)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.020;
          if (+stallWidth > 85 && +stallWidth <= 90)
            positionZ = initialValue + (+stallWidth - subtractor) * 0.022;
          break;
      }

      break;
  }

  // Returning...
  return parseFloat(positionZ.toFixed(3));
};
