import { isDesktop, isMobile, isTablet } from "react-device-detect";
import {
  LayoutDirection,
  StallConfig,
  StandardDepth,
  UrinalScreenConfig,
} from "@/types/model";
import toast, { ToastPosition } from "react-hot-toast";

// Calculate Zoom
export const calculateZoom = (
  canvasWidth: number,
  stallConfig: StallConfig[],
  standardDepth: StandardDepth,
  isAlcove: boolean = false,
  device:string
): number => {
  let baseZoom = 10;
  let noOfStalls = stallConfig.length;
  const hasAda = stallConfig[0].type === "ada";
  // ...
  if (noOfStalls <= 0) return 0;
  // If Ada Stall Included
  let zoomIdxForAda = 0;
  if (hasAda) {
    zoomIdxForAda = noOfStalls > 1 ? noOfStalls - 1 : 0;
    noOfStalls = noOfStalls > 1 ? noOfStalls - 1 : 1;
  }
  // Initialize the base zoom values
  function deviceWiseZoom(device:string) {
    let zoomsArr:Array<number>=[];
    switch (device) {
      case "desktop":
       zoomsArr= [
          0.50,
          isAlcove ? 1.0 : 0.82,
          isAlcove ? 1.10 : 1.07,
          isAlcove ? 1.01 : 1.3,
          1.35,
          1.4,
          isAlcove ? 1.42 : 1.45,
          1.45,
          1.45,
          1.48,
        ]
        break;
    case "tablet":
      zoomsArr=   [isAlcove?0.50:0.30,
      isAlcove ? 0.80 : 0.45,
      isAlcove ? 0.85 : 0.70,
      isAlcove ? 0.70 : 0.90,
      isAlcove?0.90:1.15,
      isAlcove?1.1:1.3,
      isAlcove ? 1.28 : 1.55,
      isAlcove ? 1.45 :1.75,
      isAlcove ? 1.65 :2.0,
      isAlcove ? 1.70 :2.0]
      break;
      case "mobile":
        zoomsArr=[
          isAlcove? 0.68 : 0.50, 
          isAlcove?1.20 : 1.0, 
          isAlcove?1.05 : 1.05, 
          isAlcove? 1.35 : 1.05, 
          isAlcove? 1.35 : 1.85, 
          isAlcove? 1.63 : 1.75, 
          isAlcove? 1.85 : 1.95,
          isAlcove? 1.7 : 1.7,
          isAlcove? 1.9 : 1.8,
          isAlcove? 1.9 : 1.9
        ]
        break;
      default:     
        break;
    }
    return zoomsArr;
  }
  function deviceWiseZoomADA(device:string) {
    let zoomArrADA:Array<number>=[];
    switch (device) {
      case "desktop":
        zoomArrADA=[
          0.72,
          isAlcove ? 0.92 : 1.05,
          1.18,
          1.2,
          isAlcove?1.2:1.3,
          1.3,
          isAlcove ? 1.38 : 1.41,
          isAlcove ? 1.4 : 1.41,
          1.41,
          1.45,
        ]
        break;
    case "tablet":
      zoomArrADA=[
        isAlcove ?0.62:0.52,
        isAlcove ? 0.74 : 0.75,
        isAlcove ? 1.02 :0.97,
        isAlcove ? 1.06 :1.1,
        isAlcove?0.85:1.4,
        isAlcove?0.98:1.6,
        isAlcove ? 1.05 : 1.70,
        isAlcove ? 1.2 : 2.0,
        isAlcove?1.30:1.95,
        isAlcove?1.45:1.90,
      ]
      break;
      case "mobile":
        zoomArrADA=[
          isAlcove ? 1.05 : 0.80, 
          isAlcove ?1.15 : 1.15,
          isAlcove ?1.40 : 1.55, 
          isAlcove ?1.44 : 1.75, 
          isAlcove ?1.25 : 1.85, 
          isAlcove ?1.75 : 1.95, 
          isAlcove ?1.65 : 1.85, 
          isAlcove ?1.85 : 1.85,
          isAlcove ?1.85 : 1.95,
          isAlcove ?1.85  : 1.95
        ]
        break;
      default:
        break;
    }
    return zoomArrADA;
  }
  const zoomsArray=deviceWiseZoom(device)
 
  const zoomsAdaArray = deviceWiseZoomADA(device)
  if (noOfStalls <= zoomsArray.length)
    baseZoom = hasAda
      ? zoomsAdaArray[zoomIdxForAda]
      : zoomsArray[noOfStalls - 1];
  // If it's Alcove & noOfStalls <= 3
  if (isAlcove && noOfStalls <= 3) {
    switch (noOfStalls) {
      case 1:
       switch (device) {
        case "desktop":
          baseZoom-=0.21
          break;
       case "tablet":
        baseZoom-=0.30
        break;
        case "mobile":
          baseZoom-=0.35
          break;
        default:
          break;
       }
        // baseZoom -= isDesktop ? 0.21 : 0.35;
        break;
      case 2:
        baseZoom -= 0.44;
        break;
      case 3:
        switch (device) {
          case "desktop":
            baseZoom-=0.3
            break;
         case "tablet":
          baseZoom-=0.3
          break;
          case "mobile":
            baseZoom-=0.1
            break;
          default:
            break;
         }
        // baseZoom -= 0.3;
        break;
    }
  }
  // Calculating Overall Stall Width
  const totalStallWidth = stallConfig.reduce(
    (sum, stall) => sum + +(stall.stallWidth ? stall.stallWidth : 36),
    0
  );
  // Calculate how much the total stalls' width exceeds the canvas width
  const widthRatio = totalStallWidth / canvasWidth;
  // Adjust the zoom based on the width ratio
  let zoom = baseZoom / widthRatio;
  // Zoom Adjustment for Stall 1
  if (standardDepth && noOfStalls === 1 && totalStallWidth < 36)
    zoom -= (+standardDepth - (isAlcove ? 62 : 36)) * 0.11;
  // Returning...
  return +zoom.toFixed(3);
};

