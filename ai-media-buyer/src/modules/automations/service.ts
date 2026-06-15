import { prisma } from "@/lib/prisma";
import type { CreateAutomationInput, UpdateAutomationInput } from "./validators";

// ============================================================
// Automation Service
// ============================================================

export async function getWorkspaceAutomations(workspaceId: string) {
  return prisma.automationRule.findMany({
    where: { workspaceId },
    include: {
      _count: { select: { executions: true } },
      executions: {
        orderBy: { executedAt: "desc" },
        take: 5,
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAutomationById(id: string, workspaceId: string) {
  return prisma.automationRule.findFirst({
    where: { id, workspaceId },
    include: {
      executions: {
        orderBy: { executedAt: "desc" },
        take: 20,
      },
    },
  });
}

export async function createAutomation(
  workspaceId: string,
  input: CreateAutomationInput
) {
  return prisma.automationRule.create({
    data: { ...input, workspaceId },
  });
}

export async function updateAutomation(id: string, input: UpdateAutomationInput) {
  return prisma.automationRule.update({
    where: { id },
    data: input,
  });
}

export async function deleteAutomation(id: string) {
  return prisma.automationRule.delete({ where: { id } });
}

export async function logExecution(
  ruleId: string,
  success: boolean,
  message?: string,
  payload?: Record<string, unknown>
) {
  return prisma.automationExecution.create({
    data: { ruleId, success, message, payload },
  });
}
