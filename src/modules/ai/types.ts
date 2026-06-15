// ============================================================
// AI Agents — Shared Types & Contracts
// ============================================================

export interface AgentInput {
  workspaceId: string;
  sessionId?: string;
  userMessage: string;
  context?: Record<string, unknown>;
}

export interface AgentOutput {
  content: string;
  actions?: AgentAction[];
  metadata?: Record<string, unknown>;
  tokensUsed?: number;
}

export interface AgentAction {
  type: AgentActionType;
  payload: Record<string, unknown>;
  requiresConfirmation: boolean;
  description: string;
}

export type AgentActionType =
  | "CREATE_CAMPAIGN"
  | "UPDATE_CAMPAIGN"
  | "PAUSE_CAMPAIGN"
  | "SCALE_BUDGET"
  | "CREATE_ADSET"
  | "CREATE_AD"
  | "GENERATE_COPY"
  | "GENERATE_HEADLINE"
  | "ANALYZE_METRICS"
  | "CREATE_AUTOMATION"
  | "SEND_REPORT";

export interface AgentContext {
  workspaceName?: string;
  activeCampaigns?: Array<{ id: string; name: string; status: string }>;
  recentMetrics?: Record<string, number>;
  metaAccountConnected?: boolean;
}

export interface IAgent {
  name: string;
  description: string;
  run(input: AgentInput): Promise<AgentOutput>;
}
