import { SignIn } from "@clerk/nextjs";
import { Bot } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-600 shadow-lg shadow-violet-600/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">AI Media Buyer</h1>
            <p className="text-sm text-zinc-400 mt-0.5">
              Meta Ads inteligente com IA
            </p>
          </div>
        </div>

        <SignIn />
      </div>
    </main>
  );
}
