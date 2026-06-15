import { Zap, Plus, CheckCircle, XCircle, Clock } from "lucide-react";
import { TRIGGER_LABELS, ACTION_LABELS } from "@/types/automation";

const MOCK_RULES = [
  {
    id: "1",
    name: "Pausar se CPA alto",
    status: "ACTIVE",
    triggerType: "CPA_EXCEEDS" as const,
    triggerValue: 80,
    actionType: "PAUSE_CAMPAIGN" as const,
    lastRunAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    executions: 3,
    lastSuccess: true,
  },
  {
    id: "2",
    name: "Escalar se ROAS alto",
    status: "ACTIVE",
    triggerType: "ROAS_EXCEEDS" as const,
    triggerValue: 5,
    actionType: "INCREASE_BUDGET" as const,
    actionValue: 20,
    lastRunAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    executions: 1,
    lastSuccess: true,
  },
  {
    id: "3",
    name: "Alerta ROAS baixo",
    status: "PAUSED",
    triggerType: "ROAS_BELOW" as const,
    triggerValue: 2,
    actionType: "SEND_NOTIFICATION" as const,
    lastRunAt: null,
    executions: 0,
    lastSuccess: null,
  },
];

const STATUS_STYLE = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  PAUSED: "bg-zinc-700/30 text-zinc-400 border-zinc-700",
  DRAFT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function AutomationsPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Automações</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            Regras automáticas para suas campanhas
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Nova Regra
        </button>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-violet-600/10 border border-violet-500/20 rounded-xl p-4">
        <Zap className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-violet-300">Como funciona</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            Defina condições (gatilhos) e ações automáticas. Ex: se CPA ultrapassar
            R$80, pausar campanha automaticamente.
          </p>
        </div>
      </div>

      {/* Rules */}
      <div className="space-y-3">
        {MOCK_RULES.map((rule) => (
          <div
            key={rule.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/10 border border-violet-500/20 shrink-0">
                  <Zap className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-zinc-200">
                      {rule.name}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
                        STATUS_STYLE[rule.status as keyof typeof STATUS_STYLE]
                      }`}
                    >
                      {rule.status === "ACTIVE" ? "Ativa" : "Pausada"}
                    </span>
                  </div>

                  {/* Trigger → Action */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md">
                      SE {TRIGGER_LABELS[rule.triggerType]} {rule.triggerValue}
                      {rule.triggerType.includes("ROAS") ? "x" : " R$"}
                    </span>
                    <span className="text-xs text-zinc-600">→</span>
                    <span className="text-xs bg-violet-600/10 text-violet-400 border border-violet-500/20 px-2 py-1 rounded-md">
                      {ACTION_LABELS[rule.actionType]}
                      {rule.actionValue ? ` ${rule.actionValue}%` : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Execution status */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                {rule.lastSuccess !== null ? (
                  <div className="flex items-center gap-1">
                    {rule.lastSuccess ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                    )}
                    <span className="text-xs text-zinc-500">
                      {rule.executions}x executada
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-600" />
                    <span className="text-xs text-zinc-600">Nunca executada</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
