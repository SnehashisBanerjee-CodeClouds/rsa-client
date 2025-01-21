"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Box } from "lucide-react";
import { HIDE_MODEL_ON } from "@/constants/step";

// Loading Model Dynamically / Lazily
const Model = dynamic(
  () => import("@/components/models/urinal-screen/Model"),
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

export default function UrinalScreensModelView() {
  const pathName = usePathname();
  if (HIDE_MODEL_ON.includes(pathName)) return <></>;
  return (
    <div className="right_sec">
      <div className="right_sec_inr">
        <Model />
      </div>
    </div>
  );
}

