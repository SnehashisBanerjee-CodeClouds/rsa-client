import { AnimationAction, Mesh, MeshStandardMaterial } from "three";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
// Stall Type
export type StallType = "single" | "ada";
// Stall Width
export type StallWidth =
  | "27"
  | "28"
  | "29"
  | "30"
  | "31"
  | "32"
  | "33"
  | "34"
  | "35"
  | "36"
  | "37"
  | "38"
  | "39"
  | "40"
  | "41"
  | "42"
  | "43"
  | "44"
  | "45"
  | "46"
  | "47"
  | "48"
  | "49"
  | "50"
  | "51"
  | "52"
  | "53"
  | "54"
  | "55"
  | "56";

export type StallADAWidth =
  | "60"
  | "61"
  | "62"
  | "63"
  | "64"
  | "65"
  | "66"
  | "67"
  | "68"
  | "69"
  | "70"
  | "71"
  | "72"
  | "73"
  | "74"
  | "75"
  | "76"
  | "77"
  | "78"
  | "79"
  | "80"
  | "81"
  | "82"
  | "83"
  | "84"
  | "85"
  | "86"
  | "87"
  | "88"
  | "89"
  | "90";
// Door Opening
export type DoorOpening = "20" | "22" | "24" | "26" | "28" | "30" | "34" | "36";
export type AlcoveDepth =
  | "90"
  | "96"
  | "98"
  | "100"
  | "102"
  | "104"
  | "106"
  | "108"
  | "110"
  | "112"
  | "114";
// Door Swing
export type DoorSwing =
  | "leftIn"
  | "leftOut"
  | "rightIn"
  | "rightOut"
  | "closed"
  | "removed";
export type StallFraction =
  | "0"
  | "1/8"
  | "1/4"
  | "3/8"
  | "1/2"
  | "5/8"
  | "3/4"
  | "7/8";
export type StallConfigOption =
  | "StallWidth"
  | "DoorOpening"
  | "DoorSwing"
  | "StallFraction";
// Stall Config
export interface StallConfig {
  x: number;
  y: number;
  z: number;
  type?: StallType;
  isOpened?: boolean;
  isSelected?: boolean;
  stallWidth?: StallWidth | StallADAWidth;
  stallFraction?: StallFraction;
  doorOpening?: DoorOpening;
  doorSwing?: DoorSwing;
  totalStallWidth:string
}
// Urinal Screen Config
export interface UrinalScreenConfig {
  x: number;
  y: number;
  z: number;
  isOpened?: boolean;
}
export interface Position {
  x: number;
  y: number;
  z: number;
}
export interface Rotation {
  x: number;
  y: number;
  z: number;
}
// Model View
export type View = "2D" | "3D";
// Camera Controls
export interface CameraControls {
  view: View;
  position: [number, number, number];
  zoom: number;
}
// Stall Color
export enum StallColor {
  Red = "#E80000",
  Green = "#55B253",
  Sky = "#88C2E6",
  Black = "#000000",
  Silver = "#9C9C9C",
  LightOrange = "#CE5F00",
  LightBlue = "#3D58A4",
  LightGolden = "#F2E1B2",
}
// Stall Outline Color
export enum OutlineColor {
  Default = "#9a9a9a",
  Back = "#000000",
  Green = "#55b253",
  Darker = "#7a7a7a",
  Selected = "#e42e2e",
  Secondary = "#3d58a4",
  FloorSelected = "#e4a2a2",
  FloorPulsateSelected = "#da4343",
}
// Layout Direction
export type LayoutDirection = "Left" | "Right";
// Layout Option
export type LayoutOption =
  | "inCornerLeft"
  | "inCornerRight"
  | "betweenWallLeft"
  | "betweenWallRight"
  | "alcoveCornerLeft"
  | "alcoveCornerRight"
  | "alcoveBetweenWallLeft"
  | "alcoveBetweenWallRight";
