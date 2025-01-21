import { MouseEventHandler, ReactNode } from "react";

export default function Button({
  children,
  type = "button",
  name,
  color = "default",
  isActionButton = false,
  onClick,
  isDisabled,
  className,
}: {
  children: ReactNode;
  type?: "button" | "reset" | "submit" | undefined;
  name?: string;
  color?: "default" | "secondary";
  isActionButton?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  className?: string;
}) {

  return (
    <button
      type={type}
      name={name}
      className={`${className ? className : ``} ${color} ${isActionButton ? `action-button` : ``}${isDisabled ? ` pointer-events-none opacity-50` : ``}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}