import { Settings, User, Building2, Link2, Bell, Shield } from "lucide-react";

const SETTINGS_SECTIONS = [
  {
    icon: User,
    title: "Perfil",
    description: "Suas informações pessoais e preferências",
    tag: "Em breve",
  },
  {
    icon: Building2,
    title: "Workspace",
    description: "Nome, logo e configurações do workspace ativo",
    tag: "Em breve",
  },
  {
    icon: Link2,
    title: "Integrações",
    description: "Conecte sua conta Meta Ads ao workspace",
    tag: "Phase 2",
  },
  {
    icon: Bell,
    title: "Notificações",
    description: "Configure alertas de campanhas e automações",
    tag: "Em breve",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Autenticação, sessões e permissões",
    tag: "Clerk",
  },
];

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-white">Configurações</h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Gerencie seu perfil e workspace
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        {SETTINGS_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800 shrink-0">
                <Icon className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-zinc-200">
                    {section.title}
                  </h3>
                  <span className="text-xs text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded-md">
                    {section.tag}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {section.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
