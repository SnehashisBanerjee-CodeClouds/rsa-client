"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { HasUrinalScreens } from "@/types/model";

export default function PrevStep({
  hasUrinalScreen,
}: {
  hasUrinalScreen?: HasUrinalScreens;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const prevRedirectHandler = useCallback(() => {
    if (hasUrinalScreen === "not-selected" && pathName === "/select-a-layout") {
      router.replace("/create-a-project");
    } else {
      router.back();
    }
  }, [router]);
  const [param, setParam] = useState<string | null>(null);
  const [param2, setParam2] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get("abandoned");
    const paramValue2 = urlParams.get("id");
    if (paramValue !== null) {
      setParam(paramValue);
    }
    if (paramValue2 !== null) {
      setParam2(paramValue2);
    }
  }, []);
  return (
    <Button
      name="previous"
      color="secondary"
      onClick={prevRedirectHandler}
      isActionButton
      type="button"
    >
      <ChevronLeft />
      Back
    </Button>
  );
}