// Calculate Stall Config
export const calculateStallConfig = (
  noOfStalls: number,
  adaStall: boolean,
  layoutDirection: LayoutDirection
) => {
  // If Ada Stall Included
  if (adaStall) noOfStalls = --noOfStalls;
  // Calculating Stalls
  const calStalls: StallConfig[] = [];
  let zbase = 0;
  const distanceBetween = 5.0;
  // Calculating Base Value
  zbase = noOfStalls % 2 === 0 ? -2.5 : 0;
  if (adaStall) {
    if (layoutDirection === "Left") zbase = noOfStalls % 2 === 0 ? -6 : -3.5;
    else zbase = noOfStalls % 2 === 0 ? 1 : 3;
  }
  // Adding Fisrt Stall if noOfStalls > 0 in case of Ada = false
  if (noOfStalls > 0)
    calStalls.push({
      x: 0,
      y: -3,
      z: zbase,
      stallWidth: "36",
      stallFraction: "0",
      doorOpening: "22",
      doorSwing: "rightIn",
    });
  // Looping
  for (let i = 2; i <= noOfStalls; i++) {
    const multiplier = Math.floor((i - 2) / 2) + 1;
    const step = i % 2 === 0 ? 1 : -1;
    const z = zbase + step * distanceBetween * multiplier;
    calStalls.push({
      x: 0,
      y: -3,
      z,
      stallWidth: "36",
      stallFraction: "0",
      doorOpening: "22",
      doorSwing: "rightIn",
    });
  }
  // Checking for ADA stall
  if (adaStall) {
    let z = 0;
    // Layout Direction - Left
    if (layoutDirection === "Left") {
      z = 6.88;
      const posForAda = Math.floor((noOfStalls - 2) / 2) + 1;
      z = zbase + z + distanceBetween * posForAda;
    } else {
      z = -6.7;
      const posForAda = Math.floor((noOfStalls - 3) / 2) + 1;
      z = zbase + (z + -distanceBetween * posForAda);
    }
    // Adding ADA Stall
    calStalls.push({
      type: "ada",
      x: -0.06,
      y: -3,
      z: z,
      stallWidth: "60",
      stallFraction: "1/2",
      doorOpening: "36",
      doorSwing: layoutDirection === "Left" ? "leftIn" : "rightIn",
    });
  }
  // Layout Direction - Left
  if (layoutDirection === "Left") calStalls.sort((a, b) => b.z - a.z);
  else calStalls.sort((a, b) => a.z - b.z);
  // Making 1st Stalled to be Default Selected
  calStalls[0].isOpened = true;
  calStalls[0].isSelected = true;
  // Returning Calculated Stalls
  return calStalls;
};

