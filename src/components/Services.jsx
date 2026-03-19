import React from 'react';
import { motion, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { Code2, BrainCircuit, DatabaseZap, TerminalSquare, ArrowRight, Sparkles, Cpu, Zap, Activity, ShieldCheck } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import InteractiveSection from './InteractiveSection';
import Antigravity from './Antigravity';

const servicesData = [
  {
    id: 1,
    title: "Full Stack Development",
    subtitle: "High-Performance Architectures",
    description: "Engineering scalable web ecosystems using the MERN stack. Specialized in low-latency communication and modular state management.",
    icon: <Code2 className="w-12 h-12 text-blue-400" />,
    gradient: "from-blue-600/20 to-transparent",
    border: "border-blue-500/20 hover:border-blue-500/40",
    shadow: "shadow-[0_0_50px_rgba(59,130,246,0.1)]",
    code: "FS",
    tags: ["MERN", "REDIS", "WEBSOCKETS"]
  },
  {
    id: 2,
    title: "AI & LLM Integrations",
    subtitle: "Neural Intelligence Systems",
    description: "Architecting bespoke Generative AI pipelines. From RAG systems to fine-tuned model deployment for specialized enterprise objectives.",
    icon: <BrainCircuit className="w-12 h-12 text-purple-400" />,
    gradient: "from-purple-600/20 to-transparent",
    border: "border-purple-500/20 hover:border-purple-500/40",
    shadow: "shadow-[0_0_50px_rgba(168,85,247,0.1)]",
    code: "AI",
    tags: ["OPENAI", "LANGCHAIN", "VECTORDB"]
  },
  {
    id: 3,
    title: "Machine Learning Solutions",
    subtitle: "Predictive Analytics Engine",
    description: "Developing robust ML models for real-world inference. Expertise in computer vision, NLP, and deep learning for automated intelligence.",
    icon: <DatabaseZap className="w-12 h-12 text-pink-400" />,
    gradient: "from-pink-600/20 to-transparent",
    border: "border-pink-500/20 hover:border-pink-500/40",
    shadow: "shadow-[0_0_50px_rgba(236,72,153,0.1)]",
    code: "ML",
    tags: ["PYTORCH", "NLP", "FORECASTING"]
  }
];

function ServiceCard({ service, index, isScrolling, performanceMode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isLowPerf = performanceMode === 'low';
  const isMediumPerf = performanceMode === 'medium';

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 40%)`
  );

  const handleProtocolClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    window.dispatchEvent(new CustomEvent('init-protocol', { 
        detail: { 
           title: service.title,
           id: service.code
        } 
    }));

    const target = document.querySelector('#contact');
    if (window.lenis) {
        window.lenis.scrollTo(target, {
            offset: -100,
            duration: 1.5,
            easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
        });
    } else {
        target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tilt 
        tiltMaxAngleX={isLowPerf ? 0 : 3} 
        tiltMaxAngleY={isLowPerf ? 0 : 3} 
        perspective={2000} 
        scale={isLowPerf ? 1 : 1.02} 
        transitionSpeed={1500} 
        disableTiltOnTouch={true}
        className="h-full transform-style-3d smooth-gpu"
      >
        <div
          onMouseMove={onMouseMove}
          className={`group relative p-8 md:p-10 lg:p-14 rounded-[2.5rem] md:rounded-[3.5rem] bg-zinc-950 shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-300 hover:border-white/20 h-full flex flex-col transform-style-3d overflow-hidden`}
        >
          {/* Grid/Circuit Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[30px_30px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-size-[120px_120px]" />
          </div>

          {/* Spotlight Effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[3.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
            style={{ background: maskImage }}
          />

          {/* Rapid Scanline Animation - Disabled on Low Perf */}
          {!isLowPerf && (
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-[3.5rem]">
                <motion.div 
                   className="w-full h-px bg-white/20 absolute"
                   animate={{ top: ['-5%', '105%'] }}
                   transition={{ duration: isMediumPerf ? 1.5 : 0.8, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                />
            </div>
          )}

          {/* Technical Branding */}
          <div className="flex items-center justify-between mb-10 md:mb-16 relative z-20">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
               <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 italic">Module_0{index + 1}</span>
            </div>
            <ShieldCheck className="w-5 h-5 text-white/5 group-hover:text-blue-400 group-hover:rotate-12 transition-all duration-500" />
          </div>

          <div className="relative z-20 flex flex-col h-full transform-style-3d">
            {/* Elegant Icon Presentation with Reactive Glow */}
              <div className="relative w-fit mb-10 md:mb-12">
                <motion.div 
                  className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-300"
                  animate={isLowPerf ? {} : { scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              <div className="relative p-3.5 md:p-5 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl transform translate-z-30 group-hover:scale-105 group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                {React.cloneElement(service.icon, { 
                  className: "w-7 h-7 md:w-10 md:h-10 transition-colors duration-700 group-hover:text-black" 
                })}
              </div>
            </div>
            
            <div className="mb-6 md:mb-8 transform translate-z-20">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[0.9] mb-4 group-hover:translate-x-3 transition-transform duration-700">
                {service.title}
                </h3>
                <motion.div 
                  className="h-1 bg-blue-500/50 rounded-full"
                  initial={{ width: 48 }}
                  whileInView={{ width: 96 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
            </div>
            
            <p className="text-gray-400 text-base md:text-lg grow leading-relaxed font-light transform translate-z-10 mb-8 md:mb-12 group-hover:text-gray-200 transition-colors duration-500">
              {service.description}
            </p>

            {/* Futuristic Tech Tags with Hover Animation */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-16 transform translate-z-10">
                {service.tags.map(tag => (
                    <motion.span 
                      key={tag} 
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/5 border border-white/5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/40 cursor-default"
                      whileHover={isLowPerf ? {} : { 
                        scale: 1.05, 
                        backgroundColor: "rgba(255,255,255,0.1)", 
                        borderColor: "rgba(255,255,255,0.2)",
                        color: "white"
                      }}
                    >
                        {tag}
                    </motion.span>
                ))}
            </div>

            {/* THE COMMAND BUTTON - CYBER-MINIMALIST */}
            <button 
              onClick={handleProtocolClick}
              type="button"
              className="relative w-full group/btn cursor-pointer focus:outline-none z-50 transform translate-z-40"
            >
              <div className="relative overflow-hidden px-6 py-4 md:px-8 md:py-6 rounded-2xl bg-black border border-white/10 flex items-center justify-between transition-all duration-500 group-hover/btn:border-blue-500/50 group-hover/btn:bg-zinc-900 shadow-2xl">
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                        <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-blue-500/60">Ready_To_Deploy</span>
                    </div>
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-white">
                        Initiate_Protocol
                    </span>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden sm:flex gap-1 items-center">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-1 h-3 md:h-4 bg-white/10 rounded-full group-hover/btn:bg-blue-500/50 transition-colors" />
                        ))}
                    </div>
                    <div className="p-2 md:p-3 bg-white/5 rounded-xl group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                </div>

                {/* Subtle Scanning Light */}
                {!isLowPerf && (
                  <motion.div 
                    className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-blue-400/10 to-transparent pointer-events-none"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                )}
              </div>
            </button>
          </div>

          {/* Persistent Gradient Finish */}
          <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />
        </div>
      </Tilt>
    </motion.div>
  );
}

const Services = ({ isScrolling = false, performanceMode = 'high' }) => {
  const isLowPerf = performanceMode === 'low';
  return (
    <InteractiveSection 
        id="services" 
        className="py-24 md:py-32 lg:py-40 border-t border-white/5" 
        glowColor="rgba(37, 99, 235, 0.03)"
        bgContent={
            <div className="absolute inset-0 opacity-30">
                <Antigravity
                    count={isLowPerf ? 40 : 100}
                    magnetRadius={35}
                    ringRadius={30}
                    waveSpeed={isLowPerf ? 0.05 : 0.1}
                    particleSize={1.5}
                    lerpSpeed={0.4}
                    color="#3b82f6"
                    autoAnimate
                    particleShape="capsule"
                    performanceMode={performanceMode}
                />
            </div>
        }
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="mb-16 md:mb-24 lg:mb-32"
         >
           <div className="flex items-center gap-4 mb-6 md:mb-8">
             <div className="w-8 md:w-10 h-px bg-blue-500" />
             <span className="text-white font-black text-[9px] md:text-[10px] tracking-[0.5em] md:tracking-[0.6em] uppercase">Services_Catalog</span>
           </div>
                      <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85] md:leading-[0.8] text-white">
              <span className="italic pr-8 md:pr-12 -mr-8 md:-mr-12">Neural</span><br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-600">Excellence.</span>
            </h2>
         </motion.div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-14">
           {servicesData.map((service, index) => (
             <ServiceCard key={service.id} service={service} index={index} isScrolling={isScrolling} performanceMode={performanceMode} />
           ))}
         </div>
       </div>
    </InteractiveSection>
  );
};

export default Services;
