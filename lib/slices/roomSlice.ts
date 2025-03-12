import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isDesktop } from "react-device-detect";

import {
  ADADepth,
  AdaToiletPosition,
  DoorOpening,
  DoorSwing,
  LayoutDirection,
  LayoutOption,
  OverallRoomWidth,
  Room,
  RoomConfigOption,
  Stall,
  StallADAWidth,
  StallColor,
  StallConfigOption,
  StallWidth,
  HasUrinalScreens,
  StandardDepth,
  View,
  UrinalScreen,
  StallFraction,
  OutlineColor,
  AlcoveDepth,
} from "@/types/model";
import {
  calculateStallConfig,
  calculateUrinalScreenConfig,
  calculateUrinalScreenZoom,
} from "@/utils/stall/helpers";
import { reCalculatePositions } from "@/utils/calculations/models/stallWidth";

// Initial Stall
const initialStall: Stall = {
  noOfStalls: 1,
  adaStall: false,
  stallColor: StallColor.LightBlue,
  stallColorName: "",
  wallTexture: "",
  wallTextureName: "",
  floorColor: OutlineColor.FloorSelected,
  overallRoomWidth: "60",
  overallRoomFraction: "",
  standardDepth: "62",
  adaDepth: "62",
  alcoveDepth: "98",
  canvas2DImage: "",
  canvas3DImage: "",
  initialView: "2D",
  isPulsate: true,
  stallConfig: [
    {
      x: 0,
      y: -4.5,
      z: 0,
      isOpened: true,
      isSelected: true,
      stallWidth: "36",
      stallFraction: "0",
      doorOpening: "24",
      doorSwing: "leftOut",
    },
  ],
  cameraControls: {
    view: "2D",
    position: [10, 100, 0],
    zoom: isDesktop ? 12 : 11,
  },
  layout: {
    layoutDirection: "Right",
    layoutOption: "inCornerRight",
  },
};
// Initial Stall
const initialUrinalScreen: UrinalScreen = {
  noOfUrinalScreens: 1,
  urinalScreensDepth: "24",
  screens2DImage: "",
  screens3DImage: "",
  urinalScreenConfig: [
    {
      x: 2,
      y: -4.5,
      z: 0,
      isOpened: true,
    },
  ],
  cameraControls: {
    view: "2D",
    position: [10, 100, 0],
    zoom: isDesktop ? 15 : 14,
  },
};
// Initial Room State
const initialState: Room = {
  selectedRoom: {
    roomId: 1,
    roomIndex: 0,
    completedStep: 0,
  },
  rooms: [
    {
      id: 1,
      completedStep: 0,
      hasUrinalScreens: false,
      stall: initialStall,
      urinalScreen: initialUrinalScreen,
      currentModel: "page-specific",
      expandedView: false,
    },
  ],
  loadingProjectButton: false,
  loadingLayoutButton: false,
  loadingMeasurementButton: false,
  loadingContactButton: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    startOver: (state) => {
      state.selectedRoom = initialState.selectedRoom;
      state.rooms = initialState.rooms;
    },
    resetUrinalScreen: (state) => {
      const roomIndex = state.selectedRoom.roomIndex;
      const urinalScreen = state.rooms[roomIndex].urinalScreen;
      urinalScreen.noOfUrinalScreens = 1;
      (urinalScreen.urinalScreensDepth = "24"),
        (urinalScreen.screens2DImage = ""),
        (urinalScreen.screens3DImage = ""),
        (urinalScreen.urinalScreenConfig = [
          {
            x: 2,
            y: -4.5,
            z: 0,
            isOpened: true,
          },
        ]),
        (urinalScreen.cameraControls = {
          view: "2D",
          position: [10, 100, 0],
          zoom: isDesktop ? 15 : 14,
        });
    },
    updateNoOfStalls: (state, action: PayloadAction<number>) => {
      const { payload: noOfStalls } = action;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;

      stall.noOfStalls = noOfStalls;
      // Storing Calculated Stalls
      stall.stallConfig = calculateStallConfig(
        noOfStalls,
        stall.adaStall,
        stall.layout.layoutDirection
      );

      // Updating Stall State
      state.rooms[roomIndex].stall = stall;
    },
    updateUrinalScreens: (state, action: PayloadAction<HasUrinalScreens>) => {
      const { payload: hasUrinalScreens } = action;
      const roomIndex = state.selectedRoom.roomIndex;
      const room = state.rooms[roomIndex];
      // Updating...
      room.hasUrinalScreens = hasUrinalScreens;
      // Updating Stall State
      state.rooms[roomIndex] = room;
    },
    updateNoOfUrinalScreens: (
      state,
      action: PayloadAction<{ val: number; device: string }>
    ) => {
      const { val: noOfUrinalScreens, device } = action.payload;
      const roomIndex = state.selectedRoom.roomIndex;
      const urinalScreen = state.rooms[roomIndex].urinalScreen;

      urinalScreen.noOfUrinalScreens = noOfUrinalScreens;
      // Storing Calculated Stalls
      urinalScreen.urinalScreenConfig = calculateUrinalScreenConfig(
        noOfUrinalScreens,
        "Left"
      );

      // Updating Zoom
      const zoom = calculateUrinalScreenZoom(noOfUrinalScreens, device);
      urinalScreen.cameraControls = {
        ...urinalScreen.cameraControls,
        zoom,
      };
      // Updating Stall State
      state.rooms[roomIndex].urinalScreen = urinalScreen;
    },
    updateUrinalScreensDepth: (state, action: PayloadAction<number>) => {
      const { payload: urinalScreensDepth } = action;
      const roomIndex = state.selectedRoom.roomIndex;
      const urinalScreen = state.rooms[roomIndex].urinalScreen;

      urinalScreen.urinalScreensDepth = urinalScreensDepth.toString();

      // Updating Stall State
      state.rooms[roomIndex].urinalScreen = urinalScreen;
    },
    toggleAdaStall: (state) => {
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;

      stall.adaStall = !stall.adaStall;
      // Storing Calculated Stalls
      stall.stallConfig = calculateStallConfig(
        stall.noOfStalls,
        stall.adaStall,
        stall.layout.layoutDirection
      );

      // Updating Stall State
      state.rooms[roomIndex].stall = stall;
    },
    toggleExpandedView: (state) => {
      const roomIndex = state.selectedRoom.roomIndex;
      state.rooms[roomIndex].expandedView =
        !state.rooms[roomIndex].expandedView;
    },
    changeColor: (
      state,
      action: PayloadAction<{ stallColor: StallColor; stallColorName: string }>
    ) => {
      const { stallColor, stallColorName } = action.payload;
      // const roomIndex = state.selectedRoom.roomIndex;
      // const stall = state.rooms[roomIndex].stall;

      // stall.stallColor = stallColor;
      // // Updating Stall State
      // state.rooms[roomIndex].stall = stall;

      // Changing Color For All Rooms
      state.rooms = state.rooms.map((room) => ({
        ...room,
        stall: { ...room.stall, stallColor, stallColorName },
      }));
    },
    changeTexture: (
      state,
      action: PayloadAction<{ wallTexture: string; wallTextureName: string }>
    ) => {
      const { wallTexture, wallTextureName } = action.payload;
      // const roomIndex = state.selectedRoom.roomIndex;
      // const stall = state.rooms[roomIndex].stall;

      // stall.wallTexture = wallTexture;
      // // Updating Stall State
      // state.rooms[roomIndex].stall = stall;

      // Changing Texture For All Rooms
      state.rooms = state.rooms.map((room) => ({
        ...room,
        stall: { ...room.stall, wallTexture, wallTextureName },
      }));
    },
    changeView: (
      state,
      action: PayloadAction<{ view: View; pathname: string }>
    ) => {
      const {
        payload: { view, pathname },
      } = action;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;
      const urinalScreen = state.rooms[roomIndex].urinalScreen;

      // Checking View
      switch (view) {
        case "2D":
          switch (pathname) {
            case "/select-urinal-screens":
              urinalScreen.cameraControls = {
                view: "2D",
                position: [10, 100, 0],
                zoom: urinalScreen.cameraControls.zoom,
              };
              break;

            default:
              stall.cameraControls = {
                view: "2D",
                position: [10, 100, 0],
                zoom: stall.cameraControls.zoom,
              };
              break;
          }

          break;
        case "3D":
          switch (pathname) {
            case "/select-urinal-screens":
              urinalScreen.cameraControls = {
                view: "3D",
                position: [80, 80, 40],
                zoom: urinalScreen.cameraControls.zoom,
              };
              break;

            default:
              stall.cameraControls = {
                view: "3D",
                position: [80, 80, 40],
                zoom: stall.cameraControls.zoom,
              };
              break;
          }

          break;
      }
      // Updating States
      state.rooms[roomIndex].stall = stall;
      state.rooms[roomIndex].urinalScreen = urinalScreen;
    },
    changeLayout: (state, action: PayloadAction<LayoutOption>) => {
      const { payload: layoutOption } = action;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;

      const layoutDirection: LayoutDirection = layoutOption.endsWith("Left")
        ? "Left"
        : "Right";
      // Updating Layout
      stall.layout = {
        layoutDirection,
        layoutOption,
      };
      // Storing Calculated Stalls
      stall.stallConfig = calculateStallConfig(
        stall.noOfStalls,
        stall.adaStall,
        layoutDirection
      );
      // Updating Stall State
      state.rooms[roomIndex].stall = stall;
    },
    // Reducer for changing the Stall Configurations (Stall Width | Door Opening | Door Swing)
    changeStallConfig: (
      state,
      action: PayloadAction<{
        config: StallConfigOption;
        stallId: number;
        value:
          | StallWidth
          | DoorOpening
          | DoorSwing
          | StallADAWidth
          | StallFraction;
      }>
    ) => {
      const {
        payload: { config, stallId, value },
      } = action;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;

      switch (config) {
        case "StallWidth":
          // Prev Width
          const prevStallWidth = stall.stallConfig[stallId].stallWidth;
          // Updating Stall Width
          stall.stallConfig = stall.stallConfig.map((stall, idx) =>
            idx === stallId
              ? { ...stall, stallWidth: value as StallWidth }
              : stall
          );
          // Stall Position Re-Calculation
          stall.stallConfig = reCalculatePositions(
            stall,
            stallId,
            value as StallWidth,
            prevStallWidth ?? (stall.adaStall ? "60" : "36")
          );
          break;
        case "StallFraction":
          // Updating Stall Fraction
          stall.stallConfig = stall.stallConfig.map((stall, idx) =>
            idx === stallId
              ? { ...stall, stallFraction: value as StallFraction }
              : stall
          );
          break;
        case "DoorOpening":
          // Updating Door Opening
          stall.stallConfig = stall.stallConfig.map((stall, idx) =>
            idx === stallId
              ? { ...stall, doorOpening: value as DoorOpening }
              : stall
          );
          break;
        case "DoorSwing":
          // Updating Door Swing
          stall.stallConfig = stall.stallConfig.map((stall, idx) =>
            idx === stallId
              ? { ...stall, doorSwing: value as DoorSwing }
              : stall
          );

          break;
      }

      // Updating Stall State
      state.rooms[roomIndex].stall = stall;
    },
    // Reducer for changing the Room Configurations (Standard Depth | ADA Depth | ADA Toilet Position | Overall Room Width)
    changeRoomConfig: (
      state,
      action: PayloadAction<{
        config: RoomConfigOption;
        value:
          | AdaToiletPosition
          | OverallRoomWidth
          | number
          | StandardDepth
          | string;
      }>
    ) => {
      const {
        payload: { config, value },
      } = action;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;

      switch (config) {
        case "StandardDepth":
          stall.standardDepth = value as StandardDepth;
          break;
        case "AdaDepth":
          stall.adaDepth = value as ADADepth;
          break;
        case "AlcoveDepth":
          stall.alcoveDepth = value as AlcoveDepth;
          break;
        case "AdaToiletPosition":
          stall.adaToiletPosition = value as AdaToiletPosition;
          break;
        case "OverallRoomWidth":
          stall.overallRoomWidth = value as OverallRoomWidth;
          break;
        case "OverallRoomFraction":
          stall.overallRoomFraction = value as string;
          break;
      }

      // Updating Stall State
      state.rooms[roomIndex].stall = stall;
    },
    changeSelectedStall: (
      state,
      action: PayloadAction<{
        stallId: number;
      }>
    ) => {
      const {
        payload: { stallId },
      } = action;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;

      // Updating Selected Stall
      stall.stallConfig = stall.stallConfig.map((stall, idx) =>
        idx === stallId
          ? { ...stall, isOpened: !stall.isOpened, isSelected: true }
          : { ...stall, isOpened: false }
      );
      // Updating Stall State
      state.rooms[roomIndex].stall = stall;
    },
    addRoom: (state) => {
      // Checking Rooms Count
      const roomCount = state.rooms.length;
      const roomId = roomCount + 1;
      // Pushing Another Room
      state.rooms.push({
        id: roomId,
        completedStep: 0,
        hasUrinalScreens: false,
        stall: initialStall,
        urinalScreen: initialUrinalScreen,
        currentModel: "page-specific",
      });
      // Updating Selected Room
      state.selectedRoom = {
        roomId,
        roomIndex: roomCount,
        completedStep: 0,
      };
    },
    switchRoom: (
      state,
      action: PayloadAction<{
        roomId: number;
      }>
    ) => {
      const {
        payload: { roomId },
      } = action;
      // Updating Selected Room
      state.selectedRoom = {
        roomId,
        roomIndex: roomId - 1,
        completedStep: state.rooms[roomId - 1].completedStep,
      };
    },
    stepSubmit: (state, action) => {
      const { stepName } = action.payload;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;
      switch (stepName) {
        case "project":
          const {
            formData: { restroom_name, interest },
          } = action.payload;
          state.rooms = state.rooms.map((room) => {
            if (room.id === state.selectedRoom.roomId) {
              return Object.assign(
                room,
                {
                  completedStep: 1,
                  title:
                    restroom_name === ""
                      ? `Restroom ${room.id}`
                      : restroom_name,
                },
                { materialQuote: interest }
              );
            } else {
              return { ...room };
            }
          });
          state.selectedRoom.completedStep = 1;
          break;
        case "layout":
          state.rooms = state.rooms.map((room) =>
            room.id === state.selectedRoom.roomId
              ? { ...room, completedStep: 2 }
              : { ...room }
          );
          state.selectedRoom.completedStep = 2;
          break;
        case "measurements":
          state.rooms = state.rooms.map((room) => {
            return { ...room, completedStep: 3 };
          });
          state.selectedRoom.completedStep = 3;
          break;
        case "contacts":
          state.rooms = state.rooms.map((room) => {
            return { ...room, completedStep: 4 };
          });
          state.selectedRoom.completedStep = 4;
          break;
        default:
          break;
      }
    },
    handleStepLoading: (state, action) => {
      const { stepName, isLoading } = action.payload;
      switch (stepName) {
        case "project":
          state.loadingProjectButton = isLoading;
          break;
        case "layout":
          state.loadingLayoutButton = isLoading;
          break;
        case "measurements":
          state.loadingMeasurementButton = isLoading;
          break;
        case "contact":
          state.loadingContactButton = isLoading;
        default:
          break;
      }
    },

    updatePulsate: (state, action: PayloadAction<{ pulsateBool: boolean }>) => {
      const { pulsateBool } = action.payload;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;
      stall.isPulsate = pulsateBool;
    },
    uploadCanvasAsImage: (state, action) => {
      const { view, canvasImage, modelType } = action.payload;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;
      const urinalScreen = state.rooms[roomIndex].urinalScreen;
      switch (view) {
        case "2D":
          switch (modelType) {
            case "stall":
              stall.canvas2DImage = canvasImage;
              break;
            case "screen":
              urinalScreen.screens2DImage = canvasImage;
            default:
              break;
          }
          break;
        case "3D":
          switch (modelType) {
            case "stall":
              stall.canvas3DImage = canvasImage;
              break;
            case "screen":
              urinalScreen.screens3DImage = canvasImage;
            default:
              break;
          }
          break;
        default:
          break;
      }
      // switch (view) {
      //   case "2D":

      //     break;
      //   case "3D":

      //   default:
      //     break;
      // }
    },
    updateInitialView: (state, action) => {
      const { view } = action.payload;
      const roomIndex = state.selectedRoom.roomIndex;
      const stall = state.rooms[roomIndex].stall;
      stall.initialView = view;
    },
    updateStep: (state, action) => {
      const { stepNumber } = action.payload;
      const roomIndex = state.selectedRoom.roomIndex;
      const room = state.rooms[roomIndex];
      state.rooms = state.rooms.map((data) => {
        return { ...data, completedStep: stepNumber };
      });
      room.completedStep = stepNumber;
    },
    updateInitialStall: (state, action) => {
      const { data } = action.payload;
      state.rooms = data;
      state.selectedRoom = {
        ...initialState.selectedRoom,
        completedStep: 4,
      };
    },
  },
});

// Exporting Actions
export const {
  startOver,
  updateNoOfStalls,
  updateUrinalScreens,
  updateNoOfUrinalScreens,
  updateUrinalScreensDepth,
  toggleAdaStall,
  changeColor,
  changeTexture,
  changeView,
  changeLayout,
  changeStallConfig,
  changeRoomConfig,
  changeSelectedStall,
  addRoom,
  switchRoom,
  stepSubmit,
  handleStepLoading,
  updatePulsate,
  toggleExpandedView,
  uploadCanvasAsImage,
  updateInitialView,
  updateStep,
  updateInitialStall,
  resetUrinalScreen,
} = roomSlice.actions;
// Exporting Reducer
export default roomSlice.reducer;
