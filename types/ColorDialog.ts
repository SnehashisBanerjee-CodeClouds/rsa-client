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
  name: string;
  color: StallColor | string | undefined;
}
export interface StallTextureOption {
  name: string;
  imageName: string;
}

export type BlockColorsType = Array<ColorsType>;
