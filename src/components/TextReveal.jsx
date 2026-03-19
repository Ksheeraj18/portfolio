import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function TextReveal({ children, className = '' }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.4"]
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

    return (
        <motion.div
            ref={ref}
            style={{
                opacity,
                y,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
