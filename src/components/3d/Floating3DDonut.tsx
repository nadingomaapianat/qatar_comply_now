import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

interface DonutSegmentProps {
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  color: string;
  depth?: number;
  delay?: number;
}

const DonutSegment = ({ 
  innerRadius, 
  outerRadius, 
  startAngle, 
  endAngle, 
  color,
  depth = 0.3,
  delay = 0
}: DonutSegmentProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetAngle = useRef(startAngle);
  const currentAngle = useRef(startAngle);
  const startTime = useRef<number | null>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const segments = 64;
    
    // Outer arc
    for (let i = 0; i <= segments; i++) {
      const angle = startAngle + (currentAngle.current - startAngle) * (i / segments);
      const x = Math.cos(angle) * outerRadius;
      const y = Math.sin(angle) * outerRadius;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    
    // Inner arc (reverse)
    for (let i = segments; i >= 0; i--) {
      const angle = startAngle + (currentAngle.current - startAngle) * (i / segments);
      const x = Math.cos(angle) * innerRadius;
      const y = Math.sin(angle) * innerRadius;
      shape.lineTo(x, y);
    }
    
    shape.closePath();
    
    const extrudeSettings = {
      steps: 1,
      depth: depth,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [innerRadius, outerRadius, startAngle, depth]);

  useFrame((state) => {
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;
    
    if (elapsed > delay) {
      targetAngle.current = endAngle;
    }

    currentAngle.current = THREE.MathUtils.lerp(
      currentAngle.current,
      targetAngle.current,
      0.02
    );

    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, -depth / 2]}>
      <meshPhysicalMaterial
        color={color}
        roughness={0.15}
        metalness={0.8}
        transparent
        opacity={0.9}
        clearcoat={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Floating3DDonut = () => {
  const groupRef = useRef<THREE.Group>(null);

  const data = useMemo(() => [
    { value: 78, color: '#1f7c50', label: 'Compliant' },
    { value: 15, color: '#07ffa9', label: 'In Progress' },
    { value: 7, color: '#accbc3', label: 'Pending' },
  ], []);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} rotation={[0.5, 0, 0]}>
        {data.map((item, index) => {
          const startAngle = currentAngle;
          const segmentAngle = (item.value / total) * Math.PI * 2;
          currentAngle += segmentAngle;
          
          return (
            <DonutSegment
              key={index}
              innerRadius={1}
              outerRadius={1.8}
              startAngle={startAngle}
              endAngle={startAngle + segmentAngle}
              color={item.color}
              depth={0.4}
              delay={index * 0.2}
            />
          );
        })}
        
        {/* Center text */}
        <Text
          position={[0, 0, 0.3]}
          fontSize={0.5}
          color="#f0f5f3"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          78%
        </Text>
      </group>
    </Float>
  );
};

interface Floating3DDonutCanvasProps {
  className?: string;
}

export const Floating3DDonutCanvas = ({ className = '' }: Floating3DDonutCanvasProps) => {
  return (
    <div className={`w-full h-[320px] ${className}`}>
      <Canvas gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.4} color="#07ffa9" />
        
        <Floating3DDonut />
      </Canvas>
    </div>
  );
};

export default Floating3DDonutCanvas;
