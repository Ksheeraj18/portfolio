import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagneticButton({ children, className = '', ...props }) {
    const ref = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Use MotionValues instead of React state to rapidly update positioning without triggering component re-renders
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Much snappier spring configuration for instant responsive feel
    const springX = useSpring(x, { stiffness: 400, damping: 25, mass: 0.5 });
    const springY = useSpring(y, { stiffness: 400, damping: 25, mass: 0.5 });

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches || ('ontouchstart' in window)) {
            setIsTouchDevice(true);
        }
    }, []);

    const handleMouse = (e) => {
        if (isTouchDevice || !ref.current) return;
        const { clientX, clientY } = e;
        const { width, height, left, top } = ref.current.getBoundingClientRect();
        const newX = (clientX - (left + width / 2)) * 0.3;
        const newY = (clientY - (top + height / 2)) * 0.3;
        x.set(newX);
        y.set(newY);
    };

    const handleMouseLeave = () => {
        if (isTouchDevice) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.95 }}
            className={`inline-block ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
