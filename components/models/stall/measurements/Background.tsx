import { animated } from '@react-spring/three';
import { OutlineColor } from '@/types/model';
import { Shape, ShapeGeometry } from 'three';

export default function Background({
  width,
  height,
  radius,
  color,
  borderColor
}: {
  width: number;
  height: number;
  radius: number;
  color: any
  borderColor: OutlineColor;
}) {
  // Rounded Rectangle Geometry
  const shape = new Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  // Creating Geometry with Options
  const geometry = new ShapeGeometry(shape);

  return (
    <animated.group>
      {/* Background Plane */}
      <animated.mesh geometry={geometry} material={color}></animated.mesh>
      {/* Border */}
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry attach="geometry" args={[geometry]} />
        <lineBasicMaterial attach="material" color={borderColor} />
      </lineSegments>
    </animated.group>
  );
};