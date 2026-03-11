import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const certificatesData = [
  {
    title: "Essentials Automation Certification",
    issuer: "Automation Anywhere",
    date: "November 2025",
    icon: <Award className="w-8 h-8 text-blue-400" />,
    color: "from-blue-500/20 to-blue-500/0",
    borderInfo: "border-blue-500/30",
    link: "https://drive.google.com/file/d/1o_c_DzwPrh85QLixazmqOrSaZAuPlUcf/view"
  },
  {
    title: "Master Generative AI & Generative AI tools",
    issuer: "Infosys",
    date: "August 2025",
    icon: <Award className="w-8 h-8 text-purple-400" />,
    color: "from-purple-500/20 to-purple-500/0",
    borderInfo: "border-purple-500/30",
    link: "https://drive.google.com/file/d/1fD3vrr-HKyf73ZQ002eEs9FUyk0Dxche/view"
  },
  {
    title: "Full Stack (MERN) with Gen AI",
    issuer: "W3grads",
    date: "July 2025",
    icon: <Award className="w-8 h-8 text-pink-400" />,
    color: "from-pink-500/20 to-pink-500/0",
    borderInfo: "border-pink-500/30",
    link: "https://drive.google.com/file/d/1ZvqNeK8p7oL9_K0XVkQsDgqyFnSmLl58/view"
  },
  {
    title: "Live course Python towards AI/ML",
    issuer: "CSE pathshala",
    date: "March 2024",
    icon: <Award className="w-8 h-8 text-indigo-400" />,
    color: "from-indigo-500/20 to-indigo-500/0",
    borderInfo: "border-indigo-500/30",
    link: "https://drive.google.com/file/d/1XkDzIPx4aghDVByCpNXX0-nsi3tW2ifA/view"
  },
  {
    title: "Certificate of Internship in Artificial Intelligence",
    issuer: "Interns Elite",
    date: "March 2024",
    icon: <Award className="w-8 h-8 text-teal-400" />,
    color: "from-teal-500/20 to-teal-500/0",
    borderInfo: "border-teal-500/30",
    link: "http://drive.google.com/file/d/12V0sfeNzrj9GSUPHFYcAQ_sYDQQGBHEe/view"
  }
];

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="certificates" className="py-20 w-full relative z-10 hidden-scrollbar overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-500 to-pink-500 title-glow">
            Certificates & Training
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificatesData.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              className="h-full flex"
            >
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} scale={1.02} transitionSpeed={1000} disableTiltOnTouch={true} className="w-full flex">
                <div className={`p-px rounded-2xl bg-linear-to-b ${cert.borderInfo} transition-all duration-300 relative group w-full`}>
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`block h-full w-full rounded-2xl bg-background bg-linear-to-br ${cert.color} p-6 relative overflow-hidden flex flex-col justify-between border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer group-hover:border-white/20 transform-style-3d`}
                  >
                    
                    {/* Glow Effect behind icon */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500 transform translate-z-10" />

                    <div className="flex justify-between items-start transform translate-z-20">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-300">
                        {cert.icon}
                      </div>
                      
                      {/* External Link Icon that appears on hover */}
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 shadow-sm border border-white/10">
                        <ExternalLink className="w-4 h-4 text-gray-300" />
                      </div>
                    </div>

                    <div className="transform translate-z-20">
                      <h3 className="text-xl font-bold text-gray-100 mb-3 leading-tight relative z-10">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="mt-6 space-y-2 relative z-10 transform translate-z-10">
                      <div className="flex items-center text-gray-400 text-sm font-medium">
                        <Building className="w-4 h-4 mr-2 opacity-70" />
                        {cert.issuer}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs mt-1">
                        <Calendar className="w-3.5 h-3.5 mr-2 opacity-60" />
                        {cert.date}
                      </div>
                    </div>
                  </a>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
