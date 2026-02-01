import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface GlassSphereProps {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}

const GlassSphere = ({ position, color, size = 1, speed = 1 }: GlassSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 * speed;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={0.25}
          speed={2}
          roughness={0.05}
          metalness={0.95}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

interface AbstractShapeProps {
  position: [number, number, number];
  color: string;
  size?: number;
}

const AbstractShape = ({ position, color, size = 1 }: AbstractShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[size * 0.6, size * 0.2, 128, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.7}
          transmission={0.3}
        />
      </mesh>
    </Float>
  );
};

// Parallax camera controller
const ParallaxCamera = () => {
  const { camera } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.5, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouse.y * 0.3, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

interface Scene3DProps {
  variant?: 'hero' | 'section';
}

const Scene3D = ({ variant = 'hero' }: Scene3DProps) => {
  const colors = {
    primary: '#1f7c50',
    mint: '#07ffa9',
    sage: '#accbc3',
    cyan: '#06B6D4',
    purple: '#6B46C1',
  };

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
        <ParallaxCamera />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, 5, -5]} intensity={0.6} color={colors.mint} />
        <pointLight position={[5, -10, 5]} intensity={0.4} color={colors.cyan} />

        <Suspense fallback={null}>
          {variant === 'hero' && (
            <>
              <GlassSphere position={[4.5, 1.5, -3]} color={colors.mint} size={1.4} speed={0.6} />
              <GlassSphere position={[-4, -1, -2]} color={colors.primary} size={1} speed={0.8} />
              <GlassSphere position={[2, -2.5, -4]} color={colors.sage} size={0.7} speed={1} />
              <GlassSphere position={[-2, 2.5, -5]} color={colors.cyan} size={0.5} speed={1.2} />
              
              <AbstractShape position={[-5, 2, -4]} color={colors.purple} size={0.8} />
              <AbstractShape position={[5, -1.5, -5]} color={colors.mint} size={0.6} />
            </>
          )}
          
          {variant === 'section' && (
            <>
              <GlassSphere position={[5, 0, -3]} color={colors.mint} size={1.2} speed={0.5} />
              <GlassSphere position={[-5, 1, -4]} color={colors.primary} size={0.8} speed={0.7} />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
