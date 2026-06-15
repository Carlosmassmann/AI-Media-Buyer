// ============================================================
// Meta Ads API Types
// ============================================================

export interface MetaAccount {
  id: string;
  accountId: string;
  accountName: string;
  status: "ACTIVE" | "DISCONNECTED" | "PENDING" | "ERROR";
  currency: string;
  timezone: string;
  workspaceId: string;
  createdAt: Date;
}

export interface MetaCampaign {
  id: string;
  name: string;
  objective: string;
  status: string;
  daily_budget?: string;
  lifetime_budget?: string;
  start_time?: string;
  stop_time?: string;
  account_id: string;
}

export interface MetaAdSet {
  id: string;
  name: string;
  campaign_id: string;
  status: string;
  daily_budget?: string;
  targeting?: MetaTargeting;
  optimization_goal?: string;
  bid_amount?: string;
}

export interface MetaAd {
  id: string;
  name: string;
  adset_id: string;
  status: string;
  creative?: MetaAdCreative;
}

export interface MetaAdCreative {
  id: string;
  name: string;
  title?: string;
  body?: string;
  call_to_action_type?: string;
  image_url?: string;
  link_url?: string;
}

export interface MetaTargeting {
  age_min?: number;
  age_max?: number;
  genders?: number[];
  geo_locations?: {
    countries?: string[];
    cities?: Array<{ key: string; name: string }>;
  };
  interests?: Array<{ id: string; name: string }>;
  behaviors?: Array<{ id: string; name: string }>;
}

export interface MetaInsights {
  campaign_id?: string;
  adset_id?: string;
  ad_id?: string;
  date_start: string;
  date_stop: string;
  impressions: string;
  clicks: string;
  spend: string;
  reach: string;
  ctr: string;
  cpc: string;
  cpm: string;
  frequency: string;
  actions?: Array<{ action_type: string; value: string }>;
  cost_per_action_type?: Array<{ action_type: string; value: string }>;
  purchase_roas?: Array<{ action_type: string; value: string }>;
}

export interface MetaApiError {
  message: string;
  type: string;
  code: number;
  fbtrace_id: string;
}

export interface CreateMetaCampaignPayload {
  name: string;
  objective: string;
  status?: string;
  special_ad_categories?: string[];
  daily_budget?: number;
  lifetime_budget?: number;
  start_time?: string;
  stop_time?: string;
}
