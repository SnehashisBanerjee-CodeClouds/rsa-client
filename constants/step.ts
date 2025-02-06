import { BlockColorsType, StallColorOption } from "@/types/ColorDialog";
import { MaterialImageArrayType } from "@/types/LayoutData";
import {
  ADADepth,
  DoorOpening,
  StallColor,
  StandardDepth,
} from "@/types/model";
import { Step } from "@/types/step";
import {
  DoorSwingObject,
  LayoutObject,
  RadioArrayType,
} from "@/types/stepForm";

export const STEPS: Step = {
  stepData: [
    {
      path: "/create-a-project",
      title: "Project",
    },
    {
      path: "/select-a-layout",
      title: "Layout",
    },
    {
      path: "/calculate-measurements",
      title: "Measurements",
    },
    {
      path: "/share-contact-details",
      title: "Quote",
    },
    {
      path: "/choose-materials",
      title: "Purchase",
    },
  ],
};

export const firstRadioList: RadioArrayType = [
  {
    radioId: true,
    name: "interest",
    title: "Yes",
  },
  {
    radioId: false,
    name: "interest",
    title: "No",
  },
];

export const secondRadioList: RadioArrayType = [
  {
    radioId: true,
    name: "interest2",
    title: "Yes",
  },
  {
    radioId: false,
    name: "interest2",
    title: "No",
  },
];

export const LayoutImages: Array<LayoutObject> = [
  {
    id: 1,
    src: "/assets/images/layoutpic1.svg",
    name: "In Corner Left",
    layoutId: "inCornerLeft",
  },
  {
    id: 2,
    src: "/assets/images/layoutpic2.svg",
    name: "In Corner Right",
    layoutId: "inCornerRight",
  },
  {
    id: 3,
    src: "/assets/images/layoutpic3.svg",
    name: "Between Wall Left",
    layoutId: "betweenWallLeft",
  },
  {
    id: 4,
    src: "/assets/images/layoutpic4.svg",
    name: "Between Wall Right",
    layoutId: "betweenWallRight",
  },
  {
    id: 5,
    src: "/assets/images/layoutpic5.svg",
    name: "Alcove Corner Left",
    layoutId: "alcoveCornerLeft",
  },
  {
    id: 6,
    src: "/assets/images/layoutpic6.svg",
    name: "Alcove Corner Right",
    layoutId: "alcoveCornerRight",
  },
  {
    id: 7,
    src: "/assets/images/layoutpic7.svg",
    name: "  Alcove Between Wall Left",
    layoutId: "alcoveBetweenWallLeft",
  },
  {
    id: 8,
    src: "/assets/images/layoutpic8.svg",
    name: "Alcove Between Wall Right",
    layoutId: "alcoveBetweenWallRight",
  },
];
export const firstBlockColors: BlockColorsType = [
  {
    id: "Red",
    className: "cursor-pointer w-52 h-52",
    selectedColor: StallColor.Red,
    selectedClassName: "border-2 border-[#3FAB3B]",
  },
  {
    id: "Green",
    className: "cursor-pointer w-52 h-52",
    selectedColor: StallColor.Green,
    selectedClassName: "border-2 border-[#707070]",
  },
  {
    id: "Sky",
    className: "cursor-pointer w-52 h-52",
    selectedColor: StallColor.Sky,
    selectedClassName: "border-2 border-[#3FAB3B]",
  },
  {
    id: "Black",
    className: "cursor-pointer w-52 h-52",
    selectedColor: StallColor.Black,
    selectedClassName: "border-2 border-[#3FAB3B]",
  },
];
export const secondBlockColors: BlockColorsType = [
  {
    id: "Silver",
    className: "cursor-pointer w-52 h-52",
    selectedColor: StallColor.Silver,
    selectedClassName: "border-2 border-[#3FAB3B]",
  },
  {
    id: "Light Orange",
    className: "cursor-pointer w-52 h-52",
    selectedColor: StallColor.LightOrange,
    selectedClassName: "border-2 border-[#3FAB3B]",
  },
  {
    id: "Light Blue",
    className: "cursor-pointer w-52 h-52",
    selectedColor: StallColor.LightBlue,
    selectedClassName: "border-2 border-[#3FAB3B]",
  },
  {
    id: "Light Golden",
    className: "cursor-pointer w-52 h-52",
    selectedColor: StallColor.LightGolden,
    selectedClassName: "border-2 border-[#3FAB3B]",
  },
];

// Stall Colors


export const materialList: MaterialImageArrayType = [
  {
    id: 1,
    name: "Laminate",
    price: "$3,500",
    materialImage: "/assets/images/material-1.png",
  },
  {
    id: 2,
    name: "Powder Coated",
    price: "$3,500",
    materialImage: "/assets/images/material-2.png",
  },
  {
    id: 3,
    name: "Solid Plastic",
    price: "$3,500",
    materialImage: "/assets/images/material-3.png",
  },
  {
    id: 4,
    name: "Stainless Steel",
    price: "$3,500",
    materialImage: "/assets/images/material-5.png",
  },
  {
    id: 5,
    name: "Black-Core Phenolic",
    price: "$3,500",
    materialImage: "/assets/images/material-4.png",
  },
];

export const stallWidthOptions = [
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
];
export const stallADAWidthOptions = [
  "60",
  "61",
  "62",
  "63",
  "64",
  "65",
  "66",
  "67",
  "68",
  "69",
  "70",
  "71",
  "72",
  "73",
  "74",
  "75",
  "76",
  "77",
  "78",
  "79",
  "80",
  "81",
  "82",
  "83",
  "84",
  "85",
  "86",
  "87",
  "88",
  "89",
  "90",
];

export const depthList: Array<ADADepth | StandardDepth | string> = [
  "62",
  "64",
  "66",
  "68",
  "70",
  "72",
  "74",
  "76",
  "78",
];
export const ADADoorOpeningList: Array<DoorOpening | string> = ["34", "36"];
export const doorOpeningList: Array<DoorOpening | string> = [
  "22",
  "24",
  "26",
  "28",
  "30",
];

export const swingOptions: Array<DoorSwingObject> = [
  {
    id: 1,
    name: "Left In",
    doorSwingValue: "leftIn",
  },
  {
    id: 2,
    name: "Left Out",
    doorSwingValue: "leftOut",
  },
  {
    id: 3,
    name: "Right In",
    doorSwingValue: "rightIn",
  },
  {
    id: 4,
    name: "Right Out",
    doorSwingValue: "rightOut",
  },
];
export const stallFractions = [
  "0",
  "1/8",
  "1/4",
  "3/8",
  "1/2",
  "5/8",
  "3/4",
  "7/8",
];

export const screenDepthList = ["18", "24"];
export const HIDE_MODEL_ON: string[] = ["/choose-materials"];
