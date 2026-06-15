import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// ============================================================
// Auth Helpers
// ============================================================

/**
 * Get the current Clerk user and sync with DB user.
 * Throws if not authenticated.
 */
export async function getAuthUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");

  // Upsert user in DB
  const user = await prisma.user.upsert({
    where: { clerkId: userId },
    create: {
      clerkId: userId,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      avatarUrl: clerkUser.imageUrl,
    },
    update: {
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      avatarUrl: clerkUser.imageUrl,
    },
  });

  return user;
}

/**
 * Verify the current user has access to a specific workspace.
 */
export async function requireWorkspaceAccess(workspaceId: string) {
  const user = await getAuthUser();

  const member = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId,
      },
    },
    include: { workspace: true },
  });

  if (!member) {
    throw new Error("Forbidden: No access to this workspace");
  }

  return { user, member, workspace: member.workspace };
}
