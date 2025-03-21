"use client";

import React, { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { Box } from "lucide-react";
import { ModalSize } from "@/types/ui";
import Modal from "@/components/ui/Modal";
import Button from "../ui/Button";
import Model from "../models/stall/Model";

// Loading Model Dynamically / Lazily
// const Model = dynamic(() => import("@/components/models/stall/Model"), {
//   ssr: false,
//   loading: () => (
//     <div className="flex items-center justify-center h-full w-full mx-2 bg-gray-100 rounded-lg animate-pulse">
//       <Box className="w-16 h-16 text-gray-400" />
//       <span className="sr-only">Loading 3D Model...</span>
//     </div>
//   ),
// });

export default function ModelOnModal() {
  const [isOpened, setIsOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTransition] = useTransition();
  return (
    <>
      <Button
        isActionButton
        type="button"
        onClick={() => {
          setIsOpened(true);
          setLoading(true);
          const timeout = setTimeout(() => {
            setLoading(false);
          }, 3000);
          return () => clearTimeout(timeout);
        }}
        className="y-btn absolute top-[-100px] !right-0 justify-center viewRooms"
      >
        View Rooms
      </Button>
      {isOpened && (
        <Modal
          size={ModalSize.xl}
          modalClassName="max-w-full"
          setModal={setIsOpened}
          hasConfirm={false}
          hasCancel={false}
        >
          <div className="relative rounded shadow h-80 w-80 md:h-[40rem] md:w-[40rem]">
            {loading ? (
              <div className="flex items-center justify-center h-full w-full mx-2 bg-gray-100 rounded-lg animate-pulse">
                <Box className="w-16 h-16 text-gray-400" />
                <span className="sr-only">Loading 3D Model...</span>
              </div>
            ) : (
              <Model />
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
