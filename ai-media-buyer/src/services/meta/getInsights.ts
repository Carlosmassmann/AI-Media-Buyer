import type { MetaInsights } from "@/types/meta";
import { META_CONFIG, META_INSIGHTS_FIELDS } from "@/config/meta";

// ============================================================
// Meta Ads — Get Campaign Insights
// ============================================================

export interface GetInsightsParams {
  campaignId: string;
  dateStart: string; // YYYY-MM-DD
  dateEnd: string;
  accessToken?: string;
}

export interface GetInsightsResult {
  success: boolean;
  insights?: MetaInsights[];
  error?: string;
}

// Mock data generator for development
function generateMockInsights(
  campaignId: string,
  dateStart: string,
  dateEnd: string
): MetaInsights[] {
  const insights: MetaInsights[] = [];
  const start = new Date(dateStart);
  const end = new Date(dateEnd);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const spend = Math.random() * 300 + 50;
    const impressions = Math.floor(Math.random() * 10000 + 2000);
    const clicks = Math.floor(impressions * (Math.random() * 0.03 + 0.01));
    const leads = Math.floor(clicks * (Math.random() * 0.1 + 0.05));
    const purchases = Math.floor(leads * (Math.random() * 0.3 + 0.1));
    const revenue = purchases * (Math.random() * 200 + 100);

    insights.push({
      campaign_id: campaignId,
      date_start: d.toISOString().split("T")[0],
      date_stop: d.toISOString().split("T")[0],
      impressions: String(impressions),
      clicks: String(clicks),
      spend: spend.toFixed(2),
      reach: String(Math.floor(impressions * 0.8)),
      frequency: (impressions / (impressions * 0.8)).toFixed(2),
      ctr: ((clicks / impressions) * 100).toFixed(2),
      cpc: (spend / clicks).toFixed(2),
      cpm: ((spend / impressions) * 1000).toFixed(2),
      actions: [
        { action_type: "lead", value: String(leads) },
        { action_type: "purchase", value: String(purchases) },
      ],
      purchase_roas: [
        { action_type: "omni_purchase", value: (revenue / spend).toFixed(2) },
      ],
    });
  }

  return insights;
}

export async function getMetaCampaignInsights(
  params: GetInsightsParams
): Promise<GetInsightsResult> {
  // --- MOCK ---
  if (process.env.NODE_ENV === "development" || !META_CONFIG.accessToken) {
    await new Promise((r) => setTimeout(r, 400));
    const insights = generateMockInsights(
      params.campaignId,
      params.dateStart,
      params.dateEnd
    );
    console.log(`[META MOCK] getInsights: ${insights.length} days`);
    return { success: true, insights };
  }

  // --- REAL (Phase 2) ---
  try {
    const token = params.accessToken ?? META_CONFIG.accessToken;
    const fields = META_INSIGHTS_FIELDS.join(",");
    const url = new URL(
      `${META_CONFIG.baseUrl}/${META_CONFIG.apiVersion}/${params.campaignId}/insights`
    );
    url.searchParams.set("fields", fields);
    url.searchParams.set("time_range", JSON.stringify({
      since: params.dateStart,
      until: params.dateEnd,
    }));
    url.searchParams.set("time_increment", "1");
    url.searchParams.set("access_token", token);

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error?.message };
    }

    return { success: true, insights: data.data as MetaInsights[] };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
