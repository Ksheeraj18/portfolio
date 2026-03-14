import { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const InteractiveSection = ({ 
    children, 
    className = "", 
    glowColor = "rgba(59, 130, 246, 0.15)", 
    bgContent,
    ...props 
}) => {
    const sectionRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Performance Optimization: Use MotionValue instead of State to prevent re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 40, restDelta: 0.001 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative w-full ${className}`}
            {...props}
        >
            {/* Background Layer: Glow, Grid, and Custom BG Content */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {bgContent}
                
                {/* Interactive Spotlight Glow - Optimized with MotionValues */}
                <motion.div
                    className="absolute rounded-full will-change-transform"
                    style={{
                        width: '800px',
                        height: '800px',
                        background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 65%)`,
                        left: x,
                        top: y,
                        x: '-50%',
                        y: '-50%',
                        opacity: isHovered ? 1 : 0,
                    }}
                />
                <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full">
                {children}
            </div>
        </section>
    );
};

export default InteractiveSection;
