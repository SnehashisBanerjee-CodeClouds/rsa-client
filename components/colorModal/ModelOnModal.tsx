"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Box } from "lucide-react";
import { ModalSize } from "@/types/ui";
import Modal from "@/components/ui/Modal";

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


export default function ModelOnModal({
  isDisabled
}: {
  isDisabled: boolean
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => setIsOpened(true)}
        className="custom_btn y_btn my-1 !px-10 disabled:opacity-35"
      >
        View Model
      </button>
      {isOpened && (
        <Modal size={ModalSize.xl} modalClassName="max-w-full" setModal={setIsOpened} hasConfirm={false} hasCancel={false}>
          <div className="relative rounded shadow h-80 w-80 md:h-[40rem] md:w-[40rem]">
            <Model />
          </div>
        </Modal>
      )}
    </>
  )
}