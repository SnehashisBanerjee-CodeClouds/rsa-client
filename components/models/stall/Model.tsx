"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, useTexture } from "@react-three/drei";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";

import RoomSwitcher from "@/components/models/RoomSwitcher";
import ModelSwitcher from "@/components/models/ModelSwitcher";
import OrbitAnimation from "@/components/models/OrbitAnimation";
import CameraControls from "@/components/models/stall/CameraControls";
import { usePathname } from "next/navigation";
import { uploadCanvasAsImage } from "@/lib/slices/roomSlice";
import * as THREE from "three";
export default function Model() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  // Pulsate
  const [pulsate, setPulsate] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [orbitControls, setOrbitControls] = useState(false);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [backgroundChoice, setBackgroundChoice] = useState("color");
  const [bgTexture, setBgTexture] = useState<THREE.Texture | null>(null);
  const { selectedRoom, rooms } = useAppSelector((state) => state.room);
  const {
    noOfStalls,
    stallColor,
    wallTexture,
    stallConfig,
    adaToiletPosition,
    standardDepth,
    alcoveDepth,
    adaDepth,
    cameraControls: { view, position, zoom },
    layout,
    overallRoomWidth,
    overallRoomFraction,
  } = rooms[selectedRoom.roomIndex].stall;
  useEffect(() => {
    if (pathname === "/calculate-measurements") {
      setPulsate(true);
      setTimeout(() => {
        setPulsate(false);
      }, 3000);
    }
  }, [pathname]);
  useEffect(() => {
    if (wallTexture !== "" || wallTexture !== undefined) {
      setBackgroundChoice("texture");
    } else {
      setBackgroundChoice("color");
    }
  }, [wallTexture]);
  const loadBackground = () => {
    if (wallTexture !== "") {
      // const textureLoader = new THREE.TextureLoader();
      // textureLoader.setCrossOrigin("anonymous");
      // const texture = textureLoader.load(wallTexture);
      // setBgTexture(texture);
      setBgTexture(null);
    } else {
      setBgTexture(null); // Use default solid color background
    }
  };

  // Call the function to load the background when backgroundChoice changes
  useEffect(() => {
    loadBackground();
  }, [wallTexture]);
  // Effect for Capturing Canvas Image
  useEffect(() => {
    if (pathname === "/calculate-measurements") {
      const debounce = setTimeout(() => {
        if (canvasRef.current) {
          const canvasCapture = canvasRef.current.toDataURL("image/png");
          const img = new Image();
          img.src = canvasCapture;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Set the canvas width and height to the desired size
            const zoomedWidth = img.width * 1.15;
            const zoomedHeight = img.height * 1.15;

            canvas.width = zoomedWidth;
            canvas.height = zoomedHeight;
            // Draw the image on the canvas with the new width and height
            ctx?.drawImage(img, 0, 0, zoomedWidth, zoomedHeight);
            // Convert the canvas content back to base64
            const resizedBase64 = canvas.toDataURL("image/png");
            dispatch(
              uploadCanvasAsImage({
                view: view,
                canvasImage: resizedBase64,
                modelType: "stall",
              })
            );
          };
          // Dispaching Canvas Image
        }
      }, 1000);

      return () => clearTimeout(debounce);
    }
  }, [
    selectedRoom,
    view,
    stallConfig,
    stallColor,
    wallTexture,
    standardDepth,
    adaDepth,
    overallRoomWidth,
  ]);

  // Put the sharpened image data back onto the canvas
  return (
    <>
      {canvasLoaded && (
        <>
          <RoomSwitcher
            selectedRoom={selectedRoom}
            rooms={rooms}
            view={view}
            className={
              pathname === "/share-contact-details" ||
              pathname === "/choose-materials"
                ? "md:left-4"
                : "md:left-[inherit]"
            }
          />

          <ModelSwitcher
            view={view}
            setOrbitControls={setOrbitControls}
            pulsate={pulsate}
          />
        </>
      )}
      {noOfStalls > 0 && (
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            canvasRef.current = gl.domElement;
            setCanvasLoaded(true); // Capture the canvas DOM element
          }}
          ref={canvasRef}
          className="px-2 h-full cursor-pointer pt-8"
          fallback={
            <div className="flex items-center justify-center h-full w-full mx-2 bg-gray-100 rounded-lg">
              <span>Unable to load 3D Model...</span>
            </div>
          }
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
            adaToiletPosition={adaToiletPosition ?? layout.layoutDirection}
            stallConfig={stallConfig}
            stallColor={stallColor}
            bgTexture={bgTexture}
            standardDepth={standardDepth}
            alcoveDepth={alcoveDepth}
            adaDepth={adaDepth}
            overallRoomWidth={overallRoomWidth}
            overallRoomFraction={overallRoomFraction}
            zoom={zoom}
            layout={layout}
            view={view}
            pulsate={pulsate}
          />
          {/* OrbitControls */}
          {orbitControls && (
            <OrbitAnimation layoutDirection={layout.layoutDirection} />
          )}
        </Canvas>
      )}
    </>
  );
}
