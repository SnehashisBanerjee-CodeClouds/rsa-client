import Label from "@/components/ui/Label";
import React from "react";

function ContactSkeleton() {
  return (
    <form className="flex flex-wrap pro_details">
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative gap-2">
        <Label
          className="fieldlabels rounded-md text-black bg-gray-100 
      md:w-[35%] w-[40%] h-[30px] text-[20px] md:text-[20px] mt-[27px] block mb-[15px] !text-transparent  animate-pulse"
        >
          Project Name
        </Label>
        <div className="rounded-md h-[47px] bg-gray-100 animate-pulse md:w-full w-[100%]" />
      </div>
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative gap-2">
        <Label
          className="fieldlabels rounded-md  text-black bg-gray-100 
      md:w-[35%] w-[40%] h-[30px] text-[20px] md:text-[20px] mt-[27px] block mb-[15px] !text-transparent  animate-pulse"
        >
          First Name*
        </Label>
        <div className="rounded-md h-[47px] bg-gray-100 animate-pulse md:w-full w-[100%]" />
      </div>
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative gap-2">
        <Label
          className="fieldlabels rounded-md  text-black bg-gray-100 
      md:w-[35%] w-[38%] h-[30px] text-[20px] md:text-[20px] mt-[27px] block mb-[15px] !text-transparent animate-pulse"
        >
          Last Name*
        </Label>
        <div className="rounded-md h-[47px] bg-gray-100 animate-pulse md:w-full w-[100%]" />
      </div>
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative gap-2">
        <Label
          className="fieldlabels rounded-md text-black bg-gray-100 
      md:w-[25%] w-[20%] h-[30px] text-[20px] md:text-[20px] mt-[27px] block mb-[15px] !text-transparent animate-pulse"
        >
          Email*
        </Label>
        <div className="rounded-md h-[47px] bg-gray-100 animate-pulse md:w-full w-[100%]" />
      </div>
      <div className="flex-initial w-full flex items-center mt-[27px] pb-[15px] relative gap-2">
        <Label
          className="fieldlabels rounded-md text-black bg-gray-100 
      md:w-[45%] w-[50%] h-[30px] text-[20px] md:text-[20px] mt-[27px] block mb-[15px]  !text-transparent animate-pulse"
        >
          Phone Number*
        </Label>
        <div className="rounded-md h-[47px] bg-gray-100 animate-pulse md:w-full w-[100%]" />
      </div>
      <h3 className="fs-subtitle mt-6">
        You’re now moving forward to receive a personalized quote and/or
        finalize your purchase. You will receive an email with a PDF of your
        quote after you click the Save and Continue button below.
      </h3>
    </form>
  );
}

export default ContactSkeleton;
