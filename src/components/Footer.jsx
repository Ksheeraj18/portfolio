import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { Link } from 'react-scroll';
import MagneticButton from './MagneticButton';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { href: "https://github.com/Ksheeraj18", icon: <Github size={20} />, label: "GitHub" },
        { href: "https://linkedin.com/in/ksheeraj-gubbala", icon: <Linkedin size={20} />, label: "LinkedIn" },
        { href: "https://mail.google.com/mail/?view=cm&fs=1&to=ksheeraj1811@gmail.com", icon: <Mail size={20} />, label: "Email" }
    ];

    return (
        <footer className="w-full py-12 bg-black border-t border-white/10 relative overflow-hidden">
            {/* Subtle gradient at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="max-w-6xl mx-auto px-6 w-full">
                {/* Back to top */}
                <motion.div
                    className="flex justify-center mb-8"
                >
                    <MagneticButton>
                        <Link
                            to="home"
                            smooth={true}
                            duration={800}
                            className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors cursor-pointer text-sm"
                        >
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="p-2 bg-white/5 rounded-full border border-white/10 group-hover:border-white/30 transition-colors"
                            >
                                <ArrowUp size={16} />
                            </motion.div>
                            Back to top
                        </Link>
                    </MagneticButton>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <motion.p
                        className="text-gray-500 text-sm flex items-center gap-1"
                    >
                        &copy; {currentYear} Ksheeraj Gubbala. Made with
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Heart size={14} className="text-red-500 fill-red-500" />
                        </motion.span>
                        & code.
                    </motion.p>

                    <div className="flex items-center gap-4">
                        {socialLinks.map((link, i) => (
                            <MagneticButton key={i}>
                                <motion.a
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-500 hover:text-white transition-all p-2.5 bg-white/5 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10 block"
                                    whileHover={{ scale: 1.15, boxShadow: '0 0 15px rgba(168,85,247,0.3)' }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {link.icon}
                                    <span className="sr-only">{link.label}</span>
                                </motion.a>
                            </MagneticButton>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
