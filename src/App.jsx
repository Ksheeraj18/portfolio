import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GithubStats from './components/GithubStats';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';
import SectionDivider from './components/SectionDivider';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#050505] min-h-screen text-gray-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <CursorGlow />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-100 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
        style={{ scaleX }}
      />
      <Navbar />
      <main className="flex flex-col items-center w-full">
        <Hero />
        <SectionDivider variant="wave" />
        <About />
        <SectionDivider variant="dots" />
        <Skills />
        <SectionDivider variant="line" />
        <Projects />
        <SectionDivider variant="dots" />
        <GithubStats />
        <SectionDivider variant="wave" />
        <Experience />
        <SectionDivider variant="line" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;