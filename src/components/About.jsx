import { motion } from 'framer-motion';
import { Cpu, LayoutTemplate, Layers, Brain } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import AnimatedCounter from './AnimatedCounter';

export default function About() {
    const cards = [
        {
            icon: <Brain className="text-purple-400" size={36} strokeWidth={1.5} />,
            title: 'Artificial Intelligence',
            desc: 'Building intelligent generative models, fine-tuning LLMs, and applying neural networks to solve complex predictive problems.',
            bg: 'from-purple-500/10 to-transparent'
        },
        {
            icon: <Layers className="text-blue-400" size={36} strokeWidth={1.5} />,
            title: 'LLM Integration',
            desc: 'Designing advanced agentic workflows and integrating cutting-edge APIs like Gemini, OpenAI, and Groq to build smarter tools.',
            bg: 'from-blue-500/10 to-transparent'
        },
        {
            icon: <Cpu className="text-green-400" size={36} strokeWidth={1.5} />,
            title: 'Automation Engineering',
            desc: 'Creating frictionless automation networks using n8n and highly available REST APIs to drastically reduce manual operating times.',
            bg: 'from-green-500/10 to-transparent'
        },
        {
            icon: <LayoutTemplate className="text-pink-400" size={36} strokeWidth={1.5} />,
            title: 'Full-Stack Architecture',
            desc: 'Developing lightning-fast, highly responsive, and robustly secure platforms from database schema to the beautiful frontend UI.',
            bg: 'from-pink-500/10 to-transparent'
        }
    ];

    return (
        <section id="about" className="py-32 w-full bg-black relative border-t border-white/5">
            <div className="absolute left-0 top-0 w-full h-[500px] bg-linear-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col md:flex-row gap-16 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="md:w-1/2"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-8 h-[2px] bg-blue-500"></span>
                            <h3 className="text-blue-400 font-bold tracking-widest uppercase text-sm">About Me</h3>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            Engineering the <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">future of digital.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="md:w-1/2 flex items-center"
                    >
                        <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed font-light">
                            I am a visionary Computer Science student deeply immersed in the intersection of modern scalable web technologies and Artificial Intelligence.
                            I don't just write code; I design systems that bridge the gap between experimental AI research and practical, impactful user-centered applications.
                        </p>
                    </motion.div>
                </div>

                {/* Animated Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-12 px-8 bg-white/3 border border-white/5 rounded-3xl backdrop-blur-sm"
                >
                    <AnimatedCounter target={10} suffix="+" label="Projects Built" />
                    <AnimatedCounter target={2} suffix="+" label="Years Experience" duration={1.5} />
                    <AnimatedCounter target={15} suffix="+" label="Technologies" duration={2.5} />
                    <AnimatedCounter target={100} suffix="%" label="Satisfaction" duration={2} />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="h-full"
                        >
                            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={1000} disableTiltOnTouch={true} className="h-full">
                                <div className={`relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-200 group h-full shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]`}>
                                    <div className={`absolute inset-0 bg-linear-to-br ${card.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <motion.div
                                            className="bg-black/40 border border-white/5 p-4 rounded-2xl w-fit mb-8 shadow-inner"
                                            whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {card.icon}
                                        </motion.div>
                                        <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">{card.title}</h4>
                                        <p className="text-gray-400 leading-relaxed font-light mt-auto">
                                            {card.desc}
                                        </p>
                                    </div>
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
