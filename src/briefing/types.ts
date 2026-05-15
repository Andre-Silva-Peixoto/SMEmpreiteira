export type DemandType =
  | "new_build"
  | "expansion_reform"
  | "infrastructure"
  | "maintenance";

export type Segment =
  | "multifamily"
  | "commercial"
  | "industrial"
  | "institutional"
  | "civil_works";

export type Scale = "small" | "medium" | "large" | "xlarge";

export type AreaBand = "up_to_500" | "500_2000" | "2000_10000" | "over_10000";

export type ContractModel =
  | "full_contract"
  | "construction_management"
  | "labor_only"
  | "tbd";

export type Timeline =
  | "in_progress"
  | "urgent"
  | "short"
  | "medium"
  | "long";

export type SiteContext =
  | "access_ok"
  | "neighbor_restriction"
  | "hard_logistics"
  | "night_shifts";

export type ProjectSupport =
  | "has_executive"
  | "needs_interfaces"
  | "bid_in_review";

export interface BriefingState {
  demandType: DemandType;
  segment: Segment;
  scale: Scale;
  areaBand: AreaBand;
  contractModel: ContractModel;
  timeline: Timeline;
  siteContext: SiteContext;
  projectSupport: ProjectSupport;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
}

export const DEFAULT_BRIEFING_STATE: BriefingState = {
  demandType: "new_build",
  segment: "multifamily",
  scale: "medium",
  areaBand: "500_2000",
  contractModel: "full_contract",
  timeline: "medium",
  siteContext: "access_ok",
  projectSupport: "has_executive",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  notes: "",
};
