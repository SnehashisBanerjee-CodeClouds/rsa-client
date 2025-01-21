"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { StallColorOption } from "@/types/ColorDialog";
import { OutlineColor, StallColor } from "@/types/model";
import { stallColors } from "@/constants/step";
import Label from "@/components/ui/Label";
import ColorModal from "@/components/colorModal/ColorModal";
import ModelOnModal from "@/components/colorModal/ModelOnModal";
import MaterialSkeleton from "@/components/skeletons/Materials/MaterialSkeleton";
import {
  fetchMaterialDataById,
  fetchStepInputData,
  updateMaterial,
  updateQuotationId,
} from "@/lib/slices/stepSlice";
import { updateInitialStall } from "@/lib/slices/roomSlice";
import { updateContact } from "@/lib/slices/contactSlice";

function Material() {
  const [param, setParam] = useState<string | null>(null);
  // const searchParams = useSearchParams();
  // const quotationId = searchParams.get("id");
  const dispatch = useAppDispatch();
  const { roomIndex } = useAppSelector((state) => state.room.selectedRoom);
  const {
    materialData,
    loadingMaterialData,
    materials,
    submittedData,
    colorData,
    loadingState,
  } = useAppSelector((state) => state.step);
  const {
    stall: { stallColor },
  } = useAppSelector((state) => state.room.rooms[roomIndex]);
  const [loadingUpdateColor, setLoadingUpdateColor] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [selectedData, setSelectedData] = useState<StallColorOption>({
    id: "Red",
    color: StallColor.Red,
  });
  const [selectedId, setSelectedId] = useState(0);
  const [param2, setParam2] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get("id");
    const paramValue2 = urlParams.get("abandoned");
    if (paramValue !== null) {
      setParam(paramValue);
    }
    if (paramValue2 !== null) {
      setParam2(paramValue2);
    } // Example: get 'param' from query params
  }, []);
  useEffect(() => {
    if (param != null) {
      dispatch(fetchMaterialDataById({ id: param }));
      dispatch(updateQuotationId({ id: param }));
      const selectedIdx = colorData.find(
        (sColor) => sColor === stallColor
      );
      const hexName=stallColors.find((dat)=>dat.color===selectedIdx)
      setSelectedData({
        id: hexName?.id,
        color: stallColor,
      });
      setSelectedId(+materials?.id);
      setIsMounted(false);
    }
  }, [param]);
  useEffect(() => {
    dispatch(
      fetchStepInputData({
        stepValue: ["color"],
      })
    );
  }, []);
  useEffect(() => {
    if (submittedData && param2 !== null) {
      const rooms: any = submittedData?.rooms;

      const formattedData = rooms?.map((data: any) => {
        return {
          id: data.id,
          completedStep: 5,
          expandedView: data.expandedView,
          hasUrinalScreens:
            data.hasUrinalScreens === true ? true : "not-selected",
          stall: {
            noOfStalls: data.stall.noOfStalls,
            adaStall: data.stall.adaStall,
            adaDepth: data.stall.adaDepth,
            overallRoomWidth: data.stall.overallRoomWidth,
            stallColor: data.stall.stallColor,
            floorColor: OutlineColor.FloorSelected,
            standardDepth: data.stall.standardDepth,
            stallConfig: data.stall.stallConfig.map((stalldata: any) => {
              return { ...stalldata, doorSwing: stalldata.doorSwing.key };
            }),
            layout: data.stall.layout,
            cameraControls: data.stall.cameraControls,
          },
          title: data.title === "" ? `Room ${data.id}` : data.title,
          urinalScreen:
            data.hasUrinalScreens === false
              ? {
                  cameraControls: {
                    view: "2D",
                    position: [10, 100, 0],
                    zoom: 15,
                  },
                  noOfUrinalScreens: 1,
                  screens2DImage: "",
                  screens3DImage: "",
                  urinalScreenConfig: [{ x: 2, y: -4.5, z: 0, isOpened: true }],
                  urinalScreensDepth: "24",
                }
              : {
                  noOfUrinalScreens: data.urinalScreen.noOfUrinalScreens,
                  cameraControls: data.urinalScreen.cameraControls,
                  screens2DImage: data.urinalScreen.screens2DImage,
                  screens3DImage: data.urinalScreen.screens3DImage,
                  urinalScreenConfig: data.urinalScreen.urinalScreenConfig,
                },
        };
      });
      const contactData = {
        first_name: submittedData.first_name,
        last_name: submittedData.last_name,
        email: submittedData.email,
        phone_number: submittedData.phone_number,
      };
      dispatch(updateInitialStall({ data: formattedData }));
      dispatch(updateContact(contactData));
    }
  }, [submittedData, param2]);
  function handleMaterialData(e: React.ChangeEvent<HTMLInputElement>) {
    const materialArr = materialData?.filter(
      (data) => data.id === +e.currentTarget.value
    );
    const id = materialArr[0]?.id;
    const name = materialArr[0]?.name;
    const price = materialArr[0]?.price;
    const image = materialArr[0]?.src;
    setSelectedId(+e.currentTarget.value);
    dispatch(
      updateMaterial({ id: id, name: name, price: price, materialImage: image })
    );
  }
  if (loadingMaterialData || isMounted || loadingState) {
    return <MaterialSkeleton />;
  }
  return (
    <>
      <div className="materials">
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-x-6 xl:gap-x-8">
          {materialData.map((data) => (
            <li key={data.id}>
              <div className="material_name">{data.name}</div>
              <Label htmlFor={data.id.toString()}>
                <Image
                  alt="Material"
                  className={`w-full ${
                    +selectedId === data.id ? "border-4 border-[#3FAB3B]" : ""
                  }`}
                  width={159.47}
                  height={130.72}
                  loading="lazy"
                  src={data.src}
                />
              </Label>

              <div className="material_price">${data.price}</div>
              <input
                type="radio"
                id={data.id.toString()}
                value={data.id}
                className="hidden"
                checked={+selectedId === data.id}
                onChange={(e) => handleMaterialData(e)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="row items-center">
        <div className="select_color row lg:justify-between items-center pr-4 mt-6 xl:mt-10 w-full lg:w-2/5">
          <div className="select_color_all flex flex-col">
            <h3>Select a Color*</h3>
            <ColorModal
              isDisabled={!selectedId}
              setLoadingUpdateColor={setLoadingUpdateColor}
              setSelectedData={setSelectedData}
            />
            <ModelOnModal isDisabled={!selectedId} />
          </div>
          {loadingUpdateColor ? (
            <div className="clr-box_holder mt-6 lg:mt-0">
              <div className="clr-box mb-2 !bg-gray-100 animate-pulse !border-none rounded-md"></div>
              <span className="bg-gray-100 rounded-md p-1 text-transparent animate-pulse">
                Green
              </span>
            </div>
          ) : (
            <div className="clr-box_holder mt-6 lg:mt-0">
              <div
                className="clr-box mb-2"
                style={{ backgroundColor: selectedData.color }}
              ></div>
              <span>{selectedData.id}</span>
            </div>
          )}
        </div>
        <div className="select_color_right mt-6 xl:mt-10 pl-4 w-full lg:w-3/5">
          <h4>
            These galvanized metal partitions are finished with a powder coating
            that is highly resistant to stains, corrosion, and more.
          </h4>
          <a
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            className="custom_btn border_btn"
            type="button"
          >
            Learn more
          </a>
        </div>
      </div>
    </>
  );
}

export default Material;
