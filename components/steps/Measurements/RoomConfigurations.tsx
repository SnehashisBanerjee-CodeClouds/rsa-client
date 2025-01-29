"use client";

import { CircleHelp } from "lucide-react";
import {
  ADADepth,
  AdaToiletPosition,
  AlcoveDepth,
  LayoutOption,
  OverallRoomWidth,
  RoomConfig,
  RoomConfigOption,
  StandardDepth,
} from "@/types/model";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { updateQuotationValue } from "@/lib/slices/stepSlice";
import { useAppDispatch } from "@/hooks/useStore";
import Tooltip from "@/components/ui/Tooltip";

export default function RoomConfigurations({
  roomConfig,
  roomConfigHandler,
  totalWidthVal,
  standardDepth,
  adaDepth,
  alcoveDepth,
  standardRoomDepthList,
  ADAroomDepthList,
  totalFraction,
  setIsDepthExceed,
  layoutOption,
  exceedStandardDepth,
  exceedAlcoveDepth,
  setExceedStandardDepth,
  setExceedAlcoveDepth,
  isAlcoveError,
  exceedAdaDepth,
  setExceedAdaDepth,
}: {
  roomConfig: RoomConfig;
  totalWidth: string;
  roomConfigHandler: (
    config: RoomConfigOption,

    value:
      | AdaToiletPosition
      | OverallRoomWidth
      | number
      | StandardDepth
      | ADADepth
      | string
  ) => void;
  totalWidthVal: number;
  widthError: boolean;
  standardDepth: StandardDepth;
  adaDepth: ADADepth;
  alcoveDepth: AlcoveDepth;
  standardRoomDepthList: Array<StandardDepth | string>;
  ADAroomDepthList: Array<ADADepth | string>;
  totalFraction: string;
  setIsDepthExceed: Dispatch<SetStateAction<boolean>>;
  layoutOption: LayoutOption;
  exceedStandardDepth: StandardDepth;
  exceedAlcoveDepth: AlcoveDepth;
  setExceedStandardDepth: React.Dispatch<React.SetStateAction<StandardDepth>>;
  setExceedAlcoveDepth: React.Dispatch<React.SetStateAction<AlcoveDepth>>;
  isAlcoveError: boolean;
  exceedAdaDepth: ADADepth;
  setExceedAdaDepth: React.Dispatch<React.SetStateAction<ADADepth>>;
}) {
  const dispatch = useAppDispatch();
  const [overallWidthVal, setOverallWidthVal] = useState<number | string>(0);
  const [roomTooltip, setRoomTooltip] = useState({
    tooltip_1: false,
    tooltip_2: false,
    tooltip_3: false,
  });
  const widthWithFraction = useMemo(() => {
    const result = +overallWidthVal + +totalFraction;
    return result.toString();
  }, [overallWidthVal, totalFraction]);
  // Single Stall
  const noAlcoveADA = useMemo(() => {
    return (
      !roomConfig.stall.adaStall &&
      !layoutOption.startsWith("alcove") &&
      roomConfig.stall.noOfStalls === 1
    );
  }, [layoutOption, roomConfig.stall.adaStall, roomConfig.stall.noOfStalls]);
  const noAlcove = useMemo(() => {
    return (
      !layoutOption.startsWith("alcove") &&
      roomConfig.stall.adaStall &&
      roomConfig.stall.noOfStalls === 1
    );
  }, [layoutOption, roomConfig.stall.adaStall, roomConfig.stall.noOfStalls]);
  const yesAlcoveADA = useMemo(() => {
    return (
      layoutOption.startsWith("alcove") &&
      roomConfig.stall.adaStall &&
      roomConfig.stall.noOfStalls === 1
    );
  }, [layoutOption, roomConfig.stall.adaStall, roomConfig.stall.noOfStalls]);
  const yesAlcove = useMemo(() => {
    return (
      layoutOption.startsWith("alcove") &&
      !roomConfig.stall.adaStall &&
      roomConfig.stall.noOfStalls === 1
    );
  }, [layoutOption, roomConfig.stall.adaStall, roomConfig.stall.noOfStalls]);
  // Single Stall
  // More than one stall
  const noAlcoveADA2 = useMemo(() => {
    return (
      !roomConfig.stall.adaStall &&
      !layoutOption.startsWith("alcove") &&
      roomConfig.stall.noOfStalls > 1
    );
  }, [layoutOption, roomConfig.stall.adaStall, roomConfig.stall.noOfStalls]);
  const noAlcove2 = useMemo(() => {
    return (
      !layoutOption.startsWith("alcove") &&
      roomConfig.stall.adaStall &&
      roomConfig.stall.noOfStalls > 1
    );
  }, [layoutOption, roomConfig.stall.adaStall, roomConfig.stall.noOfStalls]);
  const yesAlcoveADA2 = useMemo(() => {
    return (
      layoutOption.startsWith("alcove") &&
      roomConfig.stall.adaStall &&
      roomConfig.stall.noOfStalls > 1
    );
  }, [layoutOption, roomConfig.stall.adaStall, roomConfig.stall.noOfStalls]);
  const yesAlcove2 = useMemo(() => {
    return (
      layoutOption.startsWith("alcove") &&
      !roomConfig.stall.adaStall &&
      roomConfig.stall.noOfStalls > 1
    );
  }, [layoutOption, roomConfig.stall.adaStall, roomConfig.stall.noOfStalls]);
  // More than one stall
  useEffect(() => {
    setOverallWidthVal(totalWidthVal);
    roomConfigHandler(
      "OverallRoomWidth",
      totalWidthVal.toString() as OverallRoomWidth
    );
    roomConfigHandler("OverallRoomFraction", totalFraction as string);

    if (yesAlcove || yesAlcove2 || yesAlcoveADA || yesAlcoveADA2) {
      if (yesAlcoveADA || yesAlcoveADA2) {
        setIsDepthExceed(false);
      } else {
        setIsDepthExceed(false);
        // setExceedAlcoveDepth(alcoveDepth);
        // setExceedStandardDepth(standardDepth);
      }
    }
  }, [
    totalWidthVal,
    totalFraction,
    yesAlcove,
    yesAlcove2,
    yesAlcoveADA,
    yesAlcoveADA2,
    noAlcove,
    noAlcove2,
  ]);
  return (
    <div className="block my-2 rounded-md px-3 pt-1 pb-2 bg-[#96c9e9]">
      <div
        className={`stall_box_area grid grid-cols-1 ${
          noAlcove2 || yesAlcoveADA2 || yesAlcove2 || yesAlcove
            ? "xl:grid-cols-3"
            : "xl:grid-cols-2"
        } justify-between gap-2 gap-x-5 mt-[18px]`}
      >
        {(yesAlcoveADA2 || yesAlcove2) && (
          <div className="stall_box w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[14px] font-medium">Standard Depth</span>
              <Tooltip
                isTooltipOpen={roomTooltip.tooltip_1}
                tooltipMessage="Please select the standard depth"
              >
                <div
                  onMouseEnter={() =>
                    setRoomTooltip({
                      ...roomTooltip,
                      tooltip_1: true,
                    })
                  }
                  onMouseLeave={() =>
                    setRoomTooltip({
                      ...roomTooltip,
                      tooltip_1: false,
                    })
                  }
                >
                  <CircleHelp className="w-5 h-5 bg-green-600 text-white rounded-full cursor-pointer" />
                </div>
              </Tooltip>
            </div>
            <select
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              value={exceedStandardDepth}
              onChange={(e) => {
                let standardDepthVal = e.target.value as StandardDepth;
                if (
                  roomConfig.stall.adaStall &&
                  standardDepthVal > adaDepth &&
                  !layoutOption.startsWith("alcove")
                ) {
                  standardDepthVal = adaDepth;
                  setIsDepthExceed(true);
                }

                setExceedStandardDepth(standardDepthVal);
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              {standardRoomDepthList?.map(
                (depthData: StandardDepth | string, idx: number) => (
                  <option value={depthData} key={idx}>
                    {depthData}&rdquo;
                  </option>
                )
              )}
            </select>
          </div>
        )}
        {(noAlcoveADA || noAlcoveADA2 || noAlcove2) && (
          <div className="stall_box w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[14px] font-medium">Standard Depth</span>
              <Tooltip
                isTooltipOpen={roomTooltip.tooltip_1}
                tooltipMessage="Please select the standard depth"
              >
                <div
                  onMouseEnter={() =>
                    setRoomTooltip({
                      ...roomTooltip,
                      tooltip_1: true,
                    })
                  }
                  onMouseLeave={() =>
                    setRoomTooltip({
                      ...roomTooltip,
                      tooltip_1: false,
                    })
                  }
                >
                  <CircleHelp className="w-5 h-5 bg-green-600 text-white rounded-full cursor-pointer" />
                </div>
              </Tooltip>
            </div>
            <select
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              value={standardDepth}
              onChange={(e) => {
                let standardDepthVal = e.target.value as StandardDepth;
                if (
                  roomConfig.stall.adaStall &&
                  standardDepthVal > adaDepth &&
                  !layoutOption.startsWith("alcove")
                ) {
                  standardDepthVal = adaDepth;
                  setIsDepthExceed(true);
                }

                roomConfigHandler("StandardDepth", standardDepthVal);
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              {standardRoomDepthList?.map(
                (depthData: StandardDepth | string, idx: number) => (
                  <option value={depthData} key={idx}>
                    {depthData}&rdquo;
                  </option>
                )
              )}
            </select>
          </div>
        )}
        {(yesAlcove || yesAlcove2) && (
          <div className={`stall_box w-full`}>
            <div className="flex justify-between items-center mb-1">
              <span>Alcove Depth</span>
              <Tooltip
                isTooltipOpen={roomTooltip.tooltip_2}
                tooltipMessage="Please select the alcove depth"
              >
                <div
                  onMouseEnter={() =>
                    setRoomTooltip({
                      ...roomTooltip,
                      tooltip_2: true,
                    })
                  }
                  onMouseLeave={() =>
                    setRoomTooltip({
                      ...roomTooltip,
                      tooltip_2: false,
                    })
                  }
                >
                  <CircleHelp className="w-5 h-5 bg-green-600 text-white rounded-full cursor-pointer" />
                </div>
              </Tooltip>
            </div>

            <select
              className="bg-white h-[40px] w-[130px] border border-[#707070]"
              value={exceedAlcoveDepth}
              onChange={(e) => {
                setExceedAlcoveDepth(e.target.value as AlcoveDepth);
                dispatch(updateQuotationValue({ isQuote: true }));
              }}
            >
              <option value="90">90&rdquo;</option>
              <option value="92">92&rdquo;</option>
              <option value="94">94&rdquo;</option>
              <option value="96">96&rdquo;</option>
              <option value="98">98&rdquo;</option>
              <option value="100">100&rdquo;</option>
              <option value="102">102&rdquo;</option>
              <option value="104">104&rdquo;</option>
              <option value="106">106&rdquo;</option>
              <option value="108">108&rdquo;</option>
              <option value="110">110&rdquo;</option>
              <option value="112">112&rdquo;</option>
              <option value="114">114&rdquo;</option>
            </select>
          </div>
        )}
        {(noAlcove || yesAlcoveADA || noAlcove2 || yesAlcoveADA2) && (
          <div
            className={`stall_box w-full ${
              !roomConfig.stall.adaStall ? `pointer-event-none opacity-60` : ``
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span>ADA Depth</span>
              <Tooltip
                isTooltipOpen={roomTooltip.tooltip_3}
                tooltipMessage="Please select the ADA depth"
              >
                <div
                  onMouseEnter={() =>
                    setRoomTooltip({
                      ...roomTooltip,
                      tooltip_3: true,
                    })
                  }
                  onMouseLeave={() =>
                    setRoomTooltip({
                      ...roomTooltip,
                      tooltip_3: false,
                    })
                  }
                >
                  <CircleHelp className="w-5 h-5 bg-green-600 text-white rounded-full cursor-pointer" />
                </div>
              </Tooltip>
            </div>
            {yesAlcoveADA || yesAlcoveADA2 ? (
              <select
                className="bg-white h-[40px] w-[130px] border border-[#707070]"
                disabled={!roomConfig.stall.adaStall}
                value={exceedAdaDepth}
                onChange={(e) => {
                  setExceedAdaDepth(e.target.value as ADADepth);
                  dispatch(updateQuotationValue({ isQuote: true }));
                }}
              >
                <option value="112">112&rdquo;</option>
                <option value="114">114&rdquo;</option>
                <option value="116">116&rdquo;</option>
                <option value="118">118&rdquo;</option>
                <option value="120">120&rdquo;</option>
                <option value="122">122&rdquo;</option>
                <option value="124">124&rdquo;</option>
                <option value="126">126&rdquo;</option>
                <option value="128">128&rdquo;</option>
              </select>
            ) : (
              <select
                className="bg-white h-[40px] w-[130px] border border-[#707070]"
                disabled={!roomConfig.stall.adaStall}
                value={adaDepth}
                onChange={(e) => {
                  let adaDepthVal = e.target.value as ADADepth;
                  if (standardDepth > adaDepthVal) {
                    roomConfigHandler("StandardDepth", adaDepthVal);
                    setIsDepthExceed(true);
                  }
                  roomConfigHandler("AdaDepth", adaDepthVal);
                  dispatch(updateQuotationValue({ isQuote: true }));
                }}
              >
                {ADAroomDepthList?.map(
                  (depthData: ADADepth | string, idx: number) => (
                    <option value={depthData} key={idx}>
                      {depthData}&rdquo;
                    </option>
                  )
                )}
              </select>
            )}
          </div>
        )}

        {/* <div
          className={`stall_box w-full ${
            !roomConfig.stall.adaStall ? `pointer-event-none opacity-60` : ``
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span>ADA Toilet Position</span>
          </div>
          <select
            defaultValue={
              roomConfig.stall.adaToiletPosition ??
              roomConfig.stall.layout.layoutDirection
            }
            className="bg-white h-[40px] w-[130px] border border-[#707070]"
            onChange={(e) =>
              roomConfigHandler(
                "AdaToiletPosition",
                e.target.value as AdaToiletPosition
              )
            }
            disabled={!roomConfig.stall.adaStall}
          >
            <option value="Left">Left</option>
            <option value="Center">Center</option>
            <option value="Right">Right</option>
          </select>
        </div> */}
        <div className="stall_box w-full">
          <div className="flex justify-center items-center mb-1">
            <span>Overall Room Width</span>
          </div>
          <div className="flex items-center pt-2 font-bold text-xl justify-center">
            <p>{widthWithFraction + "”"}</p>
          </div>

          {/* <input
            className="bg-white h-[40px] w-[130px] border outline-none border-[#707070]"
            type="text"
            readOnly
            value={overallWidthVal + "”"}
            // onChange={(e) => {
            //   setOverallWidthVal(e.target.value as number | string);
            //   roomConfigHandler(
            //     "OverallRoomWidth",
            //     e.target.value as OverallRoomWidth
            //   );
            // }}
          /> */}
        </div>
      </div>
    </div>
    
  );
}
