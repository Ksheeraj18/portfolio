import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function FloatingParticles({ performanceMode = 'high' }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 250, damping: 25 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 250, damping: 25 });
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef(null);
    const rafId = useRef(null);
    const isLowPower = performanceMode === 'low';

    const updateMousePosition = useCallback((e) => {
        if (rafId.current) return; // Throttle updates

        rafId.current = requestAnimationFrame(() => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            rafId.current = null;
        });
    }, [mouseX, mouseY]);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(false);
            setTimeout(() => setIsVisible(true), 150);
        };

        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('scroll', handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [updateMousePosition]);

    if (isLowPower) return null;

    const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1.5,
        color: ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 4)],
        delay: Math.random() * 1.5,
        distance: Math.random() * 80 + 40,
        speed: Math.random() * 0.3 + 0.4,
        offsetX: (Math.random() - 0.5) * 300,
        offsetY: (Math.random() - 0.5) * 300,
    }));

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}40`,
                        left: '50%',
                        top: '50%',
                        x: smoothMouseX.to(val => val * (particle.distance / window.innerWidth) - window.innerWidth / 2 + particle.offsetX),
                        y: smoothMouseY.to(val => val * (particle.distance / window.innerHeight) - window.innerHeight / 2 + particle.offsetY),
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{
                        duration: particle.speed * 4,
                        repeat: Infinity,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: particle.delay,
                        scale: {
                            duration: particle.speed * 3,
                            repeat: Infinity,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        },
                        opacity: {
                            duration: particle.speed * 3.5,
                            repeat: Infinity,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: isVisible ? 0.7 : 0, scale: 1 }}
                    viewport={{ once: false, margin: "-100px" }}
                />
            ))}
        </div>
    );
}