"use client";

import { useEffect, useRef } from "react";
import { Bot, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils";
import { useChatStore } from "@/store/chatStore";
import type { ChatMessage } from "@/types/chat";

interface ChatWindowProps {
  messages: ChatMessage[];
  isStreaming?: boolean;
}

export function ChatWindow({ messages, isStreaming = false }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return <ChatEmptyState />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isStreaming && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "USER";

  return (
    <div
      className={cn(
        "flex gap-3 max-w-3xl animate-fade-in",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex items-center justify-center w-7 h-7 rounded-full shrink-0 mt-0.5",
          isUser
            ? "bg-violet-600 text-white"
            : "bg-zinc-800 text-zinc-300 border border-zinc-700"
        )}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      {/* Content */}
      <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-violet-600 text-white rounded-tr-sm"
              : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-sm"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-zinc-600 px-1">
          {formatDateTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-3xl animate-fade-in">
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700">
        <Bot className="w-3.5 h-3.5 text-zinc-300" />
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1 items-center">
          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}

function ChatEmptyState() {
  const suggestions = [
    "Crie uma campanha de leads para meu produto",
    "Analise o desempenho das minhas campanhas",
    "Sugira otimizações para reduzir o CPA",
    "Escreva copies para meu anúncio",
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600/10 border border-violet-500/20 mb-5">
        <Bot className="w-7 h-7 text-violet-400" />
      </div>
      <h2 className="text-lg font-semibold text-zinc-200 mb-1">
        Como posso ajudar?
      </h2>
      <p className="text-sm text-zinc-500 text-center mb-8 max-w-sm">
        Sou seu assistente especializado em Meta Ads. Posso criar campanhas,
        analisar métricas e otimizar seus resultados.
      </p>
      <div className="grid grid-cols-2 gap-2 w-full max-w-md">
        {suggestions.map((s) => (
          <button
            key={s}
            className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-400 hover:text-zinc-200 text-left transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
