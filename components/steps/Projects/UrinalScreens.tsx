"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  handleStepLoading,
  resetUrinalScreen,
  stepSubmit,
  updateNoOfUrinalScreens,
  updateUrinalScreens,
  updateUrinalScreensDepth,
} from "@/lib/slices/roomSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";

import ProjectSkeleton from "@/components/skeletons/Projects/ProjectSkeleton";
import Label from "@/components/ui/Label";
import Option from "@/components/ui/Option";
import Select from "@/components/ui/Select";
import NextStep from "@/components/stepButtons/NextStep";
import PrevStep from "@/components/stepButtons/PrevStep";
import { StepType } from "@/types/stepForm";
import { screenDepthList } from "@/constants/step";
import { UrinalScreenDepth } from "@/types/model";
import useDeviceDetection from "@/utils/useDeviceDetection";

export default function UrinalScreens() {
  const device = useDeviceDetection();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedRoom, rooms, loadingProjectButton } = useAppSelector(
    (state) => state.room
  );
  const { maxNumberOfScreens, loadingState } = useAppSelector(
    (state) => state.step
  );
  const { title, materialQuote, hasUrinalScreens, urinalScreen } =
    rooms[selectedRoom.roomIndex];
  const { noOfUrinalScreens, urinalScreensDepth } = urinalScreen;
  // Loading state...
  const [isLoading, setIsLoading] = useState(true);
  const {
    reset,

    register,
    handleSubmit,
    formState: { isSubmitting, isValidating, errors },
  } = useForm<StepType>({
    defaultValues: {
      restroom_name: "",
      stall_number: "",
      screens_number: "",
      interest: undefined,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        restroom_name: title,
        screens_number: noOfUrinalScreens,
        interest: materialQuote,
      });
      dispatch(handleStepLoading({ stepName: "project", isLoading: false }));
      setIsLoading(false);
    }, 1000);
  }, [dispatch]);

  // Form Handler...
  const handleFirstStepData: SubmitHandler<StepType> = useCallback((data) => {
    dispatch(handleStepLoading({ stepName: "project", isLoading: true }));
    setTimeout(() => {
      dispatch(stepSubmit({ stepName: "project", formData: data }));
      // Redirect...
      router.push("/select-a-layout");
    }, 1000);
  }, []);
  // Skip handler
  const handleSkip = useCallback(() => {
    dispatch(updateUrinalScreens("not-selected"));

    setTimeout(() => {
      dispatch(resetUrinalScreen());
      router.push("/select-a-layout");
    }, 1000);
    // Navigate to the next step or a relevant route
  }, []);

  // Checking for Urinal Screen Option
  // useEffect(() => {
  //   if (!hasUrinalScreens || hasUrinalScreens === "not-selected")
  //     router.replace("/");
  // }, [hasUrinalScreens]);

  if (isLoading || !hasUrinalScreens || hasUrinalScreens === "not-selected") {
    return <ProjectSkeleton />;
  }
  return (
    <form className="form-card" onSubmit={handleSubmit(handleFirstStepData)}>
      <Label className="fieldlabels text-[20px] mt-[27px] block mb-[15px]">
        How many urinal screens?
      </Label>
      <Select
        className="bg-white h-[47px] w-full custom_select"
        message="Screen number is required*"
        error={errors.screens_number}
        register={register}
        onChange={(e) =>
          dispatch(
            updateNoOfUrinalScreens({ val: +e.target.value, device: device })
          )
        }
        fieldName="screens_number"
        defaultValue={noOfUrinalScreens}
      >
        <Option value="" disabled={true}>
          Please select
        </Option>
        {maxNumberOfScreens?.map((screensVal: string, idx: number) => (
          <Option value={screensVal} key={idx}>
            {screensVal}
          </Option>
        ))}
        {/* <Option value="8">8</Option>
        <Option value="9">9</Option>
        <Option value="10">10</Option>
        <Option value="11">11</Option>
        <Option value="12">12</Option>
        <Option value="13">13</Option>
        <Option value="14">14</Option>
        <Option value="15">15</Option>
        <Option value="16">16</Option>
        <Option value="17">17</Option>
        <Option value="18">18</Option>
        <Option value="19">19</Option>
        <Option value="20">20</Option> */}
      </Select>
      <Label className="fieldlabels text-[20px] mt-[27px] block mb-[15px]">
        How much urinal screens depth?
      </Label>
      <Select
        className="bg-white h-[47px] w-full custom_select"
        message="Screen depth is required*"
        error={errors.stall_depth}
        register={register}
        onChange={(e) => dispatch(updateUrinalScreensDepth(+e.target.value))}
        fieldName="stall_depth"
        defaultValue={urinalScreensDepth}
      >
        <Option value="" disabled={true}>
          Please select
        </Option>
        {screenDepthList?.map(
          (screensDepth: UrinalScreenDepth | string, idx: number) => (
            <Option value={screensDepth} key={idx}>
              {screensDepth}&rdquo;
            </Option>
          )
        )}
      </Select>
      <div className="mobile_btn">
        <PrevStep />
        <button
          name="Skip"
          type="button"
          onClick={handleSkip}
          className="skip_btn"
        >
          Skip
        </button>
        <NextStep
          isDisabled={isSubmitting || isValidating}
          type="submit"
          loadingButton={loadingProjectButton}
        />
      </div>
    </form>
  );
}
