import { StallColor } from "./model";

export interface ColorToogleType {
  isShowColorList: boolean;
  isShowModal: boolean;
}

interface ColorsType {
  id: string;
  className: string;
  selectedColor: StallColor;
  selectedClassName: string;
}

export interface StallColorOption {
  id: string | undefined;
  color: StallColor | string | undefined;
}

export type BlockColorsType = Array<ColorsType>;
