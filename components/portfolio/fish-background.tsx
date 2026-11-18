"use client";

import * as React from "react";
import { useTheme } from "next-themes";

interface Point {
  x: number;
  y: number;
}

interface Fish {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  targetAngle: number;
  turnSpeed: number;
  baseSpeed: number;
  speed: number;
  length: number;
  nodes: Point[];
  tailWag: number;
  wagSpeed: number;
  finPhase: number;
  variety: "primary" | "amber" | "crimson" | "silver";
  depth: number; // 0.6 to 1.0 (creates parallax / layering)
}

const FISH_COUNT = 5;
const NODE_COUNT = 14;

export function FishBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking for subtle interactive avoidance
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseActive = false;
    let mouseTimeout: ReturnType<typeof setTimeout>;

    function handlePointerMove(e: PointerEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseActive = false;
      }, 2500);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Initialize fish school
    const varieties: Fish["variety"][] = ["primary", "amber", "crimson", "silver", "primary"];
    const fishList: Fish[] = [];

    for (let i = 0; i < FISH_COUNT; i++) {
      const startX = Math.random() * (width || 800);
      const startY = Math.random() * (height || 600);
      const startAngle = Math.random() * Math.PI * 2;
      const length = 150 + Math.random() * 90; // 150px to 240px
      const depth = 0.85 + Math.random() * 0.35; // scale & opacity depth

      const nodes: Point[] = [];
      const segLength = (length * depth) / (NODE_COUNT - 1);
      for (let j = 0; j < NODE_COUNT; j++) {
        nodes.push({
          x: startX - Math.cos(startAngle) * j * segLength,
          y: startY - Math.sin(startAngle) * j * segLength,
        });
      }

      fishList.push({
        x: startX,
        y: startY,
        vx: Math.cos(startAngle),
        vy: Math.sin(startAngle),
        angle: startAngle,
        targetAngle: startAngle,
        turnSpeed: 0.018 + Math.random() * 0.015,
        baseSpeed: (0.55 + Math.random() * 0.45) * depth,
        speed: (0.55 + Math.random() * 0.45) * depth,
        length: length * depth,
        nodes,
        tailWag: Math.random() * Math.PI * 2,
        wagSpeed: 0.055 + Math.random() * 0.035,
        finPhase: Math.random() * Math.PI * 2,
        variety: varieties[i % varieties.length],
        depth,
      });
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    function render(currentTime: number) {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const isDark = document.documentElement.classList.contains("dark");

      // Update & render each fish
      for (let f = 0; f < fishList.length; f++) {
        const fish = fishList[f];

        // 1. Smooth wandering & boundary avoidance
        if (Math.random() < 0.012) {
          fish.targetAngle += (Math.random() - 0.5) * 1.4;
        }

        // Steer away from screen edges
        const margin = 100;
        if (fish.x < margin) fish.targetAngle = 0;
        else if (fish.x > width - margin) fish.targetAngle = Math.PI;
        else if (fish.y < margin) fish.targetAngle = Math.PI / 2;
        else if (fish.y > height - margin) fish.targetAngle = -Math.PI / 2;

        // Interactive mouse avoidance
        if (mouseActive) {
          const dx = fish.x - mouseX;
          const dy = fish.y - mouseY;
          const distSq = dx * dx + dy * dy;
          const fearDist = 180;
          if (distSq < fearDist * fearDist && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const awayAngle = Math.atan2(dy, dx);
            fish.targetAngle = awayAngle;
            fish.speed = Math.min(fish.baseSpeed * 2.2, 3.2);
          }
        }

        // Ease speed back to baseSpeed
        fish.speed += (fish.baseSpeed - fish.speed) * 0.04;

        // Smooth angle interpolation
        let diff = (fish.targetAngle - fish.angle) % (Math.PI * 2);
        if (diff < -Math.PI) diff += Math.PI * 2;
        if (diff > Math.PI) diff -= Math.PI * 2;
        fish.angle += diff * fish.turnSpeed;

        // Position update
        fish.vx = Math.cos(fish.angle) * fish.speed;
        fish.vy = Math.sin(fish.angle) * fish.speed;
        fish.x += fish.vx * (dt * 60);
        fish.y += fish.vy * (dt * 60);

        // Screen wrap
        const wrapPadding = 180;
        if (fish.x < -wrapPadding) fish.x = width + wrapPadding;
        if (fish.x > width + wrapPadding) fish.x = -wrapPadding;
        if (fish.y < -wrapPadding) fish.y = height + wrapPadding;
        if (fish.y > height + wrapPadding) fish.y = -wrapPadding;

        // 2. Spine & Inverse Kinematics propagation with wave wag
        fish.tailWag += fish.wagSpeed * (fish.speed / fish.baseSpeed);
        fish.finPhase += 0.06;

        fish.nodes[0].x = fish.x;
        fish.nodes[0].y = fish.y;

        const segLength = fish.length / (NODE_COUNT - 1);
        for (let i = 1; i < NODE_COUNT; i++) {
          const prev = fish.nodes[i - 1];
          const curr = fish.nodes[i];

          const dx = curr.x - prev.x;
          const dy = curr.y - prev.y;
          let angle = Math.atan2(dy, dx);

          // Apply gentle lateral sine wave to trailing joints
          const wave = Math.sin(fish.tailWag - i * 0.45) * Math.pow(i / NODE_COUNT, 1.4) * 0.35;
          angle += wave;

          curr.x = prev.x + Math.cos(angle) * segLength;
          curr.y = prev.y + Math.sin(angle) * segLength;
        }

        // 3. Render organic fish body & fins
        drawFish(ctx, fish, isDark);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    // Pause animation when tab is inactive to save battery/resources
    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(mouseTimeout);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}

function drawFish(ctx: CanvasRenderingContext2D, fish: Fish, isDark: boolean) {
  const nodes = fish.nodes;
  const count = nodes.length;

  // Colors per variety & theme
  let mainColor: string;
  let accentColor: string;
  let finColor: string;

  if (isDark) {
    switch (fish.variety) {
      case "primary": // Cyber / Iris glow
        mainColor = "rgba(168, 85, 247, 0.42)";
        accentColor = "rgba(192, 132, 252, 0.55)";
        finColor = "rgba(168, 85, 247, 0.22)";
        break;
      case "amber": // Warm gold
        mainColor = "rgba(251, 146, 60, 0.45)";
        accentColor = "rgba(253, 186, 116, 0.58)";
        finColor = "rgba(251, 146, 60, 0.22)";
        break;
      case "crimson": // Crimson / Coral
        mainColor = "rgba(244, 63, 94, 0.42)";
        accentColor = "rgba(251, 113, 133, 0.55)";
        finColor = "rgba(244, 63, 94, 0.22)";
        break;
      default: // Silver / Cyan moonlight
        mainColor = "rgba(56, 189, 248, 0.42)";
        accentColor = "rgba(125, 211, 252, 0.55)";
        finColor = "rgba(56, 189, 248, 0.22)";
    }
  } else {
    // Light mode: soft watercolor koi tones
    switch (fish.variety) {
      case "primary": // Soft indigo / deep iris
        mainColor = "rgba(79, 70, 229, 0.35)";
        accentColor = "rgba(99, 102, 241, 0.45)";
        finColor = "rgba(79, 70, 229, 0.18)";
        break;
      case "amber": // Rich koi gold
        mainColor = "rgba(217, 119, 6, 0.38)";
        accentColor = "rgba(245, 158, 11, 0.52)";
        finColor = "rgba(217, 119, 6, 0.18)";
        break;
      case "crimson": // Vibrant koi vermilion
        mainColor = "rgba(225, 29, 72, 0.38)";
        accentColor = "rgba(244, 63, 94, 0.52)";
        finColor = "rgba(225, 29, 72, 0.18)";
        break;
      default: // Elegant slate ink
        mainColor = "rgba(71, 85, 105, 0.32)";
        accentColor = "rgba(100, 116, 139, 0.42)";
        finColor = "rgba(71, 85, 105, 0.16)";
    }
  }

  // Calculate half-widths and normal vectors along the spine
  const leftPoints: Point[] = [];
  const rightPoints: Point[] = [];
  const bodyWidth = fish.length * 0.175;

  for (let i = 0; i < count; i++) {
    const s = i / (count - 1);
    // Natural organic fish width profile
    let w: number;
    if (s < 0.2) {
      w = bodyWidth * (0.6 + 0.4 * Math.sin((s / 0.2) * (Math.PI / 2)));
    } else if (s < 0.6) {
      w = bodyWidth;
    } else {
      w = bodyWidth * Math.pow(1 - (s - 0.6) / 0.4, 0.85);
    }
    w = Math.max(w, 1.2);

    // Direction vector
    let nx = 0;
    let ny = 0;
    if (i < count - 1) {
      const dx = nodes[i + 1].x - nodes[i].x;
      const dy = nodes[i + 1].y - nodes[i].y;
      const len = Math.hypot(dx, dy) || 1;
      nx = -dy / len;
      ny = dx / len;
    } else {
      const dx = nodes[i].x - nodes[i - 1].x;
      const dy = nodes[i].y - nodes[i - 1].y;
      const len = Math.hypot(dx, dy) || 1;
      nx = -dy / len;
      ny = dx / len;
    }

    leftPoints.push({ x: nodes[i].x + nx * w, y: nodes[i].y + ny * w });
    rightPoints.push({ x: nodes[i].x - nx * w, y: nodes[i].y - ny * w });
  }

  // A. Pectoral Fins (Left & Right)
  const pectoralIdx = 2;
  const pNode = nodes[pectoralIdx];
  const pNext = nodes[pectoralIdx + 1];
  const pAngle = Math.atan2(pNext.y - pNode.y, pNext.x - pNode.x);
  const finFlutter = Math.sin(fish.finPhase) * 0.18;
  const finLen = fish.length * 0.42;

  ctx.fillStyle = finColor;

  // Left pectoral fin
  ctx.save();
  ctx.translate(leftPoints[pectoralIdx].x, leftPoints[pectoralIdx].y);
  ctx.rotate(pAngle - Math.PI / 2 + 0.4 + finFlutter);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(finLen * 0.5, -finLen * 0.4, finLen * 0.9, -finLen * 0.15, finLen, 0);
  ctx.bezierCurveTo(finLen * 0.7, finLen * 0.35, finLen * 0.3, finLen * 0.25, 0, 0);
  ctx.fill();
  ctx.restore();

  // Right pectoral fin
  ctx.save();
  ctx.translate(rightPoints[pectoralIdx].x, rightPoints[pectoralIdx].y);
  ctx.rotate(pAngle + Math.PI / 2 - 0.4 - finFlutter);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(finLen * 0.5, finLen * 0.4, finLen * 0.9, finLen * 0.15, finLen, 0);
  ctx.bezierCurveTo(finLen * 0.7, -finLen * 0.35, finLen * 0.3, -finLen * 0.25, 0, 0);
  ctx.fill();
  ctx.restore();

  // B. Flowing Caudal (Tail) Fin
  const lastIdx = count - 1;
  const tailBase = nodes[lastIdx];
  const prevTail = nodes[lastIdx - 1];
  const tailAngle = Math.atan2(tailBase.y - prevTail.y, tailBase.x - prevTail.x);
  const tailLen = fish.length * 0.58;
  const tailSpread = Math.sin(fish.tailWag) * 0.35;

  ctx.save();
  ctx.translate(tailBase.x, tailBase.y);
  ctx.rotate(tailAngle + tailSpread);
  ctx.fillStyle = finColor;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(tailLen * 0.4, -tailLen * 0.45, tailLen * 0.85, -tailLen * 0.5, tailLen, -tailLen * 0.2);
  ctx.bezierCurveTo(tailLen * 0.75, 0, tailLen * 0.75, 0, tailLen, tailLen * 0.2);
  ctx.bezierCurveTo(tailLen * 0.85, tailLen * 0.5, tailLen * 0.4, tailLen * 0.45, 0, 0);
  ctx.fill();
  ctx.restore();

  // C. Main Fish Body (Silky Smooth Path)
  ctx.fillStyle = mainColor;
  ctx.beginPath();
  // Nose cap
  const nose = nodes[0];
  ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
  ctx.quadraticCurveTo(nose.x, nose.y, rightPoints[0].x, rightPoints[0].y);

  // Right flank down to tail
  for (let i = 1; i < count; i++) {
    const prev = rightPoints[i - 1];
    const curr = rightPoints[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
  }
  ctx.lineTo(rightPoints[count - 1].x, rightPoints[count - 1].y);

  // Tail cap
  ctx.lineTo(leftPoints[count - 1].x, leftPoints[count - 1].y);

  // Left flank back up to head
  for (let i = count - 2; i >= 0; i--) {
    const prev = leftPoints[i + 1];
    const curr = leftPoints[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
  }
  ctx.closePath();
  ctx.fill();

  // D. Dorsal Accent / Spine Highlight
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = fish.length * 0.055;
  ctx.lineCap = "round";
  ctx.beginPath();
  const dorsalStart = Math.floor(count * 0.2);
  const dorsalEnd = Math.floor(count * 0.7);
  ctx.moveTo(nodes[dorsalStart].x, nodes[dorsalStart].y);
  for (let i = dorsalStart + 1; i <= dorsalEnd; i++) {
    ctx.lineTo(nodes[i].x, nodes[i].y);
  }
  ctx.stroke();

  // E. Subtle eyes
  const eyeIdx = 1;
  const eyeR = Math.max(fish.length * 0.024, 1.2);
  ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.75)" : "rgba(15, 23, 42, 0.65)";
  ctx.beginPath();
  ctx.arc(leftPoints[eyeIdx].x, leftPoints[eyeIdx].y, eyeR, 0, Math.PI * 2);
  ctx.arc(rightPoints[eyeIdx].x, rightPoints[eyeIdx].y, eyeR, 0, Math.PI * 2);
  ctx.fill();
}
