import NextStep from "@/components/stepButtons/NextStep";
import PrevStep from "@/components/stepButtons/PrevStep";
import Contacts from "@/components/steps/Contacts/Contacts";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Share Contact Details | Restroom Stalls and All",
  description:
    "Restroom Stalls and All is the leading provider of commercial restroom toilet partitions, stalls, and accessories. Shop our selection online now!",
};
function Step4() {
  return (
    <div className="form_content">
      <fieldset>
        <div className="fieldset_inr">
          <h2 className="fs-title">Share Contact Details</h2>
          <h3 className="fs-title-sm">Contact Details</h3>
          <Contacts />
        </div>
      </fieldset>
    </div>
  );
}

export default Step4;
