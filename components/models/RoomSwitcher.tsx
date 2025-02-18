import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/hooks/useStore";
import { STEPS } from "@/constants/step";
import { RoomConfig, SelectedRoom, View } from "@/types/model";
import { switchRoom } from "@/lib/slices/roomSlice";

export default function RoomSwitcher({
  selectedRoom: { roomId },
  rooms,
  view,
}: {
  selectedRoom: SelectedRoom;
  rooms: RoomConfig[];
  view: View;
}) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const currentStepIdx = STEPS.stepData.findIndex(
    (step) => step.path === pathname
  );

  if (currentStepIdx > 1)
    return (
      <div className="p-4 z-10 absolute top-[-3px] left-0 md:left-4">
        <select
          defaultValue={roomId}
          className="px-3 py-1 border border-[#707070] rounded mb-2  box-border text-[#484848] bg-white !text-sm h-[35px] !w-40 font-[family-name:var(--font-manrope)] outline-none"
          onChange={(e) => {
            dispatch(switchRoom({ roomId: +e.target.value }));
          }}
        >
          {rooms.map((room, idx) => (
            <option key={idx} value={room.id}>
              {room.title ? room.title : `Restroom ${room.id}`}
            </option>
          ))}
        </select>
      </div>
    );
}
