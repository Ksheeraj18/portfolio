import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function Orb({ orb, smoothMouseX, smoothMouseY, isVisible }) {
    const x = useTransform(smoothMouseX, (val) => val * (orb.distance / window.innerWidth) - window.innerWidth / 2);
    const y = useTransform(smoothMouseY, (val) => val * (orb.distance / window.innerHeight) - window.innerHeight / 2);

    return (
        <motion.div
            className={`absolute rounded-full bg-linear-to-r ${orb.color} blur-xl`}
            style={{
                width: orb.size,
                height: orb.size,
                left: '50%',
                top: '50%',
                x,
                y,
            }}
            animate={{
                scale: [1, 1.08, 1],
            }}
            transition={{
                scale: {
                    duration: 4 + orb.delay,
                    repeat: Infinity,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: isVisible ? 0.5 : 0, scale: 1 }}
            viewport={{ once: false }}
        />
    );
}

export default function InteractiveOrbs({ performanceMode = 'high', paused = false }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });
    const [isVisible, setIsVisible] = useState(true);
    const rafId = useRef(null);
    const isLowPower = performanceMode === 'low';

    const updateMousePosition = useCallback((e) => {
        if (paused || rafId.current) return;

        rafId.current = requestAnimationFrame(() => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            rafId.current = null;
        });
    }, [mouseX, mouseY, paused]);

    useEffect(() => {
        if (paused) return;
        window.addEventListener('mousemove', updateMousePosition, { passive: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [updateMousePosition, paused]);

    const orbs = isLowPower 
        ? [
            { id: 1, size: 80, color: 'from-blue-400/10 to-purple-500/10', delay: 0, distance: 40, stiffness: 150, damping: 30 },
            { id: 2, size: 60, color: 'from-purple-400/8 to-pink-500/8', delay: 0, distance: 30, stiffness: 140, damping: 28 },
          ]
        : [
            { id: 1, size: 100, color: 'from-blue-400/20 to-purple-500/20', delay: 0, distance: 60, stiffness: 200, damping: 25 },
            { id: 2, size: 70, color: 'from-purple-400/15 to-pink-500/15', delay: 0.3, distance: 45, stiffness: 180, damping: 22 },
            { id: 3, size: 85, color: 'from-pink-400/18 to-blue-500/18', delay: 0.6, distance: 55, stiffness: 220, damping: 28 },
            { id: 4, size: 50, color: 'from-indigo-400/25 to-cyan-500/25', delay: 0.9, distance: 40, stiffness: 190, damping: 24 },
        ];

    if (paused) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
            {orbs.map((orb) => (
                <Orb 
                    key={orb.id} 
                    orb={orb} 
                    smoothMouseX={smoothMouseX} 
                    smoothMouseY={smoothMouseY} 
                    isVisible={isVisible} 
                />
            ))}
        </div>
    );
}