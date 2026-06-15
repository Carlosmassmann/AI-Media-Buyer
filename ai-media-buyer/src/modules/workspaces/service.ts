import { prisma } from "@/lib/prisma";
import type { CreateWorkspaceInput, UpdateWorkspaceInput } from "./validators";

// ============================================================
// Workspace Service
// ============================================================

export async function getUserWorkspaces(userId: string) {
  return prisma.workspace.findMany({
    where: {
      members: { some: { userId } },
      deletedAt: null,
    },
    include: {
      _count: {
        select: {
          campaigns: true,
          automations: true,
          chatSessions: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getWorkspaceById(workspaceId: string, userId: string) {
  return prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      members: { some: { userId } },
      deletedAt: null,
    },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, name: true, email: true, avatarUrl: true },
          },
        },
      },
      metaAccounts: true,
      _count: {
        select: { campaigns: true, automations: true },
      },
    },
  });
}

export async function createWorkspace(
  userId: string,
  input: CreateWorkspaceInput
) {
  return prisma.workspace.create({
    data: {
      ...input,
      ownerId: userId,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
  });
}

export async function updateWorkspace(
  workspaceId: string,
  input: UpdateWorkspaceInput
) {
  return prisma.workspace.update({
    where: { id: workspaceId },
    data: input,
  });
}

export async function softDeleteWorkspace(workspaceId: string) {
  return prisma.workspace.update({
    where: { id: workspaceId },
    data: { deletedAt: new Date(), isActive: false },
  });
}
