import Payments from "@/components/steps/Payments/Payments";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Generate Payment Link | Restroom Stalls and All",
  description:
    "Restroom Stalls and All is the leading provider of commercial restroom toilet partitions, stalls, and accessories. Shop our selection online now!",
};
export default function GeneratePaymentLink() {
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

        <div className="form_content generate_payment">
          <Suspense>
            <Payments />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
