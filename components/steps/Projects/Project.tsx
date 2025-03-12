"use client";
import React, { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Info } from "lucide-react";
import {
  changeRoomConfig,
  handleStepLoading,
  startOver,
  stepSubmit,
  updateNoOfStalls,
  updatePulsate,
  updateUrinalScreens,
} from "@/lib/slices/roomSlice";
import {
  fetchStepInputData,
  updateLoadingState,
  updateQuotationValue,
} from "@/lib/slices/stepSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { StepType } from "@/types/stepForm";
import { firstRadioList } from "@/constants/step";
import ErrorMessage from "@/utils/error/ErrorMessage";
import ProjectSkeleton from "@/components/skeletons/Projects/ProjectSkeleton";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Option from "@/components/ui/Option";
import Select from "@/components/ui/Select";
import NextStep from "@/components/stepButtons/NextStep";
import Modal from "@/components/ui/Modal";
import { startOverContact } from "@/lib/slices/contactSlice";

function Project() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathName=usePathname()
  const searchParams = useSearchParams();
  const newQuoteId = searchParams.get("new-quote");
  const { selectedRoom, rooms, loadingProjectButton } = useAppSelector(
    (state) => state.room
  );
  const { maxNumberOfStalls, loadingState, installationQuote, error } =
    useAppSelector((state) => state.step);
  const { title, materialQuote, hasUrinalScreens } =
    rooms[selectedRoom.roomIndex];
  const { noOfStalls, layout, adaStall } = rooms[selectedRoom.roomIndex].stall;
  // State for showing option to select Urinal Screens
  const [urinalScreenModal, setUrinalScreenModal] = useState(false);
  // When Urinal Screen Accepted
  const urinalScreenAcceptHandler = useCallback(() => {
    dispatch(updateUrinalScreens(true));
    router.push("/select-urinal-screens");
  }, []);
  // When Urinal Screen Declined
  const urinalScreenDeclineHandler = useCallback(() => {
    dispatch(updateUrinalScreens("not-selected"));
    router.push("/select-a-layout");
  }, []);

  // Loading state...
  const [isMounted, setIsMounted] = useState(true);
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValidating, errors },
  } = useForm<StepType>({
    defaultValues: {
      restroom_name: "",
      stall_number: "",
      stall_depth: "",
      interest: undefined,
    },
  });
