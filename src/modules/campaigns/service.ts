import { prisma } from "@/lib/prisma";
import type { CreateCampaignInput, UpdateCampaignInput } from "./validators";

// ============================================================
// Campaign Service
// ============================================================

export async function getWorkspaceCampaigns(workspaceId: string) {
  return prisma.campaign.findMany({
    where: { workspaceId, deletedAt: null },
    include: {
      _count: { select: { adSets: true } },
      insights: {
        orderBy: { date: "desc" },
        take: 7,
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCampaignById(id: string, workspaceId: string) {
  return prisma.campaign.findFirst({
    where: { id, workspaceId, deletedAt: null },
    include: {
      adSets: {
        where: { deletedAt: null },
        include: {
          ads: { where: { deletedAt: null } },
        },
      },
      insights: {
        orderBy: { date: "desc" },
        take: 30,
      },
    },
  });
}

export async function createCampaign(
  workspaceId: string,
  input: CreateCampaignInput
) {
  return prisma.campaign.create({
    data: {
      ...input,
      workspaceId,
      startDate: input.startDate ? new Date(input.startDate) : undefined,
      endDate: input.endDate ? new Date(input.endDate) : undefined,
    },
  });
}

export async function updateCampaign(id: string, input: UpdateCampaignInput) {
  return prisma.campaign.update({
    where: { id },
    data: {
      ...input,
      startDate: input.startDate ? new Date(input.startDate) : undefined,
      endDate: input.endDate ? new Date(input.endDate) : undefined,
    },
  });
}

export async function softDeleteCampaign(id: string) {
  return prisma.campaign.update({
    where: { id },
    data: { deletedAt: new Date(), status: "DELETED" },
  });
}

export async function getDashboardMetrics(workspaceId: string) {
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const insights = await prisma.campaignInsight.findMany({
    where: {
      campaign: { workspaceId, deletedAt: null },
      date: { gte: last30Days },
    },
  });

  const totals = insights.reduce(
    (acc, i) => ({
      spend: acc.spend + i.spend,
      leads: acc.leads + i.leads,
      purchases: acc.purchases + i.purchases,
      revenue: acc.revenue + i.revenue,
      impressions: acc.impressions + i.impressions,
      clicks: acc.clicks + i.clicks,
    }),
    { spend: 0, leads: 0, purchases: 0, revenue: 0, impressions: 0, clicks: 0 }
  );

  const cpa = totals.leads > 0 ? totals.spend / totals.leads : 0;
  const roas = totals.spend > 0 ? totals.revenue / totals.spend : 0;

  const activeCampaigns = await prisma.campaign.count({
    where: { workspaceId, status: "ACTIVE", deletedAt: null },
  });

  return { ...totals, cpa, roas, activeCampaigns };
}
