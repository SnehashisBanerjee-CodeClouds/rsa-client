import React, { useEffect, useState } from "react";
import {
  stallADAWidthOptions,
  stallFractions,
  stallWidthOptions,
} from "@/constants/step";
import {
  ADADepth,
  AdaToiletPosition,
  DoorOpening,
  DoorSwing,
  LayoutOption,
  OverallRoomWidth,
  RoomConfigOption,
  StallADAWidth,
  StallConfig,
  StallConfigOption,
  StallFraction,
  StallWidth,
  StandardDepth,
} from "@/types/model";
import { DoorSwingObject } from "@/types/stepForm";
import { handleError } from "@/utils/stall/helpers";
import { ChevronDown, ChevronRight, CircleHelp } from "lucide-react";
import { useAppDispatch } from "@/hooks/useStore";
import { updateQuotationValue } from "@/lib/slices/stepSlice";
import Tooltip from "@/components/ui/Tooltip";

function StallInfo({
  stallId,
  stallConfig,
  stallConfigHandler,
  doorSwingOptions,
  stallWidthList,
  stallADAWidthList,
  stallADADoorOpening,
  stallDoorOpening,
  exceedDoorOpening,
  isAlcoveError,
  setExceedDoorOpening,
  layoutOption,
}: {
  stallId: number;
  stallConfig: StallConfig;
  stallConfigHandler: (
    config: StallConfigOption,
    stallId: number,
    value: StallWidth | DoorOpening | DoorSwing | StallADAWidth | StallFraction
  ) => void;
  doorSwingOptions: Array<DoorSwingObject>;
  stallWidthList: Array<StallWidth | string>;
  stallADAWidthList: Array<StallADAWidth | string>;
  stallADADoorOpening: Array<DoorOpening | string>;
  stallDoorOpening: Array<DoorOpening | string>;
  exceedDoorOpening: DoorOpening;
  isAlcoveError: boolean;
  setExceedDoorOpening: React.Dispatch<React.SetStateAction<DoorOpening>>;
  layoutOption: LayoutOption;
}) {
  const dispatch = useAppDispatch();
  const [showTooltip, setShowTooltip] = useState({
    index: -1,
    tooltip_1: false,
    tooltip_2: false,
    tooltip_3: false,
  });
  useEffect(() => {
    if (stallConfig.doorOpening && stallId === 0) {
      setExceedDoorOpening(stallConfig.doorOpening);
    }
  }, [stallConfig, stallId]);
  return (
    <div className="stall_box_area grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3  gap-x-5  gap-2">
      <div className="stall_box w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[14px] font-medium">Stall Width</span>
          <Tooltip
            isTooltipOpen={showTooltip.tooltip_1}
            toolTipIndex={showTooltip.index}
            stallId={stallId}
            tooltipMessage="Please select the stall width"
          >
            <div
              onMouseEnter={() =>
                setShowTooltip({
                  index: stallId,
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
        </div>
        {stallConfig.hasOwnProperty("type") ? (
          <div className="flex justify-between items-center gap-2">
            <select
              value={stallConfig.stallWidth}
              className="bg-white h-[40px] li w-[130px] border border-[#707070]"
              onChange={(e) => {
                stallConfigHandler(
                  "StallWidth",
                  stallId,
                  e.target.value as StallWidth
                );
                dispatch(updateQuotationValue({ isQuote: true }));
                if (
                  stallADAWidthList[stallADAWidthList.length - 1] ===
                  e.target.value
                ) {
                  stallConfigHandler(
                    "StallFraction",
                    stallId,
                    "0" as StallFraction
                  );
                }
                if (e.target.value === "60") {
                  stallConfigHandler(
                    "StallFraction",
                    stallId,
                    "1/2" as StallFraction
                  );
                }
              }}
            >
              {stallADAWidthList?.map(
                (widthData: StallADAWidth | string, idx: number) => (
                  <option key={idx} value={widthData}>
                    {widthData}&rdquo;
                  </option>
                )
              )}
            </select>

            <select
              value={stallConfig.stallFraction}
              disabled={
                stallADAWidthList[stallADAWidthList.length - 1] ===
                stallConfig.stallWidth
              }
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              onChange={(e) => {
                stallConfigHandler(
                  "StallFraction",
                  stallId,
                  e.target.value as StallFraction
                );
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              {stallFractions?.map(
                (fractionData: StallFraction | string, idx: number) =>
                  stallConfig.stallWidth === "60" &&
                  stallConfig.stallFraction !== undefined &&
                  (fractionData === "0"
                    ? Number(fractionData) < 0.5
                    : Math.abs(
                        Number(fractionData.split("/")[0]) /
                          Number(fractionData.split("/")[1])
                      ) < 0.5) ? (
                    <option value={fractionData} key={idx} disabled={true}>
                      {fractionData}&rdquo;
                    </option>
                  ) : (
                    <option value={fractionData} key={idx}>
                      {fractionData}&rdquo;
                    </option>
                  )
              )}
            </select>
          </div>
        ) : !layoutOption.startsWith("alcove") ? (
          <div className="flex justify-between items-center gap-1">
            <select
              value={stallConfig.stallWidth}
              className="bg-white h-[40px] li w-[130px] border border-[#707070]"
              onChange={(e) => {
                let stallWidth: StallWidth | StallADAWidth = e.target
                  .value as StallWidth;
                if (
                  stallConfig.doorOpening &&
                  +e.target.value - +stallConfig.doorOpening < 5
                ) {
                  handleError(
                    `Oops! The difference between Stall Width and Door Opening should be more than or equal to 5`,
                    "top-center",
                    7000,
                    false,
                    "stall-width-error"
                  );
                  if (stallConfig.stallWidth)
                    stallWidth = stallConfig.stallWidth;
                }

                stallConfigHandler("StallWidth", stallId, stallWidth);
                dispatch(updateQuotationValue({ isQuote: true }));
                if (
                  stallWidthList[stallWidthList.length - 1] === e.target.value
                ) {
                  stallConfigHandler(
                    "StallFraction",
                    stallId,
                    "0" as StallFraction
                  );
                }
              }}
            >
              {stallWidthList?.map(
                (widthData: StallWidth | string, idx: number) => (
                  <option value={widthData} key={idx}>
                    {widthData}&rdquo;
                  </option>
                )
              )}
            </select>
            <select
              value={stallConfig.stallFraction}
              disabled={
                stallWidthList[stallWidthList.length - 1] ===
                stallConfig.stallWidth
              }
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              onChange={(e) => {
                stallConfigHandler(
                  "StallFraction",
                  stallId,
                  e.target.value as StallFraction
                );
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              {stallFractions?.map(
                (fractionData: StallFraction | string, idx: number) => (
                  <option value={fractionData} key={idx}>
                    {fractionData}&rdquo;
                  </option>
                )
              )}
            </select>
          </div>
        ) : stallId === 0 ? (
          <div className="flex justify-between items-center gap-1">
            <select
              value={stallConfig.stallWidth}
              className="bg-white h-[40px] li w-[130px] border border-[#707070]"
              onChange={(e) => {
                let stallWidth: StallWidth | StallADAWidth = e.target
                  .value as StallWidth;
                if (
                  stallConfig.doorOpening &&
                  +e.target.value < +stallConfig.doorOpening
                ) {
                  handleError(
                    `Stall width value should be greater than door opening value`,
                    "top-center",
                    7000,
                    false,
                    "stall-width-error"
                  );
                  if (stallConfig.stallWidth)
                    stallWidth = stallConfig.stallWidth;
                }

                stallConfigHandler("StallWidth", stallId, stallWidth);
                dispatch(updateQuotationValue({ isQuote: true }));
                if (
                  stallWidthList[stallWidthList.length - 1] === e.target.value
                ) {
                  stallConfigHandler(
                    "StallFraction",
                    stallId,
                    "0" as StallFraction
                  );
                }
              }}
            >
              {stallWidthList?.map(
                (widthData: StallWidth | string, idx: number) => (
                  <option value={widthData} key={idx}>
                    {widthData}&rdquo;
                  </option>
                )
              )}
            </select>
            <select
              value={stallConfig.stallFraction}
              disabled={
                stallWidthList[stallWidthList.length - 1] ===
                stallConfig.stallWidth
              }
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              onChange={(e) => {
                stallConfigHandler(
                  "StallFraction",
                  stallId,
                  e.target.value as StallFraction
                );
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              {stallFractions?.map(
                (fractionData: StallFraction | string, idx: number) => (
                  <option value={fractionData} key={idx}>
                    {fractionData}&rdquo;
                  </option>
                )
              )}
            </select>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-1">
            <select
              value={stallConfig.stallWidth}
              className="bg-white h-[40px] li w-[130px] border border-[#707070]"
              onChange={(e) => {
                let stallWidth: StallWidth | StallADAWidth = e.target
                  .value as StallWidth;
                if (
                  stallConfig.doorOpening &&
                  +e.target.value - +stallConfig.doorOpening < 5
                ) {
                  handleError(
                    `Oops! The difference between Stall Width and Door Opening should be more than or equal to 5`,
                    "top-center",
                    7000,
                    false,
                    "stall-width-error"
                  );
                  if (stallConfig.stallWidth)
                    stallWidth = stallConfig.stallWidth;
                }

                stallConfigHandler("StallWidth", stallId, stallWidth);
                dispatch(updateQuotationValue({ isQuote: true }));
                if (
                  stallWidthList[stallWidthList.length - 1] === e.target.value
                ) {
                  stallConfigHandler(
                    "StallFraction",
                    stallId,
                    "0" as StallFraction
                  );
                }
              }}
            >
              {stallWidthList?.map(
                (widthData: StallWidth | string, idx: number) => (
                  <option value={widthData} key={idx}>
                    {widthData}&rdquo;
                  </option>
                )
              )}
            </select>
            <select
              value={stallConfig.stallFraction}
              disabled={
                stallWidthList[stallWidthList.length - 1] ===
                stallConfig.stallWidth
              }
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              onChange={(e) => {
                stallConfigHandler(
                  "StallFraction",
                  stallId,
                  e.target.value as StallFraction
                );
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              {stallFractions?.map(
                (fractionData: StallFraction | string, idx: number) => (
                  <option value={fractionData} key={idx}>
                    {fractionData}&rdquo;
                  </option>
                )
              )}
            </select>
          </div>
        )}
      </div>

      <div className="stall_box w-full">
        <div className="flex justify-between items-center mb-1">
          <span>Door Opening</span>
          <Tooltip
            isTooltipOpen={showTooltip.tooltip_2}
            toolTipIndex={showTooltip.index}
            stallId={stallId}
            tooltipMessage="Please select the door opening width"
          >
            <div
              onMouseEnter={() =>
                setShowTooltip({
                  ...showTooltip,
                  index: stallId,
                  tooltip_2: true,
                })
              }
              onMouseLeave={() =>
                setShowTooltip({
                  ...showTooltip,
                  index: -1,
                  tooltip_2: false,
                })
              }
            >
              <CircleHelp className="w-5 h-5 bg-green-600 text-white rounded-full cursor-pointer" />
            </div>
          </Tooltip>
        </div>
        {stallConfig.hasOwnProperty("type") ? (
          !layoutOption.startsWith("alcove") ? (
            <select
              value={stallConfig.doorOpening}
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              onChange={(e) => {
                stallConfigHandler(
                  "DoorOpening",
                  stallId,
                  e.target.value as DoorOpening
                );
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              {stallADADoorOpening?.map(
                (doorOpeningData: DoorOpening | string, idx: number) => (
                  <option value={doorOpeningData} key={idx}>
                    {doorOpeningData}&rdquo;
                  </option>
                )
              )}
            </select>
          ) : stallId === 0 ? (
            <select
              value={exceedDoorOpening}
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              onChange={(e) => {
                setExceedDoorOpening(e.target.value as DoorOpening);
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              {stallADADoorOpening?.map(
                (doorOpeningData: DoorOpening | string, idx: number) => (
                  <option value={doorOpeningData} key={idx}>
                    {doorOpeningData}&rdquo;
                  </option>
                )
              )}
            </select>
          ) : (
            <select
              value={stallConfig.doorOpening}
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              onChange={(e) => {
                stallConfigHandler(
                  "DoorOpening",
                  stallId,
                  e.target.value as DoorOpening
                );
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              {stallADADoorOpening?.map(
                (doorOpeningData: DoorOpening | string, idx: number) => (
                  <option value={doorOpeningData} key={idx}>
                    {doorOpeningData}&rdquo;
                  </option>
                )
              )}
            </select>
          )
        ) : !layoutOption.startsWith("alcove") ? (
          <select
            value={stallConfig.doorOpening}
            className="bg-white h-[40px] w-[130px] border border-[#707070]"
            onChange={(e) => {
              let doorOpening = e.target.value as DoorOpening;
              if (
                stallConfig.stallWidth &&
                +stallConfig.stallWidth - +e.target.value < 5
              ) {
                handleError(
                  `Oops! The difference between Stall Width and Door Opening should be more than or equal to 5`,
                  "top-center",
                  7000,
                  false,
                  "door-opening-error"
                );
                if (stallConfig.doorOpening)
                  doorOpening = stallConfig.doorOpening;
              }

              stallConfigHandler("DoorOpening", stallId, doorOpening);
              dispatch(updateQuotationValue({ isQuote: true }));
            }}
          >
            {stallDoorOpening?.map(
              (doorOpeningData: DoorOpening | string, idx: number) => (
                <option value={doorOpeningData} key={idx}>
                  {doorOpeningData}&rdquo;
                </option>
              )
            )}
          </select>
        ) : stallId === 0 ? (
          <select
            value={exceedDoorOpening}
            className="bg-white h-[40px] w-[130px] border border-[#707070]"
            onChange={(e) => {
              let doorOpening = e.target.value as DoorOpening;
              if (
                stallConfig.stallWidth &&
                +stallConfig.stallWidth < +e.target.value
              ) {
                handleError(
                  `Stall width value should be greater than door opening value`,
                  "top-center",
                  7000,
                  false,
                  "door-opening-error"
                );
                if (stallConfig.doorOpening)
                  doorOpening = stallConfig.doorOpening;
              }

              setExceedDoorOpening(doorOpening);
              dispatch(updateQuotationValue({ isQuote: true }));
            }}
          >
            {stallDoorOpening?.map(
              (doorOpeningData: DoorOpening | string, idx: number) => (
                <option value={doorOpeningData} key={idx}>
                  {doorOpeningData}&rdquo;
                </option>
              )
            )}
          </select>
        ) : (
          <select
            value={stallConfig.doorOpening}
            className="bg-white h-[40px] w-[130px] border border-[#707070]"
            onChange={(e) => {
              let doorOpening = e.target.value as DoorOpening;
              if (
                stallConfig.stallWidth &&
                +stallConfig.stallWidth - +e.target.value < 5
              ) {
                handleError(
                  `Oops! The difference between Stall Width and Door Opening should be more than or equal to 5`,
                  "top-center",
                  7000,
                  false,
                  "door-opening-error"
                );
                if (stallConfig.doorOpening)
                  doorOpening = stallConfig.doorOpening;
              }

              stallConfigHandler("DoorOpening", stallId, doorOpening);
              dispatch(updateQuotationValue({ isQuote: true }));
            }}
          >
            {stallDoorOpening?.map(
              (doorOpeningData: DoorOpening | string, idx: number) => (
                <option value={doorOpeningData} key={idx}>
                  {doorOpeningData}&rdquo;
                </option>
              )
            )}
          </select>
        )}
      </div>
      <div className="stall_box w-full">
        <div className="flex justify-between items-center mb-1">
          <span>Door Swing</span>
          <Tooltip
            isTooltipOpen={showTooltip.tooltip_3}
            toolTipIndex={showTooltip.index}
            stallId={stallId}
            tooltipMessage="Please select the door swing position"
          >
            <div
              onMouseEnter={() =>
                setShowTooltip({
                  ...showTooltip,
                  index: stallId,
                  tooltip_3: true,
                })
              }
              onMouseLeave={() =>
                setShowTooltip({
                  ...showTooltip,
                  index: -1,
                  tooltip_3: false,
                })
              }
            >
              <CircleHelp className="w-5 h-5 bg-green-600 text-white rounded-full cursor-pointer" />
            </div>
          </Tooltip>
        </div>
        <select
          value={stallConfig.doorSwing ?? "rightIn"}
          className="bg-white h-[40px] w-[130px] border border-[#707070]"
          onChange={(e) => {
            stallConfigHandler(
              "DoorSwing",
              stallId,
              e.target.value as DoorSwing
            );
            dispatch(updateQuotationValue({ isQuote: true }));
          }}
        >
          {doorSwingOptions?.map((swingData: DoorSwingObject) => (
            <option value={swingData.doorSwingValue} key={swingData.id}>
              {swingData.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function StallConfigurations({
  stallId,
  stallNo,
  stallConfig,
  stallConfigHandler,
  selectStallHandler,
  isAda,
  isDisabled,
  doorSwingOptions,
  stallWidthList,
  stallADAWidthList,
  stallADADoorOpening,
  stallDoorOpening,
  isAlcoveError,
  exceedDoorOpening,
  setExceedDoorOpening,
  layoutOption,
}: {
  stallId: number;
  stallNo: number;
  stallConfig: StallConfig;
  stallConfigHandler: (
    config: StallConfigOption,
    stallId: number,
    value: StallWidth | DoorOpening | DoorSwing | StallADAWidth | StallFraction
  ) => void;
  selectStallHandler: (stallId: number) => void;
  isAda?: boolean;
  isDisabled?: boolean;
  doorSwingOptions: Array<DoorSwingObject>;
  stallWidthList: Array<StallWidth | string>;
  stallADAWidthList: Array<StallADAWidth | string>;
  stallADADoorOpening: Array<DoorOpening | string>;
  stallDoorOpening: Array<DoorOpening | string>;
  exceedDoorOpening: DoorOpening;
  isAlcoveError: boolean;
  setExceedDoorOpening: React.Dispatch<React.SetStateAction<DoorOpening>>;
  layoutOption: LayoutOption;
}) {
  return (
    <React.Fragment>
      <h2 className="mt-2">
        <button
          type="button"
          className="flex items-center justify-between w-full pb-4 pr-5 font-medium rtl:text-right !text-black border-b border-black rounded-t-xl focus:text-black hover:text-black gap-3 bg-transparent group text-[16px]"
          aria-expanded="true"
          onClick={(e) => selectStallHandler(stallId)}
        >
          <span>
            Stall {stallNo} {isAda && "ADA"}
          </span>
          {stallConfig.isOpened ? <ChevronDown /> : <ChevronRight />}
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className=""
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="keg_details">
          {stallConfig.isOpened && (
            <StallInfo
              stallId={stallId}
              stallConfig={stallConfig}
              stallConfigHandler={stallConfigHandler}
              doorSwingOptions={doorSwingOptions}
              stallWidthList={stallWidthList}
              stallADAWidthList={stallADAWidthList}
              stallADADoorOpening={stallADADoorOpening}
              stallDoorOpening={stallDoorOpening}
              isAlcoveError={isAlcoveError}
              exceedDoorOpening={exceedDoorOpening}
              setExceedDoorOpening={setExceedDoorOpening}
              layoutOption={layoutOption}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
