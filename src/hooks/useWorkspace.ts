"use client";

import { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import type { Workspace } from "@/types/workspace";

// ============================================================
// useWorkspace Hook
// ============================================================

export function useWorkspace() {
  const {
    workspaces,
    activeWorkspace,
    isLoading,
    error,
    setWorkspaces,
    setActiveWorkspace,
    setLoading,
    setError,
  } = useWorkspaceStore();

  useEffect(() => {
    fetchWorkspaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchWorkspaces() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/workspaces");
      if (!res.ok) throw new Error("Falha ao carregar workspaces");
      const json = await res.json();
      setWorkspaces(json.data as Workspace[]);

      // Auto-select first workspace if none selected
      if (!activeWorkspace && json.data?.length > 0) {
        setActiveWorkspace(json.data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function createWorkspace(input: { name: string; slug: string; description?: string }) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Falha ao criar workspace");
      }
      const json = await res.json();
      const newWorkspace = json.data as Workspace;
      useWorkspaceStore.getState().addWorkspace(newWorkspace);
      return newWorkspace;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    workspaces,
    activeWorkspace,
    isLoading,
    error,
    setActiveWorkspace,
    createWorkspace,
    refetch: fetchWorkspaces,
  };
}
