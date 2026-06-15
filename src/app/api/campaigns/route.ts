import { NextRequest } from "next/server";
import { getAuthUser, requireWorkspaceAccess } from "@/lib/auth";
import {
  getWorkspaceCampaigns,
  createCampaign,
} from "@/modules/campaigns/service";
import { createCampaignSchema } from "@/modules/campaigns/validators";
import { apiError, apiSuccess } from "@/lib/utils";

// GET /api/campaigns?workspaceId=xxx
export async function GET(req: NextRequest) {
  try {
    await getAuthUser();
    const workspaceId = req.nextUrl.searchParams.get("workspaceId");
    if (!workspaceId) return apiError("workspaceId is required", 400);

    const campaigns = await getWorkspaceCampaigns(workspaceId);
    return apiSuccess(campaigns);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError("Internal server error", 500);
  }
}

// POST /api/campaigns
export async function POST(req: NextRequest) {
  try {
    await getAuthUser();
    const body = await req.json();
    const { workspaceId, ...rest } = body;

    if (!workspaceId) return apiError("workspaceId is required", 400);

    await requireWorkspaceAccess(workspaceId);

    const parsed = createCampaignSchema.safeParse(rest);
    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Validation error", 400);
    }

    const campaign = await createCampaign(workspaceId, parsed.data);
    return apiSuccess(campaign, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError("Internal server error", 500);
  }
}
