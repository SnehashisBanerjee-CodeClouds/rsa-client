import {
  ADADoorOpeningList,
  depthList,
  doorOpeningList,
  LayoutImages,
  stallADAWidthOptions,
  stallWidthOptions,
  swingOptions,
} from "@/constants/step";
import { StallColor } from "@/types/model";

import {
  DoorSwingObject,
  FetchDataObject,
  LayoutObject,
  StepInput,
  StepType,
} from "@/types/stepForm";
import axiosInstance from "@/utils/axios";
import { handleError } from "@/utils/stall/helpers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UseFormReset } from "react-hook-form";

interface ErrorDataType {
  data: {
    errors: {
      step?: { message: string };
    };
    token_expired?: boolean;
    message?: string;
  };
}
interface ErrorType {
  response: ErrorDataType;
  status?: number;
}
export const fetchStepInputData = createAsyncThunk(
  "step/fetchStepInputData",
  async (
    args: {
      reset?: UseFormReset<StepType>;
      formData?: StepType;
      stepValue?: Array<string>;
    },
    thunkAPI
  ) => {
    const { reset, formData, stepValue } = args;
    try {
      const response = await axiosInstance.post("/app-setting/config", {
        step: stepValue,
      });
      if (reset !== undefined) {
        reset(formData);
      }
      return {
        data: response.data.data,
      };
    } catch (error) {
      const err = error as ErrorType;
      if (err.response.data.errors.step) {
        handleError(err.response.data.errors.step?.message);
      }
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);
export const fetchMaterialDataById = createAsyncThunk(
  "step/fetchMaterialDataById",
  async (args: { id: string | null }, thunkAPI) => {
    const { id } = args;
    try {
      const response = await axiosInstance.get(`/quotation/view?id=${id}`);
      return {
        materialData: response.data.data.materials?.map(
          ({ price_details, ...rest }: { price_details: Array<{}> }) => {
            return { ...rest };
          }
        ),
        submittedData: response.data.data.submittedData,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

export const fetchMaterialColors=createAsyncThunk('step/fetchMaterialColors',async(args,thunkAPI)=>{
  try {
    const response = await axiosInstance.get('/app-setting/colors');
    return {
      colorData: response.data.data,
    };
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
})
const initialStepInput: StepInput = {
  isQuotationCreate: false,
  materialRoute:"",
  maxNumberOfStalls: [],
  maxNumberOfScreens: [],
  layouts: [],
  doorSwingOptions: [],
  stallWidthList: [],
  stallADAWidthList: [],
  standardRoomDepthList: [],
  ADAroomDepthList: [],
  stallADADoorOpening: [],
  stallDoorOpening: [],
  maxRoomNumber: 0,
  materialData: [],
  colorData: [],
  quotationId: "",
  materials: {
    id: 0,
    name: "",
    price: "",
    materialImage: "",
  },
  loadingState: false,
  loadingMaterialData: false,
  loadingColorsData:false
};
export const stepSlice = createSlice({
  name: "step",
  initialState: initialStepInput,
  reducers: {
    updateLoadingState: (state) => {
      state.loadingState = false;
    },
    updateMaterialLoadingState: (state) => {
      state.loadingMaterialData = false;
    },
    updateQuotationId: (state, action) => {
      const { id } = action.payload;
      state.quotationId = id;
    },
    updateMaterial: (state, action) => {
      const { id, name, price, materialImage } = action.payload;

      state.materials = {
        id: id,
        name: name,
        price: price,
        materialImage: materialImage,
      };
    },
    updateQuotationValue: (state,action) => {
      const {isQuote}=action.payload
      state.isQuotationCreate = isQuote;
    },
    updateMaterialRoute:(state,action) => {
      const {routeVal}=action.payload
      state.materialRoute=routeVal
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStepInputData.pending, (state) => {
        state.loadingState = true;
        state.layouts = [];
        state.error = null;
      })
      .addCase(fetchStepInputData.fulfilled, (state, action) => {
        state.loadingState = false;
        state.error = null;
        const {
          data,
        }: {
          data: Array<FetchDataObject>;
        } = action.payload;
        const projectData = data?.filter(
          (projectDat) => projectDat.step === "project"
        );
        const layoutData = data?.filter(
          (layoutDat) => layoutDat.step === "layout"
        );
        const measurementData = data?.filter(
          (measurementDat) => measurementDat.step === "measurement"
        );
        if (projectData.length > 0) {
          const {
            maximum_number_of_stalls,
            maximum_number_of_urinal_screens,
            interested_for_material_installation_quote,
          } = projectData[0].config;
          let arrMaxStall = [];
          let arrMaxScreens = [];
          for (let index = 1; index <= +maximum_number_of_stalls; index++) {
            arrMaxStall.push(index.toString());
          }
          for (
            let index = 1;
            index <= +maximum_number_of_urinal_screens;
            index++
          ) {
            arrMaxScreens.push(index.toString());
          }
          state.maxNumberOfStalls = arrMaxStall;
          state.maxNumberOfScreens = arrMaxScreens;
          state.installationQuote = interested_for_material_installation_quote;
        }
        if (layoutData.length > 0) {
          const { layouts, show_handicap_accessible_stall } =
            layoutData[0].config;
          state.layouts = layouts
            ?.sort((a: LayoutObject, b: LayoutObject) => {
              return a.id - b.id;
            })
            .map((layoutData: LayoutObject) => {
              return {
                ...layoutData,
                layoutId:
                  layoutData.name.slice(0, 1).toLowerCase().trim() +
                  layoutData.name
                    .slice(1, layoutData.name.length)
                    .trim()
                    .split(" ")
                    .join(""),
              };
            });
          state.showHandicapStall = show_handicap_accessible_stall;
        }
        if (measurementData.length > 0) {
          const {
            swings,
            ada_stall_min_width,
            ada_stall_max_width,
            standard_stall_min_width,
            standard_stall_max_width,
            maximum_room_no,
            standard_stall_min_depth,
            standard_stall_max_depth,
            ada_stall_min_depth,
            ada_stall_max_depth,
            ada_stall_min_door_opening,
            ada_stall_max_door_opening,
            standard_stall_min_door_opening,
            standard_stall_max_door_opening,
          } = measurementData[0].config;
          let arrStallWidth = [];
          let arrADAStallWidth = [];
          let arrRoomDepth = [];
          let arrADARoomDepth = [];
          let arrADAStallDoorOpening = [];
          let arrStallDoorOpening = [];
          state.doorSwingOptions = swings
            .sort((a: DoorSwingObject, b: DoorSwingObject) => {
              return a.id - b.id;
            })
            .map((swingData: DoorSwingObject) => {
              return {
                ...swingData,
                doorSwingValue:
                  swingData.name.slice(0, 1).toLowerCase().trim() +
                  swingData.name
                    .slice(1, swingData.name.length)
                    .trim()
                    .split(" ")
                    .join(""),
              };
            });
          for (
            let index = +standard_stall_min_width;
            index <= +standard_stall_max_width;
            index++
          ) {
            arrStallWidth.push(index.toString());
          }
          for (
            let index = +standard_stall_min_depth;
            index <= +standard_stall_max_depth;
            index = index + 2
          ) {
            arrRoomDepth.push(index.toString());
          }
          for (
            let index = +ada_stall_min_depth;
            index <= +ada_stall_max_depth;
            index = index + 2
          ) {
            arrADARoomDepth.push(index.toString());
          }
          for (
            let index = +ada_stall_min_width;
            index <= +ada_stall_max_width;
            index++
          ) {
            arrADAStallWidth.push(index.toString());
          }
          for (
            let index = +ada_stall_min_door_opening;
            index <= +ada_stall_max_door_opening;
            index = index + 2
          ) {
            arrADAStallDoorOpening.push(index.toString());
          }
          for (
            let index = +standard_stall_min_door_opening;
            index <= +standard_stall_max_door_opening;
            index = index + 2
          ) {
            arrStallDoorOpening.push(index.toString());
          }
          state.stallWidthList = arrStallWidth;

          state.stallADAWidthList = arrADAStallWidth;
          state.standardRoomDepthList = arrRoomDepth;
          state.ADAroomDepthList = arrADARoomDepth;
          state.stallADADoorOpening = arrADAStallDoorOpening;
          state.stallDoorOpening = arrStallDoorOpening;
          state.maxRoomNumber = maximum_room_no;
        }
      })
      .addCase(fetchStepInputData.rejected, (state, action) => {
        state.loadingState = false;
        state.maxNumberOfStalls = ["1", "2", "3", "4", "5", "6", "7"];
        state.maxNumberOfScreens = ["1", "2", "3", "4"];
        state.installationQuote = "Yes";
        state.layouts = LayoutImages;
        state.showHandicapStall = "Yes";
        state.stallWidthList = stallWidthOptions;
        state.stallADAWidthList = stallADAWidthOptions;
        state.standardRoomDepthList = depthList;
        state.ADAroomDepthList = depthList;
        state.stallADADoorOpening = ADADoorOpeningList;
        state.stallDoorOpening = doorOpeningList;
        state.doorSwingOptions = swingOptions;
        state.maxRoomNumber = 4;
        state.error = (action.payload as string) || "Failed to fetch data";
      })
      .addCase(fetchMaterialDataById.pending, (state) => {
        state.loadingMaterialData = true;
        state.materialData = [];
        state.error = null;
      })
      .addCase(fetchMaterialDataById.fulfilled, (state, action) => {
        state.loadingMaterialData = false;
        state.materialData = action.payload?.materialData;
        state.submittedData = action.payload?.submittedData;
      })
      .addCase(fetchMaterialDataById.rejected, (state, action) => {
        state.loadingMaterialData = false;
        state.error = (action.payload as string) || "Failed to fetch data";
      }).addCase(fetchMaterialColors.pending,(state)=>{
        state.loadingColorsData = true;
        state.colorData=[];
        state.error=null;
      }).addCase(fetchMaterialColors.fulfilled,(state,action)=>{
        state.loadingColorsData = false;
        state.colorData=action.payload?.colorData;
        state.error=null;
      }).addCase(fetchMaterialColors.rejected,(state, action) => {
        state.loadingColorsData = false;
        state.error = (action.payload as string) || "Failed to fetch data";
      })
  },
});

export const {
  updateLoadingState,
  updateMaterialLoadingState,
  updateQuotationId,
  updateMaterial,
  updateQuotationValue,
  updateMaterialRoute
} = stepSlice.actions;

export default stepSlice.reducer;
