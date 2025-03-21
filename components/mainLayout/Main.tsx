import React, { ReactNode } from "react";
import Image from "next/image";
import { ModelType } from "@/types/model";

import StartOver from "@/components/stepButtons/StartOver";
import Stepper from "@/components/steps/Stepper";
import StallModelView from "@/components/modelViews/StallModelView";
import UrinalScreensModelView from "@/components/modelViews/UrinalScreensModelView";
import Link from "next/link";

function Main({
  modelType,
  children,
}: {
  modelType: ModelType;
  children: ReactNode;
}) {
  return (
    <section className="form_section flex-1">
      <div id="msform">
        <div className="mb_hdr">
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
        <div className="contactDetailsMb">
              <h2>Questions? Contact Us</h2>
              <p className="phoneHolder">
                <Link href="tel:1-8448178255">1-844-81-STALL</Link>
              </p>
              <p className="emailHolder">
                <Link
                  href="mailto:cs@restroomstallsandall.com"
                  className="!text-[#3fab3b]"
                >
                  cs@restroomstallsandall.com
                </Link>
              </p>
            </div>
        </div>
        <Stepper />
        {children}
        {modelType === "stalls" ? (
          <StallModelView />
        ) : (
          <UrinalScreensModelView />
        )}
      </div>
    </section>
  );
}

export default Main;
