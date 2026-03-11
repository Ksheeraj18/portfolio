import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
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
import Loader from './components/Loader';
import Services from './components/Services';
import Certificates from './components/Certificates';

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#050505] min-h-screen text-gray-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full flex flex-col items-center"
          >
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
        <Services />
        <SectionDivider variant="line" />
        <Skills />
        <SectionDivider variant="wave" />
        <Certificates />
        <SectionDivider variant="dots" />
        <Projects />
        <SectionDivider variant="dots" />
        <GithubStats />
        <SectionDivider variant="wave" />
        <Experience />
        <SectionDivider variant="line" />
        <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;