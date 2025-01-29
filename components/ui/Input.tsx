import ErrorMessage from "@/utils/error/ErrorMessage";
import React, { ChangeEventHandler } from "react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

function Input({
  id,
  type,
  checked,
  message,
  fieldName,
  placeholder,
  className,
  register,
  error,
  value,
  patternRegex,
  patternMessage,
  onChange,
  maxLength,
}: {
  id?: string;
  type: string;
  value?: string | boolean;
  register?: any;
  fieldName?: any;
  checked?: boolean;
  message?: string;
  placeholder?: string;
  className?: string;
  error?: FieldError | undefined;
  patternRegex?: RegExp;
  patternMessage?: string;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return (
    <React.Fragment>
      <input
        id={id}
        type={type}
        maxLength={maxLength}
        value={value}
        checked={checked}
        {...register(fieldName, {
          onChange: onChange,
          required: {
            value:
              fieldName !== "restroom_name" || fieldName !== "project_name",
            message: message,
          },
          pattern: {
            value: patternRegex,
            message: patternMessage,
          },
        })}
        placeholder={placeholder}
        className={className}
      />
      {type !== "radio" && <ErrorMessage error={error} />}
    </React.Fragment>
  );
}

export default Input;
