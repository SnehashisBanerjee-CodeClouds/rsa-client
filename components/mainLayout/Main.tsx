import React, { ReactNode } from "react";
import Image from "next/image";
import { ModelType } from "@/types/model";

import StartOver from "@/components/stepButtons/StartOver";
import Stepper from "@/components/steps/Stepper";
import StallModelView from "@/components/modelViews/StallModelView";
import UrinalScreensModelView from "@/components/modelViews/UrinalScreensModelView";

function Main({
  modelType,
  children
}: {
  modelType: ModelType
  children: ReactNode
}) {
  return (
    <section className="form_section flex-1">
      <div id="msform">
        <div className="logo">
          <a href="https://restroomstallsandall.com" target="_blank">
            <Image
              src="/assets/images/logo.gif"
              alt="logo_img"
              width={400}
              height={136}
              priority
            />
          </a>
        </div>
        
        <StartOver />
        <Stepper />
        {children}
        {modelType === "stalls" ? <StallModelView /> : <UrinalScreensModelView />}
      </div>
    </section>
  );
}

export default Main;
