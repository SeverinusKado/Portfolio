import {useEffect, useRef} from "react";
import {motion} from "framer-motion";
import {canvas} from "framer-motion/m";

export function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({x: 0, y: 0});
    const targetRef = useRef({x: 0, y: 0});
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            targetRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            if (!ctx || !canvas) return;

            mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * 0.1;
            mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * 0.1;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const dx = mouseRef.current.x - centerX;
            const dy = mouseRef.current.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const rippleCount=5;
            for (let i = 0; i < rippleCount; i++) {
                const time = Date.now()/1000;
                const radius = 50 + i * 30 + Math.sin(time+i) * 10;
                const alpha = (1-i/rippleCount) * 0.1;

                if (distance < 300) {
                    const proximity = 1-distance/300;
                    ctx.beginPath();
                    ctx.arc(mouseRef.current.x, mouseRef.current.y, radius, 0, 2 * Math.PI );
                    ctx.strokeStyle=`rgba(0, 217, 255, ${alpha * proximity})`;
                    ctx.lineWidth=2;
                    ctx.stroke();
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return() => {
            canvas.removeEventListener("mousemove", handleMouseMove);
            window.addEventListener("resize", resize);
            if(animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-auto"
                style={{zIndex: 1}}
                />

            <div className="min-h-screen flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                    style={{zIndex: 1}}
                    />

                <div className="relative z-10 text-center px-4">
                <motion.div
                    initial={{opacity:0, y:20}}
                    animate={{opacity:1, y:0}}
                    transition={{ duration:1, delay:0.2}}
                    className="mb-6"
                    >

                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 tracking-tight leading-tight whitespace-normal max-w-full">
                        <span className="inline-block hover:text-cyan-400 transition-colors duration-300">
                            Severinus
                        </span>
                        <span className="inline-block mx-4 text-cyan-400">
                            Kado
                        </span>
                    </h1>
                </motion.div>

                    <motion.p
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        transition={{duration:1, delay:0.5}}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
                        >
                        A Software Engineer blending creativity, data, and technology to craft smart, interactive systems.
                        <br/>
                        Where data dances, and technology speaks.
                    </motion.p>

                    <motion.div
                        initial={{opacity:0, y:20}}
                        animate={{opacity:1, y:0}}
                        transition={{duration:1, delay:0.8}}
                        className="flex gap-4 justify-center"
                        >
                        <button
                            onClick={() =>{
                                document.getElementById("projects")?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                });
                            }}
                            className="px-8 py-3 bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]">
                            Learn More
                        </button>
                        <button
                            onClick={() => {
                                document.getElementById("connect")?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                });
                            }}
                            className="px-8 py-3 border border-cyan-400 text-cyan-400 hover:text-black transition-all duration-300">
                            Explore
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 flex-col items-center text-cyan-400 cursor-pointer"
                    animate={{y: [0, -10, 0] }}
                    transition={{duration:2, repeat: Infinity, ease: 'easeInOut'}}
                    onClick={() => {
                        document.getElementById("connect")?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }}
                    >
                    <div className="text-cyan-400 opacity-50">
                        View My Work
                    </div>
                    <div className="w-px h-16 bg-gradient-to-b from-cyan-400 to-transparent mx-auto mt-2"/>
                </motion.div>
            </div>
        </section>
    );
}