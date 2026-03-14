import { useEffect, useRef } from 'react';

/**
 * Refined "Stardust" Canvas Cursor.
 * Minimalist, elegant, and high-performance.
 */

// Move class outside of component to avoid inline declaration
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5; // Tiny stardust
        // Subtle random drift
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.color = ['#8b5cf6', '#3b82f6', '#ffffff'][Math.floor(Math.random() * 3)];
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

    draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function CursorGlow() {
    const canvasRef = useRef(null);
    const isTouchDeviceRef = useRef(false);
    const mouse = useRef({ x: -100, y: -100, active: false });
    const lastPos = useRef({ x: -100, y: -100 });
    const particles = useRef([]);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        if (window.matchMedia("(pointer: coarse)").matches || ('ontouchstart' in window) || reducedMotionQuery.matches) {
            isTouchDeviceRef.current = true;
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const animate = () => {
            const hasActiveParticles = particles.current.length > 0;
            const isIdle = Date.now() - lastMouseMoveTime.current > 1000;

            if (!hasActiveParticles && isIdle && !mouse.current.active) {
                animationFrameId.current = null;
                return;
            }

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
                p.draw(ctx);

                if (p.alpha <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }

            if (mouse.current.active && !isIdle) {
                const outerGradient = ctx.createRadialGradient(
                    mouse.current.x, mouse.current.y, 0,
                    mouse.current.x, mouse.current.y, 80
                );
                outerGradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
                outerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.globalAlpha = 1;
                ctx.fillStyle = outerGradient;
                ctx.fillRect(mouse.current.x - 80, mouse.current.y - 80, 160, 160);

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(mouse.current.x, mouse.current.y, 1, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId.current = requestAnimationFrame(animate);
        };

        const lastMouseMoveTime = { current: Date.now() };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            mouse.current.active = true;
            lastMouseMoveTime.current = Date.now();
            
            if (!animationFrameId.current) {
                animationFrameId.current = requestAnimationFrame(animate);
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current);
                    animationFrameId.current = null;
                }
            } else {
                if (!animationFrameId.current) {
                    animationFrameId.current = requestAnimationFrame(animate);
                }
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        resize();
        animationFrameId.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    if (isTouchDeviceRef.current) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-999999"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
