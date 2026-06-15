"use client";

import { Plus, Building2, Users, Megaphone, ArrowRight } from "lucide-react";
import { useWorkspace } from "@/hooks/useWorkspace";
import { formatDate } from "@/lib/utils";

export default function WorkspacesPage() {
  const { workspaces, activeWorkspace, setActiveWorkspace, isLoading } =
    useWorkspace();

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Workspaces</h1>
          <p className="text-sm text-zinc-500 mt-0.5">
            Cada workspace representa um cliente ou projeto
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Novo Workspace
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-zinc-900 border border-zinc-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : workspaces.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-zinc-600" />
          </div>
          <p className="text-zinc-400 font-medium">Nenhum workspace ainda</p>
          <p className="text-sm text-zinc-600 mt-1">
            Crie seu primeiro workspace para começar
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {workspaces.map((ws) => (
            <div
              key={ws.id}
              onClick={() => setActiveWorkspace(ws)}
              className={`relative group bg-zinc-900 border rounded-xl p-5 cursor-pointer transition-all hover:border-zinc-600 ${
                activeWorkspace?.id === ws.id
                  ? "border-violet-500/50 ring-1 ring-violet-500/20"
                  : "border-zinc-800"
              }`}
            >
              {activeWorkspace?.id === ws.id && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-violet-500" />
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400 font-bold text-sm">
                  {ws.name[0]?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">
                    {ws.name}
                  </h3>
                  <p className="text-xs text-zinc-600">/{ws.slug}</p>
                </div>
              </div>

              {ws.description && (
                <p className="text-xs text-zinc-500 mb-4 line-clamp-2">
                  {ws.description}
                </p>
              )}

              <div className="flex items-center justify-between text-xs text-zinc-600">
                <span>Criado em {formatDate(ws.createdAt)}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
