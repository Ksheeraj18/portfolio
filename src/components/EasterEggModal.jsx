import { AnimatePresence, motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export default function EasterEggModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-[90vw] max-w-xl rounded-3xl bg-[#0b0b0f] border border-white/10 p-8 shadow-2xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-7 h-7 text-purple-300" />
              <h3 className="text-xl font-bold text-white">Secret Node</h3>
            </div>

            <p className="text-gray-300 mb-6">
              You found a hidden transmit node. Want a quick peek at the current roadmap?
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Next Release</p>
                <p className="text-sm font-semibold text-white">AI Duo: Live Code Pairing Assistant</p>
                <p className="text-xs text-gray-500 mt-1">Deep integration with your stack / real-time collaboration.</p>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Bonus</p>
                <p className="text-sm font-semibold text-white">Secret “Training Mode” in portfolio</p>
                <p className="text-xs text-gray-500 mt-1">A playful UI mode for visitors that unlocks easter eggs.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
