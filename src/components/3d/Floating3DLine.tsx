import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedLineProps {
  points: [number, number, number][];
  color: string;
  lineWidth?: number;
  delay?: number;
}

const AnimatedLine = ({ points, color, lineWidth = 3, delay = 0 }: AnimatedLineProps) => {
  const lineRef = useRef<any>(null);
  const progressRef = useRef(0);
  const startTime = useRef<number | null>(null);

  const curvePoints = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      points.map(p => new THREE.Vector3(...p))
    );
    return curve.getPoints(50);
  }, [points]);

  useFrame((state) => {
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;
    
    if (elapsed > delay) {
      progressRef.current = THREE.MathUtils.lerp(progressRef.current, 1, 0.02);
    }

    if (lineRef.current) {
      const visiblePoints = Math.floor(curvePoints.length * progressRef.current);
      // Note: drei Line doesn't support dynamic point counts easily,
      // so we use opacity animation instead
      lineRef.current.material.opacity = progressRef.current;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={curvePoints}
      color={color}
      lineWidth={lineWidth}
      transparent
      opacity={0}
    />
  );
};

interface DataPointProps {
  position: [number, number, number];
  color: string;
  delay?: number;
}

const DataPoint = ({ position, color, delay = 0 }: DataPointProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTime = useRef<number | null>(null);
  const scale = useRef(0);

  useFrame((state) => {
    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - startTime.current;
    
    if (elapsed > delay) {
      scale.current = THREE.MathUtils.lerp(scale.current, 1, 0.05);
    }

    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale.current);
      // Pulsing effect
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.multiplyScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.12, 16, 16]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

const Floating3DLine = () => {
  const groupRef = useRef<THREE.Group>(null);

  const complianceData = useMemo(() => [
    [-3, -1.5, 0],
    [-2, -1, 0],
    [-1, -0.3, 0],
    [0, 0.2, 0],
    [1, 0.8, 0],
    [2, 1.3, 0],
    [3, 1.8, 0],
  ] as [number, number, number][], []);

  const riskData = useMemo(() => [
    [-3, 1.2, 0],
    [-2, 0.8, 0],
    [-1, 0.4, 0],
    [0, 0.1, 0],
    [1, -0.4, 0],
    [2, -0.9, 0],
    [3, -1.3, 0],
  ] as [number, number, number][], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Compliance line */}
        <AnimatedLine 
          points={complianceData} 
          color="#1f7c50" 
          lineWidth={4}
          delay={0}
        />
        {complianceData.map((point, index) => (
          <DataPoint 
            key={`compliance-${index}`} 
            position={point} 
            color="#1f7c50"
            delay={index * 0.1}
          />
        ))}

        {/* Risk line */}
        <AnimatedLine 
          points={riskData} 
          color="#07ffa9" 
          lineWidth={4}
          delay={0.3}
        />
        {riskData.map((point, index) => (
          <DataPoint 
            key={`risk-${index}`} 
            position={point} 
            color="#07ffa9"
            delay={0.3 + index * 0.1}
          />
        ))}

        {/* Grid plane */}
        <gridHelper 
          args={[8, 8, '#1a2420', '#1a2420']} 
          position={[0, -2, 0]} 
          rotation={[0, 0, 0]}
        />
      </group>
    </Float>
  );
};

interface Floating3DLineCanvasProps {
  className?: string;
}

export const Floating3DLineCanvas = ({ className = '' }: Floating3DLineCanvasProps) => {
  return (
    <div className={`w-full h-[350px] ${className}`}>
      <Canvas gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={35} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#07ffa9" />
        
        <Floating3DLine />
      </Canvas>
    </div>
  );
};

export default Floating3DLineCanvas;
