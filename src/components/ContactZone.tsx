import {useState} from 'react';
import {motion} from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export function ContactZone() {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const contacts = [
        { icon: Mail, label: 'Email', value: 'kadoseverinus@gmail.com', href: 'mailto:kadoseverinus@gmail.com' },
        { icon: Github, label: 'GitHub', value: '@SeverinusKado', href: 'https://github.com/SeverinusKado' },
        { icon: Linkedin, label: 'Linkedin', value: '@SeverinusKado', href: 'https://linkedin.com/in/severinuskado' },
        { icon: Twitter, label: 'Twitter', value: '@superskrypt', href: 'https://twitter.com/superskrypt' },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{opacity: 0, y:20}}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{once: true}}
                    className="text-center mb-16"
                    >
                        <h2 className="text-6xl mb-4">
                            Let's <span className="text-cyan-400">Connect</span>
                        </h2>
                        <p className="text-gray-400 text-xl">
                            Have a project, idea, or collaboration in mind? Reach out... I'm always open to building something creative and meaningful.
                        </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contacts.map((contact, index) => {
                        const Icon = contact.icon;
                        const isHovered = hoveredItem === contact.label;

                        return (
                            <motion.a
                                key={contact.label}
                                href={contact.href}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20:20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onHoverStart={() => setHoveredItem(contact.label)}
                                onHoverEnd={() => setHoveredItem(null)}
                                className="relative group"
                                >
                                    <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 overflow-hidden">
                                        {/* Animated background */}
                                        <motion.div
                                            className="absolute inset-0"
                                            animate={{
                                                background: isHovered
                                                ? 'radial-gradient(circle at center, rgba(0, 217, 255, 0.1), transparent 70%)'
                                                    : 'transparent',
                                            }}
                                            transition={{duration: 0.3}}
                                            />
                                        {/* Connection lines animation */}
                                        {isHovered && (
                                            <>
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                key={i}
                                                className="absolute top-1/2 left-1/2 w-px h-20 bg-gradient-to-b from-cyan-400 to transparent origin-top"
                                                style={{
                                                transform: `rotate(${i * 45}deg)`,
                                                }}
                                                initial={{ scaleY: 0, opacity: 0}}
                                                animate={{ scaleY: 1, opacity: 0.3}}
                                                transition={{duration: 0.3, delay: i * 0.05}}
                                                />
                                            ))}
                                            </>
                                        )}

                                        {/* Content */}
                                        <div className="relative z-10 flex items-center gap-4">
                                            <motion.div
                                                animate={{
                                                    scale: isHovered ? 1.2 : 1,
                                                    rotate: isHovered ? 360 : 0,
                                                }}
                                                transition={{ duration: 0.5 }}
                                                className="p-3 bg-cyan-400/10 border border-cyan-400/30"
                                                >
                                                <Icon className="w-6 h-6 text-cyan-400" />
                                            </motion.div>

                                            <div className="flex-1">
                                                <div className="text-sm text-gray-500 mb-1">{contact.label}</div>
                                                <div className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                                                    {contact.value}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Border*/}
                                        <motion.div
                                            className="absolute inset-0 border border-cyan-400 pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: isHovered ? 1 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                                            }}
                                            />
                                    </div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* node center connection */}
                <motion.div
                    className="relative mt-16 text-center"
                    initial={{opacity: 0, scale:0}}
                    whileInView={{opacity: 1, scale: 1}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{once:true}}
                    >
                    <div className="inline-flex items-center justify-center">
                        <div className="relative">
                            {hoveredItem && (
                                <motion.div
                                    className="absolute inset-0 animate-ping"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(0, 217, 255, 0.4), transparent 70%)',
                                    }}
                                    />
                            )}
                            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-shadow-[0_0_40px_rgba(0,217,255,0.5)]">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}