import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface Bar3DProps {
  position: [number, number, number];
  height: number;
  color: string;
  delay?: number;
  label?: string;
}

const Bar3D = ({ position, height, color, delay = 0, label }: Bar3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetHeight = useRef(0);
  const currentHeight = useRef(0.01);
  const startTime = useRef<number | null>(null);

  useFrame((state) => {
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;
    
    if (elapsed > delay) {
      targetHeight.current = height;
    }

    // Smooth animation
    currentHeight.current = THREE.MathUtils.lerp(
      currentHeight.current,
      targetHeight.current,
      0.03
    );

    if (meshRef.current) {
      meshRef.current.scale.y = currentHeight.current;
      meshRef.current.position.y = position[1] + (currentHeight.current * 0.5);
      
      // Subtle hover animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={[0.6, 1, 0.6]}
        radius={0.08}
        smoothness={4}
        position={[position[0], position[1], position[2]]}
      >
        <meshPhysicalMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          transparent
          opacity={0.9}
          clearcoat={0.5}
        />
      </RoundedBox>
      {label && (
        <Text
          position={[position[0], -0.3, position[2] + 0.5]}
          fontSize={0.2}
          color="#accbc3"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

const Floating3DBarChart = () => {
  const groupRef = useRef<THREE.Group>(null);

  const data = useMemo(() => [
    { value: 0.92, color: '#1f7c50', label: 'COSO' },
    { value: 0.87, color: '#10b981', label: 'Cyber' },
    { value: 0.78, color: '#07ffa9', label: 'Data' },
    { value: 0.85, color: '#accbc3', label: 'ESG' },
    { value: 0.91, color: '#06B6D4', label: 'AML' },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {data.map((item, index) => (
          <Bar3D
            key={index}
            position={[(index - 2) * 1.2, 0, 0]}
            height={item.value * 2.5}
            color={item.color}
            delay={index * 0.15}
            label={item.label}
          />
        ))}
        
        {/* Base platform */}
        <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8, 2]} />
          <meshPhysicalMaterial
            color="#0a0f0d"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
};

interface Floating3DBarChartCanvasProps {
  className?: string;
}

export const Floating3DBarChartCanvas = ({ className = '' }: Floating3DBarChartCanvasProps) => {
  return (
    <div className={`w-full h-[350px] ${className}`}>
      <Canvas gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={35} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#07ffa9" />
        
        <Floating3DBarChart />
      </Canvas>
    </div>
  );
};

export default Floating3DBarChartCanvas;