// Calculate Stall Zoom
export const calculateUrinalScreenZoom = (noOfUrinalScreens: number,device:string) => {
  if (noOfUrinalScreens <= 0) return 0;
  // Initialize the base zoom values
  // const zoomsArray = isDesktop
  //   ? [15, 13, 9, 7, 6, 5, 4,4.6,2.0]
  //   : [14, 10, 7, 5, 4, 3, 3];
  function deviceWiseScreenZoom(device:string) {
    let deviceStr:Array<number>=[];
    switch (device) {
      case "desktop":
        deviceStr=[20,14,10,7,6,5,4,3,3,3,2,2,2,2,2,2,1,1,1,1]
        break;

      case "tablet":
        deviceStr=[20,14,12,9,8,6,5,4,4,4,3,3,3,3,2,2,2,2,2,2]
        break;
    case "mobile":
      deviceStr=[20,10,6,4,3,3,2,2,2,1,1,1,1,1,1,1,1,1,1,1]
      break;
      default:
        break;
    }
    return deviceStr
  }
  const zoomsArray=deviceWiseScreenZoom(device)
  if (noOfUrinalScreens <= zoomsArray.length)
    return zoomsArray[noOfUrinalScreens - 1];

  // After the base values, zoom decreases by 1 for each step
  const additionalSteps = noOfUrinalScreens - zoomsArray.length;
  return Math.max(0, 4 - additionalSteps * 1);
};

// Calculate Urinal Screen Config
export const calculateUrinalScreenConfig = (
  noOfUrinalScreens: number,
  layoutDirection: LayoutDirection
) => {
  // Calculating Stalls
  const calStalls: UrinalScreenConfig[] = [];
  let zbase = 0;
  const distanceBetween = 5.0;
  // Calculating Base Value
  zbase = noOfUrinalScreens % 2 === 0 ? -2.5 : 0;
  // Adding Fisrt Stall if noOfUrinalScreens > 0 in case of Ada = false
  if (noOfUrinalScreens > 0)
    calStalls.push({
      x: 3,
      y: -3,
      z: zbase,
    });
  // Looping
  for (let i = 2; i <= noOfUrinalScreens; i++) {
    const multiplier = Math.floor((i - 2) / 2) + 1;
    const step = i % 2 === 0 ? 1 : -1;
    const z = zbase + step * distanceBetween * multiplier;
    calStalls.push({
      x: 3,
      y: -3,
      z,
    });
  }
  // Layout Direction - Left
  if (layoutDirection === "Left") calStalls.sort((a, b) => b.z - a.z);
  else calStalls.sort((a, b) => a.z - b.z);
  // Making 1st Stalled to be Default Selected
  calStalls[0].isOpened = true;
  // Returning Calculated Stalls
  return calStalls;
};

export function handleError(
  message: string,
  position: ToastPosition = "top-right",
  duration: number = 2000,
  style: boolean = true,
  id?: string
) {
  return toast.error(message, {
    style: style
      ? {
          padding: "20px 30px",
          background: "#333",
          color: "#fff",
          fontSize: "20px",
        }
      : {},
    position,
    duration,
    id,
  });
}
