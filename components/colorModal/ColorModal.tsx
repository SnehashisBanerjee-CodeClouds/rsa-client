"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { changeColor } from "@/lib/slices/roomSlice";
import { ModalSize } from "@/types/ui";
import { stallColors } from "@/constants/step";
import Modal from "@/components/ui/Modal";
import { StallColorOption } from "@/types/ColorDialog";
import { StallColor } from "@/types/model";

export default function ColorModal({
  isDisabled,
  setLoadingUpdateColor,
  setSelectedData,
}: {
  isDisabled: boolean;
  setLoadingUpdateColor: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedData: React.Dispatch<React.SetStateAction<StallColorOption>>;
}) {
  const dispatch = useAppDispatch();
  const { roomIndex } = useAppSelector((state) => state.room.selectedRoom);
  const { colorData } = useAppSelector((state) => state.step);
  const {
    stall: { stallColor },
  } = useAppSelector((state) => state.room.rooms[roomIndex]);
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => setIsOpened(true)}
        className="custom_btn y_btn mt-4 my-1 !px-10 disabled:opacity-35"
      >
        View all Colors
      </button>
      {isOpened && (
        <Modal
          modalClassName="!w-fit"
          size={ModalSize.lg}
          setModal={setIsOpened}
          hasConfirm={false}
          hasCancel={false}
        >
          <h3 className="mb-3">Select a Color*</h3>
          <div className="space-y-3">
         
 <div  className="grid grid-cols-4 md:grid-cols-8 gap-3">
 {colorData.map((sColor: StallColor, idx) => (
   <div
     key={idx}
     className={`cursor-pointer w-20 h-20 ${
       stallColor === sColor
         ? `border-4 border-[#3FAB3B]`
         : `border border-gray-400`
     } `}
     style={{ backgroundColor: sColor }}
     onClick={() => {
       dispatch(changeColor(sColor));
       setIsOpened(false);
       setSelectedData({
         id: stallColors.find((dat)=>dat.color===sColor)?.id,
         color: sColor,
       });
       setLoadingUpdateColor(true);
       setTimeout(() => {
         setLoadingUpdateColor(false);
       }, 1000);
     }}
   ></div>
 ))}
</div>
      
           
          </div>
        </Modal>
      )}
    </>
  );
}
