import { NextRequest } from "next/server";
import { getAuthUser, requireWorkspaceAccess } from "@/lib/auth";
import {
  getWorkspaceAutomations,
  createAutomation,
} from "@/modules/automations/service";
import { createAutomationSchema } from "@/modules/automations/validators";
import { apiError, apiSuccess } from "@/lib/utils";

// GET /api/automations?workspaceId=xxx
export async function GET(req: NextRequest) {
  try {
    await getAuthUser();
    const workspaceId = req.nextUrl.searchParams.get("workspaceId");
    if (!workspaceId) return apiError("workspaceId is required", 400);

    const automations = await getWorkspaceAutomations(workspaceId);
    return apiSuccess(automations);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError("Internal server error", 500);
  }
}

// POST /api/automations
export async function POST(req: NextRequest) {
  try {
    await getAuthUser();
    const body = await req.json();
    const { workspaceId, ...rest } = body;

    if (!workspaceId) return apiError("workspaceId is required", 400);
    await requireWorkspaceAccess(workspaceId);

    const parsed = createAutomationSchema.safeParse(rest);
    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Validation error", 400);
    }

    const automation = await createAutomation(workspaceId, parsed.data);
    return apiSuccess(automation, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError("Internal server error", 500);
  }
}