// Layout
export interface Layout {
  layoutDirection: LayoutDirection;
  layoutOption: LayoutOption;
}
// Ada Toilet Position
export type AdaToiletPosition = "Left" | "Right";
// Overall Room Width
export type OverallRoomWidth =
  | "60"
  | "90"
  | "120"
  | "150"
  | "180"
  | "210"
  | "240";
// Model Types
export type ModelType = "stalls" | "urinal-screens";
// Urinal Screens
export type HasUrinalScreens = boolean | "not-selected";
export type UrinalScreenDepth = "18" | "24";
export type StandardDepth = "62" | "112";
export type ADADepth = "62" | "112";
// Stall
export interface Stall {
  noOfStalls: number;
  adaStall: boolean;
  adaDepth: ADADepth;
  alcoveDepth: AlcoveDepth;
  adaToiletPosition?: AdaToiletPosition;
  overallRoomWidth: OverallRoomWidth;
  overallRoomFraction: string;
  standardDepth: StandardDepth;
  stallConfig: StallConfig[];
  stallColor: StallColor;
  stallColorName: string;
  wallTexture: string;
  wallTextureName: string;
  floorColor: OutlineColor;
  canvas2DImage: string;
  canvas3DImage: string;
  initialView: string;
  isPulsate: boolean | undefined;
  cameraControls: CameraControls;
  layout: Layout;
}
// Urinal Screen
export interface UrinalScreen {
  noOfUrinalScreens: number;
  urinalScreensDepth: UrinalScreenDepth | string;
  urinalScreenConfig: UrinalScreenConfig[];
  cameraControls: CameraControls;
  screens2DImage: string;
  screens3DImage: string;
}
// Current Step : 0 - No Step Completed | 1 - Project | 2 - Layout | 3 - Measurements
export type CompletedStep = 0 | 1 | 2 | 3 | 4;
export type RoomConfigOption =
  | "StandardDepth"
  | "AdaDepth"
  | "AlcoveDepth"
  | "AdaToiletPosition"
  | "OverallRoomWidth"
  | "OverallRoomFraction"
  | "ExceedStandardDepth"
  | "ExceedAlcoveDepth";
// Room Config
export interface RoomConfig {
  id: number;
  completedStep: CompletedStep;
  hasUrinalScreens: HasUrinalScreens;
  stall: Stall;
  urinalScreen: UrinalScreen;
  title?: string;
  materialQuote?: boolean;
  currentModel?: ModelType | "page-specific";
  expandedView?: boolean;
}
// Selected Room
export interface SelectedRoom {
  roomId: number;
  roomIndex: number;
  completedStep: CompletedStep;
}
// Rooms
export interface Room {
  selectedRoom: SelectedRoom;
  rooms: RoomConfig[];
  loadingProjectButton: boolean;
  loadingLayoutButton: boolean;
  loadingMeasurementButton: boolean;
  loadingContactButton: boolean;
}

