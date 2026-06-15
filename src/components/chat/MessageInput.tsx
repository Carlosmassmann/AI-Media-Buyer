"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, Loader2, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function MessageInput({
  onSend,
  isLoading = false,
  placeholder = "Pergunte sobre suas campanhas...",
  disabled = false,
}: MessageInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="flex items-end gap-2 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus-within:border-violet-500 transition-colors">
        <button
          className="text-zinc-600 hover:text-zinc-400 transition-colors mb-1"
          title="Anexar arquivo (em breve)"
          disabled
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder={placeholder}
          disabled={isLoading || disabled}
          rows={1}
          className={cn(
            "flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600",
            "resize-none outline-none min-h-[24px] max-h-[200px]",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />

        <button
          onClick={handleSend}
          disabled={!value.trim() || isLoading || disabled}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg transition-all mb-0.5",
            value.trim() && !isLoading
              ? "bg-violet-600 hover:bg-violet-700 text-white"
              : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
          )}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
      <p className="text-center text-xs text-zinc-700 mt-2">
        Enter para enviar · Shift+Enter para nova linha
      </p>
    </div>
  );
}
