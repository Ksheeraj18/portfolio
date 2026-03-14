import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

const ResumePreview = ({ isOpen, onClose, resumeUrl }) => {
    const [renderPdf, setRenderPdf] = useState(false);
    
    // Snappier Mouse Tracking
    const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

    const shineBg = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(59,130,246,0.1), transparent 40%)`
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            window.lenis?.stop();
            
            // Shorter delay for faster perceived load
            const timer = setTimeout(() => setRenderPdf(true), 400);
            return () => clearTimeout(timer);
        } else {
            setRenderPdf(false);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
            window.lenis?.start();
        };
    }, [isOpen, onClose]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-10000 flex items-center justify-center p-4 md:p-8 overflow-hidden pointer-events-none">
                    {/* Simplified Backdrop - Optimized for Speed */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
                    />

                    {/* Modal: Snappy & Lightweight */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ 
                            type: "spring", 
                            damping: 25, 
                            stiffness: 200, 
                            mass: 0.8 // Lightweight mass for instant response
                        }}
                        onMouseMove={handleMouseMove}
                        data-lenis-prevent
                        className="relative w-full max-w-5xl h-full max-h-[90vh] bg-background rounded-3xl border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center pointer-events-auto will-change-transform"
                    >
                        {/* Compact Header */}
                        <div className="w-full px-6 py-4 flex items-center justify-between border-b border-white/5 bg-white/2">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-125 cursor-pointer" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="ml-4 flex items-center gap-2 opacity-50">
                                    <FileText size={14} className="text-blue-400" />
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Resume_Preview</span>
                                </div>
                            </div>
                            
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X size={20} className="text-white/40" />
                            </motion.button>
                        </div>

                        {/* Instant Content Area */}
                        <div className="flex-1 w-full relative bg-[#111] overflow-hidden group">
                           {renderPdf ? (
                               <motion.iframe 
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   src={`${resumeUrl}#view=FitH&toolbar=0&navpanes=0`}
                                   className="w-full h-full border-none"
                                   title="Resume"
                               />
                           ) : (
                               <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                   <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                   <span className="text-[9px] font-bold text-white/20 tracking-widest uppercase">Loading_Data</span>
                               </div>
                           )}

                           {/* Lightweight Shine */}
                           <motion.div 
                                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: shineBg }}
                           />
                        </div>

                        {/* Action Footer */}
                        <div className="w-full p-6 bg-white/2 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em]">System Status</span>
                                <span className="text-[10px] font-black text-green-500/60 uppercase tracking-widest">Ready_To_Stream</span>
                            </div>

                            <motion.a 
                                href={resumeUrl}
                                download
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-10 py-3 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-xl shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <Download size={14} />
                                    <span>Download</span>
                                </div>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResumePreview;
