"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Server, Users, Copy, Check, Swords, Compass } from "lucide-react";

interface ServerData {
  online: boolean;
  players: number;
  maxPlayers: number;
}

interface ModoItem {
  id: string;
  nome: string;
  desc: string;
  emoji: string;
  border: string;
  bg: string;
  textCol: string;
  isStore?: boolean;
}

const modos: ModoItem[] = [
  {
    id: "survival",
    nome: "Survival Clássico",
    desc: "O modo tradicional com economia robusta, proteção de terrenos e jogabilidade equilibrada.",
    emoji: "⛏️",
    border: "border-cyan-500/40 hover:border-cyan-500",
    bg: "bg-cyan-500/10",
    textCol: "text-cyan-400",
  },
  {
    id: "semi-anarquia",
    nome: "Semi-Anarquia",
    desc: "Liberdade quase total para construir, destruir e sobreviver com economia ativa.",
    emoji: "🧨",
    border: "border-amber-500/40 hover:border-amber-500",
    bg: "bg-amber-500/10",
    textCol: "text-amber-400",
  },
  {
    id: "lifesteal",
    nome: "Lifesteal (Novo)",
    desc: "Cada abate te fortalece: a cada kill, você ganha um novo coração.",
    emoji: "❤️",
    border: "border-red-500/40 hover:border-red-500",
    bg: "bg-red-500/10",
    textCol: "text-red-400",
  },
  {
    id: "practice-e-crystalpvp",
    nome: "Practice e CrystalPvP",
    desc: "Treine suas habilidades de combate, cristais e domine as arenas de duelo.",
    emoji: "🔮",
    border: "border-purple-500/40 hover:border-purple-500",
    bg: "bg-purple-500/10",
    textCol: "text-purple-400",
  },
  {
    id: "eventos",
    nome: "Eventos",
    desc: "Participe de eventos eletrizantes organizados pela staff.",
    emoji: "🎉",
    border: "border-blue-500/40 hover:border-blue-500",
    bg: "bg-blue-500/10",
    textCol: "text-blue-400",
  }
];

export default function Home() {
  const [serverStatus, setServerStatus] = useState<ServerData | null>(null);
  const [copied, setCopied] = useState(false);
  
  const serverIp = "jogar.bawmc.com";

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/3/${serverIp}`)
      .then((res) => res.json())
      .then((data) => {
        setServerStatus({
          online: data.online,
          players: data.players?.online || 0,
          maxPlayers: data.players?.max || 0,
        });
      })
      .catch(() => {
        setServerStatus({ online: false, players: 0, maxPlayers: 0 });
      });
  }, [serverIp]);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Navegação */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-extrabold text-lg text-cyan-400">
            <Swords className="w-6 h-6" /> BAWMC
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://discord.com/servers/bawmc-1317180458978639914" 
              target="_blank" 
              className="text-sm font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-xl hover:bg-cyan-500/20 transition-colors"
            >
              Discord
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto p-8 w-full space-y-10">
        {/* Widget de Status e Cópia de IP */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${serverStatus?.online ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
            <div>
              <p className="text-xs text-slate-400 font-medium">Status do Servidor</p>
              <p className="text-sm font-bold text-white">
                {serverStatus === null ? "Verificando..." : serverStatus.online ? "Online" : "Offline"}
              </p>
            </div>
            <div className="h-8 w-px bg-slate-800 mx-2 hidden sm:block" />
            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>{serverStatus?.players ?? 0} jogando agora</span>
            </div>
          </div>

          <button
            onClick={handleCopyIp}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-lg shadow-cyan-500/10 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "IP Copiado!" : `Copiar IP: ${serverIp}`}
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4 py-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Bem-vindo ao <span className="text-cyan-400">BAWMC</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Explore nossos modos de jogo exclusivos, enfrente desafios épicos e construa sua história na nossa comunidade.
          </p>
        </div>

        {/* Grade de Modos */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            <Compass className="w-5 h-5 text-cyan-400" /> Modos de Jogo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modos.map((modo) => (
              <Link 
                key={modo.id}
                href={`/modo/${modo.id}`}
                className={`bg-slate-900 border ${modo.border} rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${modo.bg} flex items-center justify-center text-2xl shadow-inner`}>
                      {modo.emoji}
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold ${modo.textCol}`}>{modo.nome}</h4>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm mb-6">{modo.desc}</p>
                </div>
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline">
                  Ver detalhes e rankings →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>© 2026 BAWMC Server. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}