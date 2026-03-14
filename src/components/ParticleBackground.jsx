import { useState, useRef, Suspense, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, Float, TorusKnot, Icosahedron, View, PerspectiveCamera } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = ({ mousePosition, isMobile, shouldAnimate, isLowPower, ...props }) => {
    const ref = useRef();
    const numStars = isLowPower ? (isMobile ? 300 : 600) : (isMobile ? 1000 : 1800);
    const [sphere] = useState(() => random.inSphere(new Float32Array(numStars * 3), { radius: 1.5 }));

    useFrame((state, delta) => {
        if (!shouldAnimate) return;

        ref.current.rotation.x -= delta / 18;
        ref.current.rotation.y -= delta / 22;

        // Smoother mouse parallax with better interpolation
        if (!isMobile) {
            const mouseInfluence = isLowPower ? 0.025 : 0.045;
            const targetX = mousePosition.current.x * 0.15 - ref.current.position.x;
            const targetY = mousePosition.current.y * 0.15 - ref.current.position.y;
            const targetRotZ = mousePosition.current.x * 0.005 - ref.current.rotation.z;

            ref.current.position.x += targetX * mouseInfluence;
            ref.current.position.y += targetY * mouseInfluence;
            ref.current.rotation.z += targetRotZ * mouseInfluence * 0.5;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={isMobile ? 0.006 : 0.004}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const AbstractShapes = ({ mousePosition, isMobile, shouldAnimate, isLowPower }) => {
    const groupRef = useRef();

    useFrame(() => {
        if (!shouldAnimate || isMobile) return;

        // Smoother mouse interaction with better interpolation
        const mouseInfluence = isLowPower ? 0.012 : 0.025;
        const targetX = mousePosition.current.x * 0.4 - groupRef.current.position.x;
        const targetY = mousePosition.current.y * 0.4 - groupRef.current.position.y;
        const targetRotZ = mousePosition.current.x * 0.008 - groupRef.current.rotation.z;

        groupRef.current.position.x += targetX * mouseInfluence;
        groupRef.current.position.y += targetY * mouseInfluence;
        groupRef.current.rotation.z += targetRotZ * mouseInfluence * 0.3;
    });

    if (isMobile) return null; // Very heavy to render on mobile

    return (
        <group ref={groupRef}>
            <Float speed={2.5} rotationIntensity={2} floatIntensity={1.5} position={[1, 0.5, -2]}>
                <TorusKnot args={[0.5, 0.015, 128, 16]}>
                    <meshBasicMaterial color="#3b82f6" wireframe={true} transparent opacity={0.2} />
                </TorusKnot>
            </Float>
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[-1.2, -0.6, -1.5]}>
                <Icosahedron args={[0.5, 0]}>
                    <meshBasicMaterial color="#ec4899" wireframe={true} transparent opacity={0.2} />
                </Icosahedron>
            </Float>
            <Float speed={2.5} rotationIntensity={1} floatIntensity={2} position={[0.5, -0.8, -3]}>
                <TorusKnot args={[0.3, 0.02, 64, 8]}>
                    <meshBasicMaterial color="#8b5cf6" wireframe={true} transparent opacity={0.15} />
                </TorusKnot>
            </Float>
        </group>
    );
};

export default function ParticleBackground({ paused = false, performanceMode = 'high' }) {
    const mousePosition = useRef({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const isLowPower = performanceMode === 'low';
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
            setIsMobile(mobile);
        };

        checkMobile();
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.1, rootMargin: '100px' });

        if (containerRef.current) observer.observe(containerRef.current);
        window.addEventListener('resize', checkMobile);

        const handleMouseMove = (e) => {
            mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', handleMouseMove);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            observer.disconnect();
        };
    }, [isMobile]);

    const shouldAnimate = !paused;

    return (
        <div ref={containerRef} className="w-full h-full absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {isVisible && (
                <View className="w-full h-full absolute inset-0">
                    <PerspectiveCamera makeDefault position={[0, 0, 1]} />
                    <Suspense fallback={null}>
                        <Stars mousePosition={mousePosition} isMobile={isMobile} shouldAnimate={shouldAnimate} isLowPower={isLowPower} />
                        <AbstractShapes mousePosition={mousePosition} isMobile={isMobile} shouldAnimate={shouldAnimate} isLowPower={isLowPower} />
                    </Suspense>
                </View>
            )}
        </div>
    );
}
