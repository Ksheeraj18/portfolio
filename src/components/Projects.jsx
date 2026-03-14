import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Github, Code2, ArrowUpRight, ExternalLink } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import React from 'react';
import InteractiveSection from './InteractiveSection';
import Antigravity from './Antigravity';

function ProjectCard({ project, index }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 40%)`
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            className="group"
        >
            <Tilt 
                tiltMaxAngleX={5} 
                tiltMaxAngleY={5} 
                perspective={2000} 
                scale={1.01} 
                transitionSpeed={1500} 
                disableTiltOnTouch={true}
                className="h-full transform-style-3d"
                glareEnable={false}
            >
                <div 
                    onMouseMove={onMouseMove}
                    className="relative bg-zinc-950/50 border border-white/5 rounded-3xl md:rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:bg-zinc-900 hover:border-white/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.8)] h-full flex flex-col smooth-gpu"
                >
                    {/* Spotlight Glow */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-3xl md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: maskImage }}
                    />

                    {/* Accent Top Bar */}
                    <div className={`h-px md:h-[5px] w-full bg-linear-to-r ${project.color} opacity-80`} />

                    <div className="p-6 md:p-10 flex flex-col h-full transform-style-3d">
                        {/* Header Links */}
                        <div className="flex justify-between items-center mb-10 transform translate-z-20">
                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="p-4 bg-white/5 rounded-[1.2rem] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all shadow-xl"
                                whileHover={{ scale: 1.1, rotate: -5 }}
                            >
                                <Github size={24} />
                            </motion.a>
                            <motion.a
                                href={project.link || project.github}
                                target="_blank"
                                rel="noreferrer"
                                className={`p-4 bg-linear-to-br ${project.color} rounded-full text-white shadow-2xl hover:brightness-110 transition-all`}
                                whileHover={{ scale: 1.1, rotate: 10 }}
                            >
                                <ArrowUpRight size={24} />
                            </motion.a>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="mb-8 transform translate-z-30">
                            <h3 className="text-4xl font-black text-white mb-2 leading-none tracking-tight group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-500 transition-all">
                                {project.title}
                            </h3>
                            <div className={`text-xs font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-linear-to-r ${project.color} filter brightness-125`}>
                                {project.subtitle}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-lg leading-relaxed font-light mb-10 transform translate-z-10 grow">
                            {project.desc}
                        </p>

                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-2 mt-auto pt-8 border-t border-white/5 transform translate-z-20">
                            {project.tech.map(tech => (
                                <span 
                                    key={tech} 
                                    className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-black border border-white/10 rounded-xl text-gray-400 shadow-lg group-hover:border-white/20 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Tilt>
        </motion.div>
    );
}

export default function Projects({ isScrolling = false }) {
    const projects = [
        {
            title: 'ChefAssist',
            subtitle: 'AI Recipe Generator',
            desc: 'An intelligent culinary companion using the Gemini API. It analyzes dietary preferences and ingredient availability to generate highly personalized recipes.',
            tech: ['React', 'Node.js', 'Tailwind', 'Gemini AI'],
            github: 'https://github.com/Savant261/Flames-2025-Project-ChefAssist',
            link: 'https://chef-assist-frontend.vercel.app/',
            color: 'from-orange-400 to-red-500'
        },
        {
            title: 'ResearchScout',
            subtitle: 'AI Research Blog Auto-Generator',
            desc: 'A powerful Flask engine that autonomously scrapes the latest AI research papers and leverages Groq models to synthesize findings.',
            tech: ['Python', 'Flask', 'Groq API', 'Automation'],
            github: 'https://github.com/Ksheeraj18/AI-Research-Blog-Flask-Application-',
            color: 'from-blue-400 to-indigo-500'
        },
        {
            title: 'AgriVision',
            subtitle: 'Crop Disease Prediction Model',
            desc: 'A robust computer vision CNN built with TensorFlow. It accurately diagnoses various plant diseases from leaf images.',
            tech: ['Python', 'TensorFlow', 'Neural Nets', 'CV'],
            github: 'https://github.com/Rohith-Pavan/CROP-DISEASE-PREDICTION-MODEL',
            color: 'from-emerald-400 to-green-500'
        },
        {
            title: 'OmniFlow',
            subtitle: 'AI Workflow Automation Systems',
            desc: 'Engineered complex background automation workflows using n8n to connect APIs and aggregate data through AI reasoning steps.',
            tech: ['n8n', 'REST Flow', 'Webhooks', 'LLMs'],
            github: 'https://github.com/Ksheeraj18/OmniFlow-AI-Automations',
            color: 'from-purple-400 to-pink-500'
        }
    ];

    return (
        <InteractiveSection 
            id="projects" 
            className="py-40 border-t border-white/5" 
            glowColor="rgba(59, 130, 246, 0.08)"
            bgContent={
                <div className="absolute inset-0 opacity-30">
                    <Antigravity
                        count={90}
                        magnetRadius={20}
                        ringRadius={15}
                        waveSpeed={0.2}
                        waveAmplitude={3}
                        particleSize={1.5}
                        lerpSpeed={0.06}
                        color="#06b6d4"
                        autoAnimate
                        particleVariance={2}
                        depthFactor={2}
                        pulseSpeed={1}
                        particleShape="tetrahedron"
                        fieldStrength={5}
                        isScrolling={isScrolling}
                    />
                </div>
            }
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 sm:mb-20 lg:mb-24 flex flex-col md:flex-row md:justify-between md:items-end gap-10"
                >
                    <div className="w-full md:w-3/4">
                        <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
                            <span className="w-8 sm:w-12 h-px sm:h-[2px] bg-blue-500"></span>
                            <h3 className="text-blue-400 font-bold tracking-[0.4em] uppercase text-[8px] sm:text-xs">Innovation</h3>
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl font-black text-white tracking-tighter leading-[0.9] lg:leading-none mb-4">
                            Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500">Works.</span>
                        </h2>
                    </div>
                    <motion.a
                        href="https://github.com/Ksheeraj18"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center gap-3 text-white bg-white/3 border border-white/10 px-6 sm:px-10 py-4 lg:py-5 rounded-2xl hover:bg-white/8 transition-all hover:border-white/30 w-fit"
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Github size={20} className="group-hover:rotate-12 transition-transform" /> 
                        <span className="font-bold tracking-widest text-[10px] sm:text-sm uppercase">Engine Log</span>
                    </motion.a>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </InteractiveSection>
    );
}
