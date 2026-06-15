import { NextRequest } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth";
import {
  getChatSessionWithMessages,
  sendMessage,
} from "@/modules/chat/service";
import { apiError, apiSuccess } from "@/lib/utils";

const sendMessageSchema = z.object({
  content: z.string().min(1).max(10000),
});

interface Params {
  params: Promise<{ id: string }>;
}

// GET /api/chat/[id]/messages
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const user = await getAuthUser();
    const { id } = await params;

    const session = await getChatSessionWithMessages(id, user.id);
    if (!session) return apiError("Session not found", 404);

    return apiSuccess(session.messages);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    return apiError("Internal server error", 500);
  }
}

// POST /api/chat/[id]/messages
export async function POST(req: NextRequest, { params }: Params) {
  try {
    const user = await getAuthUser();
    const { id } = await params;
    const body = await req.json();

    const parsed = sendMessageSchema.safeParse(body);
    if (!parsed.success) {
      return apiError(parsed.error.errors[0]?.message ?? "Validation error", 400);
    }

    const message = await sendMessage(id, parsed.data.content, user.id);
    return apiSuccess(message, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return apiError("Unauthorized", 401);
    }
    console.error("[POST /api/chat/[id]/messages]", error);
    return apiError("Internal server error", 500);
  }
}
