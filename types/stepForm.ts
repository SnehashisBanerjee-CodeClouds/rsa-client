import {
  ADADepth,
  DoorOpening,
  DoorSwing,
  LayoutOption,
  Room,
  StallADAWidth,
  StallColor,
  StallWidth,
  StandardDepth,
} from "@/types/model";
import { MaterialImagesType, MaterialName } from "@/types/LayoutData";

interface RadioObjectType {
  radioId: boolean;
  name: string;
  title: string;
}
export interface StepType {
  restroom_name?: string;
  stall_number?: number | string;
  screens_number?: number | string;
  stall_depth?: number | string;
  interest?: boolean | undefined;
  layoutId?: string;
  interest2?: boolean | undefined;
}

export interface ContactDetailsType {
  project_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | undefined;
}

export type RadioArrayType = Array<RadioObjectType>;

export type MaxNumberOfStalls =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";
export type MaxNumberOfScreens =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";
export type ShowType = "Yes" | "No";
export type LayoutKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type SwingName = "Left In" | "Left Out" | "Right Out" | "Right In";
export interface LayoutObject {
  id: LayoutKey;
  name: string;
  src: string;
  layoutId: LayoutOption | string;
}
export interface MaterialDataObject {
  id: LayoutKey;
  name: MaterialName;
  price: string;
  src: string;
}
export interface DoorSwingObject {
  id: LayoutKey;
  name: SwingName;
  doorSwingValue: DoorSwing | string;
}
interface SelectedMaterialType {
  id?: string;
  material_id?: string;
  color?: string;
}
interface SubmittedDataType {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  rooms: Room;
}
export interface StepInput {
  isQuotationCreate: boolean;
  materialRoute: string;
  maxNumberOfStalls: Array<MaxNumberOfStalls | string>;
  maxNumberOfScreens: Array<MaxNumberOfScreens | string>;
  installationQuote?: ShowType;
  layouts: Array<LayoutObject>;
  showHandicapStall?: ShowType;
  doorSwingOptions: Array<DoorSwingObject>;
  stallWidthList: Array<StallWidth | string>;
  stallADAWidthList: Array<StallADAWidth | string>;
  standardRoomDepthList: Array<StandardDepth | string>;
  ADAroomDepthList: Array<ADADepth | string>;
  stallADADoorOpening: Array<DoorOpening | string>;
  stallDoorOpening: Array<DoorOpening | string>;
  maxRoomNumber: number;
  materialData: Array<MaterialDataObject>;
  submittedData?: SubmittedDataType;
  quotationId: string;
  materials: MaterialImagesType;
  colorData: Array<StallColor>;
  loadingState?: boolean;
  loadingMaterialData: boolean;
  error?: string | null;
}

export interface FetchDataObject {
  id: string;
  step: "project" | "layout" | "measurement" | "color";
  config: {
    maximum_number_of_stalls: MaxNumberOfStalls;
    maximum_number_of_urinal_screens: MaxNumberOfScreens;
    interested_for_material_installation_quote: ShowType;
    layouts: Array<LayoutObject>;
    show_handicap_accessible_stall: ShowType;
    swings: Array<DoorSwingObject>;
    ada_stall_min_width: StallADAWidth;
    ada_stall_max_width: StallADAWidth;
    standard_stall_min_width: StallWidth;
    standard_stall_max_width: StallWidth;
    standard_stall_min_depth: StandardDepth;
    standard_stall_max_depth: StandardDepth;
    ada_stall_min_depth: ADADepth;
    ada_stall_max_depth: ADADepth;
    ada_stall_min_door_opening: DoorOpening;
    ada_stall_max_door_opening: DoorOpening;
    standard_stall_min_door_opening: DoorOpening;
    standard_stall_max_door_opening: DoorOpening;
    maximum_room_no: number;
    colors: Array<StallColor>;
  };
}
