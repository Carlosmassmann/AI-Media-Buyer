import { openai } from "@/lib/openai";
import { SYSTEM_PROMPTS, AI_CONFIG } from "@/config/ai";
import type { IAgent, AgentInput, AgentOutput } from "../../types";

// ============================================================
// Strategist Agent — Campaign Planning & Strategy
// ============================================================

export class StrategistAgent implements IAgent {
  name = "Strategist Agent";
  description =
    "Analisa objetivos de negócio e cria estratégias de campanha Meta Ads completas";

  async run(input: AgentInput): Promise<AgentOutput> {
    const completion = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      temperature: 0.6,
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.strategist,
        },
        {
          role: "user",
          content: input.userMessage,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content ?? "";
    const tokensUsed = completion.usage?.total_tokens;

    // TODO: Parse structured actions from content (Phase 2)
    return {
      content,
      actions: [],
      tokensUsed,
      metadata: { agentName: this.name },
    };
  }
}

export const strategistAgent = new StrategistAgent();
