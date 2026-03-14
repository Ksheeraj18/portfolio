import { motion, useMotionValue, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import FloatingIcons from './FloatingIcons';
import InteractiveSection from './InteractiveSection';
import Antigravity from './Antigravity';

function SkillCategoryCard({ category, index }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

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
                tiltMaxAngleX={8} 
                tiltMaxAngleY={8} 
                perspective={1500} 
                scale={1.02} 
                transitionSpeed={1500} 
                disableTiltOnTouch={true}
                className="h-full transform-style-3d smooth-gpu"
            >
                <div 
                    onMouseMove={onMouseMove}
                    className={`h-full relative overflow-hidden bg-zinc-950 border ${category.border} rounded-3xl md:rounded-[2.5rem] p-8 md:p-10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.5)] transform-style-3d`}
                >
                    {/* Spotlight Glow */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: maskImage }}
                    />

                    {/* Corner Accent */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 ${category.bg} rounded-full opacity-20 group-hover:opacity-40 blur-3xl transition-opacity`} />

                    <div className="relative z-10 flex flex-col h-full transform-style-3d">
                        <h4 className={`text-3xl font-black mb-10 text-transparent bg-clip-text bg-linear-to-r ${category.color} tracking-tighter leading-none transform translate-z-20`}>
                            {category.title}
                        </h4>

                        <div className="flex flex-wrap gap-3 transform translate-z-10">
                            {category.skills.map((skill, skillIdx) => (
                                <motion.span
                                    key={skill}
                                    className="px-5 py-3 bg-white/2 border border-white/5 rounded-2xl text-gray-300 text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all cursor-default shadow-xl transform translate-z-10"
                                    whileHover={{
                                        scale: 1.1,
                                        y: -5,
                                        translateZ: 20,
                                        boxShadow: `0 10px 30px ${category.glow}`
                                    }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </Tilt>
        </motion.div>
    );
}

export default function Skills() {
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
                <div className="absolute inset-0 opacity-20">
                    <Antigravity
                        count={300}
                        magnetRadius={8}
                        ringRadius={6}
                        waveSpeed={0.8}
                        waveAmplitude={1}
                        particleSize={1.5}
                        lerpSpeed={0.1}
                        color="#10b981"
                        autoAnimate
                        particleVariance={1}
                        depthFactor={1}
                        pulseSpeed={3}
                        particleShape="capsule"
                        fieldStrength={10}
                    />
                </div>
            }
        >
            <FloatingIcons />

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 lg:mb-32 text-center flex flex-col items-center"
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
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, index) => (
                        <SkillCategoryCard key={category.title} category={category} index={index} />
                    ))}
                </div>
            </div>
        </InteractiveSection>
    );
}
