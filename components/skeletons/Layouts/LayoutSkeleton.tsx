import Label from "@/components/ui/Label";
import { LayoutImages, secondRadioList } from "@/constants/step";
import Image from "next/image";
import React from "react";

function LayoutSkeleton() {
  return (
    <form>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 layout_select">
        {LayoutImages?.map((layout) => (
          <li key={layout.id} className="animate-pulse">
            <Label
              className={`lyout_box bg-gray-100 h-[140px] flex items-center justify-center mb-[16px] border rounded-md  2xl:p-0 p-4 `}
            ></Label>
            <span className="text-center text-[14px] bg-gray-100 text-transparent block text-[#484848]">
              {layout.name}
            </span>
          </li>
        ))}
      </ul>
      <div className="checkbox_area mb-[28px]">
        <Label className="fieldlabels font-bold bg-gray-100 md:w-[60%] w-[100%] h-[30px] text-black text-[16px] md:text-[20px] mt-[27px] block mb-[15px] !text-transparent lg:text-left text-center animate-pulse">
          Does this include a handicap accessible stall?*
        </Label>
        <div className=" flex items-center gap-x-24 text-center justify-center lg:justify-start">
          {secondRadioList?.map((radioData) => (
            <div className="flex items-center gap-2" key={radioData.title}>
              <div className="rounded-full h-[25px] w-[25px] bg-gray-100 animate-pulse" />
              <Label className="bg-gray-100 rounded-md block animate-pulse w-[25px] text-transparent">
                {radioData.title}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

export default LayoutSkeleton;
