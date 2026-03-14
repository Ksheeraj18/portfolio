import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building, Sparkles } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import Antigravity from './Antigravity';

const certificatesData = [
  {
    title: "Essentials Automation Certification",
    issuer: "Automation Anywhere",
    date: "November 2025",
    icon: <Award className="w-6 h-6 text-blue-400" />,
    borderInfo: "border-blue-500/30",
    link: "https://drive.google.com/file/d/1o_c_DzwPrh85QLixazmqOrSaZAuPlUcf/view",
    id: "1o_c_DzwPrh85QLixazmqOrSaZAuPlUcf"
  },
  {
    title: "Master Generative AI & Tools",
    issuer: "Infosys",
    date: "August 2025",
    icon: <Award className="w-6 h-6 text-purple-400" />,
    borderInfo: "border-purple-500/30",
    link: "https://drive.google.com/file/d/1fD3vrr-HKyf73ZQ002eEs9FUyk0Dxche/view",
    id: "1fD3vrr-HKyf73ZQ002eEs9FUyk0Dxche"
  },
  {
    title: "Full Stack (MERN) with Gen AI",
    issuer: "W3grads",
    date: "July 2025",
    icon: <Award className="w-6 h-6 text-pink-400" />,
    borderInfo: "border-pink-500/30",
    link: "https://drive.google.com/file/d/1ZvqNeK8p7oL9_K0XVkQsDgqyFnSmLl58/view",
    id: "1ZvqNeK8p7oL9_K0XVkQsDgqyFnSmLl58"
  },
  {
    title: "Python towards AI/ML",
    issuer: "CSE pathshala",
    date: "March 2024",
    icon: <Award className="w-6 h-6 text-indigo-400" />,
    borderInfo: "border-indigo-500/30",
    link: "https://drive.google.com/file/d/1XkDzIPx4aghDVByCpNXX0-nsi3tW2ifA/view",
    id: "1XkDzIPx4aghDVByCpNXX0-nsi3tW2ifA"
  },
  {
    title: "Internship in AI",
    issuer: "Interns Elite",
    date: "March 2024",
    icon: <Award className="w-6 h-6 text-teal-400" />,
    borderInfo: "border-teal-500/30",
    link: "http://drive.google.com/file/d/12V0sfeNzrj9GSUPHFYcAQ_sYDQQGBHEe/view",
    id: "12V0sfeNzrj9GSUPHFYcAQ_sYDQQGBHEe"
  }
];

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section id="certificates" className="py-24 w-full relative z-10 overflow-hidden bg-transparent">
      {/* Antigravity Dynamic Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Antigravity
            count={200}
            magnetRadius={8}
            ringRadius={6}
            waveSpeed={0.3}
            waveAmplitude={0.8}
            particleSize={1.2}
            lerpSpeed={0.06}
            color="#3b82f6"
            autoAnimate
            particleVariance={1}
            particleShape="capsule"
            fieldStrength={12}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-5">
            <Sparkles size={12} className="text-blue-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Credential Library</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-linear-to-r from-white to-white/40 bg-clip-text text-transparent tracking-tight">
            Advanced Certifications
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificatesData.map((cert, index) => (
            <motion.div key={index} variants={itemVariants} className="group h-full">
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1400} scale={1.03} className="h-full">
                <div className={`h-full flex flex-col rounded-3xl bg-white/2 backdrop-blur-sm border ${cert.borderInfo} overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-white/30 group-hover:shadow-blue-500/10`}>
                  
                  {/* High-Impact Header */}
                  <div className="relative h-56 w-full bg-[#050505] overflow-hidden">
                    {/* Multi-Format Render Stack */}
                    <div className="absolute inset-0 z-0">
                        {/* Primary: High-Res Direct Snapshot */}
                        <img 
                            src={`https://lh3.googleusercontent.com/d/${cert.id}=w1000?authuser=0`}
                            alt={cert.title}
                            className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                            loading="lazy"
                            onError={(e) => {
                                // Fallback: If snapshot fails, use interactive frame
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                        />
                        {/* Secondary: Interactive Frame (Invisible by default) */}
                        <div className="hidden absolute inset-0">
                            <iframe 
                                src={`https://drive.google.com/file/d/${cert.id}/preview`}
                                className="w-full h-[150%] -translate-y-10 border-none pointer-events-none opacity-80"
                                scrolling="no"
                                title={cert.title}
                            />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
                    
                    {/* Status Icons */}
                    <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center z-30 group-hover:scale-110 transition-transform shadow-2xl">
                        {cert.icon}
                    </div>
                    
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10 z-30 text-blue-400 shadow-xl">
                        <ExternalLink size={16} />
                    </div>
                  </div>

                  {/* High-Contrast Body */}
                  <div className="p-8 flex-1 flex flex-col justify-between relative z-20">
                    <div>
                      <h3 className="text-2xl font-black text-white mb-6 leading-tight tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center text-white/40 group-hover:text-white/60 transition-colors">
                          <Building className="w-4 h-4 mr-3 text-blue-500/60" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{cert.issuer}</span>
                        </div>
                        <div className="flex items-center text-white/20 group-hover:text-white/40 transition-colors">
                          <Calendar className="w-4 h-4 mr-3" />
                          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">{cert.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10">
                        <div className="w-full h-px bg-white/5 mb-8" />
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white/30 text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-3 group/btn"
                        >
                          Verify Source
                          <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
