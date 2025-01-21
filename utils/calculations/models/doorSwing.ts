import { DoorOpening, DoorSwing, LayoutDirection } from "@/types/model";
import { DOOR_SWING } from "@/constants/model-matrix";
import { MatrixConfig } from "@/types/calculations";

export type DoorMatrix = {
  [key in DoorOpening]: {
    left: {
      in: {
        doorX: number,
        doorY: number,
        doorZ: number,
        doorHandleX: number,
        doorHandleY: number,
        doorHandleZ: number,
      },
      out: {
        doorX: number,
        doorY: number,
        doorZ: number,
        doorHandleX: number,
        doorHandleY: number,
        doorHandleZ: number,
      }
    },
    right: {
      in: {
        doorX: number,
        doorY: number,
        doorZ: number,
        doorHandleX: number,
        doorHandleY: number,
        doorHandleZ: number,
      },
      out: {
        doorX: number,
        doorY: number,
        doorZ: number,
        doorHandleX: number,
        doorHandleY: number,
        doorHandleZ: number,
      }
    }
  }
}

export const calculateDoorMatrix = (
  doorOpening: DoorOpening,
  swingDirection: "Left" | "Right",
  swing: "In" | "Out",
) => {
  const DOOR_MATRIX: DoorMatrix = {
    "20": {
      left: {
        in: {
          doorX: 0,
          doorY: 0,
          doorZ: 0,
          doorHandleX: 0,
          doorHandleY: 3.583,
          doorHandleZ: 0,
        },
        out: {
          doorX: 0,
          doorY: 0,
          doorZ: 0,
          doorHandleX: 0,
          doorHandleY: 3.583,
          doorHandleZ: 0,
        }
      },
      right: {
        in: {
          doorX: 0,
          doorY: 0,
          doorZ: 0,
          doorHandleX: 0,
          doorHandleY: 3.583,
          doorHandleZ: 0,
        },
        out: {
          doorX: 0,
          doorY: 0,
          doorZ: 0,
          doorHandleX: 0,
          doorHandleY: 3.583,
          doorHandleZ: 0,
        }
      }
    },
    "22": {
      left: {
        in: {
          doorX: 0.41,
          doorY: 0,
          doorZ: 0.57,
          doorHandleX: 1.050,
          doorHandleY: 3.583,
          doorHandleZ: 0.2,
        },
        out: {
          doorX: -0.44,
          doorY: 0,
          doorZ: 0.58,
          doorHandleX: 3.710,
          doorHandleY: 3.583,
          doorHandleZ: 0.28,
        }
      },
      right: {
        in: {
          doorX: 0.38,
          doorY: 0,
          doorZ: -0.57,
          doorHandleX: 1.040,
          doorHandleY: 3.583,
          doorHandleZ: 0.1,
        },
        out: {
          doorX: -0.42,
          doorY: 0,
          doorZ: -0.57,
          doorHandleX: 3.710,
          doorHandleY: 3.583,
          doorHandleZ: 0,
        }
      }
    },
    "24": {
      left: {
        in: {
          doorX: 0.34,
          doorY: 0,
          doorZ: 0.48,
          doorHandleX: 0.950,
          doorHandleY: 3.583,
          doorHandleZ: 0.05,
        },
        out: {
          doorX: -0.38,
          doorY: 0,
          doorZ: 0.50,
          doorHandleX: 3.800,
          doorHandleY: 3.583,
          doorHandleZ: 0.16,
        }
      },
      right: {
        in: {
          doorX: 0.34,
          doorY: 0,
          doorZ: -0.51,
          doorHandleX: 0.960,
          doorHandleY: 3.583,
          doorHandleZ: 0.210,
        },
        out: {
          doorX: -0.36,
          doorY: 0,
          doorZ: -0.49,
          doorHandleX: 3.800,
          doorHandleY: 3.583,
          doorHandleZ: 0.13,
        }
      }
    },
    "26": {
      left: {
        in: {
          doorX: 0.28,
          doorY: 0,
          doorZ: 0.40,
          doorHandleX: 0.830,
          doorHandleY: 3.583,
          doorHandleZ: -0.11,
        },
        out: {
          doorX: -0.32,
          doorY: 0,
          doorZ: 0.42,
          doorHandleX: 3.920,
          doorHandleY: 3.583,
          doorHandleZ: 0,
        }
      },
      right: {
        in: {
          doorX: 0.28,
          doorY: 0,
          doorZ: -0.43,
          doorHandleX: 0.850,
          doorHandleY: 3.583,
          doorHandleZ: 0.350,
        },
        out: {
          doorX: -0.32,
          doorY: 0,
          doorZ: -0.43,
          doorHandleX: 3.920,
          doorHandleY: 3.583,
          doorHandleZ: 0.28,
        }
      }
    },
    "28": {
      left: {
        in: {
          doorX: 0.24,
          doorY: 0,
          doorZ: 0.34,
          doorHandleX: 0.730,
          doorHandleY: 3.583,
          doorHandleZ: -0.25,
        },
        out: {
          doorX: -0.27,
          doorY: 0,
          doorZ: 0.34,
          doorHandleX: 4.020,
          doorHandleY: 3.583,
          doorHandleZ: -0.14,
        }
      },
      right: {
        in: {
          doorX: 0.22,
          doorY: 0,
          doorZ: -0.34,
          doorHandleX: 0.740,
          doorHandleY: 3.583,
          doorHandleZ: 0.520,
        },
        out: {
          doorX: -0.22,
          doorY: 0,
          doorZ: -0.30,
          doorHandleX: 4.060,
          doorHandleY: 3.583,
          doorHandleZ: 0.44,
        }
      }
    },
    "30": {
      left: {
        in: {
          doorX: 0.16,
          doorY: 0,
          doorZ: 0.24,
          doorHandleX: 0.610,
          doorHandleY: 3.583,
          doorHandleZ: -0.42,
        },
        out: {
          doorX: -0.21,
          doorY: 0,
          doorZ: 0.26,
          doorHandleX: 4.120,
          doorHandleY: 3.583,
          doorHandleZ: -0.28,
        }
      },
      right: {
        in: {
          doorX: 0.16,
          doorY: 0,
          doorZ: -0.26,
          doorHandleX: 0.620,
          doorHandleY: 3.583,
          doorHandleZ: 0.680,
        },
        out: {
          doorX: -0.17,
          doorY: 0,
          doorZ: -0.24,
          doorHandleX: 4.160,
          doorHandleY: 3.583,
          doorHandleZ: 0.58,
        }
      }
    },
    "34": {
      left: {
        in: {
          doorX: 0.34,
          doorY: 0,
          doorZ: 0.60,
          doorHandleX: 0.500,
          doorHandleY: 3.583,
          doorHandleZ: -0.51,
        },
        out: {
          doorX: -0.38,
          doorY: 0,
          doorZ: 0.60,
          doorHandleX: 4.380,
          doorHandleY: 3.583,
          doorHandleZ: -0.44,
        }
      },
      right: {
        in: {
          doorX: 0.35,
          doorY: 0,
          doorZ: -0.60,
          doorHandleX: 0.520,
          doorHandleY: 3.583,
          doorHandleZ: 0.600,
        },
        out: {
          doorX: -0.37,
          doorY: 0,
          doorZ: -0.60,
          doorHandleX: 4.420,
          doorHandleY: 3.583,
          doorHandleZ: 0.58,
        }
      }
    },
    "36": {
      left: {
        in: {
          doorX: 0.27,
          doorY: 0,
          doorZ: 0.49,
          doorHandleX: 0.380,
          doorHandleY: 3.583,
          doorHandleZ: -0.71,
        },
        out: {
          doorX: -0.30,
          doorY: 0,
          doorZ: 0.47,
          doorHandleX: 4.500,
          doorHandleY: 3.583,
          doorHandleZ: -0.64,
        }
      },
      right: {
        in: {
          doorX: 0.27,
          doorY: 0,
          doorZ: -0.49,
          doorHandleX: 0.380,
          doorHandleY: 3.583,
          doorHandleZ: 0.820,
        },
        out: {
          doorX: -0.32,
          doorY: 0,
          doorZ: -0.50,
          doorHandleX: 4.520,
          doorHandleY: 3.583,
          doorHandleZ: 0.78,
        }
      }
    }
  };
  // Returning...
  return swingDirection === "Left" ? (swing === "In" ? { ...DOOR_MATRIX[doorOpening].left.in } : { ...DOOR_MATRIX[doorOpening].left.out }) : (swing === "In" ? { ...DOOR_MATRIX[doorOpening].right.in } : { ...DOOR_MATRIX[doorOpening].right.out })
}

