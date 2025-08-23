import { useEffect } from "react";

/**
 * LightsaberCursor
 * Drop this component once near the root of your app to enable a red lightsaber cursor.
 *
 * Props let you tweak color, bladeLength, thickness and glow.
 * Works on desktop pointers. Automatically hides on touch/idle.
 */
export type LightsaberCursorProps = {
  /** Saber color (CSS color). Default: "#ff2a2a" */
  color?: string;
  /** Blade length in px. Default: 140 */
  bladeLength?: number;
  /** Blade thickness in px. Default: 6 */
  thickness?: number;
  /** Glow spread in px. Default: 18 */
  glow?: number;
  /** Whether to hide the native cursor (default: true) */
  hideNative?: boolean;
};

export default function LightsaberCursor({
  color = "#ff2a2a",
  bladeLength = 140,
  thickness = 6,
  glow = 18,
  hideNative = true,
}: LightsaberCursorProps) {
  useEffect(() => {
    const root = document.documentElement;

    // Container follows the pointer; we rotate the blade toward velocity.
    const container = document.createElement("div");
    container.id = "ls-cursor";
    container.setAttribute("role", "presentation");
    container.style.position = "fixed";
    container.style.left = "0";
    container.style.top = "0";
    container.style.pointerEvents = "none";
    container.style.zIndex = "2147483647"; // above everything
    container.style.opacity = "0";
    container.style.transition = "opacity 120ms ease-out";

    // Hilt (subtle metallic handle at the origin)
    const hilt = document.createElement("div");
    hilt.style.width = `${Math.max(14, thickness * 2)}px`;
    hilt.style.height = `${Math.max(14, thickness * 2)}px`;
    hilt.style.borderRadius = "9999px";
    hilt.style.background = "radial-gradient(circle at 35% 35%, #999 0%, #666 30%, #222 70%, #000 100%)";
    hilt.style.boxShadow = "inset 0 0 6px rgba(255,255,255,.2), 0 0 6px rgba(0,0,0,.8)";
    hilt.style.transform = "translate(-50%, -50%)";
    hilt.style.position = "absolute";

    // Blade container (rotates), holds core, glow, tip
    const blade = document.createElement("div");
    blade.style.position = "absolute";
    blade.style.left = "50%";
    blade.style.top = "50%";
    blade.style.transformOrigin = "0% 50%"; // rotate from hilt
    blade.style.filter = "drop-shadow(0 0 2px rgba(0,0,0,0.4))";

    // Core: bright inner white beam with slight end falloff
    const core = document.createElement("div");
    core.style.position = "absolute";
    core.style.left = "0";
    core.style.top = "50%";
    core.style.transform = "translateY(-50%)";
    core.style.height = `${Math.max(2, Math.round(thickness * 0.6))}px`;
    core.style.width = `${bladeLength}px`;
    core.style.borderRadius = `${thickness / 2}px`;
    core.style.background = `linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.98) 75%, rgba(255,255,255,0.6) 92%, rgba(255,255,255,0) 100%)`;
    (core.style as any).maskImage = `linear-gradient(to right, black 0%, black 82%, transparent 100%)`;
    (core.style as any).WebkitMaskImage = `linear-gradient(to right, black 0%, black 82%, transparent 100%)`;

    // Inner glow: colored bloom hugging the core
    const glowInner = document.createElement("div");
    glowInner.style.position = "absolute";
    glowInner.style.left = "0";
    glowInner.style.top = "50%";
    glowInner.style.transform = "translateY(-50%)";
    glowInner.style.height = `${thickness}px`;
    glowInner.style.width = `${bladeLength}px`;
    glowInner.style.borderRadius = `${thickness}px`;
    glowInner.style.background = color;
    glowInner.style.opacity = "0.85";
    glowInner.style.filter = `blur(${Math.max(2, Math.round(glow * 0.6))}px)`;

    // Outer glow: soft spread
    const glowOuter = document.createElement("div");
    glowOuter.style.position = "absolute";
    glowOuter.style.left = "0";
    glowOuter.style.top = "50%";
    glowOuter.style.transform = "translateY(-50%)";
    glowOuter.style.height = `${Math.max(thickness * 1.2, thickness + 2)}px`;
    glowOuter.style.width = `${bladeLength}px`;
    glowOuter.style.borderRadius = `${thickness * 1.2}px`;
    glowOuter.style.background = color;
    glowOuter.style.opacity = "0.45";
    glowOuter.style.filter = `blur(${Math.max(4, Math.round(glow))}px)`;

    // Tip: tapered bright end
    const tip = document.createElement("div");
    tip.style.position = "absolute";
    tip.style.left = `${bladeLength}px`;
    tip.style.top = "50%";
    tip.style.transform = "translate(-50%, -50%)";
    const tipSize = Math.max(thickness * 2.2, 12);
    tip.style.width = `${tipSize}px`;
    tip.style.height = `${tipSize * 0.85}px`;
    tip.style.borderRadius = "9999px";
    tip.style.background = `radial-gradient(closest-side, rgba(255,255,255,0.95), ${color} 55%, rgba(0,0,0,0) 70%)`;
    tip.style.filter = `blur(${Math.max(2, Math.round(glow * 0.6))}px)`;

    // Heat bloom near hilt (short, wide glow)
    const heatBloom = document.createElement("div");
    heatBloom.style.position = "absolute";
    heatBloom.style.left = `${Math.max(2, Math.round(thickness * 0.3))}px`;
    heatBloom.style.top = "50%";
    heatBloom.style.transform = "translateY(-50%)";
    heatBloom.style.width = `${Math.max(thickness * 2.5, 24)}px`;
    heatBloom.style.height = `${Math.max(thickness * 2, 16)}px`;
    heatBloom.style.borderRadius = "9999px";
    heatBloom.style.background = `radial-gradient(closest-side, ${color}88, ${color}33 60%, transparent 75%)`;
    heatBloom.style.filter = `blur(${Math.max(3, Math.round(glow * 0.7))}px)`;

    blade.appendChild(glowOuter);
    blade.appendChild(glowInner);
    blade.appendChild(core);
    blade.appendChild(tip);
    blade.appendChild(heatBloom);

    container.appendChild(blade);
    container.appendChild(hilt);
    document.body.appendChild(container);

    let lastX = 0;
    let lastY = 0;
    let vx = 0;
    let vy = 0;
    let raf = 0;
    let lastAngleRad = 0;

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      visible: false,
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      state.x = lerp(state.x, state.tx, 0.25);
      state.y = lerp(state.y, state.ty, 0.25);

      const dx = state.x - lastX;
      const dy = state.y - lastY;
      lastX = state.x;
      lastY = state.y;

      // Velocity -> angle in degrees
      vx = lerp(vx, dx, 0.5);
      vy = lerp(vy, dy, 0.5);
      const angleRad = Math.atan2(vy, vx);
      const angle = angleRad * (180 / Math.PI);
      lastAngleRad = angleRad;

      container.style.transform = `translate(${state.x}px, ${state.y}px)`;
      blade.style.transform = `translate(0, 0) rotate(${angle}deg)`;

      // Subtle flicker based on time
      const t = performance.now() * 0.002;
      const flicker = 0.9 + 0.1 * (0.5 + 0.5 * Math.sin(t * 3.7 + state.x * 0.01));
      const flickerSoft = 0.85 + 0.15 * (0.5 + 0.5 * Math.sin(t * 2.2 + state.y * 0.012));
      glowInner.style.opacity = String(0.75 * flicker);
      glowOuter.style.opacity = String(0.38 * flickerSoft);
      tip.style.opacity = String(0.95 * flicker);
      core.style.opacity = String(0.96 * flicker);
      // tiny width jitter to simulate energy
      const coreH = Math.max(2, Math.round(thickness * 0.6));
      core.style.height = `${coreH + Math.sin(t * 5) * 0.5}px`;

      raf = requestAnimationFrame(animate);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.pointerType === "pen") {
        state.tx = e.clientX;
        state.ty = e.clientY;
        if (!state.visible) show();
      }
    };

    const onEnter = () => show();
    const onLeave = () => hide();
    const onBlur = () => hide();

    // Heuristic: if the pointer click misses a target, try selecting first interactable under the blade.
    const isInteractable = (el: Element | null) => {
      if (!el || !(el instanceof HTMLElement)) return false;
      const tag = el.tagName.toLowerCase();
      if (["a", "button", "input", "select", "textarea", "label", "summary"].includes(tag)) return true;
      if (el.getAttribute("role") === "button") return true;
      // Common clickable classes/handlers
      if (typeof (el as any).onclick === "function") return true;
      return false;
    };

    const tryBladeClickRedirect = (ev: MouseEvent | PointerEvent) => {
      // If user already clicked an interactable, do nothing.
      const originalTarget = ev.target as Element | null;
      if (isInteractable(originalTarget)) return;

      // Sample points along the blade from hilt outward
      const cos = Math.cos(lastAngleRad);
      const sin = Math.sin(lastAngleRad);
      const step = Math.max(4, Math.floor(thickness * 0.6)); // along-blade step
      const maxLen = bladeLength;
      // Sample a perpendicular band to widen effective clickable area
      const px = -sin; // perpendicular x
      const py = cos;  // perpendicular y
      const bandRadius = Math.max(thickness * 3.2, 18); // widen band more for whole-blade feel
      const bandStep = Math.max(4, Math.floor(thickness * 0.75));

      outer: for (let d = step; d <= maxLen; d += step) {
        const bx = state.x + cos * d;
        const by = state.y + sin * d;
        for (let o = -bandRadius; o <= bandRadius; o += bandStep) {
          const sx = bx + px * o;
          const sy = by + py * o;
          const el = document.elementFromPoint(sx, sy);
          if (isInteractable(el)) {
            // Redirect the click to this element
            ev.preventDefault();
            ev.stopPropagation();
            (el as HTMLElement).focus({ preventScroll: true });
            const redirected = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              clientX: sx,
              clientY: sy,
              view: window,
            });
            el.dispatchEvent(redirected);
            break outer;
          }
        }
      }
    };

    function show() {
      state.visible = true;
      container.style.opacity = "1";
      if (hideNative) root.style.cursor = "none";
    }
    function hide() {
      state.visible = false;
      container.style.opacity = "0";
      if (hideNative) root.style.cursor = "auto";
    }

    const pointerDownHandler = (e: PointerEvent) => {
      onMove(e);
      tryBladeClickRedirect(e);
    };
    const clickHandler = (e: MouseEvent) => tryBladeClickRedirect(e);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", pointerDownHandler, true);
    window.addEventListener("click", clickHandler, true);
    window.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onBlur);

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", pointerDownHandler, true);
      window.removeEventListener("click", clickHandler, true);
      window.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onBlur);
      container.remove();
      root.style.cursor = "auto";
    };
  }, [color, bladeLength, thickness, glow, hideNative]);

  // Nothing to render; this component only manages DOM elements.
  return null;
}

/** Quick Tailwind-friendly utility styles (optional):
 * body: has-[#ls-cursor[style*="opacity: 1"]]:cursor-none
 * You don't need this if hideNative=true (default), kept for reference.
 */
