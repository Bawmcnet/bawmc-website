"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trophy, Users, Activity, Skull, Coins, Swords } from "lucide-react";

export default function ModoDetalhes() {
  const params = useParams();
  const slug = params.slug as string;

  // Dados personalizados para cada modo
  const modosInfo: Record<string, any> = {
    survival: {
      nome: "Survival",
      desc: "O clássico survival com economia robusta, proteção de terrenos e jogabilidade equilibrada.",
      emoji: "⛏️",
      color: "text-amber-400",
      border: "border-amber-500/40",
      bg: "bg-amber-500/10",
      online: "420",
      ping: "12ms",
      topDinheiro: [
        { pos: 1, nome: "PlayerOne", valor: "$15.420.000" },
        { pos: 2, nome: "CraftMaster", valor: "$12.100.000" },
        { pos: 3, nome: "BawPlayer", valor: "$9.850.000" },
      ],
      topKills: [
        { pos: 1, nome: "HunterX", valor: "1.420 kills" },
        { pos: 2, nome: "Shadow", valor: "1.100 kills" },
        { pos: 3, nome: "Zelda", valor: "950 kills" },
      ],
      topMortes: [
        { pos: 1, nome: "NoobMaster", valor: "850 mortes" },
        { pos: 2, nome: "FallDamage", valor: "620 mortes" },
        { pos: 3, nome: "CreeperVictim", valor: "540 mortes" },
      ]
    },
    "semi-anarquia": {
      nome: "Semi-Anarquia",
      desc: "Liberdade quase total para construir, destruir e sobreviver com economia ativa e poucas regras.",
      emoji: "🧨",
      color: "text-red-400",
      border: "border-red-500/40",
      bg: "bg-red-500/10",
      online: "185",
      ping: "15ms",
      topDinheiro: [
        { pos: 1, nome: "Anarchist", valor: "$8.200.000" },
        { pos: 2, nome: "Destructor", valor: "$6.500.000" },
      ],
      topKills: [
        { pos: 1, nome: "ChaosGod", valor: "2.840 kills" },
        { pos: 2, nome: "RedStone", valor: "1.920 kills" },
      ],
      topMortes: [
        { pos: 1, nome: "Rookie", valor: "1.450 mortes" },
      ]
    },
    lifesteal: {
      nome: "Lifesteal (Novo)",
      desc: "Cada abate te fortalece: a cada kill, você ganha um novo coração e ganha economia.",
      emoji: "❤️",
      color: "text-rose-400",
      border: "border-rose-500/40",
      bg: "bg-rose-500/10",
      online: "310",
      ping: "14ms",
      topDinheiro: [
        { pos: 1, nome: "HeartThief", valor: "$10.500.000" },
      ],
      topKills: [
        { pos: 1, nome: "Vampire", valor: "3.100 kills" },
      ],
      topMortes: [
        { pos: 1, nome: "Heartless", valor: "920 mortes" },
      ]
    },
    "practice-e-crystalpvp": {
      nome: "Practice e CrystalPvP",
      desc: "Treine suas habilidades de combate, cristais e domine as arenas de duelo intensas.",
      emoji: "🔮",
      color: "text-emerald-400",
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/10",
      online: "140",
      ping: "10ms",
      topDinheiro: [
        { pos: 1, nome: "CrystalKing", valor: "$5.100.000" },
      ],
      topKills: [
        { pos: 1, nome: "PvPLegend", valor: "5.400 duelos" },
      ],
      topMortes: [
        { pos: 1, nome: "ComboBreaker", valor: "2.100 derrotas" },
      ]
    },
    eventos: {
      nome: "Eventos",
      desc: "Participe de eventos eletrizantes organizados pela staff com prêmios imperdíveis.",
      emoji: "🎉",
      color: "text-blue-400",
      border: "border-blue-500/40",
      bg: "bg-blue-500/10",
      online: "95",
      ping: "13ms",
      topDinheiro: [
        { pos: 1, nome: "EventWinner", valor: "$20.000.000" },
      ],
      topKills: [
        { pos: 1, nome: "Gladiator", valor: "450 eventos" },
      ],
      topMortes: [
        { pos: 1, nome: "Unlucky", valor: "320 eliminados" },
      ]
    }
  };

  const info = modosInfo[slug] || {
    nome: "Modo de Jogo",
    desc: "Informações detalhadas sobre este modo do BAWMC.",
    emoji: "🎮",
    color: "text-cyan-400",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
    online: "100",
    ping: "15ms",
    topDinheiro: [],
    topKills: [],
    topMortes: []
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans p-6 md:p-12">
      <div className="max-w-4xl mx-auto w-full">
        <Link href="/#modos" className="inline-flex items-center gap-2 text-cyan-400 hover:underline mb-8 font-semibold">
          <ArrowLeft className="w-5 h-5" /> Voltar para o Início
        </Link>

        {/* Cabeçalho do Modo */}
        <div className={`bg-slate-900 border ${info.border} p-8 rounded-3xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl`}>
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 rounded-2xl ${info.bg} flex items-center justify-center text-4xl shadow-inner`}>
              {info.emoji}
            </div>
            <div>
              <h1 className={`text-3xl font-black ${info.color}`}>{info.nome}</h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">{info.desc}</p>
            </div>
          </div>
          
          {/* Status de Servidor (Ping e Online) */}
          <div className="flex gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-center">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Users className="w-4 h-4 text-cyan-400" /> Jogadores
              </div>
              <span className="font-bold text-lg">{info.online}</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl text-center">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <Activity className="w-4 h-4 text-emerald-400" /> Ping
              </div>
              <span className="font-bold text-lg text-emerald-400">{info.ping}</span>
            </div>
          </div>
        </div>

        {/* Grids de Estatísticas (Top Dinheiro, Kills, Mortes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Dinheiro */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5" /> Top Dinheiro
            </h3>
            <div className="space-y-3">
              {info.topDinheiro.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800/60 text-sm">
                  <span className="font-bold text-slate-300">#{item.pos} {item.nome}</span>
                  <span className="text-amber-400 font-semibold">{item.valor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Kills */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <Swords className="w-5 h-5" /> Top Kills
            </h3>
            <div className="space-y-3">
              {info.topKills.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800/60 text-sm">
                  <span className="font-bold text-slate-300">#{item.pos} {item.nome}</span>
                  <span className="text-red-400 font-semibold">{item.valor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Mortes */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-slate-400 mb-4 flex items-center gap-2">
              <Skull className="w-5 h-5" /> Top Mortes
            </h3>
            <div className="space-y-3">
              {info.topMortes.map((item: any, i: number) => (
                <div key={i} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800/60 text-sm">
                  <span className="font-bold text-slate-300">#{item.pos} {item.nome}</span>
                  <span className="text-slate-400 font-semibold">{item.valor}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}