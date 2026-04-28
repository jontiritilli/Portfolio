const TOP_BUTTON_THRESHOLD = 240;

function setupTopButton() {
  const btn = document.getElementById("top-btn");
  if (!btn) return;

  const sync = () => {
    const scrolled = window.scrollY > TOP_BUTTON_THRESHOLD;
    btn.classList.toggle("is-hidden", !scrolled);
  };

  btn.addEventListener("click", () => {
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

setupTopButton();
setupPressEffect();
setupFooterYear();
