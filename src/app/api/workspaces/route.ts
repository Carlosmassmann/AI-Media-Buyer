import { NextRequest } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import { getUserWorkspaces, createWorkspace } from "@/modules/workspaces/service";
import { createWorkspaceSchema } from "@/modules/workspaces/validators";
import { apiError, apiSuccess } from "@/lib/utils";

// GET /api/workspaces
export async function GET() {
  try {
    const user = await getAuthUser();
    const workspaces = await getUserWorkspaces(user.id);
    return apiSuccess(workspaces);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    console.error("[GET /api/workspaces]", error);
    return apiError("Internal server error", 500);
  }
}

// POST /api/workspaces
export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    const body = await req.json();

    const parsed = createWorkspaceSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Validation error", 400);
    }

    const workspace = await createWorkspace(user.id, parsed.data);
    return apiSuccess(workspace, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    console.error("[POST /api/workspaces]", error);
    return apiError("Internal server error", 500);
  }
}
