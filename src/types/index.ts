// ============================================================
// AI MEDIA BUYER — Global Types
// ============================================================

export type { Workspace, WorkspaceWithMeta } from "./workspace";
export type { Campaign, AdSet, Ad, CampaignInsight } from "./campaign";
export type { ChatSession, ChatMessage } from "./chat";
export type { MetaAccount, MetaCampaign, MetaInsights } from "./meta";
export type { AutomationRule, AutomationExecution } from "./automation";

// ============================================================
// Shared Utility Types
// ============================================================

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}

export type SortOrder = "asc" | "desc";

export interface SortParams {
  field: string;
  order: SortOrder;
}
