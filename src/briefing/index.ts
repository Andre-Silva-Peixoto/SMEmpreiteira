import { readBriefingStateFromForm } from "./form";
import { createBriefingPreviewPanel } from "./preview-panel";
import { buildMailtoHref, formatBriefingSummary } from "./summary";
import type { BriefingState } from "./types";

export type { BriefingState };
export { readBriefingStateFromForm };

export function initBriefingConfigurator(): void {
  const form = document.querySelector<HTMLFormElement>("#briefing-form");
  const visualHost = document.querySelector<HTMLElement>("#briefing-visual-panel");
  const live = document.querySelector<HTMLElement>("#briefing-live-summary");
  const copyBtn = document.querySelector<HTMLButtonElement>("#briefing-copy-summary");
  const mailBtn = document.querySelector<HTMLAnchorElement>("#briefing-mailto");

  if (!form || !visualHost || !live) return;

  const briefingForm = form;
  const liveRegion = live;

  const panel = createBriefingPreviewPanel(visualHost);

  function apply(state: BriefingState): void {
    const text = formatBriefingSummary(state);
    liveRegion.textContent = text;
    panel.updateFromState(state);
    if (mailBtn) mailBtn.href = buildMailtoHref(text);
  }

  function onFormChange(): void {
    apply(readBriefingStateFromForm(briefingForm));
  }

  briefingForm.addEventListener("input", onFormChange);
  briefingForm.addEventListener("change", onFormChange);

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const text = formatBriefingSummary(readBriefingStateFromForm(briefingForm));
      try {
        await navigator.clipboard.writeText(text);
        copyBtn.textContent = "Copiado!";
        window.setTimeout(() => {
          copyBtn.textContent = "Copiar resumo";
        }, 2000);
      } catch {
        window.prompt("Copie o resumo abaixo:", text);
      }
    });
  }

  onFormChange();

  window.addEventListener(
    "beforeunload",
    () => {
      panel.dispose();
    },
    { once: true },
  );
}
