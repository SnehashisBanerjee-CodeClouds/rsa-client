import LayoutSkeleton from "@/components/skeletons/Layouts/LayoutSkeleton";
import Layout from "@/components/steps/Layouts/Layout";
import { useAppDispatch } from "@/hooks/useStore";
import { fetchStepInputData } from "@/lib/slices/stepSlice";
import { store } from "@/lib/store";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Select a Layout | Restroom Stalls and All",
  description:
    "Restroom Stalls and All is the leading provider of commercial restroom toilet partitions, stalls, and accessories. Shop our selection online now!",
};

export default async function Step2() {
  return (
    <div className="form_content">
      <fieldset>
        <div className="fieldset_inr">
          <h2 className="fs-title">Select a Layout</h2>
          <h3 className="fs-subtitle">
        All Partitions are floor mounted and overhead braced.
      </h3>

          <Layout />
        </div>
      </fieldset>
    </div>
  );
}
