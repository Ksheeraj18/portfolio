import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [focused, setFocused] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({ name: '', email: '', message: '' });
    };

    const contactLinks = [
        {
            href: "https://mail.google.com/mail/?view=cm&fs=1&to=ksheeraj1811@gmail.com",
            icon: <Mail className="text-blue-400" size={24} />,
            label: "Email",
            value: "ksheeraj1811@gmail.com",
            hoverBg: "group-hover:bg-blue-500/20 group-hover:border-blue-500/50",
            delay: 0
        },
        {
            href: "https://github.com/Ksheeraj18",
            icon: <Github className="text-gray-400" size={24} />,
            label: "GitHub",
            value: "github.com/Ksheeraj18",
            hoverBg: "group-hover:bg-gray-700/50 group-hover:border-white/30",
            delay: 0.1
        },
        {
            href: "https://linkedin.com/in/ksheeraj-gubbala",
            icon: <Linkedin className="text-blue-500" size={24} />,
            label: "LinkedIn",
            value: "linkedin.com/in/ksheeraj-gubbala",
            hoverBg: "group-hover:bg-blue-600/20 group-hover:border-blue-500/50",
            delay: 0.2
        }
    ];

    const inputFields = [
        { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
        { name: 'email', label: 'Your Email', type: 'email', placeholder: 'john@example.com' },
    ];

    return (
        <section id="contact" className="py-24 w-full bg-black/50 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Animated floating orbs */}
            <motion.div
                className="absolute top-20 right-20 w-3 h-3 rounded-full bg-blue-500/30"
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-40 left-32 w-2 h-2 rounded-full bg-purple-500/30"
                animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
                className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-pink-500/20"
                animate={{ y: [0, -25, 0], x: [0, 10, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Sparkles className="text-blue-400" size={16} />
                        <h3 className="text-blue-500 font-semibold tracking-wider uppercase text-sm">Get in Touch</h3>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's build something <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">together.</span></h2>
                    <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-md">
                        Whether you have a question, want to start a project, or simply want to connect, feel free to drop me a message.
                    </p>

                    <div className="flex flex-col gap-4">
                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-4 text-gray-300 hover:text-white transition-all group"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: link.delay }}
                                whileHover={{ x: 8 }}
                            >
                                <motion.div
                                    className={`p-4 bg-white/5 border border-white/10 rounded-xl ${link.hoverBg} transition-all duration-300`}
                                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {link.icon}
                                </motion.div>
                                <div>
                                    <span className="block text-sm text-gray-500">{link.label}</span>
                                    <span className="text-lg font-medium">{link.value}</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden"
                >
                    {/* Animated gradient border glow */}
                    <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                        {inputFields.map(field => (
                            <motion.div
                                key={field.name}
                                className="flex flex-col gap-2 relative"
                                animate={focused === field.name ? { scale: 1.01 } : { scale: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <label htmlFor={field.name} className={`text-sm font-medium transition-colors duration-300 ${focused === field.name ? 'text-blue-400' : 'text-gray-400'}`}>
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    onFocus={() => setFocused(field.name)}
                                    onBlur={() => setFocused(null)}
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300"
                                    placeholder={field.placeholder}
                                />
                                {/* Animated underline */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-[2px] bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
                                    initial={{ width: '0%' }}
                                    animate={focused === field.name ? { width: '100%' } : { width: '0%' }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}

                        <motion.div
                            className="flex flex-col gap-2 relative"
                            animate={focused === 'message' ? { scale: 1.01 } : { scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <label htmlFor="message" className={`text-sm font-medium transition-colors duration-300 ${focused === 'message' ? 'text-blue-400' : 'text-gray-400'}`}>
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onFocus={() => setFocused('message')}
                                onBlur={() => setFocused(null)}
                                required
                                rows={5}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 resize-none"
                                placeholder="How can I help you?"
                            ></textarea>
                            <motion.div
                                className="absolute bottom-0 left-0 h-[2px] bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
                                initial={{ width: '0%' }}
                                animate={focused === 'message' ? { width: '100%' } : { width: '0%' }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="w-full py-4 mt-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all group relative overflow-hidden"
                            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(59,130,246,0.4)' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                                Send Message
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </span>
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
