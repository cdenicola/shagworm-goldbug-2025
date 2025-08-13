import { useEffect, useRef } from "react";

type Props = {
  density?: number;
  speed?: number;
  className?: string;
};

export default function MatrixRain({ density = 0.9, speed = 1, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const glyphs = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+=-";
    const fontSize = 16;
    const columns = Math.ceil(w / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * h / fontSize));

    let last = performance.now();

    const step = (now: number) => {
      const delta = Math.min(50, now - last);
      last = now;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, w, h);

      ctx.font = `${fontSize}px VT323, ui-monospace, monospace`;
      for (let i = 0; i < columns; i++) {
        if (Math.random() > density) continue;
        const text = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * fontSize;
        const y = (drops[i] * fontSize);
        ctx.fillStyle = "rgba(110, 231, 183, 0.9)";
        ctx.fillText(text, x, y);
        drops[i] += speed * (delta / 16);
        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
}
