
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
    const particleCount = 150; 
    const connectionDistance = 180;
    const mouse = { x: 0, y: 0, radius: 200 };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      originX: number;
      originY: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.originX = this.x;
        this.originY = this.y;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update(isWarping: boolean) {
        if (isWarping) {
          const centerX = (canvas?.width || window.innerWidth) / 2;
          const centerY = (canvas?.height || window.innerHeight) / 2;
          const dx = this.x - centerX;
          const dy = this.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          
          // Cap the force to prevent infinite acceleration
          const force = Math.min((dist / 10) + 12, 100); 
          
          this.vx = Math.cos(angle) * force + (Math.sin(angle) * 3);
          this.vy = Math.sin(angle) * force - (Math.cos(angle) * 3);
          this.alpha = Math.min(1, this.alpha + 0.05);
        } else {
          if (Math.abs(this.vx) > 1.5) this.vx *= 0.98;
          if (Math.abs(this.vy) > 1.5) this.vy *= 0.98;
          this.alpha = Math.max(0.2, this.alpha - 0.005);
        }

        this.x += this.vx;
        this.y += this.vy;

        if (!isWarping) {
          const width = canvas?.width || window.innerWidth;
          const height = canvas?.height || window.innerHeight;
          
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
          
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x += dx * force * 0.02;
            this.y += dy * force * 0.02;
          }
        }
      }

      draw(isWarping: boolean) {
        // Safety check for finite values before calling Canvas API
        if (!Number.isFinite(this.x) || !Number.isFinite(this.y) || !Number.isFinite(this.vx) || !Number.isFinite(this.vy)) {
          return;
        }

        if (isWarping) {
          const x2 = this.x - this.vx * 4;
          const y2 = this.y - this.vy * 4;

          // Double check coordinates for createLinearGradient
          if (!Number.isFinite(x2) || !Number.isFinite(y2)) return;

          try {
            const gradient = ctx!.createLinearGradient(this.x, this.y, x2, y2);
            gradient.addColorStop(0, `rgba(0, 255, 255, ${this.alpha})`);
            gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
            
            ctx!.strokeStyle = gradient;
            ctx!.lineWidth = this.size * 2.5;
            ctx!.beginPath();
            ctx!.moveTo(this.x, this.y);
            ctx!.lineTo(x2, y2);
            ctx!.stroke();
          } catch (e) {
            // Fallback if gradient creation still fails
            ctx!.fillStyle = `rgba(0, 255, 255, ${this.alpha})`;
            ctx!.fillRect(this.x, this.y, this.size, this.size);
          }
        } else {
          ctx!.fillStyle = `rgba(0, 255, 255, ${this.alpha * 0.7})`;
          ctx!.beginPath();
          ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    const init = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      
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
              const alpha = (1 - distance / connectionDistance) * 0.4;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
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
