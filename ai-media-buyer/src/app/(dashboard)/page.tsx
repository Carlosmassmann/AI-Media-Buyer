import {
  DollarSign,
  Users,
  TrendingDown,
  TrendingUp,
  Megaphone,
  ArrowRight,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { MetricCard } from "@/components/dashboard/MetricCard";

// Mock data — Phase 2: replace with real getDashboardMetrics()
const MOCK_METRICS = {
  spend: { value: "R$ 48.320", change: 12.4 },
  leads: { value: "1.284", change: 8.7 },
  cpa: { value: "R$ 37,63", change: -5.2 },
  roas: { value: "4.2x", change: 18.1 },
  activeCampaigns: 7,
};

const MOCK_CAMPAIGNS = [
  { id: "1", name: "Black Friday - Vendas", status: "ACTIVE", spend: 12400, roas: 5.1 },
  { id: "2", name: "Leads - Produto X", status: "ACTIVE", spend: 8200, roas: 0, cpa: 32.4 },
  { id: "3", name: "Remarketing - Carrinho", status: "PAUSED", spend: 3100, roas: 3.8 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Visão geral dos últimos 30 dias
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <MetricCard
          title="Investimento"
          value={MOCK_METRICS.spend.value}
          change={MOCK_METRICS.spend.change}
          icon={DollarSign}
          iconColor="text-emerald-400"
        />
        <MetricCard
          title="Leads"
          value={MOCK_METRICS.leads.value}
          change={MOCK_METRICS.leads.change}
          icon={Users}
          iconColor="text-blue-400"
        />
        <MetricCard
          title="CPA"
          value={MOCK_METRICS.cpa.value}
          change={MOCK_METRICS.cpa.change}
          icon={TrendingDown}
          iconColor="text-amber-400"
          description="Custo por aquisição"
        />
        <MetricCard
          title="ROAS"
          value={MOCK_METRICS.roas.value}
          change={MOCK_METRICS.roas.change}
          icon={TrendingUp}
          iconColor="text-violet-400"
          description="Retorno sobre investimento"
        />
        <MetricCard
          title="Campanhas Ativas"
          value={String(MOCK_METRICS.activeCampaigns)}
          icon={Megaphone}
          iconColor="text-pink-400"
        />
      </div>

      {/* Quick actions + Recent campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Campaigns */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-200">
              Campanhas Recentes
            </h2>
            <Link
              href="/campaigns"
              className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300"
            >
              Ver todas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-zinc-800">
            {MOCK_CAMPAIGNS.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      c.status === "ACTIVE"
                        ? "bg-emerald-400"
                        : "bg-zinc-600"
                    }`}
                  />
                  <span className="text-sm text-zinc-300">{c.name}</span>
                </div>
                <div className="flex items-center gap-6 text-xs text-zinc-500">
                  <span>R$ {c.spend.toLocaleString("pt-BR")}</span>
                  {c.roas > 0 ? (
                    <span className="text-emerald-400">{c.roas}x ROAS</span>
                  ) : (
                    <span className="text-amber-400">
                      R$ {c.cpa?.toFixed(2)} CPA
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-zinc-200 mb-4">
            Ações Rápidas
          </h2>
          <div className="space-y-2">
            {[
              { label: "Criar nova campanha", href: "/campaigns", icon: Megaphone },
              { label: "Abrir chat com IA", href: "/chat", icon: Activity },
              { label: "Nova automação", href: "/automations", icon: TrendingUp },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors group"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-md bg-zinc-800 group-hover:bg-violet-600/20 transition-colors">
                    <Icon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-violet-400" />
                  </div>
                  <span className="text-sm text-zinc-400 group-hover:text-zinc-200">
                    {action.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto text-zinc-700 group-hover:text-zinc-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
