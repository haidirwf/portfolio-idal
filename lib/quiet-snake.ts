/**
 * Interactive SVG Snake engine for GitHub Contribution Board.
 * Features automated wandering snake animation and playable keyboard/button game mode.
 */

export interface SnakeEngine {
  destroy: () => void;
}

export function createQuietSnake(root: HTMLElement): SnakeEngine {
  const svg = root.querySelector<SVGSVGElement>("[data-snake-board] svg");
  const board = root.querySelector<HTMLElement>("[data-snake-board]");
  const segments = Array.from(root.querySelectorAll<SVGLineElement>("[data-snake-segment]"));
  const bodyGroup = root.querySelector<SVGGElement>("[data-snake-body]");
  const head = root.querySelector<SVGGElement>("[data-snake-head]");
  const food = root.querySelector<SVGCircleElement>("[data-snake-food]");
  const pause = root.querySelector<HTMLButtonElement>("[data-snake-pause]");
  const play = root.querySelector<HTMLButtonElement>("[data-snake-play]");
  const controls = root.querySelector<HTMLElement>("[data-snake-controls]");
  const status = root.querySelector<HTMLElement>("[data-snake-status]");

  if (!svg || !board || !bodyGroup || !head || !food || !pause || !play || !controls || !status) {
    return { destroy: () => {} };
  }

  const cols = Number(svg.dataset.columns) || 53;
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Pre-calculate natural winding wandering path through columns
  const route: [number, number][] = [];
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < 7; y++) {
      route.push([x, x % 2 ? 6 - y : y]);
    }
  }

  type Mode = "auto" | "game";
  let mode: Mode = "auto";
  let paused = false;
  let visible = false;
  let dead = false;
  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let index = 0;
  let body: [number, number][] = [];
  let direction: [number, number] = [1, 0];
  let queued: [number, number] = [1, 0];
  let target: [number, number] = [10, 3];
  let score = 0;

  const equal = (a: [number, number], b: [number, number]) => a[0] === b[0] && a[1] === b[1];
  const centre = (p: [number, number]): [number, number] => [p[0] * 11 + 4, p[1] * 11 + 20];
  const adjacent = (a: [number, number], b: [number, number]) =>
    Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;

  function draw(points: [number, number][]) {
    const n = points.length;
    bodyGroup!.setAttribute(
      "opacity",
      n ? (mode === "game" ? (0.42 + 0.58 * Math.min(1, (n - 3) / 15)).toFixed(3) : "1") : "0"
    );

    segments.forEach((el, i) => {
      const a = points[i];
      if (!a) {
        el.setAttribute("opacity", "0");
        return;
      }
      const b = points[i + 1];
      const [x1, y1] = centre(a);
      const [x2, y2] = b && adjacent(a, b) ? centre(b) : [x1, y1];

      el.setAttribute("x1", String(x1));
      el.setAttribute("y1", String(y1));
      el.setAttribute("x2", String(x2));
      el.setAttribute("y2", String(y2));
      el.setAttribute("stroke-width", (7.6 - (4.6 * i) / Math.max(1, n - 1)).toFixed(2));
      el.setAttribute("opacity", "1");
    });

    if (n) {
      const [hx, hy] = centre(points[0]);
      let dx = 1;
      let dy = 0;
      if (n > 1) {
        dx = points[0][0] - points[1][0];
        dy = points[0][1] - points[1][1];
        if (Math.abs(dx) > 1) dx = -Math.sign(dx);
        if (Math.abs(dy) > 1) dy = -Math.sign(dy);
      }
      head!.setAttribute(
        "transform",
        `translate(${hx},${hy}) rotate(${(Math.atan2(dy, dx) * 180) / Math.PI})`
      );
    }

    food!.setAttribute("opacity", mode === "game" ? "1" : "0");
    food!.setAttribute("cx", String(target[0] * 11 + 4));
    food!.setAttribute("cy", String(target[1] * 11 + 20));
  }

  function nextFood() {
    const choices: [number, number][] = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < 7; y++) {
        if (!body.some((p) => equal(p, [x, y]))) choices.push([x, y]);
      }
    }
    if (!choices.length) {
      finish();
      return;
    }
    target = choices[(score * 37 + 51) % choices.length];
  }

  function finish() {
    paused = true;
    status!.textContent = `Round over · ${score} collected. Play another round?`;
    play!.textContent = "Play again";
    pause!.textContent = "Resume animation";
  }

  function step() {
    if (mode === "auto") {
      index = (index + 1) % route.length;
      draw(
        segments
          .slice(0, 8)
          .map((_, i) => route[(index - i + route.length) % route.length])
      );
      return;
    }

    direction = queued;
    const nextHead: [number, number] = [
      (body[0][0] + direction[0] + cols) % cols,
      (body[0][1] + direction[1] + 7) % 7,
    ];
    const ate = equal(nextHead, target);

    if (body.slice(0, ate ? body.length : -1).some((p) => equal(p, nextHead))) {
      finish();
      return;
    }

    body.unshift(nextHead);
    if (ate) {
      score++;
      if (body.length > segments.length) body.pop();
      nextFood();
      status!.textContent = `${score} collected · length ${body.length}`;
    } else {
      body.pop();
    }
    draw(body);
  }

  function tick(time: number) {
    if (dead || paused || !visible || document.hidden || media.matches) return;
    if (last) elapsed += Math.min(time - last, 200);
    last = time;
    if (elapsed >= 145) {
      elapsed = 0;
      step();
    }
    frame = requestAnimationFrame(tick);
  }

  function sync() {
    cancelAnimationFrame(frame);
    last = 0;
    if (media.matches && mode === "auto") {
      draw([]);
      pause!.disabled = true;
      pause!.textContent = "Motion reduced";
    } else {
      pause!.disabled = false;
      if (!paused && visible && !document.hidden && !media.matches) {
        frame = requestAnimationFrame(tick);
      }
    }
  }

  function setDirection(name: string) {
    if (mode !== "game" || paused) return;
    const map: Record<string, [number, number]> = {
      up: [0, -1],
      down: [0, 1],
      left: [-1, 0],
      right: [1, 0],
    };
    const d = map[name];
    if (d && !(d[0] === -direction[0] && d[1] === -direction[1])) {
      queued = d;
    }
    if (media.matches) step();
  }

  function handleClick(e: MouseEvent) {
    const targetEl = e.target as HTMLElement;
    if (targetEl.closest("[data-snake-play]")) {
      mode = "game";
      paused = false;
      score = 0;
      direction = [1, 0];
      queued = [1, 0];
      body = [
        [3, 3],
        [2, 3],
        [1, 3],
      ];
      nextFood();
      controls!.hidden = false;
      play!.textContent = "Restart round";
      pause!.textContent = "Back to animation";
      status!.textContent = "Use arrow keys or the controls. Edges wrap around.";
      draw(body);
      board!.focus({ preventScroll: true });
      sync();
    } else if (targetEl.closest("[data-snake-pause]")) {
      if (mode === "game") {
        mode = "auto";
        paused = false;
        controls!.hidden = true;
        play!.textContent = "Play a round";
      } else {
        paused = !paused;
      }
      pause!.textContent = paused ? "Resume snake" : "Pause snake";
      sync();
    } else {
      const b = targetEl.closest<HTMLElement>("[data-snake-direction]");
      if (b && b.dataset.snakeDirection) {
        setDirection(b.dataset.snakeDirection);
      }
    }
  }

  function handleKey(e: KeyboardEvent) {
    const nameMap: Record<string, string> = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
    const name = nameMap[e.key];
    if (name && mode === "game") {
      e.preventDefault();
      setDirection(name);
    }
    if (e.key === "Escape" && mode === "game") {
      mode = "auto";
      paused = false;
      controls!.hidden = true;
      play!.textContent = "Play a round";
      pause!.textContent = "Pause snake";
      sync();
    }
  }

  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });

  observer.observe(board);
  root.addEventListener("click", handleClick);
  board.addEventListener("keydown", handleKey);
  media.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  sync();

  return {
    destroy() {
      dead = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("click", handleClick);
      board.removeEventListener("keydown", handleKey);
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    },
  };
}
