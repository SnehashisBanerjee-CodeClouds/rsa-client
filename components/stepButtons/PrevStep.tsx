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
