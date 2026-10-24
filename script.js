const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

$("#year").textContent = new Date().getFullYear();

// theme toggle
$("#theme").onclick = () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
};

// mobile menu
const menu = $("#menu"), burger = $("#burger");
burger.onclick = () => burger.setAttribute("aria-expanded", menu.classList.toggle("open"));
$$("#menu a").forEach(a => a.onclick = () => menu.classList.remove("open"));

// typing effect
const roles = ["Analytics Engineer", "Data Analyst", "Power BI Developer", "ClickHouse & SQL Specialist"];
let r = 0, c = 0, del = false;
(function type() {
  const el = $("#typed"), word = roles[r];
  el.textContent = word.slice(0, c);
  if (!del && c === word.length) { del = true; return setTimeout(type, 1500); }
  if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
  c += del ? -1 : 1;
  setTimeout(type, del ? 40 : 80);
})();

// scroll reveal + counters
const countUp = el => {
  const to = +el.dataset.count, suf = el.dataset.suffix || "";
  let n = 0;
  const step = () => {
    n = Math.min(to, n + Math.max(1, Math.ceil(to / 40)));
    el.textContent = n + suf;
    if (n < to) requestAnimationFrame(step);
  };
  step();
};
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("show");
  $$("[data-count]", e.target).forEach(countUp);
  io.unobserve(e.target);
}), { threshold: 0.12 });
$$(".reveal").forEach(el => io.observe(el));

// active nav link
const links = $$("#menu a");
const so = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-40% 0px -55% 0px" });
$$("main section[id]").forEach(s => so.observe(s));
