export default function StallConfigSkeleton({ idx }: { idx: number }) {
  return (
    <div className="mt-2 animate-pulse">
      <h2>
        <button
          type="button"
          className="flex items-center justify-between w-full pb-4 pr-5 font-medium rtl:text-right !text-black border-b border-black rounded-t-xl focus:text-black hover:text-black gap-3 bg-transparent group text-[16px]"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <div className="h-5 bg-gray-100 rounded-md dark:bg-gray-700 w-20"></div>
          <div className="h-5 bg-gray-100 rounded-md dark:bg-gray-700 w-5"></div>
        </button>
      </h2>
      <div>
        <div className={`keg_details ${idx === 0 ? "pb-3" : ""}`}>
          {idx === 0 && (
            <div className="stall_box_area grid md:grid-cols-3 grid-cols-1 gap-x-5 lg:gap-x-16 gap-2 mt-3">
              <div className="stall_box w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[14px] font-medium">
                    <div className="h-4 bg-gray-100 rounded-md dark:bg-gray-700 w-16"></div>
                  </span>
                  <div className="h-4 bg-gray-100 rounded-md dark:bg-gray-700 w-4"></div>
                </div>
                <div className="h-10 bg-gray-100 rounded-md dark:bg-gray-700 w-22"></div>
              </div>
              <div className="stall_box w-full">
                <div className="flex justify-between items-center mb-1">
                  <span>
                    <div className="h-4 bg-gray-100 rounded-md dark:bg-gray-700 w-20"></div>
                  </span>
                  <div className="h-4 bg-gray-100 rounded-md dark:bg-gray-700 w-4"></div>
                </div>
                <div className="h-10 bg-gray-100 rounded-md dark:bg-gray-700 w-22"></div>
              </div>
              <div className="stall_box w-full">
                <div className="flex justify-between items-center mb-1">
                  <span>
                    <div className="h-4 bg-gray-100 rounded-md dark:bg-gray-700 w-16"></div>
                  </span>
                  <div className="h-4 bg-gray-100 rounded-md dark:bg-gray-700 w-4"></div>
                </div>
                <div className="h-10 bg-gray-100 rounded-md dark:bg-gray-700 w-22"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
