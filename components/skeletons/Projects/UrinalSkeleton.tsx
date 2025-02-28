import Label from "@/components/ui/Label";
import React from "react";

function UrinalSkeleton() {
  return (
    <form className="form-card">
      <div className="sameLine mt-4 mb-[15px]">
        <Label className="fieldlabels rounded-md font-bold text-black bg-gray-100 md:w-[35%] w-[50%] h-[30px] text-[20px] mt-[27px] block mb-[15px] !text-transparent animate-pulse">
          How many urinal screens?
        </Label>
        <div className="rounded-md h-[47px] bg-gray-100 md:w-full animate-pulse ml-4" />
      </div>
      <div className="sameLine mt-4 mb-[15px]">
        <Label className="fieldlabels rounded-md font-bold text-black bg-gray-100 md:w-[35%] w-[50%] h-[30px] text-[20px] mt-[27px] block mb-[15px] !text-transparent animate-pulse">
          Choose the depth of your Urinal Screens.
        </Label>
        <div className="rounded-md h-[47px] bg-gray-100 md:w-full animate-pulse ml-4" />
      </div>
    </form>
  );
}

export default UrinalSkeleton;
