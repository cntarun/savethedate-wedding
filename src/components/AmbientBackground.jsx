import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion.js";

/* ============================================================
   AMBIENT BACKGROUND — marigold petals drifting down the page,
   gently pushed aside by the guest's finger / cursor.
   Canvas-based, capped particle count, pauses when tab hidden.
   ============================================================ */

const PETAL_COLORS = ["#e8a020", "#f4c15d", "#d98a10", "#c46a1b"];

export default function AmbientBackground() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return; // no drifting petals for reduced-motion users

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, frame;
    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Fewer petals on small screens to stay smooth
    const COUNT = Math.min(28, Math.round((w * h) / 32000));

    const makePetal = (startAnywhere) => ({
      x: Math.random() * w,
      y: startAnywhere ? Math.random() * h : -20,
      size: 5 + Math.random() * 7,
      speedY: 0.25 + Math.random() * 0.55,
      drift: (Math.random() - 0.5) * 0.35,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.004 + Math.random() * 0.008,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      color: PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0],
      alpha: 0.25 + Math.random() * 0.35,
      vx: 0,
      vy: 0,
    });

    let petals = Array.from({ length: COUNT }, () => makePetal(true));

    const onPointer = (e) => {
      const t = e.touches ? e.touches[0] : e;
      pointer.x = t.clientX;
      pointer.y = t.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.sway += p.swaySpeed;

        // Gentle push away from the pointer
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 120 * 120) {
          const dist = Math.sqrt(dist2) || 1;
          const force = ((120 - dist) / 120) * 0.6;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.drift + Math.sin(p.sway) * 0.3 + p.vx;
        p.y += p.speedY + p.vy;
        p.rot += p.rotSpeed;

        if (p.y > h + 30 || p.x < -40 || p.x > w + 40) {
          Object.assign(p, makePetal(false));
        }

        // Petal = soft ellipse
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      frame = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onPointer, { passive: true });
    window.addEventListener("touchmove", onPointer, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointer);
      window.removeEventListener("touchmove", onPointer);
      window.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden
    />
  );
}
