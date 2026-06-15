"use client";

import dynamic from "next/dynamic";
import { Bell, Search, User } from "lucide-react";
import { useWorkspaceStore } from "@/store/workspaceStore";

const ClerkUserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => ({ default: mod.UserButton })),
  { ssr: false, loading: () => <div className="w-7 h-7 rounded-full bg-zinc-800" /> }
);

const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function Header() {
  const { activeWorkspace } = useWorkspaceStore();

  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        {activeWorkspace && (
          <>
            <span className="text-zinc-600">{activeWorkspace.name}</span>
            <span className="text-zinc-700">/</span>
          </>
        )}
        <span className="text-zinc-300 font-medium">Dashboard</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors">
          <Search className="w-4 h-4" />
        </button>
        <button className="relative p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
        </button>
        <div className="w-px h-5 bg-zinc-800" />
        {hasClerk ? (
          <ClerkUserButton appearance={{ elements: { avatarBox: "w-7 h-7" } }} />
        ) : (
          <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center">
            <User className="w-4 h-4 text-zinc-500" />
          </div>
        )}
      </div>
    </header>
  );
}
