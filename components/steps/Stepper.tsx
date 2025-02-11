"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { STEPS } from "@/constants/step";
import { StepData } from "@/types/step";
import { startOver, switchRoom } from "@/lib/slices/roomSlice";
import { startOverContact } from "@/lib/slices/contactSlice";

export default function Stepper() {
  const dispatch = useAppDispatch();
  const {
    selectedRoom: { completedStep },
    rooms,
  } = useAppSelector((state) => state.room);
  const pathname = usePathname();
  const router = useRouter();
  const [param, setParam] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get("id");
    if (paramValue !== null) {
      setParam(paramValue);
    }
  }, []);
  const currentStepIdx = useMemo(() => {
    return pathname === "/select-urinal-screens"
      ? 0
      : STEPS.stepData.findIndex((step) => step.path === pathname);
  }, [param, STEPS, pathname]);

  const prevStepData = useMemo(() => {
    const slicedData = STEPS.stepData.slice(0, currentStepIdx);
    const updatedSteps =
      slicedData.length > 0
        ? slicedData.reduce((acc: Array<string>, cur: StepData) => {
            if (cur.path) {
              acc.push(cur.path);
            }
            return acc;
          }, [])
        : [];
    return updatedSteps;
  }, [currentStepIdx]);

  useEffect(() => {
    const cleanUp = setTimeout(() => {
      if (currentStepIdx > completedStep && currentStepIdx <= 2)
        pathname === "/choose-materials"
          ? param !== null
            ? router.replace(`/choose-materials?id=${param}`)
            : router.replace("/create-a-project")
          : router.replace(STEPS.stepData[completedStep].path);
      if (currentStepIdx > 2)
        rooms.forEach((room) => {
          if (room.completedStep < 3) {
            pathname === "/choose-materials"
              ? param !== null
                ? router.replace(`/choose-materials?id=${param}`)
                : router.replace("/create-a-project")
              : router.replace(STEPS.stepData[completedStep].path);
            dispatch(switchRoom({ roomId: room.id }));
          }
        });
    }, 100);
    if (pathname === "/choose-materials" && param === null) {
      dispatch(startOver());
      dispatch(startOverContact(""));
      router.replace("/create-a-project");
    }
    return () => clearTimeout(cleanUp);
  }, [completedStep, currentStepIdx, pathname, param]);

  return (
    <div>
      <ul id="progressbar">
        {STEPS.stepData.map((step, idx) => (
          <li
            className={
              currentStepIdx === idx
                ? "active"
                : prevStepData.includes(step.path)
                ? "prevStep"
                : ""
            }
            key={idx}
          >
            {step.title}
          </li>
        ))}
      </ul>

      {STEPS.stepData.map((step, idx) => (
        <div
          className={currentStepIdx === idx ? "mobile-steps" : "hidden"}
          key={idx}
        >
          <div className="mob_step">
            <span>{idx + 1}</span>
            {step.title}
          </div>
          <div className="total_steps">
            Steps (5){" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
