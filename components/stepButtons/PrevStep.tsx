"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function PrevStep() {
  const router = useRouter();
  const pathName=usePathname()
  const prevRedirectHandler = useCallback(() => router.back(), [router]);
  const [param, setParam] = useState<string | null>(null);
  const [param2, setParam2] = useState<string | null>(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramValue = urlParams.get("abandoned");
    const paramValue2=urlParams.get('id')
    if (paramValue !== null) {
      setParam(paramValue);
    }
    if(paramValue2 !== null) {
      setParam2(paramValue2)
    }
  }, []);
  return (
    <Button
      name="previous"
      color="secondary"
      onClick={prevRedirectHandler}
      isActionButton
      type="button"
      className={(pathName==="/choose-materials"&& param!==null&& param2!==null)?"invisible":""}
    >
      <ChevronLeft />
      Back
    </Button>
  );
}
