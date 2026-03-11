import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';
import MagneticButton from './MagneticButton';

const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 transition-all duration-500 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`pointer-events-auto w-full max-w-4xl xl:max-w-5xl transition-all duration-700 ease-in-out flex flex-col smooth-gpu ${scrolled
                    ? 'rounded-4xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] py-2'
                    : 'rounded-full bg-transparent border border-transparent py-4'
                    }`}
            >
                <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'px-8 py-2' : 'px-4 py-0'}`}>
                    <div className="text-xl font-black tracking-tighter cursor-pointer group">
                        <Link to="home" smooth={true} duration={500} className="flex items-center gap-2 text-white transition-all transform group-hover:scale-105">
                            <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center text-lg font-black shadow-xl group-hover:shadow-blue-500/20 transition-all duration-500">
                                K
                            </div>
                            <span className="hidden sm:block font-black uppercase text-xs tracking-[0.3em] overflow-hidden whitespace-nowrap">
                                Ksheeraj <span className="text-blue-500 font-bold">.Dev</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-xl shadow-inner">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.to}
                                smooth={true}
                                duration={800}
                                spy={true}
                                offset={-80}
                                activeClass="active-nav-link"
                                className="relative text-gray-400 hover:text-white cursor-pointer transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-xl group overflow-hidden block"
                            >
                                <span className="relative z-10">{item.name}</span>
                                <motion.div 
                                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-px bg-blue-500 transform scale-x-0 group-active-nav-link:scale-x-100 active-nav-link:scale-x-100 transition-transform duration-500 origin-left" />
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center">
                        <MagneticButton>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=ksheeraj1811@gmail.com"
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] bg-white text-black px-8 py-3.5 rounded-2xl hover:bg-white/90 transition-all duration-500 shadow-2xl hover:shadow-white/20"
                            >
                                <span>Initiate</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </MagneticButton>
                    </div>

                    {/* Mobile Nav Toggle */}
                    <button
                        className="md:hidden text-white p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl active:scale-90 transition-all"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Nav Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -20 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col px-8 py-10 gap-4 pb-12">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            to={item.to}
                                            smooth={true}
                                            duration={500}
                                            offset={-100}
                                            className="text-gray-400 hover:text-white text-4xl font-black py-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between group uppercase tracking-tighter"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                            <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-blue-500" />
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ksheeraj1811@gmail.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setMobileMenuOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-12 flex items-center justify-center gap-4 text-center font-black uppercase tracking-[0.4em] text-xs bg-white text-black px-6 py-6 rounded-4xl shadow-2xl active:scale-95 transition-all"
                                >
                                    Transmission <ArrowRight className="w-4 h-4" />
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    );
}
