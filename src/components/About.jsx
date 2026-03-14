import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Cpu, LayoutTemplate, Layers, Brain } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import InteractiveSection from './InteractiveSection';
import Antigravity from './Antigravity';

function SpotlightCard({ card, index }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 40%)`
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="h-full"
        >
            <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1500}
                scale={1.02}
                transitionSpeed={1500}
                disableTiltOnTouch={true}
                className="h-full transform-style-3d"
                glareEnable={false}
            >
                <div
                    onMouseMove={onMouseMove}
                    className="relative group h-full bg-zinc-950 border border-white/5 rounded-3xl md:rounded-[2.5rem] p-8 md:p-10 overflow-hidden transition-colors hover:bg-zinc-900/50 smooth-gpu"
                >
                    {/* Spotlight Glow */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: maskImage }}
                    />

                    {/* Background Gradient Tint */}
                    <div className={`absolute inset-0 bg-linear-to-br ${card.bg} opacity-20 group-hover:opacity-40 transition-opacity`} />

                    <div className="relative z-10 flex flex-col h-full transform-style-3d">
                        <motion.div
                            className="bg-white/5 border border-white/10 p-5 rounded-3xl w-fit mb-10 shadow-2xl transform translate-z-20"
                            whileHover={{ rotateY: 20, rotateX: -10, scale: 1.1 }}
                        >
                            {card.icon}
                        </motion.div>

                        <h4 className="text-3xl font-bold text-white mb-6 tracking-tight transform translate-z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-400">
                            {card.title}
                        </h4>

                        <p className="text-gray-400 text-lg leading-relaxed font-light transform translate-z-10 mt-auto">
                            {card.desc}
                        </p>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-white/5 rounded-tr-2xl group-hover:border-white/20 transition-colors" />
                </div>
            </Tilt>
        </motion.div>
    );
}

export default function About() {
    const cards = [
        {
            icon: <Brain className="text-purple-400" size={40} strokeWidth={1.5} />,
            title: 'Artificial Intelligence',
            desc: 'Building intelligent generative models, fine-tuning LLMs, and applying neural networks to solve complex predictive problems.',
            bg: 'from-purple-500/20 to-transparent'
        },
        {
            icon: <Layers className="text-blue-400" size={40} strokeWidth={1.5} />,
            title: 'LLM Integration',
            desc: 'Designing advanced agentic workflows and integrating cutting-edge APIs like Gemini, OpenAI, and Groq to build smarter tools.',
            bg: 'from-blue-500/20 to-transparent'
        },
        {
            icon: <Cpu className="text-green-400" size={40} strokeWidth={1.5} />,
            title: 'Automation Engineering',
            desc: 'Creating frictionless automation networks using n8n and highly available REST APIs to drastically reduce manual operating times.',
            bg: 'from-green-500/20 to-transparent'
        },
        {
            icon: <LayoutTemplate className="text-pink-400" size={36} strokeWidth={1.5} />,
            title: 'Full-Stack Architecture',
            desc: 'Developing lightning-fast, highly responsive, and robustly secure platforms from database schema to the beautiful frontend UI.',
            bg: 'from-pink-500/20 to-transparent'
        }
    ];

    return (
        <InteractiveSection 
            id="about" 
            className="py-40 border-t border-white/5" 
            glowColor="rgba(79, 70, 229, 0.05)"
            bgContent={
                <div className="absolute inset-0 opacity-20">
                    <Antigravity
                        count={120}
                        magnetRadius={18}
                        ringRadius={15}
                        waveSpeed={0.2}
                        waveAmplitude={1.5}
                        particleSize={1}
                        lerpSpeed={0.06}
                        color="#6366f1"
                        autoAnimate
                        particleVariance={1}
                        depthFactor={1.2}
                        pulseSpeed={1.5}
                        particleShape="capsule"
                        fieldStrength={6}
                    />
                </div>
            }
        >
            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-16 mb-20 lg:mb-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-3/5"
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="w-8 sm:w-12 h-px sm:h-[2px] bg-blue-500"></span>
                            <h3 className="text-blue-400 font-bold tracking-[0.3em] uppercase text-[8px] sm:text-xs">Curriculum Vitae</h3>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 sm:mb-8 tracking-tighter leading-[0.9] lg:leading-none">
                            Engineering the <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-purple-400">future of digital.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-2/5"
                    >
                        <p className="text-gray-400 text-base md:text-xl leading-relaxed font-light italic border-l-2 border-white/10 pl-6 lg:pl-8">
                            "I don't just write code; I design intelligent systems that bridge the gap between experimental AI research and impactful, user-centered applications."
                        </p>
                    </motion.div>
                </div>

                {/* Animated Stats - High Polish Responsive */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-20 lg:mb-24 p-6 sm:p-12 bg-white/2 border border-white/10 rounded-4xl sm:rounded-[3rem] backdrop-blur-2xl shadow-2xl smooth-gpu"
                >
                    <AnimatedCounter target={10} suffix="+" label="Projects Built" />
                    <AnimatedCounter target={2} suffix="+" label="Years Experience" />
                    <AnimatedCounter target={15} suffix="+" label="Technologies" />
                    <AnimatedCounter target={100} suffix="%" label="Client Success" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {cards.map((card, index) => (
                        <SpotlightCard key={index} card={card} index={index} />
                    ))}
                </div>
            </div>
        </InteractiveSection>
    );
}
