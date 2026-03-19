import { motion, useMotionValue, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import FloatingIcons from './FloatingIcons';
import InteractiveSection from './InteractiveSection';
import Antigravity from './Antigravity';
import SkillRadar from './SkillRadar';

function SkillCategoryCard({ category, index, isScrolling, performanceMode }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const isLowPerf = performanceMode === 'low';

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 40%)`
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="h-full group"
        >
            <Tilt 
                tiltMaxAngleX={isLowPerf ? 0 : 5} 
                tiltMaxAngleY={isLowPerf ? 0 : 5} 
                perspective={1500} 
                scale={isLowPerf ? 1 : 1.02} 
                transitionSpeed={1500} 
                disableTiltOnTouch={true}
                className="h-full transform-style-3d smooth-gpu"
            >
                <div 
                    onMouseMove={onMouseMove}
                    className={`h-full relative overflow-hidden bg-zinc-950 border ${category.border} rounded-3xl md:rounded-[2.5rem] p-8 md:p-10 transition-all duration-300 hover:bg-zinc-900 hover:border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)] transform-style-3d`}
                >
                    {/* Spotlight Glow */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-3xl md:rounded-[2.5rem]"
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                        style={{ background: maskImage }}
                    />

                    {/* Corner Accent */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 ${category.bg} rounded-full opacity-20 group-hover:opacity-40 blur-3xl transition-opacity`} />

                    <div className="relative z-10 flex flex-col h-full transform-style-3d">
                        <h4 className={`text-3xl font-black mb-10 text-transparent bg-clip-text bg-linear-to-r ${category.color} tracking-tighter leading-none transform translate-z-20`}>
                            {category.title}
                        </h4>

                        <div className="flex flex-wrap gap-3 transform translate-z-10">
                            {category.skills.map((skill) => (
                                <motion.span
                                    key={skill}
                                    className="px-5 py-3 bg-white/2 border border-white/5 rounded-2xl text-gray-300 text-xs font-bold uppercase tracking-widest hover:border-white/20 transition-all cursor-default shadow-xl transform translate-z-10 relative overflow-hidden group/skill"
                                    whileHover={isLowPerf ? {} : {
                                        scale: 1.1,
                                        y: -5,
                                        translateZ: 20,
                                        boxShadow: `0 10px 30px ${category.glow}`
                                    }}
                                >
                                    <span className="relative z-10 group-hover/skill:text-white transition-colors duration-300">{skill}</span>
                                    <motion.div 
                                        className={`absolute inset-0 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 pointer-events-none z-0 ${category.bg}`}
                                    />
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </Tilt>
        </motion.div>
    );
}

export default function Skills({ isScrolling = false, performanceMode = 'high' }) {
    const isLowPerf = performanceMode === 'low';
    const skillCategories = [
        {
            title: 'Languages',
            color: 'from-blue-400 to-indigo-500',
            bg: 'bg-blue-500/20',
            border: 'border-blue-500/10',
            glow: 'rgba(59,130,246,0.3)',
            skills: ['C++', 'Python', 'JavaScript', 'TypeScript']
        },
        {
            title: 'Frameworks',
            color: 'from-emerald-400 to-green-500',
            bg: 'bg-emerald-500/20',
            border: 'border-emerald-500/10',
            glow: 'rgba(16,185,129,0.3)',
            skills: ['React', 'Node.js', 'Flask', 'Next.js']
        },
        {
            title: 'AI & ML',
            color: 'from-purple-400 to-pink-500',
            bg: 'bg-purple-500/20',
            border: 'border-purple-500/10',
            glow: 'rgba(168,85,247,0.3)',
            skills: ['Gemini API', 'Groq API', 'TensorFlow', 'LangChain']
        },
        {
            title: 'Intelligence',
            color: 'from-orange-400 to-red-500',
            bg: 'bg-orange-500/20',
            border: 'border-orange-500/10',
            glow: 'rgba(251,146,60,0.3)',
            skills: ['REST APIs', 'n8n Automation', 'Agents', 'Cloud']
        },
        {
            title: 'Structure',
            color: 'from-amber-300 to-yellow-500',
            bg: 'bg-amber-500/20',
            border: 'border-amber-500/10',
            glow: 'rgba(251,191,36,0.3)',
            skills: ['MongoDB', 'MySQL', 'Firebase', 'Vector DB']
        }
    ];

    return (
        <InteractiveSection 
            id="skills" 
            className="py-40 border-t border-white/5" 
            glowColor="rgba(16, 185, 129, 0.08)"
            bgContent={
                <div className="absolute inset-0 opacity-40">
                    <Antigravity
                        count={isLowPerf ? 50 : 120}
                        magnetRadius={8}
                        ringRadius={6}
                        waveSpeed={isLowPerf ? 0.2 : 0.8}
                        waveAmplitude={1}
                        particleSize={1.5}
                        lerpSpeed={0.5}
                        color="#10b981"
                        autoAnimate
                        particleVariance={1}
                        depthFactor={1}
                        pulseSpeed={1}
                        particleShape="capsule"
                        fieldStrength={5}
                        performanceMode={performanceMode}
                    />
                </div>
            }
        >
            <FloatingIcons paused={false} />

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16 mb-12">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8">
                                <motion.span
                                    className="w-12 lg:w-16 h-[2px] bg-indigo-500"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "inherit" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                />
                                <h3 className="text-indigo-400 font-bold tracking-[0.4em] lg:tracking-[0.5em] uppercase text-[10px] lg:text-xs">Arsenal</h3>
                                <motion.span
                                    className="w-12 lg:w-16 h-[2px] bg-indigo-500"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "inherit" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                />
                            </div>
                            <h2 className="text-4xl sm:text-7xl md:text-8xl xl:text-8xl 2xl:text-9xl font-black text-white tracking-tighter leading-[0.9] lg:leading-none mb-4">
                                Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">Expertise.</span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl">
                                A dynamic view of the tools, frameworks, and AI tech I use to build every project — optimized for performance, maintainability, and innovation.
                            </p>
                        </motion.div>
                    </div>

                    <div className="flex-0">
                        <SkillRadar categories={skillCategories} />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                    {skillCategories.map((category, index) => (
                        <div key={category.title} className="w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.5rem)] max-w-md">
                            <SkillCategoryCard category={category} index={index} isScrolling={isScrolling} performanceMode={performanceMode} />
                        </div>
                    ))}
                </div>
            </div>
        </InteractiveSection>
    );
}
