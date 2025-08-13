let ctx: AudioContext | null = null;
let lastTime = 0;
let muted = true;

function ensureCtx() {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
}

export function setMuted(m: boolean) {
  muted = m;
  try {
    localStorage.setItem("sfx-muted", m ? "1" : "0");
  } catch {}
}

export function getMuted() {
  try {
    const v = localStorage.getItem("sfx-muted");
    muted = v === "1";
  } catch {}
  return muted;
}

function rateLimit() {
  const now = performance.now();
  if (now - lastTime < 60) return false;
  lastTime = now;
  return true;
}

export function beep(freq = 880, dur = 0.06) {
  if (muted) return;
  if (!rateLimit()) return;
  ensureCtx();
  if (!ctx) return;

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "square";
  o.frequency.value = freq;
  g.gain.value = 0.0001;
  o.connect(g);
  g.connect(ctx.destination);
  const t = ctx.currentTime;
  g.gain.exponentialRampToValueAtTime(0.05, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start();
  o.stop(t + dur);
}

export function click(freq = 2200, dur = 0.02) {
  if (muted) return;
  if (!rateLimit()) return;
  ensureCtx();
  if (!ctx) return;

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.value = freq;
  g.gain.value = 0.0001;
  o.connect(g);
  g.connect(ctx.destination);
  const t = ctx.currentTime;
  g.gain.exponentialRampToValueAtTime(0.06, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start();
  o.stop(t + dur);
}
