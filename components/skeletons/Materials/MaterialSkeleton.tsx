import Label from "@/components/ui/Label";
import { materialList } from "@/constants/step";
import React from "react";

function MaterialSkeleton() {
  return (
    <>
      <div className="materials">
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-x-6 xl:gap-x-8">
          {materialList.map((data) => (
            <li key={data.id}>
              <span className="material_name bg-gray-100 rounded-md animate-pulse block text-transparent">
                {data.name}
              </span>
              <Label className=" bg-gray-100 w-[264.39px] h-[201.97px] block animate-pulse rounded-md"></Label>

              <div className="material_price bg-gray-100 rounded-md animate-pulse block text-transparent">
                {data.price}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="row items-center justify-center">
        <div className="select_color row lg:justify-between justify-center pr-4 mt-6 xl:mt-20 w-full gap-5">
          <div className="select_color_all flex flex-col">
            {/* <h3
              className="bg-gray-100 rounded-md animate-pulse block w-[60%]"
              style={{ color: "transparent" }}
            >
              Select a Color*
            </h3> */}
            <button
              type="button"
              className="custom_btn y_btn mt-0 my-1 !px-10 disabled:opacity-35 !bg-gray-100 !text-transparent animate-pulse pointer-events-none"
            >
              Select Color
            </button>
            <button
              type="button"
              className="custom_btn y_btn my-1 !px-10 disabled:opacity-35 !bg-gray-100 !text-transparent animate-pulse pointer-events-none"
            >
              View Model
            </button>
          </div>
          <div className="clr-box_holder ">
            <div className="clr-box mb-2 !bg-gray-100 animate-pulse !border-none rounded-md"></div>
            <span className="bg-gray-100 rounded-md p-1 text-transparent animate-pulse">
              Green
            </span>
          </div>
        </div>
        <div className="select_color_right mt-6 xl:mt-10 pl-4 w-full lg:w-3/5">
          <h4>
            These galvanized metal partitions are finished with a powder coating
            that is highly resistant to stains, corrosion, and more.
          </h4>
          <a
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            className="custom_btn border_btn"
            type="button"
          >
            Learn more
          </a>
        </div>
      </div>
    </>
  );
}

export default MaterialSkeleton;
