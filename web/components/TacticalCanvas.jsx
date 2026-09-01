"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Return the 2D context only if it can actually do everything draw() needs.
 *
 * Anti-fingerprinting extensions and privacy-hardened browsers do not remove
 * canvas — they replace the context with a partial stub. The stub carries the
 * common methods, so clearRect, arc and stroke all succeed, and the first thing
 * to fail is createLinearGradient, several dozen lines into a frame. Because
 * draw() runs on requestAnimationFrame, that throws on every frame for the rest
 * of the session.
 *
 * Feature-detecting the one method that matters keeps this to a single check.
 * The background is decorative, so returning null simply leaves it unpainted;
 * the hero's video, type and layout are unaffected.
 */
function getUsableContext(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx || typeof ctx.createLinearGradient !== "function") return null;
  return ctx;
}

export default function TacticalCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getUsableContext(canvas);
    // A context that cannot draw gradients ends the loop rather than throwing
    // once per frame. See getUsableContext above for why that happens.
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const t = timeRef.current;

    ctx.clearRect(0, 0, w, h);

    // Grid
    const spacing = 60;
    ctx.strokeStyle = "rgba(255, 11, 27, 0.04)";
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Intersection dots
    for (let x = 0; x < w; x += spacing) {
      for (let y = 0; y < h; y += spacing) {
        const pulse = Math.sin(t * 0.002 + x * 0.01 + y * 0.01) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 11, 27, ${0.08 + pulse * 0.12})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.5 + pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Scanning line (horizontal)
    const scanY = (t * 0.3) % h;
    const gradient = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
    gradient.addColorStop(0, "rgba(255, 11, 27, 0)");
    gradient.addColorStop(0.5, "rgba(255, 11, 27, 0.06)");
    gradient.addColorStop(1, "rgba(255, 11, 27, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, scanY - 40, w, 80);

    // Vertical scan
    const scanX = (t * 0.2) % w;
    const vGradient = ctx.createLinearGradient(scanX - 30, 0, scanX + 30, 0);
    vGradient.addColorStop(0, "rgba(255, 11, 27, 0)");
    vGradient.addColorStop(0.5, "rgba(255, 11, 27, 0.04)");
    vGradient.addColorStop(1, "rgba(255, 11, 27, 0)");
    ctx.fillStyle = vGradient;
    ctx.fillRect(scanX - 30, 0, 60, h);

    // Floating particles
    for (let i = 0; i < 15; i++) {
      const px = (Math.sin(t * 0.001 + i * 2.5) * 0.5 + 0.5) * w;
      const py = (Math.cos(t * 0.0008 + i * 1.8) * 0.5 + 0.5) * h;
      const size = Math.sin(t * 0.003 + i) * 1.5 + 2;
      ctx.fillStyle = `rgba(255, 11, 27, ${0.15 + Math.sin(t * 0.002 + i) * 0.1})`;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Connection lines between nearby particles
    ctx.strokeStyle = "rgba(255, 11, 27, 0.03)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 15; i++) {
      const px1 = (Math.sin(t * 0.001 + i * 2.5) * 0.5 + 0.5) * w;
      const py1 = (Math.cos(t * 0.0008 + i * 1.8) * 0.5 + 0.5) * h;
      for (let j = i + 1; j < 15; j++) {
        const px2 = (Math.sin(t * 0.001 + j * 2.5) * 0.5 + 0.5) * w;
        const py2 = (Math.cos(t * 0.0008 + j * 1.8) * 0.5 + 0.5) * h;
        const dist = Math.hypot(px2 - px1, py2 - py1);
        if (dist < 250) {
          ctx.beginPath();
          ctx.moveTo(px1, py1);
          ctx.lineTo(px2, py2);
          ctx.stroke();
        }
      }
    }

    timeRef.current += 16;
    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    // Bail before the first frame when the context is unusable, so the resize
    // listener and animation loop are never set up at all.
    if (!getUsableContext(canvas)) return;

    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
