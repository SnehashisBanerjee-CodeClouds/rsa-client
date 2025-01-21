// This modal always opened in Portal Mode (Like React Portals).
"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { ModalSize } from "@/types/ui";

export default function Modal({
  children,
  setModal,
  modalClassName,
  confirmHandler,
  cancelHandler,
  hasConfirm = true,
  hasCancel = true,
  confirmText = "Confirm",
  cancelText = "Cancel",
  overlay = true,
  size = ModalSize.md,
  textCenter = false,
}: {
  children: ReactNode;
  setModal: Dispatch<SetStateAction<boolean>>;
  modalClassName?: string;
  confirmHandler?: () => void;
  cancelHandler?: () => void;
  hasConfirm?: boolean;
  hasCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
  overlay?: boolean;
  size?: ModalSize;
  textCenter?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return mounted ? (
    createPortal(
      <React.Fragment>
        {overlay && (
          <div className="fixed inset-0 z-40 w-full h-full bg-black opacity-50"></div>
        )}
        <div
          className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center`}
        >
          <div className={`flex min-h-full p-4 justify-center items-center`}>
            <div
              className={`relative bg-white z-40 rounded shadow ${size} ${modalClassName}`}
            >
              <button
                type="button"
                className={`absolute -top-3 -end-2.5 text-white bg-[#3fab3b] rounded-full w-7 h-7 p-1 ms-auto inline-flex justify-center items-center z-50`}
                onClick={() => {
                  if (cancelHandler) cancelHandler();
                  setModal(false);
                }}
              >
                <X />
                <span className="sr-only">Close modal</span>
              </button>
              <div className={`p-4 md:p-5 ${textCenter ? `text-center` : ``}`}>
                {children}
                {hasConfirm && (
                  <button
                    type="button"
                    className="bg-[#f9d84c] font-bold rounded text-sm inline-flex items-center px-5 py-2.5 text-center"
                    onClick={() => {
                      if (confirmHandler) confirmHandler();
                      setModal(false);
                    }}
                  >
                    {confirmText}
                  </button>
                )}
                {hasCancel && (
                  <button
                    type="button"
                    className="bg-[#dddddd] font-bold py-2.5 px-5 ms-3 text-sm rounded"
                    onClick={() => {
                      if (cancelHandler) cancelHandler();
                      setModal(false);
                    }}
                  >
                    {cancelText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>,
      document.body
    )
  ) : (
    <></>
  );
}
