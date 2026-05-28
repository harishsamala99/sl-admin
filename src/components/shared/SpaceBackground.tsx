import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    interface Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
      twinkle: number;
    }

    const stars: Star[] = [];
    const count = Math.min(150, Math.floor((W * H) / 9000)); // slightly more stars for a richer field

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.8 + 0.4, // larger, brighter stars
        alpha: Math.random() * 0.7 + 0.3, // higher baseline opacity
        speed: 0.005 + Math.random() * 0.015,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    let animId: number;

    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      // Draw subtle twinkling stars
      stars.forEach((s) => {
        s.twinkle += s.speed;
        const currentAlpha = Math.max(0.15, s.alpha * ((Math.sin(s.twinkle) + 1) / 2));
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        // brighter stars are pure white/gold
        ctx.fillStyle = s.size > 1.3 
          ? `rgba(255, 235, 175, ${currentAlpha * 0.95})` 
          : `rgba(220, 190, 110, ${currentAlpha * 0.75})`;
        ctx.fill();

        // draw premium cross-flare sparkles for the brightest stars
        if (s.size > 1.4) {
          ctx.beginPath();
          // horizontal flare
          ctx.moveTo(s.x - s.size * 3.5, s.y);
          ctx.lineTo(s.x + s.size * 3.5, s.y);
          // vertical flare
          ctx.moveTo(s.x, s.y - s.size * 3.5);
          ctx.lineTo(s.x, s.y + s.size * 3.5);
          
          ctx.strokeStyle = `rgba(255, 240, 200, ${currentAlpha * 0.55})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ mixBlendMode: "screen", opacity: 0.85, zIndex: -5 }}
    />
  );
}
