import { Mail, Github, Linkedin, Send, Sparkles, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import MagneticButton from './MagneticButton';
import InteractiveSection from './InteractiveSection';
import Antigravity from './Antigravity';

export default function Contact({ performanceMode = 'high', isScrolling = false }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const messageRef = useRef(null);
 
    // System Protocol Listener
    useEffect(() => {
        const handleProtocol = (e) => {
            const { title, id } = e.detail;
            setFormData(prev => ({
                ...prev,
                message: `[MISSION_DATA_LINK_ESTABLISHED]\nPROTOCOL_ID: ${id}\nOBJECTIVE: ${title.toUpperCase()}\n\n-- MISSION BRIEFING REQUISITION --\n> [PROJECT GOALS]: \n> [TECHNICAL STACK]: \n> [TIMELINE]: \n\nWaiting for signal input...`
            }));
            
            // Focus and scroll the textarea to the end
            setTimeout(() => {
              if (messageRef.current) {
                messageRef.current.focus();
                messageRef.current.scrollTop = messageRef.current.scrollHeight;
              }
            }, 100);
        };
        window.addEventListener('init-protocol', handleProtocol);
        return () => window.removeEventListener('init-protocol', handleProtocol);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("https://formsubmit.co/ajax/ksheeraj1811@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `New Portfolio Message from ${formData.name}`,
                })
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error(error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const contactLinks = [
        {
            href: "https://mail.google.com/mail/?view=cm&fs=1&to=ksheeraj1811@gmail.com",
            icon: <Mail size={20} />,
            label: "Communications",
            value: "ksheeraj1811@gmail.com",
            color: "text-blue-400",
            delay: 0
        },
        {
            href: "https://github.com/Ksheeraj18",
            icon: <Github size={20} />,
            label: "Engineering Hub",
            value: "github.com/Ksheeraj18",
            color: "text-white",
            delay: 0.1
        },
        {
            href: "https://linkedin.com/in/ksheeraj-gubbala",
            icon: <Linkedin size={20} />,
            label: "Professional Grid",
            value: "LinkedIn Profile",
            color: "text-blue-500",
            delay: 0.2
        }
    ];

    return (
        <InteractiveSection 
            id="contact" 
            className="py-32 border-t border-white/5" 
            glowColor="rgba(37, 99, 235, 0.08)"
            bgContent={
                <div className="absolute inset-0 opacity-20">
                    <Antigravity
                        count={80}
                        magnetRadius={18}
                        ringRadius={14}
                        waveSpeed={0.4}
                        waveAmplitude={2}
                        particleSize={1.3}
                        lerpSpeed={0.05}
                        color="#3b82f6"
                        autoAnimate
                        particleVariance={1.2}
                        depthFactor={1.2}
                        pulseSpeed={3}
                        particleShape="capsule"
                        fieldStrength={8}
                        performanceMode={performanceMode}
                    />
                </div>
            }
        >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
                        <Sparkles className="text-blue-400" size={14} />
                        <h3 className="text-white font-black uppercase tracking-[0.4em] text-[10px]">Signal Extraction</h3>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
                        Ready to <span className="text-blue-500 italic">Scale?</span>
                    </h2>
                    <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-md font-medium">
                        Initiate a transmission. Let's engineer the next generation of digital excellence together.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl backdrop-blur-md"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: link.delay }}
                            >
                                <div className={`p-4 bg-black rounded-2xl border border-white/10 ${link.color} group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500`}>
                                    {link.icon}
                                </div>
                                <div>
                                    <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-1">{link.label}</span>
                                    <span className="text-lg font-bold text-white tracking-tight">{link.value}</span>
                                </div>
                                <ArrowRight className="ml-auto w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1500} scale={1.02} transitionSpeed={2000} disableTiltOnTouch={true}>
                        <div className="bg-white/5 border border-white/10 p-10 md:p-12 rounded-[3.5rem] relative overflow-hidden backdrop-blur-2xl shadow-[0_50px_100px_rgba(0,0,0,0.6)] group">
                            {/* Inner Glass Glow */}
                            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                            
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {[
                                        { name: 'name', label: 'Identity', type: 'text', placeholder: 'Ksheeraj Gubbala' },
                                        { name: 'email', label: 'Frequency', type: 'email', placeholder: 'your@email.com' },
                                    ].map(field => (
                                        <div key={field.name} className="flex flex-col gap-4">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 px-2">{field.label}</label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                required
                                                onChange={handleChange}
                                                value={formData[field.name]}
                                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all duration-500 font-bold tracking-tight"
                                                placeholder={field.placeholder}
                                            />
                                        </div>
                                    ))}
                                </div>
 
                                <div className="flex flex-col gap-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 px-2">Data Packet</label>
                                    <textarea
                                        ref={messageRef}
                                        name="message"
                                        required
                                        rows={8}
                                        data-lenis-prevent
                                        onChange={handleChange}
                                        onWheel={(e) => e.stopPropagation()}
                                        onTouchMove={(e) => e.stopPropagation()}
                                        value={formData.message}
                                        className="w-full bg-black/40 border border-white/5 rounded-3xl px-6 py-8 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all duration-500 font-bold tracking-tight overflow-y-auto"
                                        placeholder="Briefly describe the objective..."
                                    />
                                </div>

                                <MagneticButton>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-xs transition-all duration-700 relative overflow-hidden flex items-center justify-center gap-4 ${
                                            submitStatus === 'success' ? 'bg-green-600 text-white' :
                                            submitStatus === 'error' ? 'bg-red-600 text-white' :
                                            'bg-white text-black hover:bg-blue-500 hover:text-white'
                                        }`}
                                    >
                                        {isSubmitting ? 'Transmitting...' : 
                                         submitStatus === 'success' ? 'Link Established' : 
                                         submitStatus === 'error' ? 'Retry Link' : 
                                         <>Initiate Transfer <ArrowRight size={16} /></>}
                                    </button>
                                </MagneticButton>
                            </form>
                        </div>
                    </Tilt>
                </motion.div>
            </div>
        </InteractiveSection>
    );
}
