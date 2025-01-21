"use client";
import { ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/hooks/useStore";

function NextStep({
  title = "Save And Continue",
  isDisabled,
  type,
  submitForm,
  loadingButton,
}: {
  title?: string;
  isDisabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
  submitForm?: () => void;
  loadingButton?: boolean;
}) {
  return (
    <Button
      name="next"
      type={type}
      isActionButton
      isDisabled={isDisabled || loadingButton}
      onClick={submitForm}
    >
      {loadingButton ? "Saving..." : title}
      {!loadingButton && <ChevronRight />}
    </Button>
  );
}

export default NextStep;
