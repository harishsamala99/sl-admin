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
    const count = Math.min(100, Math.floor((W * H) / 12000)); // Cap the stars for premium performance

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 0.9 + 0.2,
        alpha: Math.random(),
        speed: 0.01 + Math.random() * 0.02,
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
        const currentAlpha = Math.max(0.1, s.alpha * ((Math.sin(s.twinkle) + 1) / 2));
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 168, 80, ${currentAlpha * 0.6})`;
        ctx.fill();
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
