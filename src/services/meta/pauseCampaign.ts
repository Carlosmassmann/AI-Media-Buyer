import { META_CONFIG } from "@/config/meta";

// ============================================================
// Meta Ads — Pause / Resume Campaign
// ============================================================

export interface PauseCampaignResult {
  success: boolean;
  campaignId: string;
  newStatus: "ACTIVE" | "PAUSED";
  error?: string;
}

export async function pauseMetaCampaign(
  campaignId: string,
  accessToken?: string
): Promise<PauseCampaignResult> {
  return setMetaCampaignStatus(campaignId, "PAUSED", accessToken);
}

export async function resumeMetaCampaign(
  campaignId: string,
  accessToken?: string
): Promise<PauseCampaignResult> {
  return setMetaCampaignStatus(campaignId, "ACTIVE", accessToken);
}

async function setMetaCampaignStatus(
  campaignId: string,
  status: "ACTIVE" | "PAUSED",
  accessToken?: string
): Promise<PauseCampaignResult> {
  // --- MOCK ---
  if (process.env.NODE_ENV === "development" || !META_CONFIG.accessToken) {
    await new Promise((r) => setTimeout(r, 200));
    console.log("[META MOCK] setCampaignStatus:", campaignId, status);
    return { success: true, campaignId, newStatus: status };
  }

  // --- REAL (Phase 2) ---
  try {
    const token = accessToken ?? META_CONFIG.accessToken;
    const url = `${META_CONFIG.baseUrl}/${META_CONFIG.apiVersion}/${campaignId}`;
    const body = new URLSearchParams({ status, access_token: token });

    const response = await fetch(url, { method: "POST", body });
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        campaignId,
        newStatus: status === "PAUSED" ? "ACTIVE" : "PAUSED",
        error: data.error?.message,
      };
    }
    return { success: true, campaignId, newStatus: status };
  } catch (error) {
    return {
      success: false,
      campaignId,
      newStatus: status === "PAUSED" ? "ACTIVE" : "PAUSED",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
