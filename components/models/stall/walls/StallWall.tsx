import React from "react";
import { AlcoveDepth, DoorOpening, GLTFStall, Layout, StallColor, StallWidth, StandardDepth } from "@/types/model";
import StallBackWall from "@/components/models/stall/walls/StallBackWall";
import LayoutSideWall from "@/components/models/stall/walls/LayoutSideWall";
import LayoutFrontWall from "@/components/models/stall/walls/LayoutFrontWall";
import StallSeparatorRightWall from "@/components/models/stall/walls/StallSeparatorRightWall";
import StallSeparatorLeftWall from "@/components/models/stall/walls/StallSeparatorLeftWall";

export default function StallWall({
  nodesData,
  stallColor = StallColor.LightGolden,
  isFirst = false,
  isLast = false,
  layout,
  stallWidth,
  standardDepth,
  alcoveDepth,
  doorOpening
}: {
  nodesData: GLTFStall;
  stallColor?: StallColor;
  isFirst?: boolean;
  isLast?: boolean;
  layout: Layout;
  stallWidth: StallWidth;
  standardDepth: StandardDepth;
  alcoveDepth: AlcoveDepth;
  doorOpening?:DoorOpening
}) {
  const { layoutDirection, layoutOption } = layout;
  // If the Stall in the First Place
  if (isFirst)
    return (
      <>
        <StallBackWall nodesData={nodesData} stallWidth={stallWidth} standardDepth={standardDepth} layoutOption={layoutOption} isFirst={isFirst} isLast={isLast} />
        {(layoutOption === "inCornerLeft" ||
          layoutOption === "inCornerRight" ||
          layoutOption === "alcoveCornerLeft" ||
          layoutOption === "alcoveCornerRight") && (
            <>
              <LayoutSideWall
                nodesData={nodesData}
                placeAt={layoutDirection}
                layout={layout}
                stallWidth={stallWidth}
                standardDepth={standardDepth}
             
              />
              {(layoutOption === "alcoveCornerLeft" ||
                layoutOption === "alcoveCornerRight") && (
                  <LayoutFrontWall
                    nodesData={nodesData}
                    layoutDirection={layoutDirection}
                    stallWidth={stallWidth}
                    standardDepth={standardDepth}
                    alcoveDepth={alcoveDepth}
                    doorOpening={doorOpening}
                  />
                )}
              {layoutDirection === "Left" ? (
                <StallSeparatorRightWall
                  nodesData={nodesData}
                  stallColor={stallColor}
                  stallWidth={stallWidth}
                  standardDepth={standardDepth}
                  alcoveDepth={alcoveDepth}
                  layout={layout}
                  isFirst={isFirst}
                />
              ) : (
                <StallSeparatorLeftWall
                  nodesData={nodesData}
                  stallColor={stallColor}
                  stallWidth={stallWidth}
                  standardDepth={standardDepth}
                  alcoveDepth={alcoveDepth}
                  layout={layout}
                  isFirst={isFirst}
                />
              )}
            </>
          )}
        {(layoutOption === "betweenWallLeft" ||
          layoutOption === "betweenWallRight") && (
            <>
              <LayoutSideWall
                nodesData={nodesData}
                placeAt={layoutDirection}
                layout={layout}
                stallWidth={stallWidth}
                standardDepth={standardDepth}
                
              />
              {isLast ? (
                <>
                  <LayoutSideWall
                    nodesData={nodesData}
                    placeAt="Left"
                    layout={layout}
                    stallWidth={stallWidth}
                    standardDepth={standardDepth}
                   
                  />
                  <LayoutSideWall
                    nodesData={nodesData}
                    placeAt="Right"
                    layout={layout}
                    stallWidth={stallWidth}
                    standardDepth={standardDepth}
                  
                  />
                </>
              ) : layoutDirection === "Left" ? (
                <StallSeparatorRightWall
                  nodesData={nodesData}
                  stallColor={stallColor}
                  stallWidth={stallWidth}
                  standardDepth={standardDepth}
                  alcoveDepth={alcoveDepth}
                  layout={layout}
                  isFirst={isFirst}
                />
              ) : (
                <StallSeparatorLeftWall
                  nodesData={nodesData}
                  stallColor={stallColor}
                  stallWidth={stallWidth}
                  standardDepth={standardDepth}
                  alcoveDepth={alcoveDepth}
                  layout={layout}
                  isFirst={isFirst}
                />
              )}
            </>
          )}
        {(layoutOption === "alcoveBetweenWallLeft" ||
          layoutOption === "alcoveBetweenWallRight") && (
            <>
              <LayoutSideWall
                nodesData={nodesData}
                placeAt={layoutDirection}
                layout={layout}
                stallWidth={stallWidth}
                standardDepth={standardDepth}
              
              />
              <LayoutFrontWall
                nodesData={nodesData}
                layoutDirection={layoutDirection}
                stallWidth={stallWidth}
                standardDepth={standardDepth}
                alcoveDepth={alcoveDepth}
                doorOpening={doorOpening}
              />
              {isLast ? (
                <LayoutSideWall
                  nodesData={nodesData}
                  placeAt={layoutDirection === "Left" ? "Right" : "Left"}
                  layout={layout}
                  stallWidth={stallWidth}
                  standardDepth={standardDepth}
           
                />
              ) : layoutDirection === "Left" ? (
                <StallSeparatorRightWall
                  nodesData={nodesData}
                  stallColor={stallColor}
                  stallWidth={stallWidth}
                  standardDepth={standardDepth}
                  alcoveDepth={alcoveDepth}
                  layout={layout}
                  isFirst={isFirst}
                />
              ) : (
                <StallSeparatorLeftWall
                  nodesData={nodesData}
                  stallColor={stallColor}
                  stallWidth={stallWidth}
                  standardDepth={standardDepth}
                  alcoveDepth={alcoveDepth}
                  layout={layout}
                  isFirst={isFirst}
                />
              )}
            </>
          )}
      </>
    );
  // If the Stall in the Last Place
  if (isLast)
    return (
      <>
        <StallBackWall nodesData={nodesData} stallWidth={stallWidth} standardDepth={standardDepth} layoutOption={layoutOption} isFirst={isFirst} isLast={isLast} />
        {(layoutOption === "inCornerLeft" ||
          layoutOption === "inCornerRight" ||
          layoutOption === "alcoveCornerLeft" ||
          layoutOption === "alcoveCornerRight") && (
            <>
              {layoutDirection === "Left" ? (
                <StallSeparatorRightWall
                  nodesData={nodesData}
                  stallColor={stallColor}
                  stallWidth={stallWidth}
                  standardDepth={standardDepth}
                  alcoveDepth={alcoveDepth}
                  layout={layout}
                  isFirst={isFirst}
                />
              ) : (
                <StallSeparatorLeftWall
                  nodesData={nodesData}
                  stallColor={stallColor}
                  stallWidth={stallWidth}
                  standardDepth={standardDepth}
                  alcoveDepth={alcoveDepth}
                  layout={layout}
                  isFirst={isFirst}
                />
              )}
            </>
          )}
        {(layoutOption === "betweenWallLeft" ||
          layoutOption === "betweenWallRight" ||
          layoutOption === "alcoveBetweenWallLeft" ||
          layoutOption === "alcoveBetweenWallRight") && (
            <LayoutSideWall
              nodesData={nodesData}
              placeAt={layoutDirection === "Left" ? "Right" : "Left"}
              layout={layout}
              stallWidth={stallWidth}
              standardDepth={standardDepth}
            />
          )}
      </>
    );
  // If the Stall in middle
  return (
    <>
      <StallBackWall nodesData={nodesData} stallWidth={stallWidth} standardDepth={standardDepth} layoutOption={layoutOption} isFirst={isFirst} isLast={isLast} />
      <StallSeparatorRightWall nodesData={nodesData} stallColor={stallColor} stallWidth={stallWidth} standardDepth={standardDepth} alcoveDepth={alcoveDepth} layout={layout} isFirst={isFirst} />
      <StallSeparatorLeftWall nodesData={nodesData} stallColor={stallColor} stallWidth={stallWidth} standardDepth={standardDepth} alcoveDepth={alcoveDepth} layout={layout} isFirst={isFirst} />
    </>
  );
}
