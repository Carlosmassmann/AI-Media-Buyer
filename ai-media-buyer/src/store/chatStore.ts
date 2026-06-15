import { create } from "zustand";
import type { ChatSession, ChatMessage } from "@/types/chat";

// ============================================================
// Chat Store (Zustand)
// ============================================================

interface ChatState {
  sessions: ChatSession[];
  activeSession: ChatSession | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;

  // Actions
  setSessions: (sessions: ChatSession[]) => void;
  setActiveSession: (session: ChatSession | null) => void;
  addSession: (session: ChatSession) => void;
  setMessages: (messages: ChatMessage[]) => void;
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setStreaming: (streaming: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  sessions: [],
  activeSession: null,
  messages: [],
  isLoading: false,
  isStreaming: false,
  error: null,
};

export const useChatStore = create<ChatState>()((set) => ({
  ...initialState,

  setSessions: (sessions) => set({ sessions }),

  setActiveSession: (session) =>
    set({ activeSession: session, messages: [] }),

  addSession: (session) =>
    set((state) => ({
      sessions: [session, ...state.sessions],
      activeSession: session,
      messages: [],
    })),

  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateLastMessage: (content) =>
    set((state) => {
      const messages = [...state.messages];
      const last = messages[messages.length - 1];
      if (last) {
        messages[messages.length - 1] = { ...last, content };
      }
      return { messages };
    }),

  setLoading: (isLoading) => set({ isLoading }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
