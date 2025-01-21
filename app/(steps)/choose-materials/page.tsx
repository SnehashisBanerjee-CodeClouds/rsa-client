import CheckoutButton from "@/components/stepButtons/CheckoutButton";
import ColorSelection from "@/components/stepButtons/ColorSelection";
import NextStep from "@/components/stepButtons/NextStep";
import PrevStep from "@/components/stepButtons/PrevStep";
import Material from "@/components/steps/Material/Material";
import Label from "@/components/ui/Label";
import { materialList } from "@/constants/step";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
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
          <h2 className="fs-title">Choose Materials</h2>
          <Material />
        </div>
        <div className="mobile_btn">
        <PrevStep />
        <CheckoutButton type="submit" />
        </div>
        
    
      </fieldset>
    </div>
  );
}

export default Step5;
