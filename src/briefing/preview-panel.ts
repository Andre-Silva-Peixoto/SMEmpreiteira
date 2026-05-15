import { briefingFieldLabels } from "./summary";
import type { BriefingState } from "./types";

const NAVY = "#004182";
const ORANGE = "#F5A623";

function scaleLevel(state: BriefingState["scale"]): number {
  const m: Record<BriefingState["scale"], number> = {
    small: 22,
    medium: 45,
    large: 68,
    xlarge: 92,
  };
  return m[state];
}

function areaLevel(state: BriefingState["areaBand"]): number {
  const m: Record<BriefingState["areaBand"], number> = {
    up_to_500: 18,
    "500_2000": 40,
    "2000_10000": 72,
    over_10000: 95,
  };
  return m[state];
}

function timelinePressure(state: BriefingState["timeline"]): number {
  const m: Record<BriefingState["timeline"], number> = {
    in_progress: 55,
    urgent: 98,
    short: 78,
    medium: 48,
    long: 28,
  };
  return m[state];
}

function siteComplexity(state: BriefingState["siteContext"]): number {
  const m: Record<BriefingState["siteContext"], number> = {
    access_ok: 22,
    neighbor_restriction: 62,
    hard_logistics: 88,
    night_shifts: 52,
  };
  return m[state];
}

function buildTips(state: BriefingState): string[] {
  const tips: string[] = [];

  if (state.timeline === "urgent" || state.timeline === "short") {
    tips.push(
      "Informe no e-mail se existe data-limite rígida e o que já está disponível em canteiro (acesso, energia, água).",
    );
  }

  if (state.projectSupport === "bid_in_review") {
    tips.push(
      "Anexe o edital ou o link do portal de licitação — isso acelera a leitura de riscos e exigências contratuais.",
    );
  } else if (state.projectSupport === "needs_interfaces") {
    tips.push(
      "Liste quais disciplinas (estrutural, elétrica, hidrossanitário etc.) ainda estão em aberto para alinhamento.",
    );
  }

  if (state.siteContext === "neighbor_restriction") {
    tips.push(
      "Descreva acordos ou restrições de horário e ruído com vizinhança — impactam cronograma e métodos construtivos.",
    );
  } else if (state.siteContext === "hard_logistics") {
    tips.push(
      "Detalhe acesso para caminhões, estoque e içamento; fotos ou planta de situação ajudam muito na primeira análise.",
    );
  } else if (state.siteContext === "night_shifts") {
    tips.push(
      "Se há interesse em turno noturno, indique se há norma municipal ou condomínio a respeitar.",
    );
  }

  if (state.contractModel === "construction_management" || state.contractModel === "labor_only") {
    tips.push(
      "Esclareça quem detém insumos e compras (cliente x empreiteira) para evitar expectativas divergentes na proposta.",
    );
  }

  if (state.demandType === "maintenance") {
    tips.push(
      "Para manutenção ou recuperação, mencione patologias observadas, laudos existentes e prazo desejado de intervenção.",
    );
  } else if (state.demandType === "infrastructure") {
    tips.push(
      "Em infraestrutura ou urbanização, indique órgãos fiscalizadores e eventuais interferências com redes existentes.",
    );
  }

  if (state.areaBand === "over_10000" || state.scale === "xlarge") {
    tips.push(
      "Em portes muito grandes, um cronograma macro (fases) ou referência de obra similar reduz idas e vindas iniciais.",
    );
  }

  if (tips.length < 2) {
    tips.push(
      "Use o botão “Copiar resumo” e cole no e-mail — o texto já está no formato ideal para primeiro contato com a SM.",
    );
  }

  return tips.slice(0, 5);
}

function setBar(
  el: SVGRectElement | null,
  label: SVGTextElement | null,
  value: number,
  caption: string,
): void {
  if (!el || !label) return;
  const w = Math.max(6, Math.min(100, value));
  el.setAttribute("width", String((248 * w) / 100));
  label.textContent = caption;
}

export interface BriefingPreviewPanelApi {
  updateFromState: (state: BriefingState) => void;
  dispose: () => void;
}

