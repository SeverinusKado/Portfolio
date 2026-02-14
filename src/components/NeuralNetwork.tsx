import { useEffect, useRef } from "react";

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
}

interface Connection {
    from: number;
    to: number;
    strength: number;
}

export function NeuralNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodeRef = useRef<Node[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const connectionRef = useRef<Connection[]>([]);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const nodeCount = 50;
        nodeRef.current = Array.from({ length: nodeCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
        }));

        connectionRef.current = [];
        for (let i = 0; i < nodeRef.current.length; i++) {
            for (let j = i + 1; j < nodeRef.current.length; j++) {
                const nodeA = nodeRef.current[i];
                const nodeB = nodeRef.current[j];

                if (!nodeA || !nodeB) continue;

                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150 && Math.random() > 0.7) {
                    connectionRef.current.push({ from: i, to: j, strength: 0 });
                }
            }
        }


        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            nodeRef.current.forEach((node) => {
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));

                const dx = mouseRef.current.x - node.x;
                const dy = mouseRef.current.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const proximity = Math.max(0, 1 - distance / 200);
                const glowSize = node.radius + proximity * 8;

                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
                gradient.addColorStop(0, `rgba(0, 217, 255, ${0.8 * proximity})`);
                gradient.addColorStop(0.5, `rgba(0, 217, 255, ${0.3 * proximity})`);
                gradient.addColorStop(1, "rgba(0, 217, 255, 0)");

                ctx.beginPath();
                ctx.arc(node.x, node.y, glowSize, 0, 2 * Math.PI);
                ctx.fillStyle = gradient;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
                ctx.fillStyle = proximity > 0.3 ? "#00d9ff" : "#ffffff";
                ctx.shadowBlur = proximity > 0.3 ? 20 : 5;
                ctx.shadowColor = "#00d9ff";
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            connectionRef.current.forEach((conn) => {
                const nodeA = nodeRef.current[conn.from];
                const nodeB = nodeRef.current[conn.to];
                if (!nodeA || !nodeB) return;

                const midX = (nodeA.x + nodeB.x) / 2;
                const midY = (nodeA.y + nodeB.y) / 2;
                const dx = mouseRef.current.x - midX;
                const dy = mouseRef.current.y - midY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const proximity = Math.max(0, 1 - distance / 150);
                conn.strength = conn.strength * 0.9 + proximity * 0.1;

                if (conn.strength > 0.01) {
                    const alpha = 0.1 + conn.strength * 0.4;
                    const lineWidth = 0.5 + conn.strength * 2;

                    ctx.beginPath();
                    ctx.moveTo(nodeA.x, nodeA.y);
                    ctx.lineTo(nodeB.x, nodeB.y);
                    ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}