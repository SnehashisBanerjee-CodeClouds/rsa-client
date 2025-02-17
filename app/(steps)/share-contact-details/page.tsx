import Contacts from "@/components/steps/Contacts/Contacts";
import { Metadata } from "next";
import React, { Suspense } from "react";
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
          <div className="fs-title-step-1 custom_fs_title">
            <h2 className="fs-title">We'll send you a Custom Quote</h2>
            <p>
              Review and select your Material and Color options on the next
              page.
            </p>
          </div>
          {/* <h3 className="fs-title-sm">Contact Details</h3> */}
          <h3 className="fs-subtitle">
            Please provide your Contact Details to recieve your Personalized
            Quote. You can review and select your Material and Color options on
            the next step.
          </h3>
          <Suspense>
            <Contacts />
          </Suspense>
        </div>
      </fieldset>
    </div>
  );
}

export default Step4;
