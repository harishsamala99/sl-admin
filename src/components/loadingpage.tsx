import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  blink: number;
}

interface Meteor {
  x: number;
  y: number;
  len: number;
  life: number;
  maxLife: number;
}

export default function SuperiorLimousineLoader() {
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

    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let t = 0;
    let animId: number;

    function resize() {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random() * 0.8,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        blink: Math.random() * Math.PI * 2,
      });
    }

    const meteorInterval = setInterval(() => {
      meteors.push({
        x: 0.1 + Math.random() * 0.5,
        y: 0.01 + Math.random() * 0.4,
        len: 0.06 + Math.random() * 0.08,
        life: 0,
        maxLife: 60 + Math.random() * 40,
      });
    }, 3500);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      t += 0.02;

      stars.forEach((s) => {
        const alpha = 0.4 + 0.6 * ((Math.sin(s.blink + t * 0.8) + 1) / 2);
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,245,200,${alpha * s.a + 0.2})`;
        ctx.fill();
      });

      meteors = meteors.filter((m) => m.life < m.maxLife);
      meteors.forEach((m) => {
        const progress = m.life / m.maxLife;
        const alpha = Math.sin(progress * Math.PI);
        const sx = (m.x - progress * 0.15) * W;
        const sy = (m.y + progress * 0.06) * H;
        const ex = sx + m.len * W * 0.5;
        const ey = sy + m.len * H * 0.3;
        const grad = ctx.createLinearGradient(sx, sy, ex, ey);
        grad.addColorStop(0, `rgba(200,168,0,0)`);
        grad.addColorStop(0.4, `rgba(255,240,160,${alpha * 0.8})`);
        grad.addColorStop(1, `rgba(200,168,0,0)`);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        m.life++;
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(meteorInterval);
      cancelAnimationFrame(animId);
    };
  }, []);

  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    duration: `${4 + Math.random() * 6}s`,
    delay: `${Math.random() * 6}s`,
  }));

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(ellipse at center, #1a1200 0%, #0a0800 60%, #000 100%)",
        fontFamily: "Georgia, serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Star canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      {/* Particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: "absolute",
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: "#c8a800",
              left: p.left,
              bottom: -4,
              opacity: 0,
              animationName: "floatUp",
              animationDuration: p.duration,
              animationDelay: p.delay,
              animationTimingFunction: "ease-in",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>

      {/* Main content centered */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        {/* Logo ring */}
        <div style={{ position: "relative", width: 110, height: 110, margin: "0 auto 28px" }}>
          <div style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(200,168,0,0.3)",
            animationName: "ringPulse",
            animationDuration: "2s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }} />
          <div style={{
            position: "absolute",
            inset: 8,
            borderRadius: "50%",
            border: "1.5px solid transparent",
            borderTopColor: "#c8a800",
            animationName: "spinCW",
            animationDuration: "4s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }} />
          <div style={{
            position: "absolute",
            inset: 18,
            borderRadius: "50%",
            border: "1px solid transparent",
            borderRightColor: "#c8a800",
            animationName: "spinCCW",
            animationDuration: "6s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }} />
        </div>

        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(32px, 6vw, 54px)",
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: "#fff",
          textTransform: "uppercase",
          animationName: "fadeSlideUp",
          animationDuration: "1.2s",
          animationTimingFunction: "ease-out",
          animationFillMode: "forwards",
          opacity: 0,
        }}>
          Superior
        </div>

        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(18px, 4vw, 32px)",
          fontWeight: 300,
          letterSpacing: "0.45em",
          color: "#c8a800",
          textTransform: "uppercase",
          marginTop: 6,
          animationName: "fadeSlideUp",
          animationDuration: "1.6s",
          animationTimingFunction: "ease-out",
          animationFillMode: "forwards",
          opacity: 0,
        }}>
          Limousine LLC
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          margin: "18px 0 12px",
          animationName: "fadeIn",
          animationDuration: "2.2s",
          animationTimingFunction: "ease",
          animationFillMode: "forwards",
          opacity: 0,
        }}>
          <div style={{ width: 70, height: 1, background: "linear-gradient(to right, transparent, #c8a800)" }} />
          <span style={{ color: "#a89060", fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", fontFamily: "sans-serif" }}>
            Executive Transportation
          </span>
          <div style={{ width: 70, height: 1, background: "linear-gradient(to left, transparent, #c8a800)" }} />
        </div>

        <div style={{
          color: "#6a5a38",
          fontSize: 12,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontFamily: "sans-serif",
          animationName: "fadeIn",
          animationDuration: "2.8s",
          animationTimingFunction: "ease",
          animationFillMode: "forwards",
          opacity: 0,
          marginBottom: 26,
        }}>
          Elegance &bull; Comfort &bull; Prestige
        </div>

        <div style={{
          width: 320,
          height: 2,
          margin: "0 auto",
          background: "rgba(200,168,0,0.1)",
          borderRadius: 99,
          overflow: "hidden",
          animationName: "fadeIn",
          animationDuration: "2s",
          animationTimingFunction: "ease",
          animationFillMode: "forwards",
          opacity: 0,
        }}>
          <div style={{
            height: "100%",
            width: "30%",
            background: "linear-gradient(to right, #6a4e00, #c8a800, #ffe066)",
            borderRadius: 99,
            animationName: "barSlide",
            animationDuration: "2.2s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }} />
        </div>

        <div style={{
          marginTop: 12,
          fontSize: 10,
          letterSpacing: "0.55em",
          color: "#4a3e22",
          textTransform: "uppercase",
          fontFamily: "sans-serif",
          animationName: "blink",
          animationDuration: "2s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}>
          Arriving in style&hellip;
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(0) scale(1); }
          20%  { opacity: 0.8; }
          80%  { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-70vh) scale(0.3); }
        }
        @keyframes spinCW  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinCCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes ringPulse {
          0%,100% { transform: scale(1); opacity: 0.3; }
          50%      { transform: scale(1.15); opacity: 0.7; }
        }
        @keyframes letterGlow {
          0%,100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes barSlide {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(400%); }
        }
        @keyframes blink {
          0%,100% { opacity: 0.4; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}