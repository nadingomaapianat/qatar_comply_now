import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Box, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingSphereProps {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
  distort?: number;
}

const FloatingSphere = ({ position, color, size = 1, speed = 1, distort = 0.3 }: FloatingSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
};

interface FloatingCubeProps {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}

const FloatingCube = ({ position, color, size = 1, speed = 1 }: FloatingCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25 * speed;
    }
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.8} floatIntensity={1.2}>
      <Box ref={meshRef} args={[size, size, size]} position={position}>
        <MeshWobbleMaterial
          color={color}
          attach="material"
          factor={0.2}
          speed={1}
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.75}
        />
      </Box>
    </Float>
  );
};

interface FloatingTorusProps {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}

const FloatingTorus = ({ position, color, size = 1, speed = 1 }: FloatingTorusProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <Float speed={speed * 1.2} rotationIntensity={1} floatIntensity={0.8}>
      <Torus ref={meshRef} args={[size, size * 0.3, 32, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </Torus>
    </Float>
  );
};

interface GlassIcosahedronProps {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}

const GlassIcosahedron = ({ position, color, size = 1, speed = 1 }: GlassIcosahedronProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.5}>
      <Icosahedron ref={meshRef} args={[size, 1]} position={position}>
        <meshPhysicalMaterial
          color={color}
          roughness={0}
          metalness={0.2}
          transparent
          opacity={0.6}
          transmission={0.6}
          thickness={0.5}
        />
      </Icosahedron>
    </Float>
  );
};

const FloatingElements = () => {
  const colors = useMemo(() => ({
    primary: '#1f7c50',
    mint: '#07ffa9',
    sage: '#accbc3',
    purple: '#6B46C1',
    blue: '#3B82F6',
    pink: '#EC4899',
    cyan: '#06B6D4',
  }), []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={colors.mint} />
        <pointLight position={[5, -5, 5]} intensity={0.3} color={colors.cyan} />

        {/* Large decorative sphere - top right */}
        <FloatingSphere 
          position={[4, 2, -2]} 
          color={colors.mint} 
          size={1.2} 
          speed={0.8}
          distort={0.4}
        />
        
        {/* Medium sphere - left side */}
        <FloatingSphere 
          position={[-5, 0, -3]} 
          color={colors.primary} 
          size={0.9}
          speed={1}
          distort={0.3}
        />
        
        {/* Small sphere - bottom */}
        <FloatingSphere 
          position={[2, -3, -1]} 
          color={colors.sage} 
          size={0.6}
          speed={1.2}
          distort={0.2}
        />

        {/* Floating cubes */}
        <FloatingCube 
          position={[-3, 3, -4]} 
          color={colors.cyan} 
          size={0.8}
          speed={0.6}
        />
        <FloatingCube 
          position={[5, -2, -3]} 
          color={colors.purple} 
          size={0.5}
          speed={0.9}
        />

        {/* Floating torus */}
        <FloatingTorus 
          position={[-4, -2, -2]} 
          color={colors.mint} 
          size={0.7}
          speed={0.7}
        />
        <FloatingTorus 
          position={[3, 3, -5]} 
          color={colors.blue} 
          size={0.5}
          speed={1.1}
        />

        {/* Glass icosahedron */}
        <GlassIcosahedron 
          position={[0, 1, -2]} 
          color={colors.mint} 
          size={0.8}
          speed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default FloatingElements;
