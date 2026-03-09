import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-scroll';

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
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-auto w-full max-w-4xl rounded-full transition-all duration-500 flex flex-col ${scrolled
                    ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] mt-2'
                    : 'bg-transparent border border-transparent mt-4'
                    }`}
            >
                <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'px-6 py-3' : 'px-4 py-4'}`}>
                    <div className="text-xl font-bold tracking-tighter cursor-pointer">
                        <Link to="home" smooth={true} duration={500} className="flex items-center gap-1 text-white hover:opacity-80 transition-opacity">
                            <span className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-sm mr-1">
                                K
                            </span>
                            <span className="hidden sm:block font-medium">Ksheeraj</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-2 py-1 backdrop-blur-md">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.to}
                                smooth={true}
                                duration={500}
                                spy={true}
                                offset={-100}
                                activeClass="bg-white/10 text-white shadow-sm"
                                className="relative text-gray-400 hover:text-white cursor-pointer transition-all duration-300 text-sm font-medium px-4 py-2 rounded-full group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400 scale-0 group-hover:scale-100 transition-transform duration-300" />
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center">
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=ksheeraj1811@gmail.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-bold bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]"
                        >
                            Let's Talk
                        </a>
                    </div>

                    {/* Mobile Nav Toggle */}
                    <button
                        className="md:hidden text-gray-300 hover:text-white p-2 bg-white/5 rounded-full border border-white/10"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Nav Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden overflow-hidden border-t border-white/10"
                        >
                            <div className="flex flex-col px-6 py-4 gap-2 pb-6">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.to}
                                        smooth={true}
                                        duration={500}
                                        offset={-100}
                                        className="text-gray-300 hover:text-white hover:bg-white/5 text-lg py-3 px-4 rounded-xl cursor-pointer transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ksheeraj1811@gmail.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mt-4 text-center font-medium bg-white text-black px-5 py-3 rounded-xl shadow-lg"
                                >
                                    Let's Talk
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    );
}
