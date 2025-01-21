import React, { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { changeSelectedStall } from "@/lib/slices/roomSlice";
import { UrinalScreenConfig, View } from "@/types/model";

import UrinalScreenModel from "@/components/models/urinal-screen/UrinalScreenModel";

export default function CameraControls({
  position,
  urinalScreenConfig,
  zoom,
  view,
}: {
  position: [number, number, number];
  urinalScreenConfig: UrinalScreenConfig[];
  zoom: number;
  view: View;
}) {
  // Get Camera
  const { camera } = useThree();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { selectedRoom, rooms } = useAppSelector(
    (state) => state.room
  );

  const {urinalScreen } =
    rooms[selectedRoom.roomIndex];
  const {urinalScreensDepth } = urinalScreen;
  // Select Stall Hanlder
  const selectStallHandler = useCallback((stallId: number) => dispatch(changeSelectedStall({ stallId })), []);

  // Update Camera Controls
  useEffect(() => {
    const animation = setTimeout(() => {
      // Updating Position
      const startPosition = new Vector3().copy(camera.position);
      const endPosition = new Vector3(...position);
      const duration = 1000;
      const stepTime = 15;
      const steps = duration / stepTime;
      let currentStep = 0;
      const updatingPosition = setInterval(() => {
        currentStep++;
        const t = Math.min(currentStep / steps, 1);
        // Updating Position 1 by 1 so that it will look like an Animation
        const newX = startPosition.x + (endPosition.x - startPosition.x) * t;
        const newY = startPosition.y + (endPosition.y - startPosition.y) * t;
        const newZ = startPosition.z + (endPosition.z - startPosition.z) * t;
        camera.position.set(newX, newY, newZ);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        if (t === 1) clearInterval(updatingPosition);
      }, stepTime);

      // Updating Zoom
      let prevZoom = camera.zoom;
      const updatingZoom = setInterval(() => {
        camera.zoom = prevZoom;
        // ...
        camera.updateProjectionMatrix();
        // When the zoom get stabled
        if (Math.ceil(prevZoom) === zoom) clearInterval(updatingZoom);
        // Change prevZoom 1 by 1
        prevZoom = zoom > camera.zoom ? prevZoom + 1 : prevZoom - 1;
      }, 15);
    }, 0);

    return () => clearTimeout(animation);
  }, [camera, position, zoom]);

  return (
    <>
      {urinalScreenConfig.map((urinalScreen, idx) => (
        <UrinalScreenModel
          key={idx}
          urinalScreenId={idx}
          position={{
            x: urinalScreen.x,
            y: urinalScreen.y,
            z: urinalScreen.z
          }}
          isFirst={idx === 0}
          isLast={idx + 1 === urinalScreenConfig.length}
          view={view}
          isSelected={pathname === "/calculate-urinal-measurements" && urinalScreen.isOpened}
          allowedMeasurements={pathname === "/calculate-urinal-measurements"}
          selectStallHandler={selectStallHandler}
          urinalScreensDepth={urinalScreensDepth}
        />
      )
      )}
    </>
  );
}
