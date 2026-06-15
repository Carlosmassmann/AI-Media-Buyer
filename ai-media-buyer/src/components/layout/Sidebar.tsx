"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Megaphone,
  Zap,
  Settings,
  ChevronDown,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { APP_CONFIG } from "@/config/app";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Workspaces", href: "/workspaces", icon: Building2 },
  { label: "Chat IA", href: "/chat", icon: MessageSquare },
  { label: "Campanhas", href: "/campaigns", icon: Megaphone },
  { label: "Automações", href: "/automations", icon: Zap },
  { label: "Configurações", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { activeWorkspace, workspaces, setActiveWorkspace } =
    useWorkspaceStore();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-zinc-950 border-r border-zinc-800">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-zinc-800">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-white text-sm tracking-tight">
          {APP_CONFIG.name}
        </span>
      </div>

      {/* Workspace Selector */}
      <div className="px-3 py-3 border-b border-zinc-800">
        <div className="group relative">
          <button className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">
            <div className="w-5 h-5 rounded bg-violet-600/30 flex items-center justify-center text-violet-400 text-xs font-bold">
              {activeWorkspace?.name?.[0]?.toUpperCase() ?? "W"}
            </div>
            <span className="flex-1 text-left truncate text-xs font-medium">
              {activeWorkspace?.name ?? "Selecionar workspace"}
            </span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>

          {/* Dropdown (Phase 2: use Radix Select) */}
          {workspaces.length > 0 && (
            <div className="hidden group-focus-within:block absolute top-full left-0 right-0 mt-1 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 overflow-hidden">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => setActiveWorkspace(ws)}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-zinc-800 transition-colors",
                    activeWorkspace?.id === ws.id
                      ? "text-violet-400"
                      : "text-zinc-300"
                  )}
                >
                  <div className="w-4 h-4 rounded bg-violet-600/20 flex items-center justify-center text-violet-400 text-xs font-bold">
                    {ws.name[0]?.toUpperCase()}
                  </div>
                  <span className="truncate">{ws.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                isActive
                  ? "bg-violet-600/15 text-violet-400 font-medium"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0",
                  isActive ? "text-violet-400" : "text-zinc-500"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-600">v{APP_CONFIG.version} · MVP</p>
      </div>
    </aside>
  );
}
