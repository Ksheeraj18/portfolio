import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';

const AmbientBackground = ({ isScrolling = false }) => {
  const { scrollYProgress } = useScroll();
  
  // Parallax movement for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const orbs = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    const baseOrbs = [
        { id: 1, color: 'rgba(59, 130, 246, 0.08)', size: '600px', top: '10%', left: '-10%', y: y1 },
        { id: 2, color: 'rgba(168, 85, 247, 0.05)', size: '500px', top: '40%', right: '-5%', y: y2 },
    ];
    if (isMobile) return baseOrbs;
    
    return [
        ...baseOrbs,
        { id: 3, color: 'rgba(236, 72, 153, 0.06)', size: '700px', bottom: '10%', left: '20%', y: y3 },
        { id: 4, color: 'rgba(34, 197, 94, 0.04)', size: '400px', top: '70%', right: '15%', y: y1 },
    ];
  }, [y1, y2, y3]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050505]">
      {/* Universal Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Animated Floating Orbs - Optimized Gradient over Blur */}
      {orbs.map(orb => (
        <motion.div
            key={orb.id}
            className="absolute rounded-full will-change-transform"
            style={{
                background: `radial-gradient(circle at center, ${orb.color} 0%, transparent 70%)`,
                width: orb.size,
                height: orb.size,
                top: orb.top,
                left: orb.left,
                right: orb.right,
                bottom: orb.bottom,
                y: orb.y,
            }}
            animate={{
                scale: [1, 1.02, 1],
                opacity: [0.6, 1, 0.6],
            }}
            transition={{
                duration: 15 + orb.id * 5,
                repeat: Infinity,
                ease: "linear",
            }}
        />
      ))}

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

export default AmbientBackground;
