import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Workspace } from "@/types/workspace";

// ============================================================
// Workspace Store (Zustand)
// ============================================================

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (workspace: Workspace | null) => void;
  addWorkspace: (workspace: Workspace) => void;
  updateWorkspace: (id: string, data: Partial<Workspace>) => void;
  removeWorkspace: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  workspaces: [],
  activeWorkspace: null,
  isLoading: false,
  error: null,
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      ...initialState,

      setWorkspaces: (workspaces) => set({ workspaces }),

      setActiveWorkspace: (workspace) =>
        set({ activeWorkspace: workspace }),

      addWorkspace: (workspace) =>
        set((state) => ({
          workspaces: [...state.workspaces, workspace],
        })),

      updateWorkspace: (id, data) =>
        set((state) => ({
          workspaces: state.workspaces.map((w) =>
            w.id === id ? { ...w, ...data } : w
          ),
          activeWorkspace:
            state.activeWorkspace?.id === id
              ? { ...state.activeWorkspace, ...data }
              : state.activeWorkspace,
        })),

      removeWorkspace: (id) =>
        set((state) => ({
          workspaces: state.workspaces.filter((w) => w.id !== id),
          activeWorkspace:
            state.activeWorkspace?.id === id ? null : state.activeWorkspace,
        })),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      reset: () => set(initialState),
    }),
    {
      name: "ai-media-buyer:workspace",
      partialize: (state) => ({
        activeWorkspace: state.activeWorkspace,
      }),
    }
  )
);
