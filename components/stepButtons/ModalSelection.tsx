"use client";

import React, { Dispatch, SetStateAction } from "react";

function ModalSelection({
  selectedId,
  setOpenModel,
}: {
  selectedId: string;
  setOpenModel: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      disabled={selectedId === ""}
      onClick={() => {
        setOpenModel(true);
      }}
      className="custom_btn y_btn mt-6 disabled:opacity-35"
      data-modal-target="default-modal-2"
      data-modal-toggle="default-modal-2"
    >
      View Model
    </button>
  );
}

export default ModalSelection;
