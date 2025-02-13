"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { addRoom, stepSubmit, switchRoom } from "@/lib/slices/roomSlice";
import Button from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import Label from "@/components/ui/Label";

export default function RoomOptions({
  isStallWidthExceed,
  maxRoomNumber,
  isRoomDepthExceed,
}: {
  isStallWidthExceed?: boolean;
  maxRoomNumber: number;
  isRoomDepthExceed?: boolean;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);

  const [isLoading, setIsLoading] = useState(true);
  // Checking is required to get rid of Hydration error
  useEffect(() => {
    const debounce = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(debounce);
  });

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
          Add a Room <ChevronRight />
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
            <Label className="fieldlabels text-[16px] md:text-[20px] block">
              Your Rooms
            </Label>
            <select
              value={selectedRoom.roomId}
              className="all_room_select rounded-md"
              onChange={(e) => {
                dispatch(switchRoom({ roomId: +e.target.value }));
              }}
            >
              {!isLoading &&
                rooms.map((room, idx) => (
                  <option key={idx} value={room.id}>
                    {room.title ? room.title : `Restroom ${room.id}`}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
