import Material from "@/components/steps/Material/Material";

import { Metadata } from "next";
import React from "react";
import Button from "@/components/ui/Button";
import ModelOnModal from "@/components/colorModal/ModelOnModal";
export const metadata: Metadata = {
  title: "Choose Materials | Restroom Stalls and All",
  description:
    "Restroom Stalls and All is the leading provider of commercial restroom toilet partitions, stalls, and accessories. Shop our selection online now!",
};
function Step5() {
  return (
    <div className="form_content">
      <fieldset className="fieldset_inr_full">
        <div className="fieldset_inr" style={{ width: "100%" }}>
          <h2 className="fs-title selectMaterial">Select Material & Color</h2>
          <ModelOnModal />
          <Material />
        </div>
      </fieldset>
    </div>
  );
}

export default Step5;
