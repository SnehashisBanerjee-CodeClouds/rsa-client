import { Metadata } from "next";
import UrinalScreens from "@/components/steps/Projects/UrinalScreens";

export const metadata: Metadata = {
  title: "Urinal Screens | Restroom Stalls and All",
  description:
    "Restroom Stalls and All is the leading provider of commercial restroom toilet partitions, stalls, and accessories. Shop our selection online now!",
};

export default function SelectUrinalScreens() {
  return (
    <div className="form_content">
      <fieldset>
        <div className="fieldset_inr">
          <h2 className="fs-title">Privacy Screens</h2>
          <UrinalScreens />
        </div>
      </fieldset>
    </div>
  );
}
