"use client";

import * as React from "react";

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
  depth: number;
  eatingTimer: number;
  isCurious: boolean;
  orbitOffset: number;
  orbitRadius: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

interface FoodPellet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  life: number;
}

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const FISH_COUNT = 14;
const NODE_COUNT = 15;

export const FishBackground = React.memo(function FishBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
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

    // Dynamic interactive items
    const ripples: Ripple[] = [];
    const foods: FoodPellet[] = [];
    const bubbles: Bubble[] = [];

    function addRipple(x: number, y: number, maxRadius = 90) {
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius,
        opacity: 0.65,
        speed: 2.2,
      });
      if (ripples.length > 25) ripples.shift();
    }

    function addFood(x: number, y: number, count = 1) {
      for (let i = 0; i < count; i++) {
        foods.push({
          x: x + (Math.random() - 0.5) * 28,
          y: y + (Math.random() - 0.5) * 28,
          vx: (Math.random() - 0.5) * 0.8,
          vy: 0.4 + Math.random() * 0.5,
          radius: 3.5 + Math.random() * 1.5,
          opacity: 1,
          life: 450, // frames to live
        });
      }
      if (foods.length > 20) foods.shift();
    }

    function addBubbles(x: number, y: number, count = 3) {
      for (let i = 0; i < count; i++) {
        bubbles.push({
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 0.9,
          vy: -1.2 - Math.random() * 1.2,
          radius: 2 + Math.random() * 3,
          opacity: 0.8,
        });
      }
      if (bubbles.length > 35) bubbles.shift();
    }

    // Custom events from other interactive components (e.g. FloatingBadge)
    function onCustomRipple(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.x === "number") {
        addRipple(detail.x, detail.y, detail.size || 95);
      }
    }

    function onCustomDropFood(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.x === "number") {
        addFood(detail.x, detail.y, detail.count || 2);
        addRipple(detail.x, detail.y, 60);
      }
    }

    window.addEventListener("fish:ripple", onCustomRipple);
    window.addEventListener("fish:drop-food", onCustomDropFood);

    // Mouse tracking for subtle avoidance
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

    // Clicking anywhere in margins or background drops ripples & food!
    function handleWindowPointerDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest("a, button, input, textarea, select, [role='button'], [data-interactive]");
      if (!isInteractive || target === canvas) {
        addRipple(e.clientX, e.clientY, 85);
        addFood(e.clientX, e.clientY, 1);
        addBubbles(e.clientX, e.clientY, 2);

        // Check if clicked directly on any fish to make it dart!
        for (const fish of fishList) {
          const d = Math.hypot(fish.x - e.clientX, fish.y - e.clientY);
          if (d < fish.length * 0.5) {
            fish.speed = fish.baseSpeed * 2.8;
            fish.targetAngle = Math.atan2(fish.y - e.clientY, fish.x - e.clientX) + (Math.random() - 0.5) * 0.5;
            addBubbles(fish.x, fish.y, 5);
            addRipple(fish.x, fish.y, 110);
          }
        }
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handleWindowPointerDown);

    // Initialize fish school
    const varieties: Fish["variety"][] = ["primary", "amber", "crimson", "silver"];
    const fishList: Fish[] = [];

    for (let i = 0; i < FISH_COUNT; i++) {
      const startX = Math.random() * (width || 800);
      const startY = Math.random() * (height || 600);
      const startAngle = Math.random() * Math.PI * 2;
      // Large majestic koi lengths (220px to 350px)
      const length = 220 + Math.random() * 130;
      const depth = 0.85 + Math.random() * 0.35; // scale & opacity depth

      const nodes: Point[] = [];
      const segLength = (length * depth) / (NODE_COUNT - 1);
      for (let j = 0; j < NODE_COUNT; j++) {
        nodes.push({
          x: startX - Math.cos(startAngle) * j * segLength,
          y: startY - Math.sin(startAngle) * j * segLength,
        });
      }

      // About half of the fish love swarming around the cursor!
      const isCurious = i % 2 === 0;
      const orbitOffset = i * 0.95;
      const orbitRadius = 75 + (i % 4) * 28; // 75px to 160px spacing around cursor

      fishList.push({
        x: startX,
        y: startY,
        vx: Math.cos(startAngle),
        vy: Math.sin(startAngle),
        angle: startAngle,
        targetAngle: startAngle,
        turnSpeed: 0.02 + Math.random() * 0.018,
        baseSpeed: (0.6 + Math.random() * 0.45) * depth,
        speed: (0.6 + Math.random() * 0.45) * depth,
        length: length * depth,
        nodes,
        tailWag: Math.random() * Math.PI * 2,
        wagSpeed: 0.055 + Math.random() * 0.035,
        finPhase: Math.random() * Math.PI * 2,
        variety: varieties[i % varieties.length],
        depth,
        eatingTimer: 0,
        isCurious,
        orbitOffset,
        orbitRadius,
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

      // 1. Render & update Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity = Math.max(0, 0.65 * (1 - r.radius / r.maxRadius));

        if (r.opacity <= 0.01 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = isDark
          ? `rgba(168, 85, 247, ${r.opacity.toFixed(2)})`
          : `rgba(99, 102, 241, ${r.opacity.toFixed(2)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary subtle inner ring
        if (r.radius > 16) {
          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${(r.opacity * 0.4).toFixed(2)})`
            : `rgba(225, 29, 72, ${(r.opacity * 0.35).toFixed(2)})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.72, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 2. Render & update Food Pellets
      for (let i = foods.length - 1; i >= 0; i--) {
        const food = foods[i];
        food.x += food.vx;
        food.y += food.vy;
        food.vy *= 0.98;
        food.life--;

        if (food.life <= 0) {
          foods.splice(i, 1);
          continue;
        }

        ctx.fillStyle = isDark ? "rgba(251, 191, 36, 0.85)" : "rgba(234, 88, 12, 0.85)";
        ctx.beginPath();
        ctx.arc(food.x, food.y, food.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow halo
        ctx.strokeStyle = isDark ? "rgba(253, 224, 71, 0.4)" : "rgba(249, 115, 22, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Render & update Bubbles
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.x += b.vx;
        b.y += b.vy;
        b.opacity -= 0.015;

        if (b.opacity <= 0.05 || b.y < -20) {
          bubbles.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = isDark
          ? `rgba(224, 231, 255, ${b.opacity.toFixed(2)})`
          : `rgba(147, 197, 253, ${b.opacity.toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Update & render each fish
      for (let f = 0; f < fishList.length; f++) {
        const fish = fishList[f];

        // Check if there is food in the water to pursue!
        let targetFood: FoodPellet | null = null;
        let minFoodDist = 380;
        let foodIndex = -1;

        for (let j = 0; j < foods.length; j++) {
          const food = foods[j];
          const dist = Math.hypot(food.x - fish.x, food.y - fish.y);
          if (dist < minFoodDist) {
            minFoodDist = dist;
            targetFood = food;
            foodIndex = j;
          }
        }

        if (targetFood && foodIndex !== -1) {
          // Swim actively toward the food pellet!
          const angleToFood = Math.atan2(targetFood.y - fish.y, targetFood.x - fish.x);
          fish.targetAngle = angleToFood;
          fish.speed = Math.min(fish.baseSpeed * 2.1, 2.8);

          // If close enough: eat the food!
          if (minFoodDist < 26) {
            addBubbles(targetFood.x, targetFood.y, 4);
            addRipple(targetFood.x, targetFood.y, 50);
            foods.splice(foodIndex, 1);
            fish.eatingTimer = 25; // brief excited wiggle
          }
        } else {
          // Normal ambient swimming & wandering
          if (Math.random() < 0.012) {
            fish.targetAngle += (Math.random() - 0.5) * 1.4;
          }

          // Steer away from screen edges
          const margin = 110;
          if (fish.x < margin) fish.targetAngle = 0;
          else if (fish.x > width - margin) fish.targetAngle = Math.PI;
          else if (fish.y < margin) fish.targetAngle = Math.PI / 2;
          else if (fish.y > height - margin) fish.targetAngle = -Math.PI / 2;

          // Interactive mouse interaction
          if (mouseActive) {
            if (fish.isCurious) {
              // Curious fish actively swarm, approach, and circle around the cursor!
              const targetX = mouseX + Math.cos(fish.tailWag * 0.35 + fish.orbitOffset) * fish.orbitRadius;
              const targetY = mouseY + Math.sin(fish.tailWag * 0.35 + fish.orbitOffset) * fish.orbitRadius;
              const dx = targetX - fish.x;
              const dy = targetY - fish.y;
              const distToTarget = Math.hypot(dx, dy);

              if (distToTarget > 12) {
                fish.targetAngle = Math.atan2(dy, dx);
                const distToCursor = Math.hypot(mouseX - fish.x, mouseY - fish.y);
                if (distToCursor > 220) {
                  fish.speed = Math.min(fish.baseSpeed * 2.2, 3.2);
                } else {
                  fish.speed = fish.baseSpeed * 1.35;
                }
              }
            } else {
              // Shy fish gently swerve away if cursor gets too close
              const dx = fish.x - mouseX;
              const dy = fish.y - mouseY;
              const distSq = dx * dx + dy * dy;
              const fearDist = 130;
              if (distSq < fearDist * fearDist && distSq > 0) {
                const awayAngle = Math.atan2(dy, dx);
                fish.targetAngle = awayAngle;
                fish.speed = Math.min(fish.baseSpeed * 2.0, 3.0);
              }
            }
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
        const wrapPadding = 280;
        if (fish.x < -wrapPadding) fish.x = width + wrapPadding;
        if (fish.x > width + wrapPadding) fish.x = -wrapPadding;
        if (fish.y < -wrapPadding) fish.y = height + wrapPadding;
        if (fish.y > height + wrapPadding) fish.y = -wrapPadding;

        // Spine & wave wag
        const wagMult = fish.eatingTimer > 0 ? 1.8 : 1.0;
        if (fish.eatingTimer > 0) fish.eatingTimer--;

        fish.tailWag += fish.wagSpeed * (fish.speed / fish.baseSpeed) * wagMult;
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

        // Render organic fish body & fins
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
      window.removeEventListener("pointerdown", handleWindowPointerDown);
      window.removeEventListener("fish:ripple", onCustomRipple);
      window.removeEventListener("fish:drop-food", onCustomDropFood);
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
});

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
        mainColor = "rgba(168, 85, 247, 0.45)";
        accentColor = "rgba(192, 132, 252, 0.6)";
        finColor = "rgba(168, 85, 247, 0.25)";
        break;
      case "amber": // Warm gold
        mainColor = "rgba(251, 146, 60, 0.48)";
        accentColor = "rgba(253, 186, 116, 0.62)";
        finColor = "rgba(251, 146, 60, 0.25)";
        break;
      case "crimson": // Crimson / Coral
        mainColor = "rgba(244, 63, 94, 0.45)";
        accentColor = "rgba(251, 113, 133, 0.6)";
        finColor = "rgba(244, 63, 94, 0.25)";
        break;
      default: // Silver / Cyan moonlight
        mainColor = "rgba(56, 189, 248, 0.45)";
        accentColor = "rgba(125, 211, 252, 0.6)";
        finColor = "rgba(56, 189, 248, 0.25)";
    }
  } else {
    // Light mode: soft watercolor koi tones
    switch (fish.variety) {
      case "primary": // Soft indigo / deep iris
        mainColor = "rgba(79, 70, 229, 0.38)";
        accentColor = "rgba(99, 102, 241, 0.48)";
        finColor = "rgba(79, 70, 229, 0.2)";
        break;
      case "amber": // Rich koi gold
        mainColor = "rgba(217, 119, 6, 0.42)";
        accentColor = "rgba(245, 158, 11, 0.55)";
        finColor = "rgba(217, 119, 6, 0.2)";
        break;
      case "crimson": // Vibrant koi vermilion
        mainColor = "rgba(225, 29, 72, 0.42)";
        accentColor = "rgba(244, 63, 94, 0.55)";
        finColor = "rgba(225, 29, 72, 0.2)";
        break;
      default: // Elegant slate ink
        mainColor = "rgba(71, 85, 105, 0.35)";
        accentColor = "rgba(100, 116, 139, 0.45)";
        finColor = "rgba(71, 85, 105, 0.18)";
    }
  }

  // Calculate half-widths and normal vectors along the spine
  const leftPoints: Point[] = [];
  const rightPoints: Point[] = [];
  const bodyWidth = fish.length * 0.185;

  for (let i = 0; i < count; i++) {
    const s = i / (count - 1);
    let w: number;
    if (s < 0.2) {
      w = bodyWidth * (0.6 + 0.4 * Math.sin((s / 0.2) * (Math.PI / 2)));
    } else if (s < 0.6) {
      w = bodyWidth;
    } else {
      w = bodyWidth * Math.pow(1 - (s - 0.6) / 0.4, 0.85);
    }
    w = Math.max(w, 1.2);

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
  const finLen = fish.length * 0.44;

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
  const tailLen = fish.length * 0.62;
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
  const nose = nodes[0];
  ctx.moveTo(leftPoints[0].x, leftPoints[0].y);
  ctx.quadraticCurveTo(nose.x, nose.y, rightPoints[0].x, rightPoints[0].y);

  for (let i = 1; i < count; i++) {
    const prev = rightPoints[i - 1];
    const curr = rightPoints[i];
    const midX = (prev.x + curr.x) / 2;
    const midY = (prev.y + curr.y) / 2;
    ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
  }
  ctx.lineTo(rightPoints[count - 1].x, rightPoints[count - 1].y);
  ctx.lineTo(leftPoints[count - 1].x, leftPoints[count - 1].y);

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
  ctx.lineWidth = fish.length * 0.05;
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
  const eyeR = Math.max(fish.length * 0.024, 2.8);
  ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(15, 23, 42, 0.7)";
  ctx.beginPath();
  ctx.arc(leftPoints[eyeIdx].x, leftPoints[eyeIdx].y, eyeR, 0, Math.PI * 2);
  ctx.arc(rightPoints[eyeIdx].x, rightPoints[eyeIdx].y, eyeR, 0, Math.PI * 2);
  ctx.fill();
}
