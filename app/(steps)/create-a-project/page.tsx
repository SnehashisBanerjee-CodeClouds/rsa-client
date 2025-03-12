import { Metadata } from "next";
import Project from "@/components/steps/Projects/Project";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create a Project | Restroom Stalls and All",
  description:
    "Restroom Stalls and All is the leading provider of commercial restroom toilet partitions, stalls, and accessories. Shop our selection online now!",
};

export default function Step1() {
  return (
    <div className="form_content">
      <fieldset>
        <div className="fieldset_inr">
          <div className="fs-title-step-1">
            <h2 className="fs-title">Create a Quote</h2>
            <p>
              Skip the wait! Get instant pricing with our restroom partitions
              tool!
            </p>
          </div>
          <h3 className="fs-subtitle">
            {/* Please complete the following steps to customize your bathroom
            layout for your first room. You will have the option to add
            additional rooms later. */}
            Customize your quote with up to four restrooms.
          </h3>
          <Suspense>
          <Project />
          </Suspense>
      
        </div>
      </fieldset>
    </div>
  );
}
