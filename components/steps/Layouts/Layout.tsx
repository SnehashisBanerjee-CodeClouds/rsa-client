"use client";
import LayoutSkeleton from "@/components/skeletons/Layouts/LayoutSkeleton";
import NextStep from "@/components/stepButtons/NextStep";
import PrevStep from "@/components/stepButtons/PrevStep";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { secondRadioList } from "@/constants/step";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  changeLayout,
  changeRoomConfig,
  changeStallConfig,
  handleStepLoading,
  stepSubmit,
  toggleAdaStall,
  updatePulsate,
} from "@/lib/slices/roomSlice";
import { updateQuotationValue } from "@/lib/slices/stepSlice";
import { LayoutOption } from "@/types/model";
import { LayoutObject, StepType } from "@/types/stepForm";
import ErrorMessage from "@/utils/error/ErrorMessage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Layout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedRoom, rooms, loadingLayoutButton } = useAppSelector(
    (state) => state.room
  );
  const { layouts, showHandicapStall } = useAppSelector((state) => state.step);
  const {
    adaStall,
    layout: { layoutOption },
  } = rooms[selectedRoom.roomIndex].stall;
  const { hasUrinalScreens } = rooms[selectedRoom.roomIndex];
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<StepType>({
    defaultValues: {
      layoutId: "",
      interest2: undefined,
    },
  });
  const [selectedImage, setSelectedImage] = useState(watch("layoutId"));
  const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      reset({
        layoutId: layoutOption,
        interest2: adaStall,
      });
      dispatch(handleStepLoading({ stepName: "project", isLoading: false }));
      setIsMounted(false);
      setSelectedImage(layoutOption);
    }, 1000);
  }, [dispatch]);
  const handleSecondStepData = useCallback(() => {
    dispatch(handleStepLoading({ stepName: "layout", isLoading: true }));
    setTimeout(() => {
      dispatch(stepSubmit({ stepName: "layout" }));
      router.push("/calculate-measurements");
    }, 1000);
  }, []);
  if (isMounted) {
    return <LayoutSkeleton />;
  }
  return (
    <form
      className="layouttwo_area pt-2"
      onSubmit={handleSubmit(handleSecondStepData)}
    >
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-20 xl:gap-x-4 gap-y-10 layout_select">
        {layouts.map((layout: LayoutObject) => (
          <li key={layout.id}>
            <Label
              className={`lyout_box bg-white h-[120px] flex items-center justify-center mb-[16px] 2xl:p-0 p-4 rounded-md ${
                selectedImage === layout.layoutId
                  ? `border-4 border-[#3FAB3B]`
                  : `border border-[#707070]`
              }`}
              htmlFor={layout.layoutId}
            >
              <Image
                src={layout.src}
                alt="pic"
                loading="lazy"
                width={74.43}
                height={74.13}
                // className="h-full w-auto"
              />
            </Label>
            <span className="text-center text-[14px] block text-[#484848]">
              <Input
                type="radio"
                fieldName="layoutId"
                id={layout.layoutId}
                message="Must choose an option*"
                value={layout.layoutId}
                register={register}
                onChange={(e) => {
                  dispatch(changeLayout(e.target.value as LayoutOption));
                  setSelectedImage(e.target.value);
                  dispatch(updatePulsate({ pulsateBool: true }));
                  dispatch(updateQuotationValue({ isQuote: true }));
                  if (e.target.value.startsWith("alcove") && adaStall) {
                    dispatch(
                      changeRoomConfig({ config: "StandardDepth", value: "62" })
                    );
                    dispatch(
                      changeRoomConfig({ config: "AdaDepth", value: "112" })
                    );
                  }
                  if (e.target.value.startsWith("alcove") && !adaStall) {
                    dispatch(
                      changeRoomConfig({ config: "StandardDepth", value: "62" })
                    );
                    dispatch(
                      changeRoomConfig({ config: "AdaDepth", value: "62" })
                    );
                    dispatch(
                      changeRoomConfig({ config: "AlcoveDepth", value: "98" })
                    );
                  }
                  if (!e.target.value.startsWith("alcove") && !adaStall) {
                    dispatch(
                      changeRoomConfig({ config: "StandardDepth", value: "62" })
                    );
                    dispatch(
                      changeRoomConfig({ config: "AdaDepth", value: "62" })
                    );
                  }
                  if (!e.target.value.startsWith("alcove") && adaStall) {
                    dispatch(
                      changeRoomConfig({ config: "StandardDepth", value: "62" })
                    );
                    dispatch(
                      changeRoomConfig({ config: "AdaDepth", value: "62" })
                    );
                  }
                }}
                className="hidden"
              />
              {layout.name}
            </span>
          </li>
        ))}
      </ul>
      <ErrorMessage error={errors.layoutId} />
      {showHandicapStall === "Yes" && (
        <div className="checkbox_area flex flex-col md:flex-row md:justify-between mb-[28px]">
          <Label className="fieldlabels text-[16px] md:text-[20px] mt-[27px] block mb-[15px] lg:text-left text-center">
            Does your layout include a handicap accessible stall?<span>*</span>
          </Label>
          <div className="radio_check flex items-center gap-x-20 text-center justify-center lg:justify-start">
            {secondRadioList?.map((radioData) => (
              <div className="flex items-center" key={radioData.title}>
                <Input
                  type="radio"
                  fieldName="interest2"
                  message="Must choose an option*"
                  id={radioData.title}
                  value={radioData.radioId}
                  error={errors.interest2}
                  checked={radioData.radioId === adaStall}
                  onChange={(e) => {
                    dispatch(toggleAdaStall());
                    dispatch(updatePulsate({ pulsateBool: true }));
                    dispatch(updateQuotationValue({ isQuote: true }));
                    if (
                      layoutOption.startsWith("alcove") &&
                      e.target.value === "true"
                    ) {
                      dispatch(
                        changeRoomConfig({
                          config: "StandardDepth",
                          value: "62",
                        })
                      );
                      dispatch(
                        changeRoomConfig({ config: "AdaDepth", value: "112" })
                      );
                    }
                    if (
                      layoutOption.startsWith("alcove") &&
                      e.target.value === "false"
                    ) {
                      dispatch(
                        changeRoomConfig({
                          config: "StandardDepth",
                          value: "62",
                        })
                      );
                      dispatch(
                        changeRoomConfig({ config: "AdaDepth", value: "62" })
                      );
                      dispatch(
                        changeRoomConfig({ config: "AlcoveDepth", value: "98" })
                      );
                    }
                    if (
                      !layoutOption.startsWith("alcove") &&
                      e.target.value === "false"
                    ) {
                      dispatch(
                        changeRoomConfig({
                          config: "StandardDepth",
                          value: "62",
                        })
                      );
                      dispatch(
                        changeRoomConfig({ config: "AdaDepth", value: "62" })
                      );
                    }
                    if (
                      !layoutOption.startsWith("alcove") &&
                      e.target.value === "true"
                    ) {
                      dispatch(
                        changeRoomConfig({
                          config: "StandardDepth",
                          value: "62",
                        })
                      );
                      dispatch(
                        changeRoomConfig({ config: "AdaDepth", value: "62" })
                      );
                    }
                  }}
                  register={register}
                />
                <Label htmlFor={radioData.title}>{radioData.title}</Label>
              </div>
            ))}
          </div>
          <ErrorMessage error={errors.interest2} />
        </div>
      )}
      <div className="mobile_btn sc_btn_po md:flex md:justify-between md:items-center">
        <PrevStep hasUrinalScreen={hasUrinalScreens} />
        <NextStep type="submit" loadingButton={loadingLayoutButton} />
      </div>
    </form>
  );
}

export default Layout;
