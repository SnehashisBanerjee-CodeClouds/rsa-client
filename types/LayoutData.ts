import { LayoutKey } from "./stepForm";
export type MaterialName =
  | "Laminate"
  | "Powder Coated"
  | "Solid Plastic"
  | "Black-Core Phenolic"
  | "Stainless Steel"
  | "";
type MaterialId =
  | "laminate"
  | "powerSteel"
  | "solidPlastic"
  | "phenolic"
  | "stainlessSteel"
  | "";

type MaterialPrice = "$3,500" | "";
type MaterialImage =
  | "/assets/images/material-1.png"
  | "/assets/images/material-2.png"
  | "/assets/images/material-3.png"
  | "/assets/images/material-4.png"
  | "/assets/images/material-5.png"
  | "";
export interface MaterialImagesType {
  id: LayoutKey;
  name: MaterialName;
  price: MaterialPrice;
  materialImage: MaterialImage;
}

export type MaterialImageArrayType = Array<MaterialImagesType>;
