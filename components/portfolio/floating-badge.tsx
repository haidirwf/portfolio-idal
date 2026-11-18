"use client";

import * as React from "react";
import Image from "next/image";

export function FloatingBadge() {
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
    isWobbling: false,
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

    // Initial position on the right side for desktop, centered for mobile
    const initialX = Math.max(16, window.innerWidth > 900 ? window.innerWidth * 0.78 : window.innerWidth * 0.5 - badgeWidth / 2);
    state.x = initialX;
    state.y = -180;
    state.targetY = window.innerWidth > 640 ? 110 : 80;

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

      // Apply transform smoothly
      if (el) {
        el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.rot}deg)`;
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
      aria-label="Interactive floating Se-Indonesia sticker. Drag to toss or click to feed fish."
      title="Tarik & lempar atau klik untuk memberi makan ikan koi!"
      data-interactive="true"
      className="fixed top-0 left-0 z-30 select-none cursor-grab active:cursor-grabbing will-change-transform touch-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-shadow hover:scale-105 active:scale-95 duration-150"
      style={{
        width: "clamp(130px, 18vw, 185px)",
        height: "auto",
      }}
    >
      <div className="relative w-full aspect-[533/252] group">
        <Image
          src="/seindonesia.png"
          alt="Se-Indonesia"
          fill
          priority
          sizes="(max-width: 640px) 130px, 185px"
          className="object-contain pointer-events-none drop-shadow-sm select-none"
          draggable={false}
        />
        {/* Subtle playful hint badge on hover */}
        <span className="sr-only">Se-Indonesia badge</span>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap text-[10px] font-medium px-2 py-0.5 rounded-full bg-background/90 text-foreground border border-border shadow-sm backdrop-blur-xs">
          Tarik / lempar aku! ✨
        </div>
      </div>
    </div>
  );
}
