import React, { ReactNode } from "react";

function Label({
  className,
  htmlFor,
  children,
}: {
  className?: string;
  htmlFor?: string;
  children?: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  );
}

export default Label;
