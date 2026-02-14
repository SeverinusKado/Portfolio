import { useState} from "react";
import { motion} from "framer-motion";

interface SkillOrbProps {
    skill: string;
    level: number;
    delay: number;
}

export function SkillOrb({skill, level, delay=0}: SkillOrbProps) {
    const [isHovered, setHovered] = useState(false);

    const size = 60 + level * 20;

    return (
        <motion.div
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, delay}}
            whileHover={{scale: 1.2}}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative group cursor-pointer"
            style={{width: size, height: size}}
        >
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    boxShadow: isHovered ?
                        [
                            '0 0 20px rgba(0, 217, 255, 0.5)',
                            '0 0 40px rgba(0, 217, 255, 0.8)',
                            '0 0 20px rgba(0, 217, 255, 0.5)',
                        ]
                        : '0 0 10px rgba(0, 217, 255, 0.3)',
                }}
                transition={{duration: 2, repeat: Infinity}}
                style={{
                    background: `radial-gradient(circle, rgba(0, 217, 255, 0.2), transparent 70%)`,
                }}
            />
            <div
                className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="relative z-10 text-xs text-center text-white px-2">
                    {skill}
                </span>
            </div>

            <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10}}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black border border-cyan-400 px-3 py-1 text-xs pointer-events-none"
            >
                Level: {level}/5
            </motion.div>

            {isHovered && (
                <>
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                            initial={{ x: 0, y: 0, opacity: 1 }}
                            animate={{
                                x: Math.cos((i / 3) * Math.PI * 2) * 40,
                                y: Math.sin((i / 3) * Math.PI * 2) * 40,
                                opacity: 0,
                            }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </>
            )}
        </motion.div>
    );
}