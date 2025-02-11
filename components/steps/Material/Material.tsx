"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { StallColorOption, StallTextureOption } from "@/types/ColorDialog";
import { OutlineColor, StallColor } from "@/types/model";
import Label from "@/components/ui/Label";
import ColorModal from "@/components/colorModal/ColorModal";
import MaterialSkeleton from "@/components/skeletons/Materials/MaterialSkeleton";
import {
  fetchMaterialColors,
  fetchMaterialDataById,
  fetchMaterialTooltip,
  updateMaterial,
  updateQuotationId,
} from "@/lib/slices/stepSlice";
import {
  changeColor,
  handleStepLoading,
  startOver,
  updateInitialStall,
} from "@/lib/slices/roomSlice";
import { startOverContact, updateContact } from "@/lib/slices/contactSlice";
import { CircleHelp } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";
import { Pointer } from "lucide-react";
import CheckoutButton from "@/components/stepButtons/CheckoutButton";
import StartOver from "@/components/stepButtons/StartOver";
import { useRouter } from "next/navigation";
import { STEPS } from "@/constants/step";

function Material() {
  const router = useRouter();
  // pulsate for Animation
  const [pulsateColor, setPulsateColor] = useState<OutlineColor | string>(
    "transparent"
  );
  const [showTooltip, setShowTooltip] = useState({
    index: -1,
    tooltip_1: false,
    tooltip_2: false,
    tooltip_3: false,
  });
  const [param, setParam] = useState<string | null>(null);
  // const searchParams = useSearchParams();
  // const quotationId = searchParams.get("id");
  const dispatch = useAppDispatch();
  const {
    materialData,
    loadingMaterialData,
    loadingColorsData,
    materials,
    submittedData,
    loadingState,
    loadingTooltipdata,
    tooltipData,
  } = useAppSelector((state) => state.step);
  const [loadingUpdateColor, setLoadingUpdateColor] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [selectedData, setSelectedData] = useState<StallColorOption>({
    name: "",
    color: "",
  });
  const [selectedTexture, setSelectedTexture] = useState<StallTextureOption>({
    name: "",
    imageName: "",
  });

  const [selectedId, setSelectedId] = useState(0);
  const [param2, setParam2] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get("id");
    const paramValue2 = urlParams.get("abandoned");
    dispatch(handleStepLoading({ stepName: "contact", isLoading: false }));
    if (paramValue !== null) {
      setParam(paramValue);
    }
    if (paramValue2 !== null) {
      setParam2(paramValue2);
    } // Example: get 'param' from query params
  }, []);
  useEffect(() => {
    if (param !== null) {
      dispatch(fetchMaterialDataById({ id: param }));
      dispatch(updateQuotationId({ id: param }));
      dispatch(fetchMaterialTooltip());
      // const selectedIdx = colorData.find((sColor) => sColor === stallColor);
      // const hexName = stallColors.find((dat) => dat.color === selectedIdx);
      // setSelectedData({
      //   id: hexName?.id,
      //   color: stallColor,
      // });
      dispatch(fetchMaterialColors());
      setSelectedId(+materials?.id);
      setIsMounted(false);
    }
  }, [param]);

  useEffect(() => {
    if (submittedData && param2 !== null) {
      const rooms: any = submittedData?.rooms;

      const formattedData = rooms?.map((data: any) => {
        return {
          id: data.id,
          completedStep: data.completedStep,
          expandedView: data.expandedView,
          hasUrinalScreens:
            data.hasUrinalScreens === true ? true : "not-selected",
          stall: {
            noOfStalls: data.stall.noOfStalls,
            adaStall: data.stall.adaStall,
            adaDepth: data.stall.adaDepth,
            overallRoomWidth: data.stall.overallRoomWidth,
            stallColor: data.stall.stallColor,
            stallColorName: data.stall.stallColorName,
            wallTexture: data.stall.wallTexture,
            wallTextureName: data.stall.wallTextureName,
            floorColor: OutlineColor.FloorSelected,
            standardDepth: data.stall.standardDepth,
            alcoveDepth: data.stall.alcoveDepth,
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
    setSelectedData({
      name: "",
      color: "",
    });
    setSelectedTexture({
      name: "",
      imageName: "",
    });
    dispatch(
      changeColor({
        stallColor: StallColor.LightBlue,
        stallColorName: "",
      })
    );
    dispatch(
      updateMaterial({ id: id, name: name, price: price, materialImage: image })
    );
  }
  function truncateFunc(name: string) {
    return name?.length < 30 ? name : name.slice(0, 30) + "...";
  }
  if (
    loadingMaterialData ||
    isMounted ||
    loadingState ||
    loadingColorsData ||
    loadingTooltipdata
  ) {
    return <MaterialSkeleton />;
  }
  return (
    <>
      <div className="materials">
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-x-6 xl:gap-x-8">
          {materialData.map((data) => (
            <li key={data.id}>
              <div className="material_name">
                {data.name}
                <span>
                  <Tooltip
                    isTooltipOpen={showTooltip.tooltip_1}
                    toolTipIndex={showTooltip.index}
                    stallId={data.id}
                    tooltipMessage={
                      tooltipData?.filter(
                        (tooltip: any) => tooltip.id === data.id
                      )[0]?.description
                    }
                  >
                    <div
                      onMouseEnter={() =>
                        setShowTooltip({
                          index: data.id,
                          tooltip_1: true,
                          tooltip_2: false,
                          tooltip_3: false,
                        })
                      }
                      onMouseLeave={() =>
                        setShowTooltip({
                          index: -1,
                          tooltip_1: false,
                          tooltip_2: false,
                          tooltip_3: false,
                        })
                      }
                    >
                      <CircleHelp className="w-5 h-5 bg-green-600 text-white rounded-full cursor-pointer" />
                    </div>
                  </Tooltip>
                </span>
              </div>
              <Label htmlFor={data.id.toString()}>
                <Image
                  alt="Material"
                  className={`w-full ${
                    +selectedId === data.id ? "border-6 border-[#4fd84b]" : ""
                  }`}
                  width={159.47}
                  height={130.72}
                  loading="lazy"
                  src={data.src}
                />
              </Label>

              <div className="material_price">
                ${Number(data.price).toLocaleString()}
              </div>
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
      <div className="row items-center justify-center">
        <div className="select_color row lg:justify-between justify-center pr-4 mt-6 xl:mt-20 w-full gap-5">
          <div className="select_color_all flex flex-col flex-1">
            {/* <h3>Select a Color*</h3> */}
            <ColorModal
              selectedId={selectedId}
              setLoadingUpdateColor={setLoadingUpdateColor}
              setSelectedData={setSelectedData}
              selectedData={selectedData}
              selectedTexture={selectedTexture}
              setSelectedTexture={setSelectedTexture}
            />
            <CheckoutButton
              type="submit"
              selectedData={selectedData}
              selectedId={selectedId}
              selectedTexture={selectedTexture}
            />
          </div>
          {loadingUpdateColor ? (
            <div className="clr-box_holder flex-1">
              <div className="clr-box mb-2 !bg-gray-100 animate-pulse !border-none rounded-md"></div>
              <span className="bg-gray-100 rounded-md p-1 text-transparent animate-pulse">
                Green
              </span>
            </div>
          ) : (
            <div className="clr-box_holder flex-1">
              <div
                className="clr-box mb-2"
                style={{
                  background:
                    selectedData.name !== ""
                      ? selectedData.color
                      : selectedTexture.name !== ""
                      ? `url(${process.env.NEXT_PUBLIC_API_BASE}/uploads/textures/${selectedTexture.imageName}) `
                      : "#9FA6B2",
                  cursor:
                    selectedData.name !== "" || selectedTexture.name !== ""
                      ? "default"
                      : "not-allowed",
                  opacity:
                    selectedId !== 4
                      ? selectedData.name !== ""
                        ? 1
                        : selectedTexture.name !== ""
                        ? 1
                        : 0.3
                      : 0.3,
                  backgroundSize: "100% 100%",
                }}
              ></div>
              <span>
                {selectedData.name !== ""
                  ? truncateFunc(selectedData.name)
                  : selectedTexture.name !== ""
                  ? truncateFunc(selectedTexture.name)
                  : "Please select a color"}
              </span>
            </div>
          )}
        </div>
        {/* <div className="select_color_right mt-6 xl:mt-10 pl-4 w-full lg:w-3/5">
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
        </div> */}
      </div>

      <div className="z-10 absolute top-0 left-0 chooseMaterial">
        <div
          className={`px-4 py-3 inline-flex font-[family-name:var(--font-manrope)]`}
        >
          <button
            style={{
              backgroundColor: pulsateColor,
              color: pulsateColor === "transparent" ? "black" : "white",
            }}
            className={`font-bold text-black text-sm rounded-s-md rounded-e-md px-1 py-2 `}
          >
            <Pointer className="inline h-5 w-5 ml-1" /> Click to choose material
          </button>
        </div>
      </div>
      <div className="mobile_btn">
        <StartOver
          className=""
          isAction={true}
          param={param}
          buttonColor="secondary"
        />
      </div>
    </>
  );
}

export default Material;
