import { useEffect, useState, useRef } from 'react';

/**
 * Refined "Stardust" Canvas Cursor.
 * Minimalist, elegant, and high-performance.
 */
export default function CursorGlow() {
    const canvasRef = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const mouse = useRef({ x: -100, y: -100, active: false });
    const lastPos = useRef({ x: -100, y: -100 });
    const particles = useRef([]);
    const animationFrameId = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches || ('ontouchstart' in window)) {
            setIsTouchDevice(true);
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Classy, focused color palette
        const colors = ['#8b5cf6', '#3b82f6', '#ffffff'];

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 1.5 + 0.5; // Tiny stardust
                // Subtle random drift
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = 1;
                this.life = 0.015 + Math.random() * 0.02;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.life;
                
                // Shrink as it fades
                if (this.size > 0.1) this.size -= 0.01;
            }

            draw() {
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const dist = Math.hypot(
                mouse.current.x - lastPos.current.x,
                mouse.current.y - lastPos.current.y
            );
            
            if (mouse.current.active && dist > 2) {
                particles.current.push(new Particle(mouse.current.x, mouse.current.y));
                lastPos.current = { ...mouse.current };
            }

            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];
                p.update();
                p.draw();

                if (p.alpha <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }
            
            if (mouse.current.active) {
                // Focus aura without expensive shadowBlur
                const outerGradient = ctx.createRadialGradient(
                    mouse.current.x, mouse.current.y, 0,
                    mouse.current.x, mouse.current.y, 80
                );
                outerGradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
                outerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.globalAlpha = 1;
                ctx.fillStyle = outerGradient;
                ctx.fillRect(mouse.current.x - 80, mouse.current.y - 80, 160, 160);

                // Sharp focus point
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(mouse.current.x, mouse.current.y, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            mouse.current.active = true;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    if (isTouchDevice) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-999999"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
