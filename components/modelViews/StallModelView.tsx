"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Box } from "lucide-react";
import { useAppSelector } from "@/hooks/useStore";
import { HIDE_MODEL_ON } from "@/constants/step";

// Loading Model Dynamically / Lazily
const Model = dynamic(
  () => import("@/components/models/stall/Model"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full w-full mx-2 bg-gray-100 rounded-lg animate-pulse">
        <Box className="w-16 h-16 text-gray-400" />
        <span className="sr-only">Loading 3D Model...</span>
      </div>
    ),
  }
)

export default function StallModelView() {
  const pathname = usePathname();
  // Checking Routes
  if (HIDE_MODEL_ON.includes(pathname)) return <></>;
  // Getting State
  const { selectedRoom, rooms } = useAppSelector((state) => state.room)
  const { roomIndex } = selectedRoom;
  // Expanded View
  const { expandedView } = rooms[roomIndex];
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (pathname === "/calculate-measurements" && expandedView) setIsExpanded(true);
    else setIsExpanded(false);
  }, [expandedView, pathname])

  return (
    <div className={`right_sec ${isExpanded ? `!w-full !p-0` : ``}`}>
      <div className="right_sec_inr">
        <Model />
      </div>
    </div>
  );
}
