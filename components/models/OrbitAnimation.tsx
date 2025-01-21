import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { LayoutDirection } from "@/types/model";

const animationSpeed = 0.3;

export default function OrbitAnimation({
  layoutDirection
}: {
  layoutDirection: LayoutDirection
}) {
  const controlsRef = useRef<any>(null);
  const [rotateSpeed, setRotateSpeed] = useState(animationSpeed);

  useEffect(() => {
    // Set initial rotation speed based on layoutDirection
    if (layoutDirection === "Left") setRotateSpeed(-animationSpeed); // Rotate in opposite direction
    else setRotateSpeed(animationSpeed); // Rotate normally

    const interval = setInterval(() => {
      if (controlsRef && controlsRef.current) {
        const azimuthAngle = controlsRef.current.getAzimuthalAngle();
        // Check if the camera has completed the 180-degree rotation
        if (azimuthAngle >= Math.PI || azimuthAngle <= 0) setRotateSpeed(speed => speed > 0 ? -animationSpeed : animationSpeed)
      }
    }, 100);

    return () => clearInterval(interval);
  }, [layoutDirection]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      autoRotate={true}
      autoRotateSpeed={rotateSpeed}
      minAzimuthAngle={0}
      maxAzimuthAngle={Math.PI}
      dampingFactor={0.3}
      panSpeed={0.1}
      maxDistance={200}
      minDistance={30}
    />
  )
}