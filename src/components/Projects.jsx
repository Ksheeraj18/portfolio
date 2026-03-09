import { motion } from 'framer-motion';
import { Github, Code2, ArrowUpRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

export default function Projects() {
    const projects = [
        {
            title: 'ChefAssist',
            subtitle: 'AI Recipe Generator',
            desc: 'An intelligent culinary companion using the Gemini API. It analyzes dietary preferences and ingredient availability to generate highly personalized, step-by-step recipes on the fly.',
            tech: ['React', 'Node.js', 'Tailwind CSS', 'Gemini AI'],
            github: 'https://github.com/Savant261/Flames-2025-Project-ChefAssist',
            link: 'https://chef-assist-frontend.vercel.app/',
            color: 'from-orange-400 to-red-500'
        },
        {
            title: 'ResearchScout',
            subtitle: 'AI Research Blog Auto-Generator',
            desc: 'A powerful Flask engine that autonomously scrapes the latest AI research papers from arXiv and leverages Groq models to synthesize findings into comprehensive, readable blog posts.',
            tech: ['Python', 'Flask', 'Groq API', 'Automation'],
            github: 'https://github.com/Ksheeraj18/AI-Research-Blog-Flask-Application-',
            color: 'from-blue-400 to-indigo-500'
        },
        {
            title: 'AgriVision',
            subtitle: 'Crop Disease Prediction Model',
            desc: 'A robust computer vision convolutional neural network built with TensorFlow. It accurately diagnoses various plant diseases from high-res leaf images to assist farmers directly.',
            tech: ['Python', 'TensorFlow', 'Neural Networks', 'CV'],
            github: 'https://github.com/Rohith-Pavan/CROP-DISEASE-PREDICTION-MODEL',
            color: 'from-emerald-400 to-green-500'
        },
        {
            title: 'OmniFlow',
            subtitle: 'AI Workflow Automation Systems',
            desc: 'Engineered complex, highly resilient background automation workflows using n8n to connect disjointed APIs, aggregate data, and automatically pass it through AI reasoning steps.',
            tech: ['n8n', 'REST Flow', 'Webhooks', 'LLMs'],
            github: 'https://github.com/Ksheeraj18/OmniFlow-AI-Automations',
            color: 'from-purple-400 to-pink-500'
        }
    ];

    return (
        <section id="projects" className="py-32 w-full bg-black relative border-t border-white/5 overflow-hidden">
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-20 flex flex-col md:flex-row md:justify-between md:items-end gap-6"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 mb-4">
                            <span className="w-8 h-[2px] bg-blue-500"></span>
                            <h3 className="text-blue-400 font-bold tracking-widest uppercase text-sm">Portfolio</h3>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight">
                            Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">Works.</span>
                        </h2>
                    </div>
                    <a
                        href="https://github.com/Ksheeraj18"
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2 text-white bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-white/10 transition-all hover:scale-105"
                    >
                        <Github size={18} /> Visit GitHub
                    </a>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.15 }}
                            className="h-full flex"
                        >
                            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} scale={1.02} transitionSpeed={1000} disableTiltOnTouch={true} className="w-full flex">
                                <div className="group relative bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-200 hover:bg-white/[0.06] hover:border-white/30 hover:shadow-[0_0_40px_rgba(14,165,233,0.15)] flex flex-col h-full w-full">
                                    <div className={`h-2 w-full bg-linear-to-r ${project.color}`}></div>

                                    <div className="p-8 md:p-10 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-8 z-10 relative">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-4 bg-white/5 rounded-2xl border border-white/10 block hover:bg-white/10 group-hover:scale-110 transition-all duration-150 cursor-pointer text-gray-300 hover:text-white"
                                                title="View Source Code"
                                            >
                                                <Code2 size={28} />
                                            </a>
                                            <a
                                                href={project.link || project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-3 bg-white/5 rounded-full border border-white/10 text-gray-400 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all group/link"
                                                title="Visit Project"
                                            >
                                                <ArrowUpRight size={20} className="group-hover/link:rotate-45 transition-transform" />
                                            </a>
                                        </div>

                                        <div className="mb-6">
                                            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                                {project.title}
                                            </h3>
                                            <h4 className={`text-sm font-bold uppercase tracking-widest text-transparent bg-clip-text bg-linear-to-r ${project.color}`}>
                                                {project.subtitle}
                                            </h4>
                                        </div>

                                        <p className="text-gray-400 mb-10 leading-relaxed font-light text-lg flex-grow">
                                            {project.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                                            {project.tech.map(tech => (
                                                <span key={tech} className="text-xs font-semibold px-3 py-1.5 bg-black border border-white/10 rounded-lg text-gray-300 shadow-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
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
