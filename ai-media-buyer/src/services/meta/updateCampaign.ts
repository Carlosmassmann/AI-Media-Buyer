import { META_CONFIG } from "@/config/meta";

// ============================================================
// Meta Ads — Update Campaign
// ============================================================

export interface UpdateCampaignPayload {
  name?: string;
  status?: "ACTIVE" | "PAUSED";
  daily_budget?: number;
  lifetime_budget?: number;
}

export interface UpdateCampaignResult {
  success: boolean;
  campaignId?: string;
  error?: string;
}

export async function updateMetaCampaign(
  campaignId: string,
  payload: UpdateCampaignPayload,
  accessToken?: string
): Promise<UpdateCampaignResult> {
  // --- MOCK ---
  if (process.env.NODE_ENV === "development" || !META_CONFIG.accessToken) {
    await new Promise((r) => setTimeout(r, 300));
    console.log("[META MOCK] updateCampaign:", campaignId, payload);
    return { success: true, campaignId };
  }

  // --- REAL (Phase 2) ---
  try {
    const token = accessToken ?? META_CONFIG.accessToken;
    const url = `${META_CONFIG.baseUrl}/${META_CONFIG.apiVersion}/${campaignId}`;

    const body = new URLSearchParams({ access_token: token });
    if (payload.name) body.set("name", payload.name);
    if (payload.status) body.set("status", payload.status);
    if (payload.daily_budget)
      body.set("daily_budget", String(payload.daily_budget * 100));

    const response = await fetch(url, { method: "POST", body });
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error?.message };
    }
    return { success: true, campaignId };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
