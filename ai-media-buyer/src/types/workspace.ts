import type { WorkspaceMemberRole } from "@prisma/client";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  description: string | null;
  isActive: boolean;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceMember {
  id: string;
  role: WorkspaceMemberRole;
  joinedAt: Date;
  userId: string;
  workspaceId: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
    avatarUrl: string | null;
  };
}

export interface WorkspaceWithMeta extends Workspace {
  members: WorkspaceMember[];
  _count?: {
    campaigns: number;
    automations: number;
    chatSessions: number;
  };
}

export interface CreateWorkspaceInput {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string;
  logoUrl?: string;
}
