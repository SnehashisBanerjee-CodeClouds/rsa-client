import React from "react";
import { animated } from "@react-spring/three";
import { ADADepth, AlcoveDepth, DoorOpening, GLTFAdaStall, GLTFStall, Layout, StallADAWidth, StallColor, StallWidth, StandardDepth } from "@/types/model";

import SupportLeft from "@/components/models/stall/supports/SupportLeft";
import SupportRight from "@/components/models/stall/supports/SupportRight";
import * as THREE from 'three';
export default function Support({
  nodesData,
  stallId,
  stallColor = StallColor.LightGolden,
  isFirst = false,
  isLast = false,
  layout,
  isAda,
  adaDepth = "62",
  stallWidth,
  standardDepth,
  alcoveDepth,
  doorOpening,
  bgTexture
}: {
  nodesData: GLTFStall | GLTFAdaStall;
  stallId: number;
  stallColor?: StallColor;
  isFirst?: boolean;
  isLast?: boolean;
  layout: Layout;
  isAda?: boolean;
  adaDepth?: ADADepth;
  stallWidth: StallWidth | StallADAWidth;
  standardDepth: StandardDepth;
  alcoveDepth?: AlcoveDepth;
  doorOpening?: DoorOpening;
  bgTexture: THREE.Texture | null;
}) {
  return (
    <animated.group>
      <SupportLeft
        nodesData={nodesData}
        stallId={stallId}
        stallColor={stallColor}
        isFirst={isFirst}
        isLast={isLast}
        layout={layout}
        isAda={isAda}
        bgTexture={bgTexture}
        adaDepth={adaDepth}
        stallWidth={stallWidth}
        standardDepth={standardDepth}
        alcoveDepth={alcoveDepth}
        doorOpening={doorOpening}
      />
      <SupportRight
        nodesData={nodesData}
        stallId={stallId}
        stallColor={stallColor}
        isFirst={isFirst}
        isLast={isLast}
        layout={layout}
        bgTexture={bgTexture}
        isAda={isAda}
        adaDepth={adaDepth}
        stallWidth={stallWidth}
        standardDepth={standardDepth}
        alcoveDepth={alcoveDepth}
        doorOpening={doorOpening}
      />
    </animated.group>
  )
}