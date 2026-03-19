import { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const InteractiveSection = ({ 
    children, 
    className = "", 
    glowColor = "rgba(59, 130, 246, 0.15)", 
    bgContent,
    isScrolling = false,
    ...props 
}) => {
    const sectionRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Performance Optimization: Use MotionValue instead of State to prevent re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!sectionRef.current || !isHovered) return;
        const rect = sectionRef.current.getBoundingClientRect();
        
        // Direct set is much faster than spring calculation for large backgrounds
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
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {bgContent}
                
                <motion.div
                    className="absolute rounded-full pointer-events-none will-change-transform"
                    animate={{ opacity: isHovered ? 0.4 : 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                        width: '800px',
                        height: '800px',
                        background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
                        left: mouseX,
                        top: mouseY,
                        x: '-50%',
                        y: '-50%',
                    }}
                />
                <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
            </div>

            <div className="relative z-10 w-full">
                {children}
            </div>
        </section>
    );
};

export default InteractiveSection;
