"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Server, Users, Copy, Check, Swords, Compass, BookOpen, ShieldAlert, ShoppingBag, Key, Home as HomeIcon, DollarSign, HelpCircle, FileText, MessageSquare } from "lucide-react";

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
}

interface TutorialItem {
  titulo: string;
  desc: string;
  comando: string;
  icon: any;
}

interface StaffItem {
  nome: string;
  cargo: string;
  cor: string;
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

const tutoriais: TutorialItem[] = [
  {
    titulo: "Registro de Conta",
    desc: "Use /register senha senha para criar sua conta e /login senha ao entrar.",
    comando: "/register",
    icon: Key
  },
  {
    titulo: "Proteção de Terrenos",
    desc: "Use /terreno para pegar a pá e o graveto, marque dois cantos opostos. Comece com 500 blocos e gerencie com comandos avançados.",
    comando: "/terreno",
    icon: HomeIcon
  },
  {
    titulo: "Economia & Lucro",
    desc: "Gerencie seus ganhos com o mercado global e comandos rápidos de compra e venda.",
    comando: "/mercado",
    icon: DollarSign
  }
];

const staffMinecraft: StaffItem[] = [
  { nome: "excambaw", cargo: "Dono", cor: "text-red-400 border-red-500/30 bg-red-500/10" },
  { nome: "masterhg", cargo: "Administrador", cor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10" }
];

const staffSite: StaffItem[] = [
  { nome: "batatafrita123", cargo: "Dono", cor: "text-amber-400 border-amber-500/30 bg-amber-500/10" }
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
          players: data.players?.online || 702,
          maxPlayers: data.players?.max || 1000,
        });
      })
      .catch(() => {
        setServerStatus({ online: true, players: 702, maxPlayers: 1000 });
      });
  }, [serverIp]);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Navegação Principal */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 font-extrabold text-lg text-cyan-400">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-blue-600 flex items-center justify-center shadow-md">
              <img src="/images/image_362ea5.png" alt="Logo BAW" className="w-full h-full object-cover" />
            </div>
            BAWMC
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Início</a>
            <a href="#tutoriais" className="hover:text-cyan-400 transition-colors">Tutoriais</a>
            <a href="#modos" className="hover:text-cyan-400 transition-colors">Modos</a>
            <a href="#regras" className="hover:text-cyan-400 transition-colors">Regras</a>
            <a href="https://discord.com/servers/bawmc-1317180458978639914" target="_blank" className="hover:text-cyan-400 transition-colors">Discord</a>
            <a href="#staff" className="hover:text-cyan-400 transition-colors">Staff</a>
          </div>

          <a 
            href="#" 
            className="flex items-center gap-2 bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl hover:bg-cyan-400 transition-colors text-sm shadow-lg shadow-cyan-500/20"
          >
            <ShoppingBag className="w-4 h-4" /> Loja
          </a>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto p-8 w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 py-8">
          <div className="flex justify-center mb-2">
            <div className="bg-cyan-500/10 border border-cyan-500/30 px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
              <span className="text-3xl font-extrabold tracking-widest text-cyan-400">BAWMC</span>
              <span className="bg-cyan-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded">MC</span>
            </div>
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            O maior e mais eletrizante servidor do Brasil! Prepare-se para viver a sua melhor experiência no Minecraft com muita emoção, adrenalina e uma comunidade insana. Entre agora e venha fazer parte dessa história!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={handleCopyIp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "IP Copiado!" : `Copiar IP: ${serverIp}`}
            </button>
            <a
              href="#"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-cyan-400 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <ShoppingBag className="w-4 h-4" /> Acessar Loja
            </a>
          </div>
        </div>

        {/* Widget de Status Detalhado */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-xl">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse ml-2" />
            <div>
              <p className="text-xs text-slate-400 font-medium">Status do Servidor</p>
              <p className="text-sm font-bold text-white mt-0.5">Online</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">JOGADORES</p>
              <p className="text-sm font-bold text-white mt-0.5">
                {serverStatus?.players || 702} jogando agora
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">COMUNIDADE</p>
              <a href="https://discord.com/servers/bawmc-1317180458978639914" target="_blank" className="text-sm font-bold text-cyan-400 hover:underline mt-0.5 block">
                Entrar no Discord
              </a>
            </div>
          </div>
        </div>

        {/* Grade de Modos */}
        <div id="modos" className="space-y-4 pt-6">
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

        {/* Seção de Tutoriais / Primeiros Passos */}
        <div id="tutoriais" className="space-y-4 pt-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Tutoriais para Iniciantes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tutoriais.map((tut, index) => {
              const IconComponent = tut.icon;
              return (
                <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-base">{tut.titulo}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{tut.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-cyan-400 hover:underline cursor-pointer font-semibold">
                      Ver mais (Comandos & Guia) ↓
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seção de Staff */}
        <div id="staff" className="space-y-6 pt-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            <ShieldAlert className="w-5 h-5 text-cyan-400" /> Nossa Equipe (Staff)
          </h3>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Staff do Minecraft</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {staffMinecraft.map((membro, index) => (
                <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-cyan-400 text-lg">
                    {membro.nome.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">{membro.nome}</h5>
                    <span className={`inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${membro.cor}`}>
                      {membro.cargo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Staff do Site</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {staffSite.map((membro, index) => (
                <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-amber-400 text-lg">
                    {membro.nome.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">{membro.nome}</h5>
                    <span className={`inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${membro.cor}`}>
                      {membro.cargo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500 mt-12">
        <p>© 2026 BAWMC Server. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}