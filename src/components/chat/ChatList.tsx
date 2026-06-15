"use client";

import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chatStore";
import { formatRelativeTime } from "@/lib/utils";

interface ChatListProps {
  onNewChat: () => void;
  onSelectSession: (sessionId: string) => void;
}

export function ChatList({ onNewChat, onSelectSession }: ChatListProps) {
  const { sessions, activeSession } = useChatStore();

  return (
    <div className="flex flex-col h-full w-64 bg-zinc-950 border-r border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-zinc-200">Conversas</h2>
        <button
          onClick={onNewChat}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-violet-600 hover:bg-violet-700 transition-colors text-white text-xs"
        >
          <Plus className="w-3 h-3" />
          Nova
        </button>
      </div>

      {/* Sessions list */}
      <div className="flex-1 overflow-y-auto py-2 space-y-0.5 px-2">
        {sessions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <MessageSquare className="w-8 h-8 text-zinc-700 mb-3" />
            <p className="text-xs text-zinc-500">Nenhuma conversa ainda</p>
            <button
              onClick={onNewChat}
              className="mt-3 text-xs text-violet-400 hover:text-violet-300"
            >
              Iniciar conversa
            </button>
          </div>
        )}

        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={cn(
              "group flex items-start gap-2 w-full px-3 py-2.5 rounded-lg text-left transition-colors",
              activeSession?.id === session.id
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
            )}
          >
            <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-600" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{session.title}</p>
              <p className="text-xs text-zinc-600 mt-0.5">
                {formatRelativeTime(session.updatedAt)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // TODO: delete session
              }}
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-red-400 transition-all"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}
