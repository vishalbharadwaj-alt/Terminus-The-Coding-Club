
import React, { useEffect, useRef } from 'react';

interface ParticleNetworkProps {
  isWarping?: boolean;
}

export const ParticleNetwork: React.FC<ParticleNetworkProps> = ({ isWarping = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 120;
    const connectionDistance = 150;
    const mouse = { x: 0, y: 0, radius: 150 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      originX: number;
      originY: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.originX = this.x;
        this.originY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(isWarping: boolean) {
        if (isWarping) {
          // Warp physics: move away from center at high speed
          const centerX = canvas!.width / 2;
          const centerY = canvas!.height / 2;
          const dx = this.x - centerX;
          const dy = this.y - centerY;
          const angle = Math.atan2(dy, dx);
          const force = 30; // High velocity for warp
          
          this.vx = Math.cos(angle) * force;
          this.vy = Math.sin(angle) * force;
        } else {
          // Normal physics
          if (Math.abs(this.vx) > 2) this.vx *= 0.9;
          if (Math.abs(this.vy) > 2) this.vy *= 0.9;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (!isWarping) {
          if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
          if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
          
          // Mouse interaction
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }
      }

      draw(isWarping: boolean) {
        if (isWarping) {
          // Draw as lines for motion blur effect
          ctx!.strokeStyle = 'rgba(0, 255, 255, 0.8)';
          ctx!.lineWidth = this.size;
          ctx!.beginPath();
          ctx!.moveTo(this.x, this.y);
          ctx!.lineTo(this.x - this.vx * 2, this.y - this.vy * 2);
          ctx!.stroke();
        } else {
          ctx!.fillStyle = 'rgba(0, 255, 255, 0.5)';
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      // Create trailing effect during warp
      if (isWarping) {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      particles.forEach(p => {
        p.update(isWarping);
        p.draw(isWarping);
      });

      if (!isWarping) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / connectionDistance})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isWarping]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};
