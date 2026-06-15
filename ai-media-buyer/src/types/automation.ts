import type {
  AutomationStatus,
  AutomationTriggerType,
  AutomationActionType,
} from "@prisma/client";

export interface AutomationRule {
  id: string;
  name: string;
  description: string | null;
  status: AutomationStatus;
  triggerType: AutomationTriggerType;
  triggerValue: number;
  actionType: AutomationActionType;
  actionValue: number | null;
  checkInterval: number;
  lastRunAt: Date | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AutomationExecution {
  id: string;
  success: boolean;
  message: string | null;
  payload: Record<string, unknown> | null;
  executedAt: Date;
  ruleId: string;
}

export interface AutomationRuleWithExecutions extends AutomationRule {
  executions: AutomationExecution[];
}

export interface CreateAutomationRuleInput {
  name: string;
  description?: string;
  triggerType: AutomationTriggerType;
  triggerValue: number;
  actionType: AutomationActionType;
  actionValue?: number;
  checkInterval?: number;
}

// Human-readable trigger/action labels
export const TRIGGER_LABELS: Record<AutomationTriggerType, string> = {
  CPA_EXCEEDS: "CPA ultrapassa",
  ROAS_BELOW: "ROAS abaixo de",
  ROAS_EXCEEDS: "ROAS acima de",
  SPEND_EXCEEDS: "Gasto ultrapassa",
  CTR_BELOW: "CTR abaixo de",
  IMPRESSIONS_BELOW: "Impressões abaixo de",
  SCHEDULE: "Agendamento",
};

export const ACTION_LABELS: Record<AutomationActionType, string> = {
  PAUSE_CAMPAIGN: "Pausar campanha",
  ENABLE_CAMPAIGN: "Ativar campanha",
  INCREASE_BUDGET: "Aumentar orçamento em",
  DECREASE_BUDGET: "Reduzir orçamento em",
  SEND_NOTIFICATION: "Enviar notificação",
  CREATE_REPORT: "Gerar relatório",
};
