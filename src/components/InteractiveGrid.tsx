import { useEffect, useRef } from 'react';

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0, height = 0, cols = 0, rows = 0;
    const SQ = 40;

    let mouse = { x: -9999, y: -9999 };
    let mouseActive = false;
    const ripples: { x: number, y: number, r: number, a: number }[] = [];

    function init() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      } else {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      cols = Math.ceil(width / SQ);
      rows = Math.ceil(height / SQ);
    }

    function noise(x: number, y: number, t: number) {
      return (
        Math.sin(x * 0.0137 + t * 0.22 + 1.3) * 0.5 +
        Math.sin(y * 0.0171 + t * 0.17 + 2.7) * 0.5 +
        Math.sin((x * 0.73 - y * 0.67) * 0.011 + t * 0.28 + 4.1) * 0.6 +
        Math.sin((x * 0.31 + y * 0.95) * 0.019 + t * 0.12 + 0.8) * 0.4
      ) / 2.0;
    }

    function diagonalFade(x: number, y: number) {
      const nx = 1 - (x / width);
      const ny = y / height;
      const d = (nx + ny) / 2;
      const fade = 1 - Math.min(d / 0.65, 1);
      return Math.pow(fade, 1.2);
    }

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouseActive = true;
    };
    const handleMouseLeave = () => { mouseActive = false; };
    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      ripples.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, r: 0, a: 0.7 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    let animationFrameId: number;

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      const pulse = 0.82 + 0.18 * Math.sin(time * 2.0);
      const mR = 280;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * SQ;
          const y = row * SQ;
          const cx = x + SQ / 2;
          const cy = y + SQ / 2;

          const fade = diagonalFade(cx, cy);
          if (fade < 0.005) continue;

          const n = noise(x, y, time);
          let waveAlpha = 0;
          if (n > 0.2 && n < 0.55) {
            const bandCenter = 0.375;
            const bandWidth = 0.175;
            waveAlpha = 1 - Math.abs(n - bandCenter) / bandWidth;
            waveAlpha = Math.pow(Math.max(0, waveAlpha), 1.2) * 0.9;
          }

          let alpha = waveAlpha * fade;

          if (mouseActive) {
            const mdx = cx - mouse.x;
            const mdy = cy - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < mR) {
              const mAlpha = Math.pow(1 - mDist / mR, 2) * 0.35;
              alpha += mAlpha;
            }
          }

          for (const rp of ripples) {
            const rdx = cx - rp.x;
            const rdy = cy - rp.y;
            const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
            const ringW = 50;
            if (rDist > rp.r - ringW && rDist < rp.r + ringW) {
              const ringDist = Math.abs(rDist - rp.r) / ringW;
              const s = (1 - ringDist) * rp.a * 0.4;
              alpha += s;
            }
          }

          alpha = Math.min(alpha, 1) * pulse;

          if (alpha > 0.008) {
            ctx.fillStyle = `rgba(29,106,90,${alpha * 0.12})`;
            ctx.fillRect(x + 1, y + 1, SQ - 2, SQ - 2);

            const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, SQ * 1.0);
            grad.addColorStop(0, `rgba(29,106,90,${alpha})`);
            grad.addColorStop(1, `rgba(29,106,90,0)`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.3;
            ctx.strokeRect(x + 0.5, y + 0.5, SQ - 1, SQ - 1);
          }
        }
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].r += 3.5;
        ripples[i].a -= 0.006;
        if (ripples[i].a <= 0) ripples.splice(i, 1);
      }

      const instructionEl = document.querySelector('.instruction') as HTMLElement;
      if (instructionEl) {
        const ccx = width / 2, ccy = height / 2;
        if (mouseActive) {
          const d = Math.sqrt((mouse.x - ccx) ** 2 + (mouse.y - ccy) ** 2);
          const t = Math.max(0, 1 - d / 400);
          if (t > 0.05) {
            const blur = 10 + t * 40;
            instructionEl.style.textShadow = `0 0 ${blur}px rgba(29,106,90,${t * 0.9}), 0 0 ${blur * 2}px rgba(29,106,90,${t * 0.4})`;
            instructionEl.style.opacity = (0.1 + t * 0.9).toString();
          } else {
            instructionEl.style.textShadow = 'none';
            instructionEl.style.opacity = '0.1';
          }
        } else {
          instructionEl.style.textShadow = 'none';
          instructionEl.style.opacity = '0.1';
        }
      }

      animationFrameId = requestAnimationFrame(frame);
    }

    init();
    frame();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
