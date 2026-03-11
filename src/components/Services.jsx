import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue } from 'framer-motion';
import { Code2, BrainCircuit, DatabaseZap, TerminalSquare, ArrowRight, Sparkles } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const servicesData = [
  {
    id: 1,
    title: "Full Stack Development",
    description: "Building scalable, high-performance web applications using the MERN stack with modern, responsive architectures.",
    icon: <Code2 className="w-12 h-12 text-blue-400" />,
    gradient: "from-blue-500/20 to-transparent border-blue-500/30",
    shadow: "shadow-[0_0_50px_rgba(59,130,246,0.1)]"
  },
  {
    id: 2,
    title: "AI & LLM Integrations",
    description: "Integrating powerful Generative AI models into robust applications to automate workflows and create intelligent user experiences.",
    icon: <BrainCircuit className="w-12 h-12 text-purple-400" />,
    gradient: "from-purple-500/20 to-transparent border-purple-500/30",
    shadow: "shadow-[0_0_50px_rgba(168,85,247,0.1)]"
  },
  {
    id: 3,
    title: "Machine Learning Solutions",
    description: "Developing Python-based AI/ML solutions, leveraging predictive modeling and intelligent automation systems.",
    icon: <DatabaseZap className="w-12 h-12 text-pink-400" />,
    gradient: "from-pink-500/20 to-transparent border-pink-500/30",
    shadow: "shadow-[0_0_50px_rgba(236,72,153,0.1)]"
  }
];

function ServiceCard({ service, index }) {
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Tilt 
        tiltMaxAngleX={12} 
        tiltMaxAngleY={12} 
        perspective={1500} 
        scale={1.03} 
        transitionSpeed={1500} 
        className="h-full transform-style-3d"
      >
        <div
          onMouseMove={onMouseMove}
          className={`group relative p-12 rounded-[2.5rem] bg-zinc-950/50 border border-white/5 transition-all duration-500 hover:border-white/20 hover:bg-zinc-900/50 h-full flex flex-col transform-style-3d ${service.shadow}`}
        >
          {/* Spotlight Glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: maskImage }}
          />

          <div className="relative z-10 flex flex-col h-full transform-style-3d">
            <div className="mb-10 inline-flex p-5 rounded-3xl bg-white/5 border border-white/10 shadow-2xl transform translate-z-30 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 ease-out">
              {service.icon}
            </div>
            
            <h3 className="text-3xl font-black mb-6 text-white tracking-tighter transform translate-z-20 leading-none">
              {service.title}
            </h3>
            
            <p className="text-gray-400 text-lg grow leading-relaxed font-light transform translate-z-10">
              {service.description}
            </p>

            <motion.div 
              className="mt-12 flex items-center space-x-3 text-xs font-bold tracking-[0.3em] uppercase text-gray-400 group-hover:text-white transition-colors duration-300 cursor-pointer transform translate-z-20"
              whileHover={{ x: 10 }}
            >
              <span>Initiate Protocol</span>
              <div className="relative overflow-hidden w-6 h-6">
                 <ArrowRight className="w-6 h-6 absolute -left-full group-hover:left-0 transition-all duration-300" />
                 <ArrowRight className="w-6 h-6 absolute left-0 group-hover:left-full transition-all duration-300 opacity-50 group-hover:opacity-0" />
              </div>
            </motion.div>
          </div>

          {/* Background Gradient Hint */}
          <div className={`absolute inset-0 bg-linear-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        </div>
      </Tilt>
    </motion.div>
  );
}

const Services = () => {
  return (
    <section id="services" className="py-40 relative overflow-hidden bg-black">
      {/* Background Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 lg:mb-32"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8 shadow-2xl">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-gray-400 font-bold text-[10px] tracking-[0.4em] uppercase">Intelligence Stack</span>
          </div>
          
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-[0.9] lg:leading-none text-white">
            Specialized <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-500 to-pink-500">Systems.</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl font-light italic border-t border-white/5 pt-8 px-4">
            Deploying high-performance logic at the intersection of full-stack engineering and neural computation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
