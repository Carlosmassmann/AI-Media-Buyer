# AI Media Buyer

Plataforma SaaS multi-tenant com Inteligência Artificial para criar, gerenciar e otimizar campanhas de Meta Ads.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript |
| Estilização | TailwindCSS, Shadcn UI |
| Backend | Next.js API Routes (Server-side) |
| Banco de dados | PostgreSQL |
| ORM | Prisma 6 |
| Autenticação | Clerk |
| IA | OpenAI GPT-4o |
| Estado global | Zustand |
| Validação | Zod |

---

## Estrutura do Projeto

```
ai-media-buyer/
├── prisma/
│   └── schema.prisma          # Schema completo com todas as entidades
├── src/
│   ├── app/
│   │   ├── (auth)/            # Páginas de login/cadastro (Clerk)
│   │   ├── (dashboard)/       # Layout protegido + todas as páginas
│   │   │   ├── page.tsx       # Dashboard com métricas
│   │   │   ├── chat/          # Chat com IA
│   │   │   ├── campaigns/     # Gerenciamento de campanhas
│   │   │   ├── automations/   # Regras de automação
│   │   │   ├── workspaces/    # Seleção de workspaces
│   │   │   └── settings/      # Configurações
│   │   ├── api/
│   │   │   ├── workspaces/    # CRUD de workspaces
│   │   │   ├── chat/          # Sessions + messages
│   │   │   ├── campaigns/     # CRUD de campanhas
│   │   │   └── automations/   # CRUD de automações
│   │   ├── globals.css
│   │   ├── layout.tsx         # Root layout com Clerk + dark theme
│   │   └── middleware.ts      # Proteção de rotas via Clerk
│   ├── components/
│   │   ├── layout/            # Sidebar, Header
│   │   ├── dashboard/         # MetricCard
│   │   └── chat/              # ChatList, ChatWindow, MessageInput
│   ├── config/
│   │   ├── app.ts             # Configurações gerais + navegação
│   │   ├── meta.ts            # Config da Meta Ads API
│   │   └── ai.ts              # Config OpenAI + system prompts
│   ├── hooks/
│   │   └── useWorkspace.ts    # Hook para gerenciar workspaces
│   ├── lib/
│   │   ├── prisma.ts          # Singleton Prisma
│   │   ├── openai.ts          # Singleton OpenAI
│   │   ├── auth.ts            # Helpers de autenticação
│   │   └── utils.ts           # cn(), formatters, apiError/Success
│   ├── modules/               # Lógica de negócio separada por domínio
│   │   ├── workspaces/        # service.ts + validators.ts
│   │   ├── chat/              # service.ts (OpenAI integration)
│   │   ├── campaigns/         # service.ts + validators.ts
│   │   ├── automations/       # service.ts + validators.ts
│   │   └── ai/
│   │       ├── types.ts       # Contratos dos agentes
│   │       └── agents/
│   │           ├── strategist-agent/  # Planejamento de estratégia
│   │           ├── copy-agent/        # Geração de copies/headlines
│   │           ├── analyst-agent/     # Análise de métricas
│   │           └── executor-agent/    # Execução de ações na Meta API
│   ├── services/
│   │   └── meta/              # Serviços mockados da Meta Ads API
│   │       ├── createCampaign.ts
│   │       ├── updateCampaign.ts
│   │       ├── pauseCampaign.ts
│   │       └── getInsights.ts
│   ├── store/
│   │   ├── workspaceStore.ts  # Zustand: workspaces + workspace ativo
│   │   └── chatStore.ts       # Zustand: sessões + mensagens
│   └── types/                 # Types TypeScript globais
│       ├── index.ts
│       ├── workspace.ts
│       ├── campaign.ts
│       ├── chat.ts
│       ├── meta.ts
│       └── automation.ts
```

---

## Entidades do Banco (Prisma)

```
User ─────────── WorkspaceMember ──── Workspace
                                          │
                                ┌─────────┼─────────┐
                           MetaAccount  Campaign  AutomationRule
                                            │           │
                                      ┌────┴────┐  AutomationExecution
                                    AdSet  CampaignInsight
                                      │
                                     Ad
```

Cada `Workspace` tem seu próprio conjunto de dados. Nenhum usuário acessa dados de outro workspace sem ser membro.

