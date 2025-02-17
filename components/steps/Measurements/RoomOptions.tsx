"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  addRoom,
  stepSubmit,
  switchRoom,
  updatePulsate,
} from "@/lib/slices/roomSlice";
import Button from "@/components/ui/Button";
import { ChevronLeft, Pointer } from "lucide-react";
import Label from "@/components/ui/Label";
import { OutlineColor } from "@/types/model";

export default function RoomOptions({
  isStallWidthExceed,
  maxRoomNumber,
  isRoomDepthExceed,
}: {
  isStallWidthExceed?: boolean;
  maxRoomNumber: number;
  isRoomDepthExceed?: boolean;
}) {
  const maxCycles = 6;
  const initialColor = "transparent";
  const colors = [
    OutlineColor.FloorSelected,
    OutlineColor.FloorPulsateSelected,
  ];
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);
  const { roomIndex } = selectedRoom;
  const {
    cameraControls: { view },
    isPulsate,
  } = rooms[roomIndex].stall;
  const [isLoading, setIsLoading] = useState(true);
  const [pulsateColor, setPulsateColor] = useState<OutlineColor | string>(
    "transparent"
  );
  // Checking is required to get rid of Hydration error
  useEffect(() => {
    const debounce = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(debounce);
  });
  useEffect(() => {
    if (pathname === "/calculate-measurements" && isPulsate) {
      let cycleCount = 0;
      setPulsateColor(OutlineColor.FloorSelected);
      const intervalId = setInterval(() => {
        if (cycleCount < maxCycles) {
          setPulsateColor((prevColor) =>
            prevColor === colors[0] ? colors[1] : colors[0]
          );
          cycleCount += 1;
        } else {
          // Once completed, reset to the initial color
          setPulsateColor(initialColor);
          dispatch(updatePulsate({ pulsateBool: false }));
          clearInterval(intervalId);
        }
      }, 300);

      return () => clearInterval(intervalId); //
    }
  }, [pathname, isPulsate]);
  const allowedMeasurements = useMemo(
    () => view === "2D" && pathname === "/calculate-measurements",
    [view, pathname]
  );
  const addRoomHandler = useCallback(() => {
    dispatch(stepSubmit({ stepName: "measurements" }));
    dispatch(addRoom());
    router.push("/");
  }, []);
  return (
    <div className="">
      <div className="all_room radio_check flex items-center gap-x-4 xl:gap-x-4">
        <Button
          type="button"
          className={
            rooms.length > maxRoomNumber || rooms.length === maxRoomNumber
              ? "hidden"
              : "custom_btn b_btn sc_b_btn flex items-center"
          }
          onClick={addRoomHandler}
          isDisabled={isStallWidthExceed || isRoomDepthExceed}
        >
          <ChevronLeft /> Add Room
        </Button>
        <div className="flex flex-1 gap-y-4 slider">
          {/* {!isLoading && (
            <select
              value={selectedRoom.roomId}
              className="pr-3 py-9 border border-[#707070] rounded mb-2  box-border text-[#484848] bg-white !text-lg outline-none h-[55px] !w-40 font-[family-name:var(--font-manrope)]"
              onChange={(e) => {
                dispatch(switchRoom({ roomId: +e.target.value }));
              }}
            >
              {rooms.map((room, idx) => (
                <option key={idx} value={room.id}>
                  {room.title ? room.title : `Room ${room.id}`}
                </option>
              ))}
            </select>
          )} */}
          <div className="flex flex-col group w-fit">
            {allowedMeasurements && (
              <div className="z-10  stallToSelect">
                <div
                  className={`px-4 py-3 inline-flex font-[family-name:var(--font-manrope)]`}
                >
                  <button
                    style={{
                      backgroundColor: pulsateColor,
                      color: pulsateColor === "transparent" ? "black" : "white",
                    }}
                    className={`font-bold text-black text-sm rounded-s-md rounded-e-md px-1 py-2 `}
                  >
                    <Pointer className="inline h-5 w-5 ml-1" /> Click a Stall to
                    Select
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
