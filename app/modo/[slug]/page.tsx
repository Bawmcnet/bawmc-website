import Link from "next/link";
import { Swords } from "lucide-react";

const modosInfo: Record<string, { nome: string; desc: string; emoji: string; detalhes: string[] }> = {
  "survival": {
    nome: "Survival Clássico",
    desc: "O modo tradicional com economia robusta, proteção de terrenos e jogabilidade equilibrada.",
    emoji: "⛏️",
    detalhes: [
      "Economia baseada em player shops e mercado (/mercado).",
      "Proteção de terrenos com pá de ouro (/terreno).",
      "Mundo principal expansivo com resets planejados para recursos."
    ]
  },
  "semi-anarquia": {
    nome: "Semi-Anarquia",
    desc: "Liberdade quase total para construir, destruir e sobreviver com economia ativa.",
    emoji: "🧨",
    detalhes: [
      "Poucas regras e sem proteção de terrenos padrão.",
      "Permitido griefing e roubo fora do spawn.",
      "PvP ativado em praticamente todos os lugares."
    ]
  },
  "lifesteal": {
    nome: "Lifesteal (Novo)",
    desc: "Cada abate te fortalece: a cada kill, você ganha um novo coração.",
    emoji: "❤️",
    detalhes: [
      "Perde um coração ao morrer para outro jogador.",
      "Ganha um coração ao eliminar um inimigo.",
      "Sistema de saque e recompensas exclusivas."
    ]
  },
  "practice-e-crystalpvp": {
    nome: "Practice e CrystalPvP",
    desc: "Treine suas habilidades de combate, cristais e domine as arenas de duelo.",
    emoji: "🔮",
    detalhes: [
      "Arenas dedicadas a CrystalPvP, Netherite Pot e UHC.",
      "Sem perda de itens nas arenas de treino.",
      "Estatísticas e ranqueamento de duelos."
    ]
  },
  "eventos": {
    nome: "Eventos",
    desc: "Participe de eventos eletrizantes organizados pela staff.",
    emoji: "🎉",
    detalhes: [
      "Eventos automáticos e manuais frequentes.",
      "Prêmios em coins, vips e itens raros.",
      "Avisos automáticos no chat do servidor."
    ]
  }
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ModoDetalhe({ params }: PageProps) {
  const resolvedParams = await params;
  const modo = modosInfo[resolvedParams.slug];

  if (!modo) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-red-400 mb-4">Modo não encontrado</h1>
        <p className="text-slate-400 mb-6">O modo que você está procurando não existe ou foi removido.</p>
        <Link href="/" className="bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-cyan-400 transition-colors">
          Voltar para o Início
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <nav className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-cyan-400 font-bold hover:underline">
            ← Voltar para o Início
          </Link>
          <span className="text-sm text-slate-400">BAWMC - Detalhes do Modo</span>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto p-8 w-full">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-4xl shadow-inner">
              {modo.emoji}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white">{modo.nome}</h1>
              <p className="text-slate-400 text-sm mt-1">{modo.desc}</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 mt-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
              <Swords className="w-5 h-5" /> Principais Características
            </h3>
            <ul className="space-y-3">
              {modo.detalhes.map((detalhe, index) => (
                <li key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 text-sm flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                  {detalhe}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex gap-4">
            <Link 
              href="/" 
              className="bg-slate-800 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors text-sm text-center"
            >
              Página Principal
            </Link>
            <a 
              href="https://discord.com/servers/bawmc-1317180458978639914" 
              target="_blank" 
              className="bg-cyan-500 text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-cyan-400 transition-colors text-sm text-center"
            >
              Entrar no Discord
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}