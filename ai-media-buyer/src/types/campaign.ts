import type { CampaignStatus, CampaignObjective, AdSetStatus, AdStatus } from "@prisma/client";

export interface Campaign {
  id: string;
  metaCampaignId: string | null;
  name: string;
  objective: CampaignObjective;
  status: CampaignStatus;
  dailyBudget: number | null;
  lifetimeBudget: number | null;
  startDate: Date | null;
  endDate: Date | null;
  workspaceId: string;
  metaAccountId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdSet {
  id: string;
  metaAdSetId: string | null;
  name: string;
  status: AdSetStatus;
  dailyBudget: number | null;
  targeting: Record<string, unknown> | null;
  campaignId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Ad {
  id: string;
  metaAdId: string | null;
  name: string;
  status: AdStatus;
  headline: string | null;
  body: string | null;
  callToAction: string | null;
  imageUrl: string | null;
  destinationUrl: string | null;
  adSetId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignInsight {
  id: string;
  date: Date;
  impressions: number;
  clicks: number;
  spend: number;
  leads: number;
  purchases: number;
  revenue: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
  reach: number;
  campaignId: string;
}

export interface CampaignWithInsights extends Campaign {
  insights: CampaignInsight[];
  adSets?: AdSet[];
}

export interface CreateCampaignInput {
  name: string;
  objective: CampaignObjective;
  dailyBudget?: number;
  lifetimeBudget?: number;
  startDate?: Date;
  endDate?: Date;
  metaAccountId?: string;
}
