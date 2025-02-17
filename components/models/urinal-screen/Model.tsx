"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";

import RoomSwitcher from "@/components/models/RoomSwitcher";
import ModelSwitcher from "@/components/models/ModelSwitcher";
import OrbitAnimation from "@/components/models/OrbitAnimation";
import CameraControls from "@/components/models/urinal-screen/CameraControls";
import { uploadCanvasAsImage } from "@/lib/slices/roomSlice";
import { usePathname } from "next/navigation";

export default function Model() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [orbitControls, setOrbitControls] = useState(false);
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);
  const {
    noOfUrinalScreens,
    urinalScreenConfig,
    cameraControls: { view, position, zoom },
  } = rooms[selectedRoom.roomIndex].urinalScreen;

  // Effect for Capturing Canvas Image
  useEffect(() => {
    if (pathname === "/select-urinal-screens") {
      const debounce = setTimeout(() => {
        if (canvasRef.current) {
          const canvasCapture = canvasRef.current.toDataURL("image/png");
          // Dispaching Canvas Image
          dispatch(
            uploadCanvasAsImage({
              view: view,
              canvasImage: canvasCapture,
              modelType: "screen",
            })
          );
        }
      }, 1000);

      return () => clearTimeout(debounce);
    }
  }, [
    selectedRoom,
    view,
    urinalScreenConfig
  ]);

  return (
    <>
      <RoomSwitcher selectedRoom={selectedRoom} rooms={rooms} view={view} />
      <ModelSwitcher view={view} setOrbitControls={setOrbitControls} />
      {noOfUrinalScreens > 0 && (
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            canvasRef.current = gl.domElement;
            // Capture the canvas DOM element
          }}
          ref={canvasRef}
          className="px-2 h-full cursor-pointer pt-8"
          fallback={(
            <div className="flex items-center justify-center h-full w-full mx-2 bg-gray-100 rounded-lg">
              <span>Unable to load 3D Model...</span>
            </div>
          )}
          camera={{ fov: 75, near: 0.1, far: 1000, position, zoom }}
          shadows
        >
          {/* Lights */}
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[100, 100, 100]}
            angle={360}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight position={[0, -10, -100]} decay={0} intensity={Math.PI} />
          <Environment preset="forest" />
          {/* Camera Controls */}
          <CameraControls
            position={position}
            urinalScreenConfig={urinalScreenConfig}
            zoom={zoom}
            view={view}
          />
          {/* OrbitControls */}
          {orbitControls && <OrbitAnimation layoutDirection={"Left"} />}
        </Canvas>
      )}
    </>
  );
}
