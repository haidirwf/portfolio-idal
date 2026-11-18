"use client";

import * as React from "react";
import Image from "next/image";

export const FloatingBadge = React.memo(function FloatingBadge() {
  const [mounted, setMounted] = React.useState(false);
  const badgeRef = React.useRef<HTMLDivElement | null>(null);

  // Position & Physics state stored in refs for 60fps performance
  const stateRef = React.useRef({
    x: 0,
    y: -180,
    vx: 0,
    vy: 2,
    rot: -4,
    vRot: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    hasLanded: false,
    targetY: 130,
    time: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    lastPointerTime: 0,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;

    const el = badgeRef.current;
    if (!el) return;

    const state = stateRef.current;
    const badgeWidth = el.offsetWidth || 160;
    const badgeHeight = el.offsetHeight || 75;

    // Only set initial position if not already landed
    if (!state.hasLanded) {
      const initialX = Math.max(
        16,
        window.innerWidth > 900 ? window.innerWidth * 0.78 : window.innerWidth * 0.5 - badgeWidth / 2
      );
      state.x = initialX;
      state.y = -180;
      state.targetY = window.innerWidth > 640 ? 110 : 80;

      el.style.setProperty("--bx", `${state.x}px`);
      el.style.setProperty("--by", `${state.y}px`);
      el.style.setProperty("--brot", `${state.rot}deg`);
    }

    let animId: number;
    let rippleThrottle = 0;

    function loop() {
      state.time += 0.035;

      const currentW = el?.offsetWidth || badgeWidth;
      const currentH = el?.offsetHeight || badgeHeight;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      if (!state.isDragging) {
        if (!state.hasLanded) {
          // 1. Initial fall from above screen
          state.vy += 0.38; // gravity
          state.y += state.vy;
          state.rot += (0 - state.rot) * 0.05;

          if (state.y >= state.targetY) {
            state.y = state.targetY;
            state.hasLanded = true;
            state.vy = -3.5; // gentle upward bounce upon water impact

            // Splash into water!
            window.dispatchEvent(
              new CustomEvent("fish:ripple", {
                detail: { x: state.x + currentW / 2, y: state.y + currentH / 2, size: 140 },
              })
            );
            window.dispatchEvent(
              new CustomEvent("fish:drop-food", {
                detail: { x: state.x + currentW / 2, y: state.y + currentH / 2, count: 3 },
              })
            );
          }
        } else {
          // 2. Water floating & throw physics
          const speed = Math.hypot(state.vx, state.vy);

          if (speed > 0.4) {
            // Tossing inertia
            state.x += state.vx;
            state.y += state.vy;
            state.vx *= 0.94; // water/air resistance
            state.vy *= 0.94;
            state.rot += state.vRot;
            state.vRot *= 0.92;

            // Emit wake ripples when moving fast
            rippleThrottle++;
            if (rippleThrottle % 8 === 0 && speed > 2.0) {
              window.dispatchEvent(
                new CustomEvent("fish:ripple", {
                  detail: { x: state.x + currentW / 2, y: state.y + currentH / 2, size: 70 },
                })
              );
            }

            // Screen edge bounces
            const pad = 12;
            if (state.x < pad) {
              state.x = pad;
              state.vx = Math.abs(state.vx) * 0.65;
            } else if (state.x + currentW > screenW - pad) {
              state.x = screenW - currentW - pad;
              state.vx = -Math.abs(state.vx) * 0.65;
            }

            if (state.y < pad) {
              state.y = pad;
              state.vy = Math.abs(state.vy) * 0.65;
            } else if (state.y + currentH > screenH - pad) {
              state.y = screenH - currentH - pad;
              state.vy = -Math.abs(state.vy) * 0.65;
            }
          } else {
            // Settle into serene water buoyancy bobbing
            state.vx = 0;
            state.vy = 0;
            const bobbingY = Math.sin(state.time * 1.8) * 5;
            const bobbingRot = Math.sin(state.time * 1.2) * 3;
            state.rot += (bobbingRot - state.rot) * 0.08;
            state.y += (state.targetY + bobbingY - state.y) * 0.08;
          }
        }
      }

      // Apply transform via CSS custom properties to avoid React reconciliation wipeout
      if (el) {
        el.style.setProperty("--bx", `${state.x.toFixed(1)}px`);
        el.style.setProperty("--by", `${state.y.toFixed(1)}px`);
        el.style.setProperty("--brot", `${state.rot.toFixed(1)}deg`);
      }

      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [mounted]);

  // Pointer drag & toss handlers
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = badgeRef.current;
    if (!el) return;

    el.setPointerCapture(e.pointerId);
    const state = stateRef.current;
    state.isDragging = true;
    state.dragStartX = e.clientX - state.x;
    state.dragStartY = e.clientY - state.y;
    state.lastPointerX = e.clientX;
    state.lastPointerY = e.clientY;
    state.lastPointerTime = performance.now();
    state.vx = 0;
    state.vy = 0;
    state.vRot = 0;

    // Trigger splash ripple on grab
    window.dispatchEvent(
      new CustomEvent("fish:ripple", {
        detail: { x: e.clientX, y: e.clientY, size: 75 },
      })
    );
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const state = stateRef.current;
    if (!state.isDragging) return;

    const newX = e.clientX - state.dragStartX;
    const newY = e.clientY - state.dragStartY;

    const now = performance.now();
    const dt = Math.max(now - state.lastPointerTime, 16);
    state.vx = ((e.clientX - state.lastPointerX) / dt) * 16;
    state.vy = ((e.clientY - state.lastPointerY) / dt) * 16;
    state.vRot = state.vx * 0.4;
    state.rot = state.vx * 1.8;

    state.lastPointerX = e.clientX;
    state.lastPointerY = e.clientY;
    state.lastPointerTime = now;

    state.x = newX;
    state.y = newY;
    state.targetY = newY; // new resting water level
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const el = badgeRef.current;
    if (!el) return;

    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}

    const state = stateRef.current;
    state.isDragging = false;

    // Cap throw velocity for pleasant feel
    const maxSpeed = 22;
    state.vx = Math.max(-maxSpeed, Math.min(maxSpeed, state.vx));
    state.vy = Math.max(-maxSpeed, Math.min(maxSpeed, state.vy));

    // Release ripple and drop fish treats!
    window.dispatchEvent(
      new CustomEvent("fish:ripple", {
        detail: { x: state.x + el.offsetWidth / 2, y: state.y + el.offsetHeight / 2, size: 120 },
      })
    );
    window.dispatchEvent(
      new CustomEvent("fish:drop-food", {
        detail: { x: state.x + el.offsetWidth / 2, y: state.y + el.offsetHeight / 2, count: 2 },
      })
    );
  }

  function handleClick() {
    const el = badgeRef.current;
    if (!el) return;

    const state = stateRef.current;
    // Playful bounce & drop food when tapped
    state.vy = -4.5;
    state.vRot = (Math.random() - 0.5) * 8;

    window.dispatchEvent(
      new CustomEvent("fish:drop-food", {
        detail: { x: state.x + el.offsetWidth / 2, y: state.y + el.offsetHeight / 2, count: 3 },
      })
    );
    window.dispatchEvent(
      new CustomEvent("fish:ripple", {
        detail: { x: state.x + el.offsetWidth / 2, y: state.y + el.offsetHeight / 2, size: 100 },
      })
    );
  }

  if (!mounted) return null;

  return (
    <div
      ref={badgeRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive floating Se-Indonesia sticker"
      data-interactive="true"
      className="fixed top-0 left-0 z-30 select-none cursor-grab active:cursor-grabbing will-change-transform touch-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
      style={{
        width: "clamp(130px, 18vw, 185px)",
        height: "auto",
        transform: "translate3d(var(--bx, 0px), var(--by, -180px), 0) rotate(var(--brot, 0deg))",
      }}
    >
      <div className="relative w-full aspect-[533/252]">
        <Image
          src="/seindonesia.png"
          alt="Se-Indonesia"
          fill
          priority
          sizes="(max-width: 640px) 130px, 185px"
          className="object-contain pointer-events-none drop-shadow-sm select-none"
          draggable={false}
        />
      </div>
    </div>
  );
});
