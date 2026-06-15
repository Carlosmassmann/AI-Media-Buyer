// ============================================================
// Meta Ads API Configuration
// ============================================================

export const META_CONFIG = {
  appId: process.env.META_APP_ID ?? "",
  appSecret: process.env.META_APP_SECRET ?? "",
  accessToken: process.env.META_ACCESS_TOKEN ?? "",
  apiVersion: process.env.META_API_VERSION ?? "v21.0",
  baseUrl: "https://graph.facebook.com",
} as const;

export const META_CAMPAIGN_OBJECTIVES = [
  { value: "AWARENESS", label: "Reconhecimento de Marca" },
  { value: "TRAFFIC", label: "Tráfego" },
  { value: "ENGAGEMENT", label: "Engajamento" },
  { value: "LEADS", label: "Geração de Leads" },
  { value: "APP_PROMOTION", label: "Promoção de App" },
  { value: "SALES", label: "Vendas" },
] as const;

export const META_OPTIMIZATION_GOALS = [
  { value: "LINK_CLICKS", label: "Cliques no link" },
  { value: "LANDING_PAGE_VIEWS", label: "Visualizações da página" },
  { value: "LEAD_GENERATION", label: "Geração de leads" },
  { value: "CONVERSIONS", label: "Conversões" },
  { value: "REACH", label: "Alcance" },
  { value: "IMPRESSIONS", label: "Impressões" },
] as const;

export const META_CALL_TO_ACTIONS = [
  "LEARN_MORE",
  "SHOP_NOW",
  "SIGN_UP",
  "DOWNLOAD",
  "GET_QUOTE",
  "CONTACT_US",
  "SUBSCRIBE",
  "BOOK_NOW",
] as const;

export const META_INSIGHTS_FIELDS = [
  "impressions",
  "clicks",
  "spend",
  "reach",
  "frequency",
  "ctr",
  "cpc",
  "cpm",
  "actions",
  "cost_per_action_type",
  "purchase_roas",
] as const;