---

## Como Iniciar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env.local
# Preencha: DATABASE_URL, CLERK keys, OPENAI_API_KEY
```

### 3. Subir o banco e rodar migrations
```bash
npm run db:push       # Aplica o schema no banco
npm run db:generate   # Gera o Prisma Client
```

### 4. Instalar componentes Shadcn UI
```bash
npx shadcn@latest init
npx shadcn@latest add button card input label select separator badge avatar dropdown-menu toast
```

### 5. Rodar em desenvolvimento
```bash
npm run dev
```

Acesse: http://localhost:3000

---

## Módulos Implementados no MVP

### Auth (Clerk)
Login, cadastro e proteção de rotas com middleware. Sincronização automática do usuário Clerk com o banco de dados.

### Workspaces (Multi-tenant)
Cada workspace é um cliente isolado. Um usuário pode ser membro de múltiplos workspaces com diferentes roles (OWNER, ADMIN, MEMBER, VIEWER).

### Chat IA
Interface semelhante ao ChatGPT com lista de conversas, histórico persistido e integração com OpenAI GPT-4o. System prompt especializado em Meta Ads.

### Campanhas
CRUD completo com status (ACTIVE, PAUSED, DRAFT), objetivos, orçamento diário/lifetime e estrutura para Ad Sets e Ads.

### Automações
Motor de regras baseado em condições (gatilhos) e ações. Ex: "se CPA > R$80 → pausar campanha".

### Agentes de IA
4 agentes especializados com contratos definidos:
- **Strategist**: planejamento de campanhas
- **Copy**: geração de textos e headlines
- **Analyst**: análise de métricas e recomendações
- **Executor**: execução de ações na Meta API (mock)

### Meta Ads Services
Serviços mockados para createCampaign, updateCampaign, pauseCampaign e getInsights. Em desenvolvimento geram dados fictícios realistas. Prontos para integração real na Phase 2.

---

## Roadmap Técnico

### Phase 1 — MVP (atual)
- [x] Arquitetura base e estrutura de pastas
- [x] Schema Prisma completo
- [x] Autenticação Clerk
- [x] Multi-tenancy com Workspaces
- [x] Dashboard com métricas mockadas
- [x] Chat IA com OpenAI
- [x] Tela de Campanhas (estrutura)
- [x] Tela de Automações (estrutura)
- [x] Serviços Meta Ads mockados
- [x] 4 agentes de IA (contratos definidos)

### Phase 2 — Integração Meta Ads
- [ ] OAuth Meta (conectar conta)
- [ ] Criar campanhas reais via API
- [ ] Sincronizar métricas automaticamente
- [ ] Ativar/pausar via UI
- [ ] Gráficos de performance (recharts)
- [ ] Executor agent operacional

### Phase 3 — Automações
- [ ] Engine de automações em background (cron/queue)
- [ ] Webhook Meta para eventos em tempo real
- [ ] Notificações (email + push)
- [ ] Histórico de execuções detalhado

### Phase 4 — IA Avançada
- [ ] Streaming de respostas do chat
- [ ] Agente com tool use (function calling)
- [ ] Criação de campanhas via chat
- [ ] Relatórios gerados por IA
- [ ] Sugestões proativas de otimização

### Phase 5 — SaaS
- [ ] Planos e billing (Stripe)
- [ ] Limites por plano
- [ ] Onboarding guiado
- [ ] Painel de admin
- [ ] Analytics de uso

---

## Princípios Arquiteturais

**Separação de responsabilidades**: cada módulo tem sua própria pasta com service (lógica de negócio), validators (Zod) e types. As API Routes são finas — apenas validam e delegam.

**Multi-tenancy por design**: toda query filtra por `workspaceId`. A função `requireWorkspaceAccess` garante que o usuário pertence ao workspace antes de qualquer operação sensível.

**Mock-first**: os serviços Meta retornam dados realistas em desenvolvimento, permitindo desenvolver o frontend sem integração real.

**Escalabilidade**: a estrutura de agentes usa interfaces/contratos, facilitando adicionar novos agentes ou trocar o modelo de IA sem refatorar o sistema.

---

*AI Media Buyer v0.1.0 — MVP Foundation*
