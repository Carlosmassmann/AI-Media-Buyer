import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.CLERK_SECRET_KEY) {
    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");
  }

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
