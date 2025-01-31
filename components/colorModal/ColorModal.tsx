"use client";

import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { changeColor } from "@/lib/slices/roomSlice";
import { ModalSize } from "@/types/ui";
import { stallColors } from "@/constants/step";
import Modal from "@/components/ui/Modal";
import { StallColorOption } from "@/types/ColorDialog";
import { StallColor } from "@/types/model";

export default function ColorModal({
  selectedId,
  setLoadingUpdateColor,
  setSelectedData,
}: {
  selectedId: number;
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
  // const filteredColorData=useMemo(()=>{
  //   return colorData.filter((data)=>data.material_id===selectedId)
  // },[selectedId])
  return (
    <>
      <button
        type="button"
        disabled={selectedId !== 4 ? !selectedId : true}
        onClick={() => setIsOpened(true)}
        className="custom_btn y_btn mt-0 my-1 !px-10 disabled:opacity-35 min-w-16"
      >
        Select Color
      </button>
      {isOpened && (
        <Modal
          modalClassName="!w-fit"
          size={ModalSize.lg}
          setModal={setIsOpened}
          hasConfirm={false}
          hasCancel={false}
        >
          <div className="disclaimer">
            Colors may vary slightly from colors shown on screen.
          </div>
          <h3 className="mb-3 mt-4">Select a Color*</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-8 gap-3">
              {/* {filteredColorData.length>0 &&filteredColorData[0]?.colors.map((sColor,idx)=>(
                 <div
                 key={idx}
                 className={`cursor-pointer color_list border border-gray-400`}
                 style={{ backgroundColor: sColor.color }}
                 onClick={() => {
                   dispatch(changeColor(sColor));
                   setIsOpened(false);
                   setSelectedData({
                     id: stallColors.find((dat) => dat.color === sColor)?.id,
                     color: sColor,
                   });

                   setLoadingUpdateColor(true);
                   setTimeout(() => {
                     setLoadingUpdateColor(false);
                   }, 1000);
                 }}
               ></div>
              ))} */}
              {colorData.map((sColor: StallColor, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer color_list border border-gray-400`}
                  style={{ backgroundColor: sColor }}
                  onClick={() => {
                    dispatch(changeColor(sColor));
                    setIsOpened(false);
                    setSelectedData({
                      id: stallColors.find((dat) => dat.color === sColor)?.id,
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
