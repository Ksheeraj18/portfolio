import { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, Float, TorusKnot, Icosahedron } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = ({ mousePosition, ...props }) => {
    const ref = useRef();
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;

        // Subtle mouse parallax
        ref.current.position.x += (mousePosition.current.x * 0.1 - ref.current.position.x) * 0.05;
        ref.current.position.y += (mousePosition.current.y * 0.1 - ref.current.position.y) * 0.05;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.004}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const AbstractShapes = ({ mousePosition }) => {
    const groupRef = useRef();

    useFrame((state, delta) => {
        // Subtle floating movement and array response
        groupRef.current.position.x += (mousePosition.current.x * 0.3 - groupRef.current.position.x) * 0.02;
        groupRef.current.position.y += (mousePosition.current.y * 0.3 - groupRef.current.position.y) * 0.02;
    });

    return (
        <group ref={groupRef}>
            <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5} position={[1, 0.5, -2]}>
                <TorusKnot args={[0.5, 0.015, 128, 16]}>
                    <meshStandardMaterial color="#3b82f6" wireframe={true} transparent opacity={0.2} />
                </TorusKnot>
            </Float>
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[-1.2, -0.6, -1.5]}>
                <Icosahedron args={[0.5, 0]}>
                    <meshStandardMaterial color="#ec4899" wireframe={true} transparent opacity={0.2} />
                </Icosahedron>
            </Float>
            <Float speed={2.5} rotationIntensity={1} floatIntensity={2} position={[0.5, -0.8, -3]}>
                <TorusKnot args={[0.3, 0.02, 64, 8]}>
                    <meshStandardMaterial color="#8b5cf6" wireframe={true} transparent opacity={0.15} />
                </TorusKnot>
            </Float>
        </group>
    );
};

export default function ParticleBackground() {
    const mousePosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalize mouse coordinates to -1 to +1
            mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="w-full h-full absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={1} />
                <Suspense fallback={null}>
                    <Stars mousePosition={mousePosition} />
                    <AbstractShapes mousePosition={mousePosition} />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
}
