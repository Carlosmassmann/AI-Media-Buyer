import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string().min(2).max(100),
  objective: z.enum([
    "AWARENESS",
    "TRAFFIC",
    "ENGAGEMENT",
    "LEADS",
    "APP_PROMOTION",
    "SALES",
  ]),
  dailyBudget: z.number().positive().optional(),
  lifetimeBudget: z.number().positive().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  metaAccountId: z.string().optional(),
});

export const updateCampaignSchema = createCampaignSchema.partial().extend({
  status: z
    .enum(["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"])
    .optional(),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;
