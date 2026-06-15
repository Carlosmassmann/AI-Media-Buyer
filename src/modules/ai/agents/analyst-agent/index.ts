import getOpenAI from "@/lib/openai";
import { SYSTEM_PROMPTS, AI_CONFIG } from "@/config/ai";
import type { IAgent, AgentInput, AgentOutput } from "../../types";
import type { CampaignInsight } from "@/types/campaign";

// ============================================================
// Analyst Agent — Metrics Analysis & Optimization
// ============================================================

export class AnalystAgent implements IAgent {
  name = "Analyst Agent";
  description =
    "Analisa métricas de performance e gera recomendações de otimização";

  async run(input: AgentInput): Promise<AgentOutput> {
    const completion = await getOpenAI().chat.completions.create({
      model: AI_CONFIG.model,
      temperature: 0.3,
      max_tokens: 2048,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.analyst },
        { role: "user", content: input.userMessage },
      ],
    });

    const content = completion.choices[0]?.message?.content ?? "";
    return {
      content,
      actions: [],
      tokensUsed: completion.usage?.total_tokens,
      metadata: { agentName: this.name },
    };
  }

  async analyzeInsights(insights: CampaignInsight[]): Promise<string> {
    if (insights.length === 0) return "Sem dados suficientes para análise.";

    const avg = insights.reduce(
      (acc, i) => ({
        cpa: acc.cpa + i.cpa / insights.length,
        roas: acc.roas + i.roas / insights.length,
        ctr: acc.ctr + i.ctr / insights.length,
        spend: acc.spend + i.spend,
      }),
      { cpa: 0, roas: 0, ctr: 0, spend: 0 }
    );

    const prompt = `Analise as seguintes métricas de campanha Meta Ads:
CPA médio: R$ ${avg.cpa.toFixed(2)}
ROAS médio: ${avg.roas.toFixed(2)}x
CTR médio: ${avg.ctr.toFixed(2)}%
Gasto total: R$ ${avg.spend.toFixed(2)}

Forneça 3 recomendações específicas de otimização.`;

    const completion = await getOpenAI().chat.completions.create({
      model: AI_CONFIG.model,
      temperature: 0.3,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.analyst },
        { role: "user", content: prompt },
      ],
    });

    return completion.choices[0]?.message?.content ?? "";
  }
}

export const analystAgent = new AnalystAgent();
