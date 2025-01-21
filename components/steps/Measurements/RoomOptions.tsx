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
  isStallWidthExceed: boolean;
  maxRoomNumber: number;
  isRoomDepthExceed: boolean;
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
    <div className="checkbox_area">
      <div className="all_room radio_check flex items-center gap-x-8 xl:gap-x-8">
        <div className="flex flex-1 gap-x-8 xl:gap-x-8 slider">
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
          {!isLoading &&
            rooms.map((room, idx) => (
              <div key={idx} className="flex items-center group py-2 w-fit">
                <input
                  type="radio"
                  name={`room-${room.id}`}
                  id={`room-${room.id}`}
                  checked={selectedRoom.roomId === room.id}
                  onChange={() => dispatch(switchRoom({ roomId: room.id }))}
                />
                <Label
                  htmlFor={`room-${room.id}`}
                  className="whitespace-nowrap"
                >
                  {room.title ? room.title : `Room ${room.id}`}
                </Label>
              </div>
            ))}
        </div>
        <Button
          type="button"
          className={
            rooms.length > maxRoomNumber || rooms.length === maxRoomNumber
              ? "hidden"
              : "custom_btn b_btn flex items-center"
          }
          onClick={addRoomHandler}
          isDisabled={isStallWidthExceed || isRoomDepthExceed}
        >
          Add a Room <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
