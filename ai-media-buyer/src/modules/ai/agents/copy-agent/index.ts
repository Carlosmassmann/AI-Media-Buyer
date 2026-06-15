import getOpenAI from "@/lib/openai";
import { SYSTEM_PROMPTS, AI_CONFIG } from "@/config/ai";
import type { IAgent, AgentInput, AgentOutput } from "../../types";

// ============================================================
// Copy Agent — Ad Copywriting & Headlines
// ============================================================

export interface CopyGenerationOptions {
  tone?: "professional" | "casual" | "urgency" | "emotional";
  targetAudience?: string;
  product?: string;
  objective?: string;
  variations?: number;
}

export class CopyAgent implements IAgent {
  name = "Copy Agent";
  description =
    "Gera copies, headlines e CTAs persuasivos para anúncios Meta Ads";

  async run(input: AgentInput): Promise<AgentOutput> {
    const completion = await getOpenAI().chat.completions.create({
      model: AI_CONFIG.model,
      temperature: 0.9,
      max_tokens: 2048,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPTS.copywriter,
        },
        {
          role: "user",
          content: input.userMessage,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content ?? "";
    const tokensUsed = completion.usage?.total_tokens;

    return {
      content,
      actions: [
        {
          type: "GENERATE_COPY",
          payload: { content },
          requiresConfirmation: false,
          description: "Copies gerados pelo agente",
        },
      ],
      tokensUsed,
      metadata: { agentName: this.name },
    };
  }

  async generateHeadlines(
    product: string,
    audience: string,
    count = 5
  ): Promise<string[]> {
    const completion = await getOpenAI().chat.completions.create({
      model: AI_CONFIG.model,
      temperature: 0.9,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.copywriter },
        {
          role: "user",
          content: `Gere ${count} headlines para: Produto: ${product} | Público: ${audience}.
Responda APENAS com as headlines, uma por linha, sem numeração.`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "";
    return text.split("\n").filter(Boolean).slice(0, count);
  }
}

export const copyAgent = new CopyAgent();
