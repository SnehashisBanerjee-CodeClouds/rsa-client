import React, { ReactNode } from "react";

function Option({
  value,
  selected,
  children,
  disabled,
}: {
  value: number | string;
  selected?: boolean;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <option value={value} selected={selected} disabled={disabled}>
      {children}
    </option>
  );
}

export default Option;
