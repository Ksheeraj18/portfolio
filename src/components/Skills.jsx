import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import FloatingIcons from './FloatingIcons';

export default function Skills() {
    const skillCategories = [
        {
            title: 'Languages',
            color: 'from-blue-400 to-indigo-500',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/20',
            glow: 'rgba(59,130,246,0.3)',
            skills: ['C++', 'Python', 'JavaScript']
        },
        {
            title: 'Frameworks',
            color: 'from-emerald-400 to-green-500',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/20',
            glow: 'rgba(16,185,129,0.3)',
            skills: ['React', 'Node.js', 'Flask', 'Django']
        },
        {
            title: 'AI & ML',
            color: 'from-purple-400 to-pink-500',
            bg: 'bg-purple-500/10',
            border: 'border-purple-500/20',
            glow: 'rgba(168,85,247,0.3)',
            skills: ['Gemini API', 'Groq API', 'TensorFlow', 'LangChain']
        },
        {
            title: 'Tools',
            color: 'from-orange-400 to-red-500',
            bg: 'bg-orange-500/10',
            border: 'border-orange-500/20',
            glow: 'rgba(251,146,60,0.3)',
            skills: ['Git', 'Firebase', 'REST APIs', 'n8n Automation']
        },
        {
            title: 'Databases',
            color: 'from-amber-300 to-yellow-500',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/20',
            glow: 'rgba(251,191,36,0.3)',
            skills: ['MongoDB', 'MySQL', 'Firebase Firestore']
        }
    ];

    return (
        <section id="skills" className="py-32 w-full relative bg-zinc-950 overflow-hidden">
            {/* Floating background icons */}
            <FloatingIcons />

            {/* Soft backdrop blur spot blur - hidden on mobile for performance */}
            <motion.div
                className="hidden md:block absolute top-1/2 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"
                animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-20 text-center flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <motion.span
                            className="w-8 h-[2px] bg-indigo-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: 32 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        />
                        <h3 className="text-indigo-400 font-bold tracking-widest uppercase text-sm">My Arsenal</h3>
                        <motion.span
                            className="w-8 h-[2px] bg-indigo-500"
                            initial={{ width: 0 }}
                            whileInView={{ width: 32 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight">
                        Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">Expertise.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05} transitionSpeed={1000} disableTiltOnTouch={true} className="h-full">
                                <motion.div
                                    className={`h-full relative overflow-hidden bg-black/40 border ${category.border} rounded-3xl p-8 backdrop-blur-xl group transition-all duration-300 shadow-lg hover:border-white/20`}
                                    whileHover={{ boxShadow: `0 0 40px ${category.glow}` }}
                                >
                                    <motion.div
                                        className={`absolute pointer-events-none top-0 right-0 w-32 h-32 ${category.bg} rounded-bl-full opacity-50`}
                                        whileHover={{ scale: 1.5, opacity: 0.8 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    <h4 className={`text-2xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r ${category.color} relative z-10`}>
                                        {category.title}
                                    </h4>

                                    <div className="flex flex-wrap gap-3 relative z-10">
                                        {category.skills.map((skill, skillIdx) => (
                                            <motion.span
                                                key={skill}
                                                className="px-4 py-2 bg-white/3 border border-white/10 rounded-xl text-gray-200 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-default shadow-sm"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 + skillIdx * 0.05, duration: 0.3 }}
                                                whileHover={{
                                                    scale: 1.1,
                                                    y: -3,
                                                    boxShadow: `0 4px 15px ${category.glow}`
                                                }}
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
