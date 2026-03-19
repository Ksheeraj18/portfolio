import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const ResumePreview = ({ isOpen, onClose, resumeUrl }) => {
    const [shouldRender, setShouldRender] = useState(false);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
            if (window.lenis) window.lenis.stop();
            
            const timer = setTimeout(() => setShouldRender(true), 300);
            return () => {
                clearTimeout(timer);
                window.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = '';
                if (window.lenis) window.lenis.start();
            };
        } else {
            setShouldRender(false);
            document.body.style.overflow = '';
            if (window.lenis) window.lenis.start();
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-10000 flex items-center justify-center p-2 md:p-8 overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm pointer-events-auto"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        data-lenis-prevent
                        className="relative w-full max-w-5xl h-full max-h-[92vh] bg-background rounded-2xl md:rounded-3xl border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col pointer-events-auto will-change-transform"
                    >
                        {/* Header */}
                        <div className="w-full px-4 md:px-6 py-3 flex items-center justify-between border-b border-white/5 bg-white/2">
                            <div className="flex items-center gap-2">
                                <div className="hidden md:flex gap-1.5">
                                    <div onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="md:ml-4 flex items-center gap-2 opacity-50">
                                    <FileText size={14} className="text-blue-400" />
                                    <span className="text-[9px] font-bold tracking-widest uppercase">system_resume.pdf</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X size={20} className="text-white/40" />
                            </button>
                        </div>

                        <div className="flex-1 w-full relative bg-black">
                           {shouldRender ? (
                               <iframe 
                                   src={`${resumeUrl}#view=FitH&toolbar=0&navpanes=0`}
                                   className="w-full h-full border-none"
                                   title="Resume"
                               />
                           ) : (
                               <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                   <div className="w-6 h-6 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                   <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase">Decrypting_Package</span>
                               </div>
                           )}
                        </div>

                        {/* Action Footer */}
                        <div className="w-full px-6 py-4 bg-white/2 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-blue-500/60 uppercase tracking-widest">Protocol_Ready</span>
                            </div>

                            <a 
                                href={resumeUrl}
                                download
                                className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-wider rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                            >
                                <Download size={14} />
                                <span>Download</span>
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResumePreview;
