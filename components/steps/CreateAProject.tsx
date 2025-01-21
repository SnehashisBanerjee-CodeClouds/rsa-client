"use client"; // Use Sepatate Components

import Link from "next/link";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/hooks/useStore";
import {
  changeColor,
  changeLayout,
  toggleAdaStall,
  updateNoOfStalls,
} from "@/lib/slices/roomSlice";
import { LayoutOption, StallColor } from "@/types/model";
import React from "react";

export default function CreateAProject() {
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <select
        defaultValue={"1"}
        onChange={(e) => dispatch(updateNoOfStalls(+e.target.value))}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
      </select>
      {/* <input type="checkbox" name="" id="" onChange={(e) => dispatch(toggleAdaStall())} /> Ada Stall */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div
            className="cursor-pointer w-24 h-24 bg-[#e80000]"
            onClick={() => dispatch(changeColor(StallColor.Red))}
          ></div>
          <div
            className="cursor-pointer w-24 h-24 bg-[#3fab3b]"
            onClick={() => dispatch(changeColor(StallColor.Green))}
          ></div>
          <div
            className="cursor-pointer w-24 h-24 bg-[#88c2e6]"
            onClick={() => dispatch(changeColor(StallColor.Sky))}
          ></div>
          <div
            className="cursor-pointer w-24 h-24 bg-[#000]"
            onClick={() => dispatch(changeColor(StallColor.Black))}
          ></div>
        </div>
        <div className="flex space-x-4">
          <div
            className="cursor-pointer w-24 h-24 bg-[#9c9c9c]"
            onClick={() => dispatch(changeColor(StallColor.Silver))}
          ></div>
          <div
            className="cursor-pointer w-24 h-24 bg-[#ce5f00]"
            onClick={() => dispatch(changeColor(StallColor.LightOrange))}
          ></div>
          <div
            className="cursor-pointer w-24 h-24 bg-[#3d58a4]"
            onClick={() => dispatch(changeColor(StallColor.LightBlue))}
          ></div>
          <div
            className="cursor-pointer w-24 h-24 bg-[#f2e1b2]"
            onClick={() => dispatch(changeColor(StallColor.LightGolden))}
          ></div>
        </div>
      </div>
      <select
        defaultValue={"inCornerRight"}
        className="mt-6"
        onChange={(e) => dispatch(changeLayout(e.target.value as LayoutOption))}
      >
        <option value="inCornerLeft">In Corner Left</option>
        <option value="inCornerRight">In Corner Right</option>
        <option value="betweenWallLeft">Between Wall Left</option>
        <option value="betweenWallRight">Between Wall Right</option>
        <option value="alcoveCornerLeft">Alcove Corner Left</option>
        <option value="alcoveCornerRight">Alcove Corner Right</option>
        <option value="alcoveBetweenWallLeft">Alcove Between Wall Left</option>
        <option value="alcoveBetweenWallRight">
          Alcove Between Wall Right
        </option>
      </select>

      <Link className="block mt-6" href="/select-a-layout">
        Next Page
      </Link>
    </React.Fragment>
  );
}