// Nodes types of Stall Model
export type GLTFStall = GLTF & {
  nodes: {
    DoorClipRightUp: Mesh;
    DoorClipRightDown: Mesh;
    DoorClipLeftDown: Mesh;
    DoorClipLeftUp: Mesh;
    DoorDesign: Mesh;
    Door: Mesh;
    DoorHandle: Mesh;
    ClipBackLeftDown: Mesh;
    ClipBackLeftUp: Mesh;
    ClipBackRightDown: Mesh;
    ClipBackRightUp: Mesh;
    ClipFrontLeftDown: Mesh;
    ClipFrontLeftUp: Mesh;
    ClipFrontRightDown: Mesh;
    ClipFrontRightUp: Mesh;
    WallBack: Mesh;
    WallLayoutFront: Mesh;
    WallLayoutLeft: Mesh;
    WallLayoutRight: Mesh;
    WallLeft: Mesh;
    WallLeftDesignInside: Mesh;
    WallLeftDesignOutside: Mesh;
    WallRight: Mesh;
    WallRightDesignInside: Mesh;
    WallRightDesignOutside: Mesh;
    SupportLeft: Mesh;
    SupportLeftBelow: Mesh;
    SupportLeftBelowDesign: Mesh;
    SupportRight: Mesh;
    SupportRightBelow: Mesh;
    SupportRightBelowDesign: Mesh;
    toilet_2002: Mesh;
    toilet_2002_1: Mesh;
    toilet_2002_2: Mesh;
    ToiletCover: Mesh;
    Toilet: Mesh;
    ToiletCover001: Mesh;
    ToiletInnerCover: Mesh;
    ToiletSupport: Mesh;
    ToiletTank: Mesh;
    HeadrailFront: Mesh;
    HeadrailRight: Mesh;
    HeadrailLeft: Mesh;
    Floor: Mesh;
  };
  materials: {
    ["carpetWhite.002"]: MeshStandardMaterial;
    ["metalLight.002"]: MeshStandardMaterial;
    ["metalDark.002"]: MeshStandardMaterial;
    ["_defaultMat.002"]: MeshStandardMaterial;
    ["Toilet.001"]: MeshStandardMaterial;
    Material: MeshStandardMaterial;
  };
  animations: AnimationAction[];
};
// Nodes types of ADA Stall Model
export type GLTFAdaStall = GLTF & {
  nodes: {
    DoorClipRightUp: Mesh;
    DoorClipRightDown: Mesh;
    DoorClipLeftDown: Mesh;
    DoorClipLeftUp: Mesh;
    Door: Mesh;
    DoorDesign: Mesh;
    DoorHandle: Mesh;
    WallBack: Mesh;
    WallLayoutFront: Mesh;
    WallLayoutLeft: Mesh;
    WallLayoutRight: Mesh;
    WallLeft: Mesh;
    WallLeftDesignInside: Mesh;
    WallLeftDesignOutside: Mesh;
    WallRight: Mesh;
    WallRightDesignInside: Mesh;
    WallRightDesignOutside: Mesh;
    toilet_2002: Mesh;
    toilet_2002_1: Mesh;
    toilet_2002_2: Mesh;
    ToiletCover: Mesh;
    Toilet: Mesh;
    ToiletCover001: Mesh;
    ToiletInnerCover: Mesh;
    ToiletSupport: Mesh;
    ToiletTank: Mesh;
    SupportLeft: Mesh;
    SupportLeftBelow: Mesh;
    SupportLeftBelowDesign: Mesh;
    SupportRight: Mesh;
    SupportRightBelow: Mesh;
    SupportRightBelowDesign: Mesh;
    ClipBackLeftDown: Mesh;
    ClipBackLeftUp: Mesh;
    ClipBackRightDown: Mesh;
    ClipBackRightUp: Mesh;
    ClipFrontLeftDown: Mesh;
    ClipFrontLeftUp: Mesh;
    ClipFrontRightDown: Mesh;
    ClipFrontRightUp: Mesh;
    HeadrailFront: Mesh;
    HeadrailLeft: Mesh;
    HeadrailRight: Mesh;
    Floor: Mesh;
  };
  materials: {
    ["carpetWhite.002"]: MeshStandardMaterial;
    ["metalLight.002"]: MeshStandardMaterial;
    ["metalDark.002"]: MeshStandardMaterial;
    ["_defaultMat.002"]: MeshStandardMaterial;
    ["Material.002"]: MeshStandardMaterial;
    Toilet: MeshStandardMaterial;
  };
  animations: AnimationAction[];
};
// Nodes types of Urinal Screen Model
export type GLTFUrinalScreen = GLTF & {
  nodes: {
    ClipBackDown: Mesh;
    ClipBackUp: Mesh;
    ClipFrontDown: Mesh;
    ClipFrontUp: Mesh;
    WallBack: Mesh;
    Support: Mesh;
    Floor: Mesh;
    Separator: Mesh;
    SeparatorLeft: Mesh;
    SeparatorRight: Mesh;
  };
  materials: {
    ["Material.001"]: MeshStandardMaterial;
  };
  animations: AnimationAction[];
};
