import { motion } from 'framer-motion';

export default function FloatingIcons() {
    const icons = [
        { emoji: '⚡', x: '10%', y: '20%', size: 24, delay: 0, duration: 6 },
        { emoji: '🧠', x: '85%', y: '15%', size: 28, delay: 1, duration: 7 },
        { emoji: '🚀', x: '75%', y: '70%', size: 22, delay: 0.5, duration: 5 },
        { emoji: '💻', x: '15%', y: '75%', size: 26, delay: 2, duration: 8 },
        { emoji: '⭐', x: '50%', y: '10%', size: 20, delay: 1.5, duration: 6.5 },
        { emoji: '🔮', x: '90%', y: '50%', size: 24, delay: 0.8, duration: 7.5 },
        { emoji: '✨', x: '30%', y: '85%', size: 22, delay: 2.5, duration: 5.5 },
        { emoji: '🌐', x: '60%', y: '30%', size: 26, delay: 1.2, duration: 6.8 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {icons.map((icon, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${i > 4 ? 'hidden md:block' : 'block'}`}
                    style={{ left: icon.x, top: icon.y, fontSize: icon.size }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [0.8, 1.2, 0.8],
                        y: [0, -30, 0],
                        rotate: [0, 15, -15, 0]
                    }}
                    transition={{
                        duration: icon.duration,
                        repeat: Infinity,
                        delay: icon.delay,
                        ease: 'easeInOut'
                    }}
                >
                    {icon.emoji}
                </motion.div>
            ))}
        </div>
    );
}
