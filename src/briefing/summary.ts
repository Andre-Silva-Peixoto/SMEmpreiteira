import type { BriefingState } from "./types";

/** Rótulos pt-BR compartilhados com o painel visual e o resumo em texto. */
export const briefingFieldLabels = {
  demandType: {
    new_build: "Nova construção",
    expansion_reform: "Ampliação / reforma",
    infrastructure: "Infraestrutura / urbanização",
    maintenance: "Manutenção e recuperação",
  },
  segment: {
    multifamily: "Multifamiliar",
    commercial: "Comercial / serviços",
    industrial: "Industrial / logística",
    institutional: "Institucional / saúde / educação",
    civil_works: "Obras civis (viário, pontes)",
  },
  scale: {
    small: "Pequeno",
    medium: "Médio",
    large: "Grande",
    xlarge: "Muito grande (infraestrutura)",
  },
  areaBand: {
    up_to_500: "Até ~500 m²",
    "500_2000": "500–2.000 m²",
    "2000_10000": "2.000–10.000 m²",
    over_10000: "Mais de 10.000 m²",
  },
  contractModel: {
    full_contract: "Empreitada global",
    construction_management: "Administração de obra",
    labor_only: "Fornecimento de mão de obra / equipe",
    tbd: "A definir com a SM",
  },
  timeline: {
    in_progress: "Já em andamento",
    urgent: "URGENTE",
    short: "Prazo curto",
    medium: "Prazo médio",
    long: "Prazo longo",
  },
  siteContext: {
    access_ok: "Canteiro com acesso favorável",
    neighbor_restriction: "Restrição de vizinhança",
    hard_logistics: "Logística difícil",
    night_shifts: "Interesse em turnos / noturno",
  },
  projectSupport: {
    has_executive: "Cliente já tem projeto executivo",
    needs_interfaces: "Precisa apoio em interfaces",
    bid_in_review: "Licitação em análise",
  },
} as const;

export function formatBriefingSummary(state: BriefingState): string {
  const L = briefingFieldLabels;
  const lines: string[] = [
    "— Briefing SM Empreiteira (pré-análise) —",
    "",
    `Tipo de demanda: ${L.demandType[state.demandType]}`,
    `Segmento / uso: ${L.segment[state.segment]}`,
    `Porte: ${L.scale[state.scale]}`,
    `Área (ordem de grandeza): ${L.areaBand[state.areaBand]}`,
    `Modelo de contratação: ${L.contractModel[state.contractModel]}`,
    `Prazo-alvo: ${L.timeline[state.timeline]}`,
    `Situação do local: ${L.siteContext[state.siteContext]}`,
    `Projetos / licitação: ${L.projectSupport[state.projectSupport]}`,
    "",
  ];

  if (state.contactName.trim()) lines.push(`Nome: ${state.contactName.trim()}`);
  if (state.contactEmail.trim()) lines.push(`E-mail: ${state.contactEmail.trim()}`);
  if (state.contactPhone.trim()) lines.push(`Telefone: ${state.contactPhone.trim()}`);
  if (state.notes.trim()) {
    lines.push("");
    lines.push("Observações:");
    lines.push(state.notes.trim());
  }

  lines.push("");
  lines.push("Gerado pelo site institucional (representação ilustrativa, não substitui visita técnica nem proposta formal).");

  return lines.join("\n");
}

export const CONTACT_EMAIL = "contato@smempreiteira.com.br";

export function buildMailtoHref(summary: string): string {
  const subject = encodeURIComponent("Briefing pré-análise — SM Empreiteira");
  const body = encodeURIComponent(summary);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
