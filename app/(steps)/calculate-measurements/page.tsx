import { Metadata } from "next";
import Measurements from "@/components/steps/Measurements/Measurements";

export const metadata: Metadata = {
  title: "Calculate Measurement | Restroom Stalls and All",
  description:
    "Restroom Stalls and All is the leading provider of commercial restroom toilet partitions, stalls, and accessories. Shop our selection online now!",
};

export default function Step3() {
  return (
    <form className="form_content">
      <fieldset>
        <div className="fieldset_inr">
          <h2 className="fs-title">Calculate Measurements</h2>
          <Measurements />
        </div>
      </fieldset>
    </form>
  );
}
