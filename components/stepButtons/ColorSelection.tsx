"use client";

import React, { Dispatch, SetStateAction } from "react";

function ColorSelection({
  selectedId,
  setOpenColor,
}: {
  selectedId: string;
  setOpenColor: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      disabled={selectedId === ""}
      onClick={() => {
        setOpenColor(true);
      }}
      className="custom_btn y_btn mt-6 disabled:opacity-35"
    >
      View all Colors
    </button>
  );
}

export default ColorSelection;
