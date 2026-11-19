// All content is rendered at build time by Eleventy. This file only adds
// interactivity on top: animations, project filters,
// the mobile menu and the theme toggle. The site still works without it.
(function () {
  const $ = (s) => document.querySelector(s);

  /* ---------- reveal on scroll ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }), { threshold: 0.12 })
    : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  /* ---------- project cards: spotlight + tag filters ---------- */
  const cards = [...document.querySelectorAll(".project")];
  cards.forEach((el) =>
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    })
  );
  const filters = $("#filters");
  if (filters) {
    filters.addEventListener("click", (e) => {
      const b = e.target.closest(".filter");
      if (!b) return;
      filters.querySelectorAll(".filter").forEach((f) => f.classList.toggle("active", f === b));
      const tag = b.dataset.tag;
      cards.forEach((card) => {
        const tags = JSON.parse(card.dataset.tags || "[]");
        card.hidden = tag !== "All" && !tags.includes(tag);
        if (!card.hidden) card.classList.add("in");
      });
    });
  }

  /* ---------- nav: scroll state, active link, mobile menu ---------- */
  const nav = $("#nav");
  const links = $("#links");
  const menuBtn = $("#menuBtn");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const closeMenu = () => { links.classList.remove("open"); nav.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", false); };
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    nav.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open);
  });
  links.addEventListener("click", (e) => { if (e.target.tagName === "A") closeMenu(); });

  if (io) {
    const secIO = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) links.querySelectorAll("a").forEach((a) => a.classList.toggle("active", a.hash === `#${en.target.id}`));
    }), { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("section[id]").forEach((s) => secIO.observe(s));
  }

  /* ---------- theme toggle ---------- */
  $("#themeBtn").addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();
