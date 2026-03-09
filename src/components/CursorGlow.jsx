import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springX = useSpring(cursorX, { stiffness: 120, damping: 18 });
    const springY = useSpring(cursorY, { stiffness: 120, damping: 18 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Large glow orb that follows the cursor (lagging) */}
            <motion.div
                className="fixed pointer-events-none z-50 rounded-full mix-blend-soft-light"
                style={{
                    width: 400,
                    height: 400,
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(59,130,246,0.06) 50%, transparent 70%)',
                }}
            />
            {/* Small sharp dot at exact cursor position */}
            <motion.div
                className="fixed pointer-events-none z-50 rounded-full"
                style={{
                    width: 6,
                    height: 6,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    background: 'rgba(139,92,246,0.9)',
                    boxShadow: '0 0 8px rgba(139,92,246,0.8)',
                }}
            />
        </>
    );
}
