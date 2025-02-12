import Label from "@/components/ui/Label";
import React from "react";

function ProjectSkeleton() {
  return (
    <form className="form-card">
      <Label
        className="fieldlabels rounded-md font-bold text-black bg-gray-100 
      md:w-[18%] w-[30%] h-[30px] text-[16px] md:text-[20px] mt-[27px] block mb-[15px] !text-transparent animate-pulse"
      >
        Room name
      </Label>
      <div className="rounded-md h-[47px] bg-gray-100 animate-pulse md:w-full w-[100%]" />
      <div className="sameLine mt-4 mb-[15px]">
        <Label className="fieldlabels rounded-md font-bold text-black bg-gray-100 md:w-[35%] w-[50%] h-[30px] text-[20px] mt-[27px] block mb-[15px] !text-transparent animate-pulse">
          Number of stalls*
        </Label>
        <div className="rounded-md h-[47px] bg-gray-100 md:w-full animate-pulse ml-4" />
      </div>

      <div className="mb-[28px] text-center md:text-left">
        <Label className="fieldlabels rounded-md font-bold text-[16px] text-black bg-gray-100 w-[100%] md:w-[70%] h-[30px] md:text-[20px] mt-[27px] block mb-[15px] !text-transparent animate-pulse">
          Would you like to learn more about Material Installation Services?*
        </Label>
        <div className="radio_check flex items-center gap-x-24 justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <div className="rounded-full h-[25px] w-[25px] bg-gray-100 animate-pulse" />
            <Label className="bg-gray-100 rounded-md block animate-pulse w-[25px] text-transparent">
              Yes
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full h-[25px] w-[25px] bg-gray-100 animate-pulse" />
            <Label className="bg-gray-100 rounded-md block animate-pulse  text-transparent">
              No thank you
            </Label>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProjectSkeleton;
