const TOP_BUTTON_THRESHOLD = 240;

const programmaticScroll = {
  active: false,
  release: null,
  begin(durationMs = 900) {
    this.active = true;
    document.body.classList.add("is-jumping");
    if (this.release) clearTimeout(this.release);
    this.release = setTimeout(() => {
      this.active = false;
      document.body.classList.remove("is-jumping");
      window.dispatchEvent(new CustomEvent("scroll-jump-end"));
    }, durationMs);
  },
};

function setupStageObserver() {
  const sections = [...document.querySelectorAll("[data-stage]")];
  if (!sections.length) return;

  let queued = false;
  const compute = () => {
    const midline = window.scrollY + window.innerHeight / 2;
    let active = sections[0];
    for (const s of sections) {
      const rect = s.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const bottom = top + rect.height;
      if (top <= midline && bottom > midline) {
        active = s;
        break;
      }
      if (top <= midline) active = s;
    }
    return active.dataset.stage;
  };

  const apply = (stage) => {
    if (document.body.dataset.stage !== stage) {
      document.body.dataset.stage = stage;
    }
  };

  const update = () => {
    queued = false;
    if (programmaticScroll.active) return;
    apply(compute());
  };

  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  document.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("scroll-jump-end", () => apply(compute()));
  apply(compute());
}

function setupFullpageScroll() {
  const sections = [...document.querySelectorAll(".section")];
  if (sections.length < 2) return;

  const mq = window.matchMedia("(min-width: 720px) and (min-height: 640px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!mq.matches || reduced.matches) return;

  let current = 0;
  let locked = false;
  const LOCK_MS = 700;

  const closestIndex = () => {
    const y = window.scrollY + window.innerHeight / 3;
    let best = 0;
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].getBoundingClientRect().top + window.scrollY;
      if (top <= y) best = i;
    }
    return best;
  };

  const goTo = (idx) => {
    idx = Math.max(0, Math.min(sections.length - 1, idx));
    if (idx === current && !locked) return;
    const skipping = Math.abs(idx - current) > 1;
    current = idx;
    locked = true;
    const top = sections[idx].getBoundingClientRect().top + window.scrollY;
    if (skipping) programmaticScroll.begin(900);
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => {
      locked = false;
    }, LOCK_MS);
  };

  current = closestIndex();

  const onWheel = (e) => {
    if (Math.abs(e.deltaY) < 6) return;
    if (locked) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    goTo(current + (e.deltaY > 0 ? 1 : -1));
  };

  const onKey = (e) => {
    const map = {
      ArrowDown: 1,
      PageDown: 1,
      " ": 1,
      ArrowUp: -1,
      PageUp: -1,
      Home: -Infinity,
      End: Infinity,
    };
    if (!(e.key in map)) return;
    if (
      e.target instanceof HTMLElement &&
      ["INPUT", "TEXTAREA"].includes(e.target.tagName)
    )
      return;
    e.preventDefault();
    if (map[e.key] === Infinity) goTo(sections.length - 1);
    else if (map[e.key] === -Infinity) goTo(0);
    else goTo(current + map[e.key]);
  };

  let touchStartY = 0;
  const onTouchStart = (e) => {
    touchStartY = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) < 40) return;
    if (locked) return;
    goTo(current + (diff > 0 ? 1 : -1));
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", onKey);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });

  document.addEventListener("click", (e) => {
    const a = e.target instanceof Element ? e.target.closest("a[href^='#']") : null;
    if (!a) return;
    setTimeout(() => {
      current = closestIndex();
    }, LOCK_MS);
  });
}

function setupSectionReveal() {
  const sections = document.querySelectorAll(".section");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      }
    },
    { threshold: 0.18 }
  );

  for (const section of sections) {
    observer.observe(section);
  }
}

function setupTopButton() {
  const btn = document.getElementById("top-btn");
  if (!btn) return;

  const sync = () => {
    const scrolled = window.scrollY > TOP_BUTTON_THRESHOLD;
    btn.classList.toggle("is-hidden", !scrolled);
  };

  btn.addEventListener("click", () => {
    programmaticScroll.begin(900);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("scroll", sync, { passive: true });
  sync();
}

function setupPressEffect() {
  for (const el of document.querySelectorAll(".btn")) {
    const press = () => el.classList.add("is-pressed");
    const release = () => el.classList.remove("is-pressed");
    el.addEventListener("pointerdown", press);
    el.addEventListener("pointerup", release);
    el.addEventListener("pointerleave", release);
    el.addEventListener("pointercancel", release);
  }
}

function setupFooterYear() {
  const node = document.getElementById("footer-year");
  if (node) node.textContent = String(new Date().getFullYear());
}

setupStageObserver();
setupSectionReveal();
setupFullpageScroll();
setupTopButton();
setupPressEffect();
setupFooterYear();