useEffect(()=>{
  if(newQuoteId!==null) {
    dispatch(startOver());
    dispatch(startOverContact(""))
    setTimeout(()=>{
      router.replace(pathName,{scroll:true})
    },1000)
  }
},[newQuoteId])
  useEffect(() => {
    if(newQuoteId===null) {
      dispatch(
        fetchStepInputData({
          reset: reset,
          formData: {
            restroom_name: title,
            stall_number: noOfStalls,
            interest: materialQuote,
          },
          stepValue: ["project", "layout", "measurement"],
        })
      );
  
      dispatch(handleStepLoading({ stepName: "project", isLoading: false }));
      setIsMounted(false);
      return () => {
        dispatch(updateLoadingState());
      };
    }
  
  }, [dispatch,newQuoteId]);
  useEffect(() => {
    if (error) {
      reset({
        restroom_name: title,
        stall_number: noOfStalls,
        interest: materialQuote,
      });
    }
  }, [error]);
  // Form Handler...
  const handleFirstStepData: SubmitHandler<StepType> = useCallback((data) => {
    dispatch(handleStepLoading({ stepName: "project", isLoading: true }));
    setTimeout(() => {
      dispatch(stepSubmit({ stepName: "project", formData: data }));
      // If urinalScreens is false
      dispatch(handleStepLoading({ stepName: "project", isLoading: false }));
      if (!hasUrinalScreens) setUrinalScreenModal(true);
      else {
        // If urinalScreens is not selected
        if (hasUrinalScreens === "not-selected") {
          setUrinalScreenModal(true);
        } else router.push("/select-urinal-screens"); // If urinalScreens has already been added
      }
    }, 1000);
  }, []);
  if (isMounted || loadingState) {
    return <ProjectSkeleton />;
  }
  return (
    <form className="form-card" onSubmit={handleSubmit(handleFirstStepData)}>
      <Label className="fieldlabels text-[20px] mt-[27px] block mb-[15px]">
        Room Name
      </Label>
      <Input
        type="text"
        register={register}
        error={errors.restroom_name}
        placeholder="Ex: Men’s Restroom 1"
        onChange={(e) => {
          setValue("restroom_name", e.target.value);
          dispatch(updateQuotationValue({ isQuote: true }));
        }}
        patternRegex={/^.{1,20}$/}
        isRequired={false}
        fieldName="restroom_name"
        patternMessage="Room name must be at most 20 characters"
        className="border border-[rgb(112,112,112)] h-[47px] bg-white"
      />
      <div className="sameLine mt-4 mb-[15px]">
        <Label className="fieldlabels text-[20px] block">
          Number of Stalls<span>*</span>
        </Label>
        <Select
          className="bg-white h-[47px] w-full custom_select"
          message="Stall number is required*"
          error={errors.stall_number}
          register={register}
          onChange={(e) => {
            dispatch(updateNoOfStalls(+e.target.value));
            dispatch(updatePulsate({ pulsateBool: true }));
            dispatch(updateQuotationValue({ isQuote: true }));
            if (layout.layoutOption.startsWith("alcove") && adaStall) {
              dispatch(
                changeRoomConfig({ config: "StandardDepth", value: "62" })
              );
              dispatch(changeRoomConfig({ config: "AdaDepth", value: "112" }));
            }
            if (layout.layoutOption.startsWith("alcove") && !adaStall) {
              dispatch(
                changeRoomConfig({ config: "StandardDepth", value: "62" })
              );
              dispatch(changeRoomConfig({ config: "AdaDepth", value: "62" }));
              dispatch(
                changeRoomConfig({ config: "AlcoveDepth", value: "98" })
              );
            }
            if (!layout.layoutOption.startsWith("alcove") && !adaStall) {
              dispatch(
                changeRoomConfig({ config: "StandardDepth", value: "62" })
              );
              dispatch(changeRoomConfig({ config: "AdaDepth", value: "62" }));
            }
            if (!layout.layoutOption.startsWith("alcove") && adaStall) {
              dispatch(
                changeRoomConfig({ config: "StandardDepth", value: "62" })
              );
              dispatch(changeRoomConfig({ config: "AdaDepth", value: "62" }));
            }
            // dispatch(changeRoomConfig({ config:"StandardDepth", value:"62" }))
            // dispatch(changeRoomConfig({ config:"AdaDepth", value:"62" }))
          }}
          fieldName="stall_number"
          defaultValue={noOfStalls}
        >
          {!loadingState ? (
            <React.Fragment>
              <Option value="" disabled={true}>
                Please select
              </Option>
              {maxNumberOfStalls?.map((stallVal: string, idx: number) => (
                <Option value={stallVal} key={idx}>
                  {stallVal}
                </Option>
              ))}
              {/* <Option value="8">8</Option>
              <Option value="9">9</Option>
              <Option value="10">10</Option> */}
            </React.Fragment>
          ) : (
            <Option value="" disabled={true}>
              Loading stalls...
            </Option>
          )}
        </Select>
      </div>
      {installationQuote === "Yes" && (
        <div className="checkbox_area mb-[28px] text-center md:text-left">
          <Label className="fieldlabels text-[16px] md:text-[20px] mt-[27px] block mb-[15px]">
            Are you interested in a turn-key solution? We offer installation
            services! Click 'yes' to receive a quote.
            <span>*</span>
          </Label>
          <div className="radio_check flex items-center gap-x-24 justify-center md:justify-start">
            {firstRadioList?.map((radioData) => (
              <div className="flex items-center" key={radioData.title}>
                <Input
                  type="radio"
                  fieldName={radioData.name}
                  id={radioData.title}
                  message="Please choose an option*"
                  error={errors.interest}
                  value={radioData.radioId}
                  register={register}
                />
                <Label htmlFor={radioData.title}>{radioData.title}</Label>
              </div>
            ))}
          </div>
          <div className={errors.interest ? "mt-2 md:mt-0" : ""}>
            <ErrorMessage error={errors.interest} />
          </div>
        </div>
      )}
      {urinalScreenModal && (
        <Modal
          confirmHandler={urinalScreenAcceptHandler}
          cancelHandler={urinalScreenDeclineHandler}
          setModal={setUrinalScreenModal}
          confirmText="Yes"
          cancelText="No thank you"
          textCenter
        >
          <Info className="mx-auto mb-4 text-gray-400 w-12 h-12" />
          <h3 className="text-xl font-bold mb-5">
            Would you like to add Urinal Screens?
          </h3>
        </Modal>
      )}
      <div className="mobile_btn mobile_btn_first sc_btn_po md:flex md:justify-end">
        <NextStep
          isDisabled={isSubmitting || isValidating}
          type="submit"
          loadingButton={loadingProjectButton}
        />
      </div>
    </form>
  );
}
export default Project;
