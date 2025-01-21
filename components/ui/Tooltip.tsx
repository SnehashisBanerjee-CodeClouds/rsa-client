import React from "react";

function Tooltip({
  children,
  isTooltipOpen,
  toolTipIndex,
  stallId,
  tooltipMessage,
}: {
  children: React.ReactNode;
  isTooltipOpen: boolean;
  toolTipIndex?: number;
  stallId?: number;
  tooltipMessage: string;
}) {
  return (
    <div className="relative">
      {children}
      <div
        id="tooltip-default"
        role="tooltip"
        className={`absolute z-10 -top-10 right-[15px]  min-w-[140px] text-center leading-4 ${
          isTooltipOpen && toolTipIndex === stallId
            ? "inline-block"
            : "invisible"
        }  px-3 pt-1 pb-2  text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm  tooltip dark:bg-gray-700`}
      >
        {tooltipMessage}
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
}

export default Tooltip;
