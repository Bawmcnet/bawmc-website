import Link from "next/link";
import { Swords, Trophy, DollarSign, User } from "lucide-react";

interface TopPlayer {
  pos: number;
  nome: string;
  valor: string;
}

interface ModoData {
  nome: string;
  desc: string;
  emoji: string;
  detalhes: string[];
  topMoney: TopPlayer[];
  topKills: TopPlayer[];
}

const modosInfo: Record<string, ModoData> = {
  "survival": {
    nome: "Survival Clássico",
    desc: "O modo tradicional com economia robusta, proteção de terrenos e jogabilidade equilibrada.",
    emoji: "⛏️",
    detalhes: [
      "Economia baseada em player shops e mercado (/mercado).",
      "Proteção de terrenos com pá de ouro (/terreno).",
      "Mundo principal expansivo com resets planejados para recursos."
    ],
    topMoney: [
      { pos: 1, nome: "PlayerMaster12", valor: "R$ 4.500.000" },
      { pos: 2, nome: "CraftBuilder", valor: "R$ 3.200.000" },
      { pos: 3, nome: "DiamondHunter", valor: "R$ 1.950.000" }
    ],
    topKills: [
      { pos: 1, nome: "PvPLegend", valor: "1.420 kills" },
      { pos: 2, nome: "ShadowBlade", valor: "1.100 kills" },
      { pos: 3, nome: "IronGuard", valor: "850 kills" }
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
    ],
    topMoney: [
      { pos: 1, nome: "AnarchistKing", valor: "R$ 8.100.000" },
      { pos: 2, nome: "ChaosLord", valor: "R$ 5.400.000" },
      { pos: 3, nome: "WitherMaster", valor: "R$ 3.100.000" }
    ],
    topKills: [
      { pos: 1, nome: "DoomSlayer", valor: "3.210 kills" },
      { pos: 2, nome: "RedEye", valor: "2.890 kills" },
      { pos: 3, nome: "ChaosLord", valor: "2.150 kills" }
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
    ],
    topMoney: [
      { pos: 1, nome: "HeartThief", valor: "R$ 2.900.000" },
      { pos: 2, nome: "BloodKnight", valor: "R$ 1.850.000" },
      { pos: 3, nome: "VampirePvP", valor: "R$ 950.000" }
    ],
    topKills: [
      { pos: 1, nome: "BloodKnight", valor: "4.500 kills (38 corações)" },
      { pos: 2, nome: "HeartThief", valor: "3.920 kills (30 corações)" },
      { pos: 3, nome: "GrimReaper", valor: "3.100 kills (25 corações)" }
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
    ],
    topMoney: [
      { pos: 1, nome: "CrystalGod", valor: "R$ 1.200.000" },
      { pos: 2, nome: "NetheritePro", valor: "R$ 890.000" },
      { pos: 3, nome: "AnchorKing", valor: "R$ 500.000" }
    ],
    topKills: [
      { pos: 1, nome: "CrystalGod", valor: "6.400 vitórias" },
      { pos: 2, nome: "AnchorKing", valor: "5.120 vitórias" },
      { pos: 3, nome: "SwordMaster", valor: "4.890 vitórias" }
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
    ],
    topMoney: [],
    topKills: []
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

  const isEvento = resolvedParams.slug === "eventos";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-cyan-400 font-bold hover:underline">
            ← Voltar para o Início
          </Link>
          <span className="text-sm text-slate-400">BAWMC - Detalhes do Modo</span>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto p-8 w-full space-y-8">
        {/* Cabeçalho do Modo */}
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
        </div>

        {/* Seção de Rankings (Aparece apenas se NÃO for o modo eventos) */}
        {!isEvento && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Dinheiro */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-400">
                <DollarSign className="w-5 h-5" /> Top Economia (Dinheiro)
              </h3>
              <div className="space-y-3">
                {modo.topMoney.map((player) => (
                  <div key={player.pos} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
                        player.pos === 1 ? "bg-amber-500 text-slate-950" :
                        player.pos === 2 ? "bg-slate-300 text-slate-950" :
                        "bg-amber-700/50 text-amber-200"
                      }`}>
                        #{player.pos}
                      </span>
                      <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-400" /> {player.nome}
                      </span>
                    </div>
                    <span className="text-amber-400 font-bold text-sm">{player.valor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Kills */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400">
                <Trophy className="w-5 h-5" /> Top Kills (Abates)
              </h3>
              <div className="space-y-3">
                {modo.topKills.map((player) => (
                  <div key={player.pos} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center ${
                        player.pos === 1 ? "bg-red-500 text-white" :
                        player.pos === 2 ? "bg-slate-300 text-slate-950" :
                        "bg-red-900/50 text-red-200"
                      }`}>
                        #{player.pos}
                      </span>
                      <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                        <User className="w-4 h-4 text-slate-400" /> {player.nome}
                      </span>
                    </div>
                    <span className="text-red-400 font-bold text-sm">{player.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rodapé de botões */}
        <div className="flex gap-4 pt-2">
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
      </main>
    </div>
  );
}