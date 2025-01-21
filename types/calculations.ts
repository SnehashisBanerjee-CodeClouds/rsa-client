import { DoorOpening } from "@/types/model";

export type MatrixConfig = {
  positionX?: number,
  positionY?: number,
  positionZ?: number,
  rotationX?: number,
  rotationY?: number,
  rotationZ?: number,
  scaleX?: number,
  scaleY?: number,
  scaleZ?: number
};

export type DirectionConfig = {
  default?: MatrixConfig;
  adaLeft?: MatrixConfig;
  adaRight?: MatrixConfig;
  left?: MatrixConfig;
  right?: MatrixConfig;
};

export type SupportMatrix = {
  [key in DoorOpening]: DirectionConfig;
};

export type DoorSwingMatrix = {
  [key in DoorOpening]: DirectionConfig;
};