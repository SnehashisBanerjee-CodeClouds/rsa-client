import { StepType } from "@/types/stepForm";
import ErrorMessage from "@/utils/error/ErrorMessage";
import React, { ChangeEventHandler, ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

function Select({
  value,
  message,
  children,
  className,
  register,
  fieldName,
  error,
  onChange,
  defaultValue,
}: {
  value?: number | string | undefined;
  message: string;
  children: ReactNode;
  className: string;
  register: UseFormRegister<StepType>;
  fieldName: any;
  error: FieldError | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  defaultValue?: string | number | readonly string[] | undefined;
}) {
  return (
    <>
      <select
        value={value}
        defaultValue={defaultValue}
        className={className}
        {...register(fieldName, {
          onChange: onChange,
          required: {
            value: true,
            message: message,
          },
        })}
      >
        {children}
      </select>

      <ErrorMessage error={error} />
    </>
  );
}

export default Select;
