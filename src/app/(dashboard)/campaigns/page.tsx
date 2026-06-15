import { Megaphone, Plus, TrendingUp, TrendingDown, Pause, Play } from "lucide-react";
import Link from "next/link";

const MOCK_CAMPAIGNS = [
  {
    id: "1",
    name: "Black Friday — Conversões",
    objective: "SALES",
    status: "ACTIVE",
    dailyBudget: 500,
    spend: 12400,
    leads: 0,
    roas: 5.1,
    cpa: 0,
    ctr: 2.4,
  },
  {
    id: "2",
    name: "Geração de Leads — Produto X",
    objective: "LEADS",
    status: "ACTIVE",
    dailyBudget: 300,
    spend: 8200,
    leads: 253,
    roas: 0,
    cpa: 32.4,
    ctr: 1.8,
  },
  {
    id: "3",
    name: "Remarketing — Carrinho Abandonado",
    objective: "SALES",
    status: "PAUSED",
    dailyBudget: 150,
    spend: 3100,
    leads: 0,
    roas: 3.8,
    cpa: 0,
    ctr: 4.1,
  },
  {
    id: "4",
    name: "Tráfego — Blog",
    objective: "TRAFFIC",
    status: "ACTIVE",
    dailyBudget: 80,
    spend: 1200,
    leads: 0,
    roas: 0,
    cpa: 0,
    ctr: 3.2,
  },
];

const STATUS_BADGE = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  PAUSED: "bg-zinc-700/30 text-zinc-400 border-zinc-700",
  DRAFT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const STATUS_LABEL = {
  ACTIVE: "Ativa",
  PAUSED: "Pausada",
  DRAFT: "Rascunho",
};

export default function CampaignsPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Campanhas</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            {MOCK_CAMPAIGNS.length} campanhas no workspace
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Nova Campanha
        </button>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-5 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Campanha
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Gasto
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  ROAS / CPA
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  CTR
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {MOCK_CAMPAIGNS.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800">
                        <Megaphone className="w-3.5 h-3.5 text-zinc-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-200">
                          {campaign.name}
                        </p>
                        <p className="text-xs text-zinc-600 mt-0.5">
                          R$ {campaign.dailyBudget}/dia
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
                        STATUS_BADGE[campaign.status as keyof typeof STATUS_BADGE]
                      }`}
                    >
                      {STATUS_LABEL[campaign.status as keyof typeof STATUS_LABEL]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm text-zinc-300">
                      R$ {campaign.spend.toLocaleString("pt-BR")}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    {campaign.roas > 0 ? (
                      <span className="text-sm text-emerald-400 font-medium">
                        {campaign.roas}x
                      </span>
                    ) : campaign.cpa > 0 ? (
                      <span className="text-sm text-amber-400 font-medium">
                        R$ {campaign.cpa}
                      </span>
                    ) : (
                      <span className="text-sm text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="text-sm text-zinc-400">{campaign.ctr}%</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-md text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800 transition-colors">
                        {campaign.status === "ACTIVE" ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button className="p-1.5 rounded-md text-zinc-600 hover:text-violet-400 hover:bg-zinc-800 transition-colors">
                        <TrendingUp className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
