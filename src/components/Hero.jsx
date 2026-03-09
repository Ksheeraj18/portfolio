import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { Link } from 'react-scroll';
import ParticleBackground from './ParticleBackground';
import MagneticButton from './MagneticButton';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

export default function Hero() {
    const [text] = useTypewriter({
        words: ['AI Engineer', 'ML Developer', 'Full-Stack Builder', 'Automation Architect', 'LLM Integrator'],
        loop: true,
        delaySpeed: 2000,
        typeSpeed: 60,
        deleteSpeed: 40,
    });

    const nameLetters = "Ksheeraj.";

    return (
        <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
            {/* Interactive 3D Particle Background */}
            <ParticleBackground />

            {/* Massive Background Gradients with animation */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen z-0"
                animate={{
                    scale: [1, 1.15, 1],
                    x: [0, -25, 0],
                    y: [0, 25, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            {/* Additional floating orb */}
            <motion.div
                className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-pink-600/15 rounded-full blur-[120px] pointer-events-none z-0"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 40, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20 z-0"></div>

            <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-2xl shadow-black/50"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium text-gray-200">Available for new opportunities</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.9] mb-6">
                        <motion.span
                            className="block text-white"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Hi, I'm
                        </motion.span>
                        <motion.span
                            className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-sm pb-4 inline-block"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
                                hidden: {}
                            }}
                        >
                            {nameLetters.split('').map((letter, i) => (
                                <motion.span
                                    key={i}
                                    variants={{
                                        hidden: { opacity: 0, y: 40, rotateX: -90, scale: 0.5 },
                                        visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 }
                                    }}
                                    transition={{ type: 'spring', damping: 12, stiffness: 120 }}
                                    className="inline-block"
                                    whileHover={{ scale: 1.2, color: '#8b5cf6', transition: { duration: 0.2 } }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </motion.span>
                    </h1>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-xl md:text-3xl text-gray-300 font-medium mb-6 tracking-wide"
                >
                    <span className="text-white">{text}</span>
                    <Cursor cursorStyle="|" cursorColor="#8b5cf6" />
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl text-gray-400 text-lg md:text-xl md:leading-relaxed mb-12 font-light"
                >
                    I build powerful AI-driven applications, scalable production systems, and design experiences that push the boundaries of modern web technologies.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
                >
                    <MagneticButton>
                        <Link
                            to="projects"
                            smooth={true}
                            duration={500}
                            offset={-100}
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold text-lg transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.8)] hover:-translate-y-1 hover:scale-105 block"
                        >
                            Explore My Work
                        </Link>
                    </MagneticButton>

                    <MagneticButton>
                        <a
                            href="/resume.pdf"
                            download="Ksheeraj_Gubbala_Resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="group w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white font-medium text-lg transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                        >
                            <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
                            Download Resume
                        </a>
                    </MagneticButton>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-16 md:mt-24 flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Scroll Down</span>
                    <MagneticButton>
                        <Link to="about" smooth={true} duration={500} offset={-100} className="cursor-pointer text-gray-400 hover:text-white transition-colors animate-bounce mt-2 bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md block">
                            <ArrowDown size={24} />
                        </Link>
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}