export function createBriefingPreviewPanel(container: HTMLElement): BriefingPreviewPanelApi {
  const L = briefingFieldLabels;
  container.innerHTML = "";
  container.classList.add("briefing-visual-panel-inner");

  const root = document.createElement("div");
  root.className = "briefing-visual-root";

  root.innerHTML = `
    <div class="briefing-visual-head">
      <h3 class="briefing-visual-title">Leitura rápida</h3>
      <p class="briefing-visual-lead">
        Indicadores ilustrativos a partir do formulário — úteis para alinhar expectativas antes do contato.
      </p>
    </div>
    <svg class="briefing-visual-chart" viewBox="0 0 320 168" role="img" aria-labelledby="briefing-visual-chart-title">
      <title id="briefing-visual-chart-title">Indicadores de envergadura, área, prazo e situação do canteiro</title>
      <defs>
        <linearGradient id="briefing-bar-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${NAVY}"/>
          <stop offset="100%" stop-color="#1a6ba8"/>
        </linearGradient>
      </defs>
      <g class="briefing-visual-row" transform="translate(16, 12)">
        <text class="briefing-visual-bar-caption" x="0" y="14" data-bar-label="row-0">Porte</text>
        <rect class="briefing-visual-bar-track" x="0" y="20" width="248" height="10" rx="5"/>
        <rect class="briefing-visual-bar-fill" x="0" y="20" width="0" height="10" rx="5" fill="url(#briefing-bar-fill)"/>
      </g>
      <g class="briefing-visual-row" transform="translate(16, 46)">
        <text class="briefing-visual-bar-caption" x="0" y="14" data-bar-label="row-1">Área (ordem de grandeza)</text>
        <rect class="briefing-visual-bar-track" x="0" y="20" width="248" height="10" rx="5"/>
        <rect class="briefing-visual-bar-fill" x="0" y="20" width="0" height="10" rx="5" fill="url(#briefing-bar-fill)"/>
      </g>
      <g class="briefing-visual-row" transform="translate(16, 80)">
        <text class="briefing-visual-bar-caption" x="0" y="14" data-bar-label="row-2">Pressão de prazo</text>
        <rect class="briefing-visual-bar-track" x="0" y="20" width="248" height="10" rx="5"/>
        <rect class="briefing-visual-bar-fill" x="0" y="20" width="0" height="10" rx="5" fill="url(#briefing-bar-fill)"/>
      </g>
      <g class="briefing-visual-row" transform="translate(16, 114)">
        <text class="briefing-visual-bar-caption" x="0" y="14" data-bar-label="row-3">Fatores de canteiro</text>
        <rect class="briefing-visual-bar-track" x="0" y="20" width="248" height="10" rx="5"/>
        <rect class="briefing-visual-bar-fill" x="0" y="20" width="0" height="10" rx="5" fill="${ORANGE}"/>
      </g>
    </svg>
    <ul class="briefing-visual-chips" id="briefing-visual-chips" aria-label="Destaques da configuração"></ul>
    <div class="briefing-visual-tips">
      <h4 class="briefing-visual-tips-title">Sugestões para o primeiro contato</h4>
      <ul class="briefing-visual-tips-list" id="briefing-visual-tips"></ul>
    </div>
  `;

  container.appendChild(root);

  const fills = root.querySelectorAll<SVGRectElement>(".briefing-visual-bar-fill");
  const captions = root.querySelectorAll<SVGTextElement>("[data-bar-label]");
  const chipsEl = root.querySelector<HTMLUListElement>("#briefing-visual-chips");
  const tipsEl = root.querySelector<HTMLUListElement>("#briefing-visual-tips");

  function updateFromState(state: BriefingState): void {
    const s = scaleLevel(state.scale);
    const a = areaLevel(state.areaBand);
    const t = timelinePressure(state.timeline);
    const c = siteComplexity(state.siteContext);

    setBar(fills[0] ?? null, captions[0] ?? null, s, `Porte — ${L.scale[state.scale]}`);
    setBar(fills[1] ?? null, captions[1] ?? null, a, `Área — ${L.areaBand[state.areaBand]}`);
    setBar(fills[2] ?? null, captions[2] ?? null, t, `Prazo — ${L.timeline[state.timeline]}`);
    setBar(fills[3] ?? null, captions[3] ?? null, c, `Canteiro — ${L.siteContext[state.siteContext]}`);

    if (chipsEl) {
      chipsEl.replaceChildren();
      const chipTexts = [
        L.demandType[state.demandType],
        L.segment[state.segment],
        L.contractModel[state.contractModel],
      ];
      for (const text of chipTexts) {
        const li = document.createElement("li");
        li.className = "briefing-visual-chip";
        li.textContent = text;
        chipsEl.appendChild(li);
      }
    }

    if (tipsEl) {
      tipsEl.replaceChildren();
      for (const tip of buildTips(state)) {
        const li = document.createElement("li");
        li.textContent = tip;
        tipsEl.appendChild(li);
      }
    }
  }

  return {
    updateFromState,
    dispose: () => {
      container.replaceChildren();
      container.classList.remove("briefing-visual-panel-inner");
    },
  };
}
