import { SetStateAction, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { isDesktop } from "react-device-detect";
import { Maximize2, Minimize2, Pointer } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
  changeView,
  toggleExpandedView,
  updatePulsate,
} from "@/lib/slices/roomSlice";
import { OutlineColor, View } from "@/types/model";

export default function ModelSwitcher({
  view,
  setOrbitControls,
  pulsate,
}: {
  setOrbitControls: (value: SetStateAction<boolean>) => void;
  pulsate?: boolean;
  view: View;
}) {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);
  const { roomIndex } = selectedRoom;
  const { expandedView } = rooms[roomIndex];
  const { isPulsate, floorColor } = rooms[roomIndex].stall;
  const pathname = usePathname();
  const initialColor = "transparent";
  const colors = [
    OutlineColor.FloorSelected,
    OutlineColor.FloorPulsateSelected,
  ];
  const maxCycles = 6;
  useEffect(() => {
    // Model need a bit of time to get stable before "orbitControls" get's removed
    let cleanUp;
    if (view === "3D")
      cleanUp = setTimeout(() => {
        setOrbitControls(true);
      }, 1300);
    else
      cleanUp = setTimeout(() => {
        setOrbitControls(false);
      }, 100);

    return () => clearTimeout(cleanUp);
  }, [view]);

  // When view changes, need some time to stable the Model
  useEffect(() => {
    setIsDisabled(true);
    setTimeout(() => setIsDisabled(false), 1300);
  }, [view]);

  const allowedMeasurements = useMemo(
    () => view === "2D" && pathname === "/calculate-measurements",
    [view, pathname]
  );

  // pulsate for Animation
  const [pulsateArrow, setPulsateArrow] = useState(false);
  const [pulsateColor, setPulsateColor] = useState<OutlineColor | string>(
    "transparent"
  );

  // Pulsating Y
  useEffect(() => {
    if (allowedMeasurements) {
      setTimeout(() => setPulsateArrow(true), 500);
      setTimeout(() => setPulsateArrow(false), 3500);
    }
  }, [allowedMeasurements]);
  useEffect(() => {
    if (pulsate && isPulsate) {
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
  }, [pulsate, isPulsate]);
  function handleChangeView(view: View) {
    dispatch(changeView({ view, pathname }));
  }
  return (
    <>
      <div className="z-10 absolute top-[-3px] right-0">
        {false && pathname === "/calculate-measurements" && isDesktop && (
          <>
            <div
              className={`py-4 inline-flex font-[family-name:var(--font-manrope)] ${
                isDisabled
                  ? `cursor-not-allowed opacity-50 pointer-events-none`
                  : ``
              }`}
            >
              <button
                className={`px-2 py-2 text-xs font-bold border rounded-s-md rounded-e-md ${
                  expandedView
                    ? `bg-[#3d58a4] border-[#3d58a4] text-white hover:bg-[#3d58a4] hover:text-white`
                    : `hover:border-[#3d58a4]`
                }`}
                onClick={() => dispatch(toggleExpandedView())}
              >
                {expandedView ? (
                  <Minimize2 className="inline h-4 w-4" />
                ) : (
                  <Maximize2 className="inline h-4 w-4" />
                )}
              </button>
            </div>
          </>
        )}

        <div
          className={`py-4 pr-4 pl-2 inline-flex font-[family-name:var(--font-manrope)] ${
            isDisabled
              ? `cursor-not-allowed opacity-50 pointer-events-none`
              : ``
          }`}
        >
          <button
            className={`px-4 py-2 text-xs font-bold border rounded-s-md ${
              view === "2D"
                ? `bg-[#3d58a4] border-[#3d58a4] text-white hover:bg-[#3d58a4] hover:text-white`
                : `hover:border-[#3d58a4]`
            }`}
            onClick={() => view === "3D" && handleChangeView("2D")}
            disabled={isDisabled}
          >
            2D
          </button>
          <button
            className={`px-4 py-2 text-xs font-bold border rounded-e-md ${
              view === "3D"
                ? `bg-[#3d58a4] border-[#3d58a4] text-white hover:bg-[#3d58a4] hover:text-white`
                : `hover:border-[#3d58a4]`
            }`}
            onClick={() => view === "2D" && handleChangeView("3D")}
            disabled={isDisabled}
          >
            3D
          </button>
        </div>
      </div>
      {/* {allowedMeasurements && (
        <div className="z-10 absolute top-0 left-0 stallToSelect">
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
      )} */}
    </>
  );
}
