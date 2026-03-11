import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Give it a small delay before hiding
          return 100;
        }
        // Randomize the loading speed a bit for realism
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#050505] text-white"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -50,
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing background effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px]" />
        
        <motion.div
          className="text-7xl md:text-9xl font-bold tracking-tighter mix-blend-difference z-10 font-mono"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {Math.min(progress, 100)}%
        </motion.div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full mt-8 overflow-hidden z-10">
          <motion.div
            className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
