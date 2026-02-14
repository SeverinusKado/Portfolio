import {useEffect, useRef, useState} from "react";
import { cn } from "./ui/utils.js";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({x:0, y:0, prevX:0, prevY:0});
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.prevX = mouseRef.current.x;
            mouseRef.current.prevY = mouseRef.current.y;
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }

            if (Math.random() > 0.7) {
                particlesRef.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    life: 1,
                    maxLife: 30 + Math.random() * 30,
                    size: Math.random() * 3 + 1,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current = particlesRef.current.filter((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.life++;

                const alpha = 1 - particle.life / particle.maxLife;

                if (alpha > 0) {
                    const gradient = ctx.createRadialGradient(
                        particle.x,
                        particle.y,
                        0,
                        particle.x,
                        particle.y,
                        particle.size * 2
                    );
                    gradient.addColorStop(0, `rgba(0, 217, 255, ${alpha * 0.8})`);
                    gradient.addColorStop(1, `rgba(0, 217, 255, 0)`);

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    return true;
                }

                return false;
            });

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <>
        <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{zIndex: 9999}}
        />
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none mix-blend-difference"
                style={{zIndex: 10000}}
                >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full h-full border border-white rounded-full opacity-50"/>
            </div>
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-1 h-1 pointer-events-none"
                style={{zIndex: 10001}}
                >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full shadow-[0_0_10px_rgba(0,217,255,0.8)]"/>
            </div>
            </>
    );
}