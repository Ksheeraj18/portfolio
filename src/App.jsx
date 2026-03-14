import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { View, Preload } from '@react-three/drei';
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
import Certifications from './components/Certifications';
import AmbientBackground from './components/AmbientBackground';
import usePerfMode from './hooks/usePerformanceMode';

function App() {
  const [loading, setLoading] = useState(true);
  const { mode: performanceMode } = usePerfMode();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: performanceMode !== 'low',
      wheelMultiplier: performanceMode === 'low' ? 1 : 1.1,
      touchMultiplier: performanceMode === 'low' ? 1 : 1.3,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [performanceMode]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => setIsScrolling(false), 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-gray-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <>
            <Canvas
              eventSource={containerRef}
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 50 }}
              gl={{ 
                antialias: false, 
                alpha: true, 
                stencil: false, 
                depth: false,
                powerPreference: "high-performance"
              }}
              dpr={Math.min(1.5, window.devicePixelRatio || 1)}
              frameloop="always"
            >
              <View.Port />
              <Preload all />
            </Canvas>

            <motion.div
              key="main-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative w-full flex flex-col items-center"
            >
              <CursorGlow />
              <AmbientBackground isScrolling={isScrolling} />
              <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-100 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                style={{ scaleX }}
              />
              <Navbar />
              <main className="flex flex-col items-center w-full">
          <Hero performanceMode={performanceMode} isScrolling={isScrolling} />
          <SectionDivider variant="wave" />
          <About isScrolling={isScrolling} />
          <SectionDivider variant="dots" />
          <Services isScrolling={isScrolling} />
          <SectionDivider variant="line" />
          <Skills isScrolling={isScrolling} />
          <SectionDivider variant="wave" />
          <Certifications isScrolling={isScrolling} />
          <SectionDivider variant="dots" />
          <Projects isScrolling={isScrolling} />
          <SectionDivider variant="dots" />
          <GithubStats />
          <SectionDivider variant="wave" />
          <Experience isScrolling={isScrolling} />
          <SectionDivider variant="line" />
          <Contact performanceMode={performanceMode} isScrolling={isScrolling} />
              </main>
              <Footer />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;