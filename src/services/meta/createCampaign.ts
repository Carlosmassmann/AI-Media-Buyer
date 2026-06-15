import type { CreateMetaCampaignPayload, MetaCampaign } from "@/types/meta";
import { META_CONFIG } from "@/config/meta";

// ============================================================
// Meta Ads — Create Campaign
// ============================================================

export interface CreateCampaignResult {
  success: boolean;
  campaign?: MetaCampaign;
  error?: string;
}

/**
 * Creates a campaign on Meta Ads API.
 * Phase 1: Mock implementation
 * Phase 2: Replace with real API call
 */
export async function createMetaCampaign(
  adAccountId: string,
  payload: CreateMetaCampaignPayload,
  accessToken?: string
): Promise<CreateCampaignResult> {
  // --- MOCK IMPLEMENTATION ---
  if (process.env.NODE_ENV === "development" || !META_CONFIG.accessToken) {
    await simulateDelay(500);
    const mockCampaign: MetaCampaign = {
      id: `mock_${Date.now()}`,
      name: payload.name,
      objective: payload.objective,
      status: payload.status ?? "PAUSED",
      daily_budget: payload.daily_budget?.toString(),
      account_id: adAccountId,
    };
    console.log("[META MOCK] createCampaign:", mockCampaign);
    return { success: true, campaign: mockCampaign };
  }

  // --- REAL IMPLEMENTATION (Phase 2) ---
  try {
    const token = accessToken ?? META_CONFIG.accessToken;
    const url = `${META_CONFIG.baseUrl}/${META_CONFIG.apiVersion}/act_${adAccountId}/campaigns`;

    const body = new URLSearchParams({
      name: payload.name,
      objective: payload.objective,
      status: payload.status ?? "PAUSED",
      special_ad_categories: JSON.stringify(payload.special_ad_categories ?? []),
      access_token: token,
    });

    if (payload.daily_budget) {
      body.set("daily_budget", String(payload.daily_budget * 100)); // Meta uses cents
    }

    const response = await fetch(url, { method: "POST", body });
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error?.message ?? "Meta API error" };
    }

    return { success: true, campaign: data as MetaCampaign };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
