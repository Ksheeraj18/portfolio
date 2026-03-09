import { motion } from 'framer-motion';

export default function GithubStats() {
    const username = "Ksheeraj18";

    return (
        <section className="py-16 w-full relative z-10 border-t border-white/5 bg-black/30">
            <div className="max-w-6xl mx-auto px-6 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h3 className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2">Metrics</h3>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">GitHub <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">Stats.</span></h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col lg:flex-row gap-6 justify-center items-center"
                >
                    {/* Main Stats Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 w-full max-w-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm group hover:bg-white/10 transition-colors">
                        <img
                            src={`https://github-readme-stats-eight-theta.vercel.app/api?username=${username}&show_icons=true&theme=omni&hide_border=true&bg_color=00000000&title_color=3b82f6&text_color=9ca3af&icon_color=8b5cf6`}
                            alt="GitHub Stats"
                            className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
                            loading="lazy"
                        />
                    </div>

                    {/* Top Languages Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 w-full max-w-lg shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm group hover:bg-white/10 transition-colors">
                        <img
                            src={`https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=omni&hide_border=true&bg_color=00000000&title_color=3b82f6&text_color=9ca3af`}
                            alt="Top Languages"
                            className="w-full h-auto object-contain transition-transform group-hover:scale-[1.02]"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
