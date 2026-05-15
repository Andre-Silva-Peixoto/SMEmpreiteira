import type {
  AreaBand,
  BriefingState,
  ContractModel,
  DemandType,
  ProjectSupport,
  Scale,
  Segment,
  SiteContext,
  Timeline,
} from "./types";
import { DEFAULT_BRIEFING_STATE } from "./types";

function readRadio(form: HTMLFormElement, name: string): string | undefined {
  const el = form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
  return el?.value;
}

function readText(form: HTMLFormElement, name: string): string {
  const el = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);
  return el?.value ?? "";
}

function isDemandType(v: string | undefined): v is DemandType {
  return (
    v === "new_build" ||
    v === "expansion_reform" ||
    v === "infrastructure" ||
    v === "maintenance"
  );
}

function isSegment(v: string | undefined): v is Segment {
  return (
    v === "multifamily" ||
    v === "commercial" ||
    v === "industrial" ||
    v === "institutional" ||
    v === "civil_works"
  );
}

function isScale(v: string | undefined): v is Scale {
  return v === "small" || v === "medium" || v === "large" || v === "xlarge";
}

function isAreaBand(v: string | undefined): v is AreaBand {
  return (
    v === "up_to_500" ||
    v === "500_2000" ||
    v === "2000_10000" ||
    v === "over_10000"
  );
}

function isContractModel(v: string | undefined): v is ContractModel {
  return (
    v === "full_contract" ||
    v === "construction_management" ||
    v === "labor_only" ||
    v === "tbd"
  );
}

function isTimeline(v: string | undefined): v is Timeline {
  return (
    v === "in_progress" ||
    v === "urgent" ||
    v === "short" ||
    v === "medium" ||
    v === "long"
  );
}

function isSiteContext(v: string | undefined): v is SiteContext {
  return (
    v === "access_ok" ||
    v === "neighbor_restriction" ||
    v === "hard_logistics" ||
    v === "night_shifts"
  );
}

function isProjectSupport(v: string | undefined): v is ProjectSupport {
  return v === "has_executive" || v === "needs_interfaces" || v === "bid_in_review";
}

export function readBriefingStateFromForm(form: HTMLFormElement): BriefingState {
  const demand = readRadio(form, "demandType");
  const segment = readRadio(form, "segment");
  const scale = readRadio(form, "scale");
  const areaBand = readRadio(form, "areaBand");
  const contractModel = readRadio(form, "contractModel");
  const timeline = readRadio(form, "timeline");
  const siteContext = readRadio(form, "siteContext");
  const projectSupport = readRadio(form, "projectSupport");

  return {
    demandType: isDemandType(demand) ? demand : DEFAULT_BRIEFING_STATE.demandType,
    segment: isSegment(segment) ? segment : DEFAULT_BRIEFING_STATE.segment,
    scale: isScale(scale) ? scale : DEFAULT_BRIEFING_STATE.scale,
    areaBand: isAreaBand(areaBand) ? areaBand : DEFAULT_BRIEFING_STATE.areaBand,
    contractModel: isContractModel(contractModel)
      ? contractModel
      : DEFAULT_BRIEFING_STATE.contractModel,
    timeline: isTimeline(timeline) ? timeline : DEFAULT_BRIEFING_STATE.timeline,
    siteContext: isSiteContext(siteContext) ? siteContext : DEFAULT_BRIEFING_STATE.siteContext,
    projectSupport: isProjectSupport(projectSupport)
      ? projectSupport
      : DEFAULT_BRIEFING_STATE.projectSupport,
    contactName: readText(form, "contactName"),
    contactEmail: readText(form, "contactEmail"),
    contactPhone: readText(form, "contactPhone"),
    notes: readText(form, "notes"),
  };
}
