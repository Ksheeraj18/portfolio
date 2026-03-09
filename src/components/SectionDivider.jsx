import { motion } from 'framer-motion';

export default function SectionDivider({ variant = 'wave' }) {
    if (variant === 'wave') {
        return (
            <div className="w-full overflow-hidden leading-[0] rotate-180">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[60px]"
                >
                    <motion.path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        fill="url(#wave-gradient)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.15 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                    <defs>
                        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    if (variant === 'dots') {
        return (
            <div className="flex items-center justify-center gap-2 py-8">
                {[0, 1, 2, 3, 4].map(i => (
                    <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/20"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                    />
                ))}
            </div>
        );
    }

    if (variant === 'line') {
        return (
            <div className="flex justify-center py-4">
                <motion.div
                    className="h-[1px] bg-linear-to-r from-transparent via-white/20 to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '60%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                />
            </div>
        );
    }

    return null;
}
