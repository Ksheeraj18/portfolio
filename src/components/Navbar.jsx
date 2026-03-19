import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Menu, X, Zap, Globe, Cpu } from 'lucide-react';
import MagneticButton from './MagneticButton';

const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Certificates', to: 'certificates' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
];

const ScrollLink = ({ to, children, className, onClick }) => {
    const handleClick = (e) => {
        e.preventDefault();
        if (window.lenis) {
            window.lenis.scrollTo(`#${to}`, {
                offset: -80,
                duration: 1.5,
            });
        }
        if (onClick) onClick();
    };

    return (
        <a href={`#${to}`} onClick={handleClick} className={className}>
            {children}
        </a>
    );
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 200;
            const currentSection = navItems.find(item => {
                const element = document.getElementById(item.to);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    return scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight;
                }
                return false;
            });

            if (currentSection) setActiveSection(currentSection.to);
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navSpring = { type: "spring", stiffness: 400, damping: 30 };

    return (
        <header className="fixed top-0 left-0 right-0 z-9999 flex justify-center p-6 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                layout
                className={`pointer-events-auto flex items-center gap-8 px-4 py-2 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    scrolled 
                    ? 'rounded-3xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_-20px_rgba(0,0,0,1)]' 
                    : 'rounded-full bg-transparent'
                }`}
            >
                {/* Visual Identity Logo */}
                <div className="flex items-center gap-4 pl-2 pr-4 border-r border-white/5 relative group/logo">
                    <ScrollLink to="home" className="cursor-pointer group">
                        <div className="relative flex items-center gap-3">
                            <div className="w-10 h-10 rounded-[12px] bg-white flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:rotate-12 transition-all duration-700 relative">
                                <Cpu className="w-5 h-5 text-black relative z-10" />
                                <motion.div 
                                    className="absolute inset-x-0 h-px bg-black opacity-0 group-hover/logo:opacity-20 pointer-events-none"
                                    animate={{ top: ['0%', '100%'] }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase leading-none group-hover:text-blue-400 transition-colors duration-500">KSHEERAJ</span>
                                <div className="flex items-center gap-1 mt-1">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                    <span className="text-[8px] font-bold tracking-[0.2em] text-white/30 uppercase">System_Active</span>
                                </div>
                            </div>
                        </div>
                    </ScrollLink>
                </div>

                {/* Primary Navigation Array */}
                <div className="hidden md:flex items-center gap-2 px-1">
                    <LayoutGroup>
                        {navItems.map((item) => {
                            const isActive = activeSection === item.to;
                            return (
                                <ScrollLink
                                    key={item.name}
                                    to={item.to}
                                    className={`relative px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer group/nav ${
                                        isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                                    }`}
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-pill"
                                            className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <motion.div 
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-blue-500 opacity-0 group-hover/nav:w-1/2 group-hover/nav:opacity-100 transition-all duration-300 pointer-events-none"
                                    />
                                </ScrollLink>
                            );
                        })}
                    </LayoutGroup>
                </div>

                {/* Secure Gateway Toggle */}
                <div className="hidden lg:flex items-center pl-4 border-l border-white/5">
                    <MagneticButton>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=ksheeraj1811@gmail.com"
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white text-white hover:text-black rounded-2xl border border-white/10 transition-all duration-500 shadow-xl"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Access_Node</span>
                            <Globe className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                        </a>
                    </MagneticButton>
                </div>

                {/* Mobile System Toggle */}
                <button
                    className="md:hidden p-3 bg-white/5 rounded-2xl border border-white/10 text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </motion.nav>

            {/* Mobile Navigation Mesh */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="fixed inset-x-6 top-28 bg-[#080808]/90 backdrop-blur-3xl rounded-3xl border border-white/10 p-8 shadow-2xl flex flex-col gap-4 overflow-hidden pointer-events-auto"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-purple-500" />
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        window.lenis?.scrollTo(`#${item.to}`, { offset: -100, duration: 1.5 });
                                    }}
                                    className="text-2xl font-black text-white/40 hover:text-white uppercase tracking-tighter transition-all flex items-center justify-between group w-full text-left"
                                >
                                    <span>{item.name}</span>
                                    <div className="w-12 h-px bg-white/5 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-500" />
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
