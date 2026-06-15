import { NextRequest } from "next/server";
import { requireWorkspaceAccess } from "@/lib/auth";
import {
  updateWorkspace,
  softDeleteWorkspace,
} from "@/modules/workspaces/service";
import { updateWorkspaceSchema } from "@/modules/workspaces/validators";
import { apiError, apiSuccess } from "@/lib/utils";

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/workspaces/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const { workspace } = await requireWorkspaceAccess(id);
    return apiSuccess(workspace);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") return apiError("Unauthorized", 401);
      if (error.message.includes("Forbidden")) return apiError("Forbidden", 403);
    }
    return apiError("Internal server error", 500);
  }
}

// PATCH /api/workspaces/[id]
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await requireWorkspaceAccess(id);
    const body = await req.json();

    const parsed = updateWorkspaceSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Validation error", 400);
    }

    const updated = await updateWorkspace(id, parsed.data);
    return apiSuccess(updated);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") return apiError("Unauthorized", 401);
      if (error.message.includes("Forbidden")) return apiError("Forbidden", 403);
    }
    return apiError("Internal server error", 500);
  }
}

// DELETE /api/workspaces/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const { member } = await requireWorkspaceAccess(id);

    if (member.role !== "OWNER") {
      return apiError("Only the owner can delete a workspace", 403);
    }

    await softDeleteWorkspace(id);
    return apiSuccess({ deleted: true });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Unauthorized") return apiError("Unauthorized", 401);
      if (error.message.includes("Forbidden")) return apiError("Forbidden", 403);
    }
    return apiError("Internal server error", 500);
  }
}
