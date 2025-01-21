"use client";

import React, { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Info, RotateCw } from "lucide-react";
import { STEPS } from "@/constants/step";
import { useAppDispatch } from "@/hooks/useStore";
import { startOver } from "@/lib/slices/roomSlice";

import Modal from "@/components/ui/Modal";
import { startOverContact } from "@/lib/slices/contactSlice";

function StartOver() {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const startOverHandler = useCallback(() => {
    dispatch(startOver());
    dispatch(startOverContact(""));
    router.push(STEPS.stepData[0].path);
  }, [router]);

  return (
    <React.Fragment>
      <button
        className={pathName === "/create-a-project" ? "hidden" : "start-over"}
        type="button"
        onClick={() => setConfirmModal(true)}
      >
        Start Over
        <RotateCw />
      </button>
      {confirmModal && (
        <Modal
          confirmHandler={startOverHandler}
          setModal={setConfirmModal}
          confirmText="Yes, I'm sure"
          cancelText="No, cancel"
          textCenter
        >
          <Info className="mx-auto mb-4 text-gray-400 w-12 h-12" />
          <h3 className="text-lg font-bold">
            Are you sure you want Start Over?
          </h3>
          <p className="mb-5">
            All progress will be removed, and this action cannot be undone once
            confirmed.
          </p>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default StartOver;
