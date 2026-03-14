import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-scroll';
import ParticleBackground from './ParticleBackground';
import MagneticButton from './MagneticButton';
import Tilt from 'react-parallax-tilt';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import ResumePreview from './ResumePreview';

export default function Hero() {
    const [text] = useTypewriter({
        words: ['AI Engineer', 'ML Developer', 'Full-Stack Builder', 'Automation Architect', 'LLM Integrator'],
        loop: true,
        delaySpeed: 2000,
        typeSpeed: 60,
        deleteSpeed: 40,
    });

    const [isEnlarged, setIsEnlarged] = useState(false);
    const [showResume, setShowResume] = useState(false);
    const nameLetters = "Ksheeraj.";

    return (
        <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
            {/* Interactive 3D Particle Background */}
            <ParticleBackground paused={showResume} />

            <ResumePreview 
                isOpen={showResume} 
                onClose={() => setShowResume(false)} 
                resumeUrl="/KSHEERAJ CV (3).pdf"
            />

            {/* Massive Background Gradients with animation - hidden on mobile for performance */}
            <motion.div
                className="hidden md:block absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-blue-600/20 to-transparent pointer-events-none z-0"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 30, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="hidden md:block absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-600/10 to-transparent pointer-events-none z-0"
                animate={{
                    scale: [1, 1.15, 1],
                    x: [0, -25, 0],
                    y: [0, 25, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
            {/* Additional floating orb */}
            <motion.div
                className="hidden md:block absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-pink-600/15 to-transparent pointer-events-none z-0"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 40, 0],
                    y: [0, -30, 0]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20 z-0"></div>

            {/* Premium 3D Profile Frame replacing Abstract Visual */}
            <div className="absolute top-1/2 right-0 md:right-10 lg:right-20 -translate-y-1/2 pointer-events-none z-10 hidden md:flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative pointer-events-auto"
                >
                    {/* Atmospheric Glow behind photo */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
                    
                    <Tilt
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        perspective={1500}
                        scale={1.02}
                        transitionSpeed={2000}
                        gyroscope={false}
                        disableTiltOnTouch={true}
                        className="relative z-10"
                    >
                        <motion.div 
                            layoutId="profile-image"
                            onClick={() => setIsEnlarged(true)}
                            className="relative w-[350px] h-[480px] lg:w-[450px] lg:h-[600px] rounded-[3rem] p-[3px] bg-linear-to-br from-white/40 via-transparent to-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden group cursor-pointer pointer-events-auto"
                            whileHover={{ 
                                scale: 1.02, 
                                rotate: -1,
                                boxShadow: "0 40px 100px rgba(59,130,246,0.3)" 
                            }}
                            whileTap={{ scale: 0.96 }}
                            transition={{
                                layout: { type: "spring", stiffness: 200, damping: 25, mass: 1 },
                                scale: { duration: 0.2 }
                            }}
                        >
                            <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-black bezel-screen">
                                {/* Full-Image "Ambient Scan" Effect */}
                                <div className="absolute inset-y-0 left-0 w-[400%] z-30 pointer-events-none overflow-hidden rounded-[2.8rem]">
                                    <div className="absolute inset-0 glass-shine opacity-0 group-hover:opacity-100 group-hover:animate-[shine_4s_ease-in-out_infinite] mix-blend-lighten transition-opacity duration-1000" />
                                </div>
                                
                                <img
                                    src="/IMG_20260312_000902.jpg.jpeg"
                                    alt="Ksheeraj Gubbala"
                                    className="w-full h-full object-cover object-top img-sharp select-none smooth-gpu"
                                />
                                
                                {/* Integrated HUD Elements */}
                                <div className="absolute top-6 right-6 z-40 bg-black/60 border border-white/20 px-4 py-2 rounded-2xl backdrop-blur-xl pointer-events-none shadow-2xl">
                                    <div className="text-blue-400 font-black text-xs tracking-[0.3em] italic">AI.DEV</div>
                                </div>
                                
                                <div className="absolute bottom-6 left-6 z-40 bg-black/60 border border-white/20 px-4 py-3 rounded-2xl backdrop-blur-xl pointer-events-none shadow-2xl">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-tight">Engineering</span>
                                            <span className="text-[8px] font-bold text-blue-400 uppercase tracking-[0.2em] leading-tight">The Future</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Sharp Inner Definition Border */}
                                <div className="absolute inset-0 border border-white/10 rounded-[2.8rem] pointer-events-none" />
                            </div>
                        </motion.div>
                    </Tilt>
                </motion.div>
            </div>

            {/* Click to Enlarge Modal - macOS Genie Effect */}
            <AnimatePresence>
                {isEnlarged && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-1000000 bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10 pointer-events-auto"
                    >
                        {/* Dimmer overlay for closing */}
                        <div 
                            className="absolute inset-0 cursor-zoom-out" 
                            onClick={() => setIsEnlarged(false)} 
                        />

                        {/* macOS style close button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-5 rounded-full border border-white/10 z-50 shadow-2xl group"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsEnlarged(false);
                            }}
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </motion.button>
                        
                        <motion.div
                            layoutId="profile-image"
                            className="relative max-w-[95vw] md:max-w-4xl xl:max-w-6xl w-full h-fit max-h-[85vh] md:max-h-[80vh] xl:max-h-[90vh] rounded-4xl md:rounded-[3rem] overflow-hidden border border-white/30 shadow-[0_50px_200px_rgba(0,0,0,0.8)] bg-zinc-950 pointer-events-auto"
                            transition={{
                                layout: { type: "spring", stiffness: 200, damping: 25, mass: 1 },
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src="/IMG_20260312_000902.jpg.jpeg"
                                alt="Ksheeraj Gubbala Full"
                                className="w-full h-auto max-h-[90vh] object-contain block mx-auto img-sharp smooth-gpu"
                            />
                            
                            {/* Retina Glass Overlays */}
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/20 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* UI Content */}
            <div className="max-w-6xl mx-auto px-6 flex flex-col items-start lg:items-start justify-center text-left lg:text-left z-20 w-full will-change-transform">
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
                    className="transform-gpu"
                >
                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-black tracking-tighter leading-[0.9] mb-4 sm:mb-6">
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
                    className="text-sm sm:text-lg md:text-2xl xl:text-3xl text-gray-300 font-medium mb-4 sm:mb-6 tracking-wide h-6 sm:h-8 md:h-12"
                >
                    <span className="text-white">{text}</span>
                    <Cursor cursorStyle="|" cursorColor="#8b5cf6" />
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-2xl text-gray-400 text-sm sm:text-base md:text-xl md:leading-relaxed mb-8 sm:mb-12 font-light px-2 sm:px-0"
                >
                    I build powerful AI-driven applications, scalable production systems, and design experiences that push the boundaries of modern web technologies.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-start gap-4 w-full sm:w-auto mt-4"
                >
                    <MagneticButton>
                        <button
                            onClick={() => window.lenis?.scrollTo('#projects', { offset: -100, duration: 1.5 })}
                            className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-black text-lg transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] hover:-translate-y-1 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group"
                        >
                            <span>Explore My Work</span>
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </MagneticButton>

                    <MagneticButton>
                        <motion.button
                            onClick={() => setShowResume(true)}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            className="group w-full sm:w-auto px-10 py-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 cursor-pointer"
                        >
                            <Download size={20} className="group-hover:-translate-y-1 transition-transform duration-500" />
                            <span className="tracking-wide">Résumé</span>
                        </motion.button>
                    </MagneticButton>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-20 md:mt-32 flex flex-col items-start gap-4 pb-10"
                >
                    <div className="flex flex-col items-start gap-2">
                        <span className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black">Scroll_to_Deploy</span>
                        <button 
                            onClick={() => window.lenis?.scrollTo('#about', { offset: -100, duration: 1.2 })}
                            className="cursor-pointer text-gray-400 hover:text-white transition-all hover:scale-110 animate-bounce mt-2 bg-white/5 p-4 rounded-full border border-white/10 backdrop-blur-md shadow-2xl group focus:outline-none"
                        >
                            <ArrowDown size={24} className="group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
