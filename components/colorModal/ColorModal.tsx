"use client";

import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { changeColor, changeTexture } from "@/lib/slices/roomSlice";
import { ModalSize } from "@/types/ui";
import Modal from "@/components/ui/Modal";
import { StallColorOption, StallTextureOption } from "@/types/ColorDialog";
import { StallColor } from "@/types/model";

export default function ColorModal({
  selectedId,
  setLoadingUpdateColor,
  selectedData,
  setSelectedData,
  selectedTexture,
  setSelectedTexture,

}: {
  selectedId: number;
  setLoadingUpdateColor: React.Dispatch<React.SetStateAction<boolean>>;
  selectedData: StallColorOption;
  setSelectedData: React.Dispatch<React.SetStateAction<StallColorOption>>;
  selectedTexture: StallTextureOption;
  setSelectedTexture: React.Dispatch<React.SetStateAction<StallTextureOption>>;
}) {
  const dispatch = useAppDispatch();
  const { roomIndex } = useAppSelector((state) => state.room.selectedRoom);
  const { colorData } = useAppSelector((state) => state.step);
  // const {
  //   stall: { stallColor, wallTexture },
  // } = useAppSelector((state) => state.room.rooms[roomIndex]);
  const [isOpened, setIsOpened] = useState(false);
  const filteredMaterialData = useMemo(() => {
    return colorData.filter((data:any) => data.material_id === selectedId);
  }, [selectedId]);
  return (
    <>
      <button
        type="button"
        disabled={selectedId !== 4 ? !selectedId : true}
        onClick={() => setIsOpened(true)}
        className="custom_btn y_btn mt-0 my-1 !px-10 disabled:opacity-35 min-w-[150px]
        "
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
           
              {filteredMaterialData.length > 0 &&
                filteredMaterialData[0].colors.map((colorDat:any, idx:any) => (
                  <div
                    key={idx}
                    className={`cursor-pointer color_list border bg-cover ${
                      selectedData.name === colorDat.name
                        ? "border-6 border-[#4fd84b]"
                        : "border-gray-400"
                    }`}
                    style={{ backgroundColor: colorDat.color }}
                    onClick={() => {
                      dispatch(changeColor(colorDat.color as StallColor));
                      setIsOpened(false);
                      setSelectedData({
                        name: colorDat.name,
                        color: colorDat.color,
                      });
                      setSelectedTexture({
                        name: "",
                        imageName: "",
                      });
                      dispatch(changeTexture(""));
                      setLoadingUpdateColor(true);
                      setTimeout(() => {
                        setLoadingUpdateColor(false);
                      }, 1000);
                    }}
                  ></div>
                ))}
              {filteredMaterialData.length > 0 && Object.keys(filteredMaterialData[0]).includes("textures") &&
                filteredMaterialData[0].textures.length > 0 &&
                filteredMaterialData[0].textures.map((textureDat:any, idx:any) => (
                  <div
                    key={idx}
                    className={`cursor-pointer color_list border bg-cover ${
                      selectedTexture.name === textureDat.name
                        ? "border-6 border-[#4fd84b]"
                        : "border-gray-400"
                    }`}
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE}/uploads/textures/${textureDat.images[0].filename})`,
                    }}
                    onClick={() => {
                      dispatch(
                        changeTexture(
                          `${process.env.NEXT_PUBLIC_API_BASE}/uploads/textures/${textureDat.images[0].filename}`
                        )
                      );
                      setIsOpened(false);
                      setSelectedTexture({
                        name: textureDat.name,
                        imageName: textureDat.images[0].filename,
                      });
                      setSelectedData({
                        name: "",
                        color: "",
                      });
                      dispatch(changeColor(StallColor.LightBlue));
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
