import { prisma } from "@/lib/prisma";
import getOpenAI from "@/lib/openai";
import { SYSTEM_PROMPTS, AI_CONFIG } from "@/config/ai";

// ============================================================
// Chat Service
// ============================================================

export async function getChatSessions(userId: string, workspaceId: string) {
  return prisma.chatSession.findMany({
    where: { userId, workspaceId },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });
}

export async function getChatSessionWithMessages(
  sessionId: string,
  userId: string
) {
  return prisma.chatSession.findFirst({
    where: { id: sessionId, userId },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        take: 200,
      },
    },
  });
}

export async function createChatSession(
  userId: string,
  workspaceId: string,
  title?: string
) {
  return prisma.chatSession.create({
    data: {
      userId,
      workspaceId,
      title: title ?? "Nova conversa",
    },
  });
}

export async function sendMessage(
  sessionId: string,
  content: string,
  userId: string
) {
  // Save user message
  await prisma.chatMessage.create({
    data: {
      sessionId,
      role: "USER",
      content,
    },
  });

  // Fetch history for context
  const history = await prisma.chatMessage.findMany({
    where: { sessionId },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  // Call OpenAI
  const completion = await getOpenAI().chat.completions.create({
    model: AI_CONFIG.model,
    max_tokens: AI_CONFIG.maxTokens,
    temperature: AI_CONFIG.temperature,
    messages: [
      { role: "system", content: SYSTEM_PROMPTS.base },
      ...history.map((m) => ({
        role: m.role.toLowerCase() as "user" | "assistant",
        content: m.content,
      })),
    ],
  });

  const assistantContent =
    completion.choices[0]?.message?.content ?? "Sem resposta.";
  const tokens = completion.usage?.total_tokens;

  // Save assistant message
  const assistantMessage = await prisma.chatMessage.create({
    data: {
      sessionId,
      role: "ASSISTANT",
      content: assistantContent,
      tokens,
    },
  });

  // Update session title from first user message
  const session = await prisma.chatSession.findUnique({
    where: { id: sessionId },
    include: { messages: { take: 1, orderBy: { createdAt: "asc" } } },
  });

  if (session?.title === "Nova conversa" && session.messages.length === 1) {
    const shortTitle = content.slice(0, 50) + (content.length > 50 ? "..." : "");
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { title: shortTitle },
    });
  }

  return assistantMessage;
}

export async function deleteChatSession(sessionId: string, userId: string) {
  return prisma.chatSession.deleteMany({
    where: { id: sessionId, userId },
  });
}
