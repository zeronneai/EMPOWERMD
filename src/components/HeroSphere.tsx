import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  OrbitControls, 
  Environment,
  ContactShadows,
  Float,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';

const benefits = [
  "Unlimited visits",
  "Direct access",
  "Same/Next-day appt.",
  "30-60 min visits",
  "Transparent pricing",
  "Prevention & Wellness",
  "No insurance hassles",
  "Personalized care"
];

const BenefitNode = ({ position, index, activeIndex, onHover }: { 
  position: THREE.Vector3, 
  index: number, 
  activeIndex: number,
  onHover: (i: number | null) => void,
  key?: React.Key
}) => {
  const isActive = activeIndex === index;
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y += Math.sin(time + index) * 0.002;
    }
  });

  return (
    <mesh 
      position={position} 
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(index);
      }}
      onPointerOut={() => onHover(null)}
    >
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshStandardMaterial 
        color={isActive ? "#a855f7" : "#ffffff"} 
        emissive={isActive ? "#a855f7" : "#ffffff"}
        emissiveIntensity={isActive ? 4 : 0.5}
        transparent 
        opacity={isActive ? 1 : 0.4} 
      />
    </mesh>
  );
};

const EmbeddedText = ({ activeIndex }: { activeIndex: number }) => {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  return (
    <Html 
      center 
      transform 
      distanceFactor={isMobile ? 12 : 10} 
      className="pointer-events-none select-none"
    >
      <div 
        className="flex flex-col items-center justify-center text-center px-4"
        style={{ 
          maxWidth: '90vw',
          width: '100%',
          filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.4))'
        }}
      >
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeIndex !== -1 && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                className="glass-card px-4 py-2 rounded-full border border-purple-500/30"
              >
                <span className="text-white font-bold uppercase tracking-[0.15em] text-[clamp(0.7rem,1.5vw,1rem)] whitespace-normal">
                  {benefits[activeIndex]}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Html>
  );
};

const ImmersiveSphere = ({ onHover, activeIndex }: { onHover: (i: number | null) => void, activeIndex: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const sphereScale = isMobile ? 0.7 : 0.9;

  const nodes = useMemo(() => {
    const pts = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    const count = benefits.length;
    const radius = 2.4;

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pts.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group scale={sphereScale}>
      <group ref={groupRef}>
        {/* Outer Glass Shell */}
        <mesh>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshPhysicalMaterial
            color="#2e1065"
            transmission={0.95}
            thickness={1}
            roughness={0.1}
            envMapIntensity={2}
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Energy Core */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <MeshDistortMaterial
            color="#7e22ce"
            speed={3}
            distort={0.4}
            radius={1}
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Wireframe Grid */}
        <mesh>
          <sphereGeometry args={[2.52, 32, 32]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.1} />
        </mesh>

        {/* Benefit Nodes */}
        {nodes.map((pos, i) => (
          <BenefitNode 
            key={i} 
            position={pos} 
            index={i} 
            activeIndex={activeIndex} 
            onHover={onHover} 
          />
        ))}
      </group>

      {/* Embedded Text Content */}
      <EmbeddedText activeIndex={activeIndex} />

      {/* Lighting */}
      <pointLight position={[10, 10, 10]} intensity={3} color="#a855f7" />
      <pointLight position={[-10, -10, -10]} intensity={2} color="#7e22ce" />
      <Environment preset="city" />
    </group>
  );
};

const HeroSphere = ({ onHover, activeIndex }: { onHover: (i: number | null) => void, activeIndex: number }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <Suspense fallback={null}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <ImmersiveSphere onHover={onHover} activeIndex={activeIndex} />
          </Float>
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default HeroSphere;
