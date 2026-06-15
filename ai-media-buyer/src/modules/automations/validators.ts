import { z } from "zod";

export const createAutomationSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(300).optional(),
  triggerType: z.enum([
    "CPA_EXCEEDS",
    "ROAS_BELOW",
    "ROAS_EXCEEDS",
    "SPEND_EXCEEDS",
    "CTR_BELOW",
    "IMPRESSIONS_BELOW",
    "SCHEDULE",
  ]),
  triggerValue: z.number().positive(),
  actionType: z.enum([
    "PAUSE_CAMPAIGN",
    "ENABLE_CAMPAIGN",
    "INCREASE_BUDGET",
    "DECREASE_BUDGET",
    "SEND_NOTIFICATION",
    "CREATE_REPORT",
  ]),
  actionValue: z.number().optional(),
  checkInterval: z.number().int().min(5).max(1440).default(60),
});

export const updateAutomationSchema = createAutomationSchema.partial().extend({
  status: z.enum(["ACTIVE", "PAUSED", "DRAFT"]).optional(),
});

export type CreateAutomationInput = z.infer<typeof createAutomationSchema>;
export type UpdateAutomationInput = z.infer<typeof updateAutomationSchema>;
