"use client";

import { useState, useEffect } from "react";
import { ChatList } from "@/components/chat/ChatList";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { MessageInput } from "@/components/chat/MessageInput";
import { useChatStore } from "@/store/chatStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import type { ChatMessage } from "@/types/chat";

export default function ChatPage() {
  const { activeWorkspace } = useWorkspaceStore();
  const {
    sessions,
    activeSession,
    messages,
    isLoading,
    setSessions,
    setActiveSession,
    addSession,
    setMessages,
    addMessage,
    setLoading,
  } = useChatStore();

  useEffect(() => {
    if (activeWorkspace) {
      fetchSessions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWorkspace]);

  async function fetchSessions() {
    if (!activeWorkspace) return;
    try {
      const res = await fetch(`/api/chat?workspaceId=${activeWorkspace.id}`);
      const json = await res.json();
      setSessions(json.data ?? []);
    } catch {
      console.error("Failed to fetch sessions");
    }
  }

  async function handleNewChat() {
    if (!activeWorkspace) return;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId: activeWorkspace.id }),
      });
      const json = await res.json();
      addSession(json.data);
    } catch {
      console.error("Failed to create session");
    }
  }

  async function handleSelectSession(sessionId: string) {
    try {
      const res = await fetch(`/api/chat/${sessionId}/messages`);
      const json = await res.json();
      const session = sessions.find((s) => s.id === sessionId);
      if (session) setActiveSession(session);
      setMessages(json.data ?? []);
    } catch {
      console.error("Failed to load messages");
    }
  }

  async function handleSend(content: string) {
    if (!activeSession) return;

    // Optimistic user message
    const tempUserMessage: ChatMessage = {
      id: `temp_${Date.now()}`,
      role: "USER",
      content,
      sessionId: activeSession.id,
      metadata: null,
      tokens: null,
      createdAt: new Date(),
    };
    addMessage(tempUserMessage);
    setLoading(true);

    try {
      const res = await fetch(`/api/chat/${activeSession.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const json = await res.json();
      addMessage(json.data);
    } catch {
      console.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  if (!activeWorkspace) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-zinc-500 text-sm">
          Selecione um workspace para usar o chat
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <ChatList
        onNewChat={handleNewChat}
        onSelectSession={handleSelectSession}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <ChatWindow messages={messages} isStreaming={isLoading} />
        <MessageInput
          onSend={handleSend}
          isLoading={isLoading}
          disabled={!activeSession}
          placeholder={
            activeSession
              ? "Pergunte sobre suas campanhas..."
              : "Selecione ou crie uma conversa"
          }
        />
      </div>
    </div>
  );
}
