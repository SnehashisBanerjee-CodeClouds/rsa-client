"use client";
import ContactSkeleton from "@/components/skeletons/Contacts/ContactSkeleton";
import NextStep from "@/components/stepButtons/NextStep";
import PrevStep from "@/components/stepButtons/PrevStep";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { updateContact } from "@/lib/slices/contactSlice";
import {
  handleStepLoading,
  stepSubmit,
  updateStep,
} from "@/lib/slices/roomSlice";
import {
  updateMaterialRoute,
  updateQuotationValue,
} from "@/lib/slices/stepSlice";
import { ContactDetailsType } from "@/types/stepForm";
import axiosInstance from "@/utils/axios";
import ErrorMessage from "@/utils/error/ErrorMessage";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Contacts() {
  const router = useRouter();
  // dispatch action//
  const dispatch = useAppDispatch();
  const { first_name, last_name, email, phone_number, project_name } =
    useAppSelector((state) => state.contacts);
  const { isQuotationCreate, materialRoute, layouts } = useAppSelector(
    (state) => state.step
  );
  const { loadingContactButton, rooms } = useAppSelector((state) => state.room);
  const [isLoading, setIsLoading] = useState(true);
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      project_name: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    setTimeout(() => {
      reset({
        project_name: project_name,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
      });
      dispatch(handleStepLoading({ stepName: "contact", isLoading: false }));
      setIsLoading(false);
    }, 1000);
  }, [dispatch]);

  const handleContactData = useCallback(async (data: ContactDetailsType) => {
    dispatch(handleStepLoading({ stepName: "contact", isLoading: true }));
    dispatch(stepSubmit({ stepName: "contacts" }));
    dispatch(
      updateContact({
        project_name: data.project_name,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone_number: data.phone_number,
      })
    );
    const roomPayload = rooms.map(
      ({ stall, urinalScreen, hasUrinalScreens, ...rest }) => {
        return {
          ...rest,
          hasUrinalScreens: hasUrinalScreens === "not-selected" ? false : true,
          image_3D: `${process.env.NEXT_PUBLIC_API_BASE}/uploads/images/room3D.png`,
          image_2D: stall.canvas2DImage,
          stall: {
            type: handleStallType(stall.layout.layoutOption),
            noOfStalls: stall.noOfStalls,
            adaStall: stall.adaStall,
            stallColor: stall.stallColor,
            stallColorName: stall.stallColorName,
            wallTexture: stall.wallTexture,
            wallTextureName: stall.wallTextureName,
            overallRoomWidth: (
              +stall.overallRoomWidth + +stall.overallRoomFraction
            ).toString(),
            standardDepth: stall.standardDepth,
            alcoveDepth: stall.alcoveDepth,
            adaDepth: stall.adaDepth,
            stallConfig: stall.stallConfig.map(
              ({ isOpened, doorSwing, ...rest }) => {
                return {
                  ...rest,
                  doorSwing: {
                    key: doorSwing,
                    name: handleDoorSwingName(doorSwing),
                  },
                };
              }
            ),
            layout: {
              layoutDirection: stall.layout.layoutDirection,
              layoutOption: stall.layout.layoutOption,
              layoutName: layouts.filter(
                (data) => data.layoutId === stall.layout.layoutOption
              )[0].name,
            },
            cameraControls: stall.cameraControls,
          },
          urinalScreen:
            hasUrinalScreens === true
              ? {
                  noOfUrinalScreens: urinalScreen.noOfUrinalScreens,
                  cameraControls: urinalScreen.cameraControls,
                  urinal_3D: `${process.env.NEXT_PUBLIC_API_BASE}/uploads/images/urinal3D.png`,
                  urinal_2D: urinalScreen.screens2DImage,
                  urinalScreenConfig: urinalScreen.urinalScreenConfig.map(
                    ({ isOpened, ...rest }) => {
                      return {
                        ...rest,
                        screenDepth: urinalScreen.urinalScreensDepth,
                      };
                    }
                  ),
                }
              : {},
        };
      }
    );
    const updatePayload = roomPayload.map((data, idx) => {
      if (data.stall.adaStall) {
        return {
          ...data,
          stall: Object.assign(data.stall, {
            adaDepth: !data.stall.layout.layoutOption.startsWith("alcove")
              ? rooms[idx].stall.adaDepth
              : (+rooms[idx].stall.adaDepth + 50).toString(),
          }),
        };
      }
      if (
        !data.stall.adaStall &&
        data.stall.layout.layoutOption.startsWith("alcove")
      ) {
        return {
          ...data,
          stall: Object.assign(data.stall, {
            alcoveDepth: (+rooms[idx].stall.standardDepth + 36).toString(),
          }),
        };
      }
      if (
        !data.stall.adaStall &&
        !data.stall.layout.layoutOption.startsWith("alcove")
      ) {
        return { ...data };
      }
    });
    const finalPayload = {
      isTest: true,
      project_name: data.project_name,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      rooms: updatePayload,
    };
    if (isQuotationCreate) {
      await axiosInstance
        .post("/quotation/create", finalPayload)
        .then((res) => {
          if (res.data.status === true) {
            dispatch(updateQuotationValue({ isQuote: false }));
            dispatch(
              updateMaterialRoute({
                routeVal: `/choose-materials?id=${res.data.data.id}`,
              })
            );
            router.push(`/choose-materials?id=${res.data.data.id}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.push(materialRoute);
    }
  }, []);
  if (isLoading) {
    return <ContactSkeleton />;
  }
  function handleStallType(layoutType: string) {
    const layoutSlice = layoutType.includes("Left")
      ? layoutType.split("Left")
      : layoutType.split("Right");
    let layoutStr;
    switch (layoutSlice[0]) {
      case "inCorner":
        layoutStr = "IC";
        break;
      case "betweenWall":
        layoutStr = "BW";
        break;
      case "alcoveCorner":
        layoutStr = "ALIC";
        break;
      default:
        layoutStr = "ALBW";
        break;
    }
    return layoutStr;
  }
  function handleDoorSwingName(doorSwing: string | undefined) {
    let newSwingName;
    switch (doorSwing) {
      case "rightIn":
        newSwingName = "Right In";
        break;
      case "rightOut":
        newSwingName = "Right Out";
        break;
      case "leftIn":
        newSwingName = "Left In";
        break;
      case "leftOut":
        newSwingName = "Left Out";
        break;
      default:
        break;
    }
    return newSwingName;
  }
  function handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setValue("phone_number", newValue);
    dispatch(updateQuotationValue({ isQuote: true }));
  }
  return (
    <form
      className="flex flex-wrap pro_details"
      onSubmit={handleSubmit(handleContactData)}
    >
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative">
        <Label className="fieldlabels  text-[20px]">Project Name</Label>
        <Input
          type="text"
          register={register}
          error={errors.project_name}
          onChange={(e) => {
            setValue("project_name", e.target.value);
            dispatch(updateQuotationValue({ isQuote: true }));
          }}
          patternRegex={/^.{1,30}$/}
          patternMessage="Project name must be at most 30 characters"
          fieldName="project_name"
          isRequired={false}
          placeholder="Project Name"
          className="border border-[#707070] h-[47px] bg-white"
        />
      </div>
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative">
        <Label className="fieldlabels  text-[20px]">
          First Name<span>*</span>
        </Label>
        <Input
          type="text"
          message="First Name is required"
          error={errors.first_name}
          register={register}
          onChange={(e) => {
            setValue("first_name", e.target.value);
            dispatch(updateQuotationValue({ isQuote: true }));
          }}
          fieldName="first_name"
          placeholder="First Name"
          className="border border-[#707070] h-[47px] bg-white"
        />
      </div>
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative">
        <Label className="fieldlabels  text-[20px]">
          Last Name<span>*</span>
        </Label>
        <Input
          type="text"
          message="Last Name is required"
          error={errors.last_name}
          register={register}
          onChange={(e) => {
            setValue("last_name", e.target.value);
            dispatch(updateQuotationValue({ isQuote: true }));
          }}
          fieldName="last_name"
          placeholder="Last Name"
          className="border border-[#707070] h-[47px] bg-white"
        />
      </div>
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative">
        <Label className="fieldlabels  text-[20px]">
          Email<span>*</span>
        </Label>
        <Input
          type="email"
          register={register}
          error={errors.email}
          onChange={(e) => {
            setValue("email", e.target.value);
            dispatch(updateQuotationValue({ isQuote: true }));
          }}
          fieldName="email"
          patternRegex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
          patternMessage="Invalid email address"
          message="Email Id is required"
          placeholder="Email Id"
          className="border border-[#707070] h-[47px] bg-white"
        />
      </div>
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative">
        <Label className="fieldlabels  text-[20px]">
          Phone Number<span>*</span>
        </Label>
        <Input
          type="text"
          maxLength={10}
          message="Phone Number is required"
          error={errors.phone_number}
          register={register}
          placeholder="Phone number"
          fieldName="phone_number"
          patternRegex={/[0-9]{10}/}
          patternMessage="Invalid phone number"
          onChange={(e) => handlePhoneNumberChange(e)}
          className="border border-[#707070] h-[47px] bg-white"
        />
      </div>
      <h3 className="fs-subtitle mt-6">
        You’re now moving forward to receive a personalized quote and/or
        finalize your purchase. You will receive an email with a PDF of your
        quote after you click the Save and Continue button below.
      </h3>
      <div className="mobile_btn">
        <PrevStep />
        <NextStep
          title="Get Quote"
          type="submit"
          loadingButton={loadingContactButton}
        />
      </div>
    </form>
  );
}

export default Contacts;