export const calculateDoorSwingMatrix = (
  swing: DoorSwing,
  swingDirection: "Left" | "Right",
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
    rotationZ: 0
  }
  const doorMatrix = {
    doorX: 0,
    doorY: 0,
    doorZ: 0,
    doorHandleX: 0,
    doorHandleY: 3.583,
    doorHandleZ: 0,
  }
  // Checking Door Swing Direction
  switch (swingDirection) {
    case "Left":
      matrix = { ...DOOR_SWING[doorOpening].left };
      break;
    case "Right":
      matrix = { ...DOOR_SWING[doorOpening].right };
      break;
  }
  // Calculating Door with Design Position
  const { doorX, doorZ, doorHandleX, doorHandleZ } = calculateDoorMatrix(doorOpening, swingDirection, swing.endsWith("In") ? "In" : "Out")
  doorMatrix.doorX = doorX;
  doorMatrix.doorZ = doorZ;
  doorMatrix.doorHandleX = doorHandleX;
  doorMatrix.doorHandleZ = doorHandleZ;

  if (isFirst && swingDirection === "Left" && layoutDirection === "Left") if (matrix.positionZ) matrix.positionZ += 0.06;
  if (isLast && swingDirection === "Right" && layoutDirection === "Left") if (matrix.positionZ) matrix.positionZ -= 0.06;
  if (isFirst && swingDirection === "Left" && layoutDirection === "Right") if (matrix.positionZ) matrix.positionZ += 0.06;
  if (isLast && swingDirection === "Right" && layoutDirection === "Right") if (matrix.positionZ) matrix.positionZ -= 0.06;
  // Returning Matrix...
  return { ...matrix, ...doorMatrix };
};