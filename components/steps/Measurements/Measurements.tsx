"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  changeStallConfig,
  changeSelectedStall,
  stepSubmit,
  changeRoomConfig,
  handleStepLoading,
} from "@/lib/slices/roomSlice";
import {
  StallConfigOption,
  StallWidth,
  DoorOpening,
  DoorSwing,
  RoomConfigOption,
  AdaToiletPosition,
  StallConfig,
  OverallRoomWidth,
  StallADAWidth,
  StandardDepth,
  ADADepth,
  StallFraction,
  AlcoveDepth,
} from "@/types/model";
import StallConfigSkeleton from "@/components/skeletons/Measurements/StallConfigSkeleton";
import StallConfigurations from "@/components/steps/Measurements/StallConfigurations";
import RoomConfigurations from "@/components/steps/Measurements/RoomConfigurations";
import RoomOptions from "@/components/steps/Measurements/RoomOptions";
import NextStep from "@/components/stepButtons/NextStep";
import PrevStep from "@/components/stepButtons/PrevStep";
import { current } from "@reduxjs/toolkit";

export default function Measurements() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    selectedRoom: { roomIndex },
    rooms,
    loadingMeasurementButton,
  } = useAppSelector((state) => state.room);
  const {
    doorSwingOptions,
    stallWidthList,
    stallADAWidthList,
    standardRoomDepthList,
    ADAroomDepthList,
    stallADADoorOpening,
    stallDoorOpening,
    maxRoomNumber,
  } = useAppSelector((state) => state.step);
  const {
    stallConfig,
    overallRoomWidth,
    standardDepth,
    adaDepth,
    alcoveDepth,
    adaStall,
    noOfStalls,
    layout: { layoutOption },
  } = rooms[roomIndex].stall;
  const [isWidthExceed, setIsWidthExceed] = useState<boolean>(false);
  const [isDepthExceed, setIsDepthExceed] = useState<boolean>(false);
  const [isAlcoveError, setIsAlcoveError] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(true);
  const [exceedStandardDepth, setExceedStandardDepth] =
    useState<StandardDepth>("62");
  const [exceedAlcoveDepth, setExceedAlcoveDepth] = useState<AlcoveDepth>("98");
  const [exceedAdaDepth, setExceedAdaDepth] = useState<ADADepth>("112");
  const [exceedDoorOpening, setExceedDoorOpening] = useState<DoorOpening>("22");
  // Checking is required to get rid of Hydration error
  useEffect(() => {
    setIsMounted(false);
    if (adaStall) {
      setExceedDoorOpening("36" as DoorOpening);
    } else {
      setExceedDoorOpening("22" as DoorOpening);
    }
    dispatch(handleStepLoading({ stepName: "measurements", isLoading: false }));
  }, [dispatch, adaStall]);
  useEffect(() => {
    if (isDepthExceed) {
      const debounce = setTimeout(() => setIsDepthExceed(false), 5000);

      return () => clearTimeout(debounce);
    }
  }, [isDepthExceed]);
  // Room Config Handler
  const totalWidthOptions = useMemo(() => {
    const widthAccCalc = stallConfig
      .reduce(
        (
          acc: Array<StallWidth | StallADAWidth | undefined>,
          curr: StallConfig
        ) => {
          if (curr.stallWidth) {
            acc.push(curr.stallWidth);
          }
          return acc;
        },
        []
      )
      .reduce((acc: number, curr: StallWidth | StallADAWidth | undefined) => {
        if (curr) {
          acc += +curr;
        }
        return acc;
      }, 0);
    return widthAccCalc;
  }, [stallConfig]);
  const widthFractionCalc = useMemo(() => {
    const widthFrac = stallConfig
      .reduce((acc: Array<StallFraction | string>, curr: StallConfig) => {
        if (curr.stallFraction) {
          let newVal =
            curr.stallFraction !== "0"
              ? Math.abs(
                  Number(curr.stallFraction.split("/")[0]) /
                    Number(curr.stallFraction.split("/")[1])
                )
              : curr.stallFraction;
          acc.push(newVal.toString());
        }
        return acc;
      }, [])
      .reduce((acc: number, curr: string) => {
        if (curr) {
          acc += +curr;
        }
        return acc;
      }, 0);
    return widthFrac.toFixed(2);
  }, [stallConfig]);
  // Checking wheather total stalls width exceeds room width //
  const isStallWidthExceed = useMemo(() => {
    let errorStr;

    if (totalWidthOptions > +overallRoomWidth) {
      errorStr =
        "Stall widths exceed the overall room width. Please adjust stall widths.";
      setIsWidthExceed(true);
    } else {
      errorStr = "";
      setIsWidthExceed(false);
    }

    return errorStr;
  }, [overallRoomWidth, totalWidthOptions]);
  const roomConfigHandler = useCallback(
    (
      config: RoomConfigOption,
      value:
        | AdaToiletPosition
        | OverallRoomWidth
        | StandardDepth
        | ADADepth
        | number
        | string
    ) => dispatch(changeRoomConfig({ config, value })),
    []
  );
  const stallConfigHandler = useCallback(
    (
      config: StallConfigOption,
      stallId: number,
      value:
        | StallWidth
        | DoorOpening
        | DoorSwing
        | StallADAWidth
        | StallFraction
    ) => dispatch(changeStallConfig({ config, stallId, value })),
    []
  );
  const isRoomDepthExceed = useMemo(() => {
    let errorStr;
    let doorPad = 3;
    // const firstStall=stallConfig[0].doorOpening
    let doorWidth = 27;
    if (layoutOption.startsWith("alcove") && !adaStall) {
      if (exceedDoorOpening) {
        doorPad =
          (+exceedAlcoveDepth - +exceedStandardDepth - +exceedDoorOpening) / 2;
        if (doorPad < 3) doorPad = 2.5;
        if (doorPad > 7) doorPad = 7;
        // ...
        doorWidth = +exceedDoorOpening + doorPad * 2;
      }

      if (+exceedStandardDepth + doorWidth > +exceedAlcoveDepth) {
        errorStr = `Please adjust the alcove depth by ${
          +exceedStandardDepth + doorWidth - +exceedAlcoveDepth + 1
        } inches`;

        setIsAlcoveError(true);
      } else {
        errorStr = ``;
        roomConfigHandler("StandardDepth", exceedStandardDepth);
        roomConfigHandler("AlcoveDepth", exceedAlcoveDepth);
        stallConfigHandler("DoorOpening", 0, exceedDoorOpening);
        setIsAlcoveError(false);
      }
    }
    if (layoutOption.startsWith("alcove") && adaStall) {
      if (exceedDoorOpening) {
        doorPad =
          (+exceedAdaDepth - +exceedStandardDepth - +exceedDoorOpening) / 2;
        if (doorPad < 3) doorPad = 2.5;
        if (doorPad > 7) doorPad = 7;
        doorWidth = +exceedDoorOpening + doorPad * 2;
        if (+exceedStandardDepth + doorWidth > +exceedAdaDepth) {
          errorStr = `Please adjust the ada depth by ${
            +exceedStandardDepth + doorWidth - +exceedAdaDepth + 1
          } inches`;

          setIsAlcoveError(true);
        } else {
          errorStr = ``;
          roomConfigHandler("StandardDepth", exceedStandardDepth);
          roomConfigHandler("AdaDepth", exceedAdaDepth);
          stallConfigHandler("DoorOpening", 0, exceedDoorOpening);
          setIsAlcoveError(false);
        }
      }
    }

    return errorStr;
  }, [
    exceedStandardDepth,
    exceedAlcoveDepth,
    layoutOption,
    adaStall,
    exceedAdaDepth,
    exceedDoorOpening,
  ]);
  // Stall Config Handler
  useEffect(() => {
    if (isAlcoveError) {
      document
        .getElementById("alcove_div")
        ?.scrollIntoView({ behavior: "smooth" });
    }

    if (isDepthExceed) {
      document
        .getElementById("depth_div")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    // if (isWidthExceed) {
    //   document
    //   .getElementById("width_div")
    //   ?.scrollIntoView({ behavior: "smooth" });
    // }
  }, [isAlcoveError, isDepthExceed]);

  // Select Stall Hanlder
  const selectStallHandler = useCallback(
    (stallId: number) => dispatch(changeSelectedStall({ stallId })),
    []
  );

  const submitForm = useCallback(() => {
    dispatch(handleStepLoading({ stepName: "measurements", isLoading: true }));
    setTimeout(() => {
      dispatch(stepSubmit({ stepName: "measurements" }));
      router.push("/share-contact-details");
    }, 1000);
  }, []);
  if (isMounted) {
    return Array.from({ length: 7 }).map((_, idx) => (
      <StallConfigSkeleton key={idx} idx={idx} />
    ));
  }
  return (
    <React.Fragment>
      <div className="stepthree_area">
        <div className="calculate_heading">
          <div id="accordion-collapse" data-accordion="collapse">
            {stallConfig.map((stall, idx: number) => (
              <StallConfigurations
                key={idx}
                isAda={stall.type === "ada"}
                stallId={idx}
                stallNo={idx + 1}
                stallConfig={stall}
                doorSwingOptions={doorSwingOptions}
                stallWidthList={stallWidthList}
                stallADAWidthList={stallADAWidthList}
                stallADADoorOpening={stallADADoorOpening}
                stallDoorOpening={stallDoorOpening}
                stallConfigHandler={stallConfigHandler}
                selectStallHandler={selectStallHandler}
                exceedDoorOpening={exceedDoorOpening}
                isAlcoveError={isAlcoveError}
                layoutOption={layoutOption}
                setExceedDoorOpening={setExceedDoorOpening}
              />
            ))}
            <RoomConfigurations
              roomConfig={rooms[roomIndex]}
              roomConfigHandler={roomConfigHandler}
              totalWidth={overallRoomWidth}
              totalWidthVal={totalWidthOptions}
              totalFraction={widthFractionCalc}
              widthError={isWidthExceed}
              standardDepth={standardDepth}
              adaDepth={adaDepth}
              alcoveDepth={alcoveDepth}
              standardRoomDepthList={standardRoomDepthList}
              ADAroomDepthList={ADAroomDepthList}
              exceedStandardDepth={exceedStandardDepth}
              setExceedStandardDepth={setExceedStandardDepth}
              exceedAlcoveDepth={exceedAlcoveDepth}
              setExceedAlcoveDepth={setExceedAlcoveDepth}
              exceedAdaDepth={exceedAdaDepth}
              setExceedAdaDepth={setExceedAdaDepth}
              setIsDepthExceed={setIsDepthExceed}
              layoutOption={layoutOption}
              isAlcoveError={isAlcoveError}
            />
            {isWidthExceed && (
              <div
                className="red_alart flex items-center justify-start mt-[21px]"
                id="width_div"
              >
                <Image
                  src="/assets/images/red_alart.svg"
                  alt="pic"
                  loading="lazy"
                  width={34.87}
                  height={34.87}
                />

                <h5 className="text-[#E80000] text-[17px] font-bold ml-[14px]">
                  {isStallWidthExceed}
                </h5>
              </div>
            )}
            {isDepthExceed && (
              <div
                className="red_alart flex items-center justify-start mt-[21px]"
                id="depth_div"
              >
                <Image
                  src="/assets/images/red_alart.svg"
                  alt="pic"
                  loading="lazy"
                  width={34.87}
                  height={34.87}
                />

                <h5 className="text-[#E80000] text-[17px] font-bold ml-[14px]">
                  Standard room depth exceeds the ADA room depth. Please adjust
                  room depths.
                </h5>
              </div>
            )}
            {isAlcoveError && (
              <div
                className="red_alart flex items-center justify-start mt-[21px]"
                id="alcove_div"
              >
                <Image
                  src="/assets/images/red_alart.svg"
                  alt="pic"
                  loading="lazy"
                  width={34.87}
                  height={34.87}
                />

                <h5 className="text-[#E80000] text-[17px] font-bold ml-[14px]">
                  {isRoomDepthExceed}
                </h5>
              </div>
            )}

            <div className="contactDetails contactDetails-step-3 ">
              <h2>Questions? Contact Us</h2>
              <p className="phoneHolder"><a href="tel:1-8448178255">1-844-81-STALL</a></p>
              <p className="emailHolder"><a href="mailto:service@restroomstallsandall.com">service@restroomstallsandall.com</a></p>
            </div>
          </div>
        </div>
      </div>
      

      <RoomOptions
        isStallWidthExceed={isWidthExceed}
        isRoomDepthExceed={isDepthExceed || isAlcoveError}
        maxRoomNumber={maxRoomNumber}
      />
      <div className="mobile_btn">
        <PrevStep />
        <NextStep
          isDisabled={isWidthExceed || isDepthExceed || isAlcoveError}
          type="button"
          submitForm={submitForm}
          loadingButton={loadingMeasurementButton}
        />
      </div>
    </React.Fragment>
  );
}
