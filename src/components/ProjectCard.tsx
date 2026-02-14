import {useRef, useState} from "react";
import {cancelSync, motion} from "framer-motion";

interface  ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    image?: string;
}

export function ProjectCard({title, description, tags, image}: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width /2;
        const centerY = rect.height /2;

        const rotateXValue = ((y - centerY) / centerY)*-10;
        const rotateYValue = ((x - centerX) / centerX)*10;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${ rotateX }deg) rotateY(${ rotateY }deg) ${isHovered ? 'translateZ(20px)' : 'translateZ(0)'}`,
                transition: 'transform 0.1s ease-out',
            }}
            className="relative group cursor-pointer"
            >
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-6 h-full">
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at ${rotateY * 5 + 50}% ${rotateX * 5 + 50}%, rgba(0, 217, 255, 0.15), transparent 70%)`,
                    }}
                    />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 border border-cyan-400 shadow-[0_0_20px_rgba(0,217,255,0.3)]"/>
                </div>

                <div className="relative z-10">
                    {image && (
                        <div className="mb-4 h-48 bg-gray-800 overflow-hidden">
                            <div
                                className="w-full h-full bg-gradient-tobr from-cyan-900/20 flex items-center justify-center">
                                <div className="text-6xl text-cyan-400/20">
                                    {title.charAt(0)}
                                </div>
                            </div>
                        </div>
                    )}

                    <h3 className="text-2xl mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {title}
                    </h3>

                    <p className="text-gray-400 mb-4">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 group-hover:bg-cyan-400/20 transition-colors duration-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-8 h-8 border-t-w border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100transition-opacity duration-300"/>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            </div>
        </motion.div>
    );
}