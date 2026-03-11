import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Icosahedron, Torus, Float } from '@react-three/drei';

const CoreShape = () => {
  const groupRef = useRef();
  
  // Rotate the entire shape slowly
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* Outer Tech Rings */}
        <Torus args={[2.4, 0.015, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.2} />
        </Torus>
        <Torus args={[1.9, 0.02, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.3} />
        </Torus>

        {/* Network Inner Shield */}
        <Icosahedron args={[1.2, 2]}>
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.4} />
        </Icosahedron>

        {/* Solid Glowing AI Core */}
        <Sphere args={[0.7, 32, 32]}>
          <meshStandardMaterial 
            color="#ec4899" 
            emissive="#ec4899" 
            emissiveIntensity={1.5} 
            roughness={0.2} 
            metalness={0.8} 
          />
        </Sphere>

        {/* Data Nodes (Satellites) */}
        <group>
          {[...Array(6)].map((_, i) => (
            <OrbitingParticle key={i} index={i} />
          ))}
        </group>
      </group>
    </Float>
  );
};

const OrbitingParticle = ({ index }) => {
  const ref = useRef();
  const speed = 0.6 + Math.random() * 0.4;
  const radius = 2.6 + Math.random() * 0.8;
  const offset = Math.random() * Math.PI * 2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 1.5) * (radius * 0.2);
    }
  });

  return (
    <Sphere ref={ref} args={[0.06, 16, 16]}>
      <meshStandardMaterial 
        color={index % 2 === 0 ? "#3b82f6" : "#ffffff"} 
        emissive={index % 2 === 0 ? "#3b82f6" : "#ffffff"} 
        emissiveIntensity={2} 
      />
    </Sphere>
  );
};

const InteractiveCore = () => {
  return (
    <div className="w-[120%] h-full min-h-[400px] md:min-h-[600px] absolute right-[-10%] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center opacity-90 z-0 pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
        <CoreShape />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
};

export default InteractiveCore;
