import React, { ReactNode } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

function ErrorMessage({ error }: { error: FieldError | undefined }) {
  return (
    error && (
      <p className="text-red-400 font-sans font-medium">{error?.message}</p>
    )
  );
}

export default ErrorMessage;
