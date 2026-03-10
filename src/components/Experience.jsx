import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Sparkles } from 'lucide-react';

export default function Experience() {
    const experiences = [
        {
            company: 'Oibre Technologies',
            role: 'Software Development Intern',
            period: '2025 - Present',
            project: 'Oibre LMS',
            desc: 'A disruptive next-generation AI-powered Learning Management System featuring role-based dashboards, deeply collaborative real-time whiteboards, and a natively integrated AI tutor.',
            tech: ['React', 'TypeScript', 'Firebase', 'Groq API', 'Gemini AI', 'Excalidraw'],
            contributions: [
                'Engineered the core AI conversational tutor system using Groq and Gemini to provide instant, contextual learning assistance.',
                'Architected real-time voice feedback pipelines to dramatically increase user sensory engagement.',
                'Maintained complex concurrent state management protocols for the multiplayer Excalidraw whiteboard environment.'
            ]
        },
        {
            company: 'Oibre Technologies',
            role: 'Software Development Intern',
            period: '2025 - Present',
            project: 'Cyara Project Management Platform',
            desc: 'A massive multi-tenant SaaS workspace uniting advanced task management, real-time rich document editing, HR pipelines, and AI-driven workflow enhancements.',
            tech: ['React', 'TypeScript', 'Tailwind', 'Firebase', 'TipTap Editor', 'Gemini AI'],
            contributions: [
                'Designed the foundational SaaS architecture enabling strict multi-tenant boundaries and security.',
                'Built incredibly performant dynamic Kanban arrays and virtualized grids to support thousands of active nodes.',
                'Deployed advanced generative AI endpoints that passively digest project parameters to suggest actionable subtasks automatically.'
            ]
        }
    ];

    return (
        <section id="experience" className="py-32 w-full relative bg-zinc-950 overflow-hidden">
            {/* Background element - hidden on mobile for performance */}
            <motion.div
                className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-indigo-900/10 to-transparent pointer-events-none"
                animate={{ scale: [1, 1.15, 1], x: [0, -40, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-24 text-center flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <motion.span
                            className="w-8 h-[2px] bg-purple-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: 32 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        />
                        <h3 className="text-purple-400 font-bold tracking-widest uppercase text-sm">Career</h3>
                        <motion.span
                            className="w-8 h-[2px] bg-purple-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: 32 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight">
                        Professional <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-indigo-400">Experience.</span>
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto relative border-l-2 border-white/5 ml-4 md:ml-auto">
                    {/* Animated glowing line */}
                    <motion.div
                        className="absolute left-[-1px] top-0 w-[2px] bg-linear-to-b from-purple-500 via-blue-500 to-transparent"
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: index * 0.2 }}
                            className="mb-20 relative pl-10 md:pl-16 last:mb-0 group"
                        >
                            {/* Futuristic Timeline indicator with pulse */}
                            <motion.div
                                className="absolute left-[-11px] top-2 w-5 h-5 rounded-full bg-zinc-950 border-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-125 transition-transform duration-300"
                                animate={{ boxShadow: ['0 0 15px rgba(168,85,247,0.3)', '0 0 25px rgba(168,85,247,0.8)', '0 0 15px rgba(168,85,247,0.3)'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                            />

                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                                <div>
                                    <motion.h3
                                        className="text-3xl font-bold text-white tracking-tight group-hover:text-purple-400 transition-colors duration-300"
                                        whileHover={{ x: 5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        {exp.role}
                                    </motion.h3>
                                    <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xl mt-2">
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Briefcase size={20} className="text-indigo-500" />
                                        </motion.div>
                                        {exp.company}
                                    </div>
                                </div>
                                <motion.div
                                    className="flex items-center gap-2 text-gray-300 text-sm font-bold tracking-widest uppercase bg-white/5 border border-white/10 py-2 px-4 rounded-full w-fit shadow-inner"
                                    whileHover={{ scale: 1.05, borderColor: 'rgba(168,85,247,0.5)' }}
                                >
                                    <Calendar size={16} className="text-gray-400" />
                                    {exp.period}
                                </motion.div>
                            </div>

                            <motion.div
                                className="bg-black/60 border border-white/10 rounded-3xl p-8 md:p-10 transition-all duration-200 mt-8 shadow-xl"
                                whileHover={{
                                    borderColor: 'rgba(168,85,247,0.3)',
                                    boxShadow: '0 0 30px rgba(168,85,247,0.1)',
                                    backgroundColor: 'rgba(255,255,255,0.03)'
                                }}
                            >
                                <div className="mb-8">
                                    <h4 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                                        <motion.span
                                            className="px-3 py-1 bg-white/10 text-white rounded-lg text-sm border border-white/10"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <Sparkles size={14} className="inline mr-1" />
                                            Project
                                        </motion.span>
                                        {exp.project}
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed font-light text-lg">
                                        {exp.desc}
                                    </p>
                                </div>

                                <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                                    <h5 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Key Contributions</h5>
                                    <ul className="space-y-4">
                                        {exp.contributions.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                className="flex items-start gap-4 text-gray-300 font-light text-base md:text-lg"
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <CheckCircle2 size={22} className="text-purple-500 shrink-0 mt-0.5" />
                                                </motion.div>
                                                <span className="leading-relaxed">{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-6 flex flex-wrap gap-3">
                                    {exp.tech.map((tech, techIdx) => (
                                        <motion.span
                                            key={tech}
                                            className="text-sm font-semibold px-4 py-2 bg-linear-to-br from-white/10 to-transparent border border-white/10 rounded-xl text-white shadow-sm"
                                            whileHover={{
                                                scale: 1.1,
                                                y: -2,
                                                boxShadow: '0 4px 15px rgba(168,85,247,0.3)'
                                            }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
