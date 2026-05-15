import { projects, type Project } from "./data/projects";
import { initBriefingConfigurator } from "./briefing";
import "./style.css";

function renderProjectCards(container: HTMLElement, items: Project[]): void {
  container.replaceChildren();
  const fragment = document.createDocumentFragment();

  for (const item of items) {
    const article = document.createElement("article");
    article.className = "catalog-card";

    const media = document.createElement("div");
    media.className = "catalog-card-media";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.alt;
    img.loading = "lazy";
    img.width = 640;
    img.height = 400;
    img.addEventListener("error", () => {
      img.replaceWith(fallbackMedia(item.title));
    });

    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "catalog-card-body";

    const h3 = document.createElement("h3");
    h3.textContent = item.title;

    const p = document.createElement("p");
    p.className = "catalog-card-sub";
    p.textContent = item.subtitle;

    body.append(h3, p);
    article.append(media, body);
    fragment.appendChild(article);
  }

  container.appendChild(fragment);
}

function fallbackMedia(label: string): HTMLElement {
  const div = document.createElement("div");
  div.className = "catalog-card-fallback";
  div.setAttribute("role", "img");
  div.setAttribute("aria-label", label);
  div.textContent = label;
  return div;
}

function initNavToggle(): void {
  const toggle = document.querySelector<HTMLButtonElement>("#nav-toggle");
  const nav = document.querySelector<HTMLElement>("#site-nav");
  if (!toggle || !nav) return;

  const setOpen = (open: boolean) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => {
    const next = !nav.classList.contains("is-open");
    setOpen(next);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

function setYear(): void {
  const el = document.querySelector("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

const grid = document.querySelector<HTMLElement>("#catalog-grid");
if (grid) renderProjectCards(grid, projects);

initNavToggle();
setYear();
initBriefingConfigurator();
