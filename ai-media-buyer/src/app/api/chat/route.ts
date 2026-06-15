import { NextRequest } from "next/server";
import { getAuthUser } from "@/lib/auth";
import {
  getChatSessions,
  createChatSession,
} from "@/modules/chat/service";
import { apiError, apiSuccess } from "@/lib/utils";
import { z } from "zod";

const createSessionSchema = z.object({
  workspaceId: z.string().min(1),
  title: z.string().optional(),
});

// GET /api/chat?workspaceId=xxx
export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser();
    const workspaceId = req.nextUrl.searchParams.get("workspaceId");

    if (!workspaceId) return apiError("workspaceId is required", 400);

    const sessions = await getChatSessions(user.id, workspaceId);
    return apiSuccess(sessions);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError("Internal server error", 500);
  }
}

// POST /api/chat
export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    const body = await req.json();

    const parsed = createSessionSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Validation error", 400);
    }

    const session = await createChatSession(
      user.id,
      parsed.data.workspaceId,
      parsed.data.title
    );
    return apiSuccess(session, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError("Internal server error", 500);
  }
}
