import type { ChatRole } from "@prisma/client";

export interface ChatSession {
  id: string;
  title: string;
  isActive: boolean;
  userId: string;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  metadata: Record<string, unknown> | null;
  tokens: number | null;
  sessionId: string;
  createdAt: Date;
}

export interface ChatSessionWithMessages extends ChatSession {
  messages: ChatMessage[];
}

export interface SendMessageInput {
  sessionId: string;
  content: string;
}

export interface CreateSessionInput {
  workspaceId: string;
  title?: string;
}
