// ============================================================
// App Configuration
// ============================================================

export const APP_CONFIG = {
  name: "AI Media Buyer",
  description: "Plataforma SaaS de gerenciamento de Meta Ads com IA",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  version: "0.1.0",
} as const;

export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const;

export const LIMITS = {
  maxWorkspacesPerUser: 10,
  maxCampaignsPerWorkspace: 500,
  maxAutomationRulesPerWorkspace: 50,
  maxChatMessagesPerSession: 200,
} as const;

export const NAVIGATION = [
  {
    label: "Dashboard",
    href: "/",
    icon: "LayoutDashboard",
  },
  {
    label: "Workspaces",
    href: "/workspaces",
    icon: "Building2",
  },
  {
    label: "Chat IA",
    href: "/chat",
    icon: "MessageSquare",
  },
  {
    label: "Campanhas",
    href: "/campaigns",
    icon: "Megaphone",
  },
  {
    label: "Automações",
    href: "/automations",
    icon: "Zap",
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: "Settings",
  },
] as const;
