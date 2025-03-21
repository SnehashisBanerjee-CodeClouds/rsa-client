"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Info, RotateCw } from "lucide-react";
import { STEPS } from "@/constants/step";
import { useAppDispatch } from "@/hooks/useStore";
import { startOver } from "@/lib/slices/roomSlice";
import Modal from "@/components/ui/Modal";
import { startOverContact } from "@/lib/slices/contactSlice";
import Button from "../ui/Button";

function StartOver({
  isAction,
  buttonColor,
}: {
  className: string;
  isAction: boolean;
  param?: string | null;
  buttonColor?: "default" | "secondary" | undefined;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const [param, setParam] = useState<string | null>(null);
  const [param2, setParam2] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get("abandoned");
    const paramValue2 = urlParams.get("id");
    if (paramValue !== null) {
      setParam(paramValue);
    }
    if (paramValue2 !== null) {
      setParam2(paramValue2);
    }
  }, []);
  const startOverHandler = useCallback(() => {
    dispatch(startOver());
    dispatch(startOverContact(""));
    router.push(STEPS.stepData[0].path);
  }, [router]);

  return (
    <React.Fragment>
      <Button
        color={buttonColor}
        type="button"
        isActionButton={isAction}
        onClick={() => setConfirmModal(true)}
        className={param !== null ? "!hidden" : ""}
      >
        Start New Quote
        <RotateCw />
      </Button>
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
            Are you sure you want to start over?
          </h3>
          <p className="mb-5">
            All progress will be removed and cannot be retrieved once you start
            over.
          </p>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default StartOver;
