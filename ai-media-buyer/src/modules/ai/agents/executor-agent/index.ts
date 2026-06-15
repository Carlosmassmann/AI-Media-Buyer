import type { IAgent, AgentInput, AgentOutput, AgentAction } from "../../types";

// ============================================================
// Executor Agent — Executes actions on Meta Ads API
// ============================================================

export class ExecutorAgent implements IAgent {
  name = "Executor Agent";
  description =
    "Executa ações na Meta Ads API com base nas instruções dos outros agentes";

  async run(input: AgentInput): Promise<AgentOutput> {
    // Phase 2: Will interpret actions and execute via Meta API
    // For now, returns a structured confirmation request

    return {
      content: `Ação recebida para execução: "${input.userMessage}". Confirme para prosseguir.`,
      actions: [],
      metadata: {
        agentName: this.name,
        requiresHumanConfirmation: true,
      },
    };
  }

  /**
   * Execute a list of validated actions.
   * Each action must be confirmed before execution in Phase 2.
   */
  async executeActions(
    actions: AgentAction[],
    confirmed: boolean
  ): Promise<{ success: boolean; results: Array<{ action: string; result: string }> }> {
    if (!confirmed) {
      return {
        success: false,
        results: [{ action: "all", result: "Execução cancelada — confirmação necessária" }],
      };
    }

    // TODO: Implement actual Meta API calls in Phase 2
    const results = actions.map((action) => ({
      action: action.type,
      result: `[MOCK] Ação ${action.type} seria executada com payload: ${JSON.stringify(action.payload)}`,
    }));

    return { success: true, results };
  }
}

export const executorAgent = new ExecutorAgent();
