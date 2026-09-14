"use client";

import React, { useState, useEffect } from "react";
import {
  Wifi,
  Users,
  Copy,
  Check,
  ExternalLink,
  Shield,
  BookOpen,
  Sword,
  MessageSquare,
  X,
  Youtube,
  Tiktok,
  ShoppingBag,
  ChevronRight,
  FileText,
  Compass,
  Info
} from "lucide-react";

interface ModoJogo {
  id: string;
  nome: string;
  icone: string;
  corGlow: string;
  corBorda: string;
  corTexto: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  recursos: string[];
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [isServerOnline, setIsServerOnline] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<"terrenos" | "regras" | null>(null);
  const [selectedModo, setSelectedModo] = useState<ModoJogo | null>(null);

  const SERVER_IP = "bawmc.net";

  // Lista dos Modos de Jogo com detalhes completos
  const modosDeJogo: ModoJogo[] = [
    {
      id: "survival",
      nome: "Survival",
      icone: "⛏️",
      corGlow: "from-amber-500/20 to-amber-900/10",
      corBorda: "border-amber-500/40 hover:border-amber-500/60",
      corTexto: "text-amber-400",
      descricaoCurta: "Economia equilibrada, proteção de terrenos e empregos.",
      descricaoCompleta: "O modo Survival do BawMC oferece uma experiência clássica aprimorada! Monte sua base com total segurança usando a pá de ouro, trabalhe em profissões (/jobs) para gerar dinheiro, e negocie seus itens no mercado entre jogadores.",
      recursos: [
        "Proteção de terrenos fácil com a Pá de Ouro (/terreno)",
        "Sistema de Empregos (/jobs) com evolução de nível",
        "Mercado livre entre jogadores (/mercado)",
        "Mineração otimizada com geradores e conquistas"
      ]
    },
    {
      id: "semi-anarquia",
      nome: "Semi-Anarquia",
      icone: "🧨",
      corGlow: "from-red-500/20 to-red-900/10",
      corBorda: "border-red-500/40 hover:border-red-500/60",
      corTexto: "text-red-400",
      descricaoCurta: "PvP liberado, invasões a bases e ação sem limites.",
      descricaoCompleta: "Modo focado na sobrevivência raiz! Aqui o PvP é ativado no mundo inteiro, bases podem ser invadidas com TNT e a confiança é o seu bem mais precioso. Monte seu clã e domine os recursos mais raros.",
      recursos: [
        "PvP 24/7 liberado no mapa principal",
        "Invasões e destruição com TNT e canhões",
        "Clãs e guerras por áreas estratégicas",
        "Drops de suprimentos (Airdrops) pelo mapa"
      ]
    },
    {
      id: "lifesteal",
      nome: "Lifesteal",
      icone: "❤️",
      corGlow: "from-rose-500/20 to-rose-900/10",
      corBorda: "border-rose-500/40 hover:border-rose-500/60",
      corTexto: "text-rose-400",
      descricaoCurta: "Roube corações ao eliminar jogadores nas arenas.",
      descricaoCompleta: "Um modo de PvP de altíssima tensão! A cada jogador que você elimina, você rouba 1 coração máximo dele. Se perder todos os seus corações, você ficará temporariamente fora de jogo até ser revivido com um item especial de Farol!",
      recursos: [
        "Mecânica de roubo de vida por kill",
        "Criação de corações extras via crafting",
        "Arenas PvP customizadas com drops raros",
        "Reviva aliados usando o Farol de Almas"
      ]
    },
    {
      id: "practice",
      nome: "Practice & Crystal",
      icone: "💎",
      corGlow: "from-emerald-500/20 to-emerald-900/10",
      corBorda: "border-emerald-500/40 hover:border-emerald-500/60",
      corTexto: "text-emerald-400",
      descricaoCurta: "Treine PvP 1v1, Crystal PvP e Netherite sem perder itens.",
      descricaoCompleta: "Arena de treinamento ideal para treinar suas habilidades sem risco de perder seus itens do inventário. Desafie amigos para duelos 1v1 ou entre na fila ranked de Crystal PvP e Sword.",
      recursos: [
        "Modos: Crystal, Netherite, Sword, Pot e Boxing",
        "Sistema de Ranking (ELO) e placar de líderes",
        "Sem perda de inventário após as partidas",
        "Partidas personalizadas contra amigos (/duel)"
      ]
    },
    {
      id: "clas",
      nome: "Clãs & Guerras",
      icone: "🛡️",
      corGlow: "from-purple-500/20 to-purple-900/10",
      corBorda: "border-purple-500/40 hover:border-purple-500/60",
      corTexto: "text-purple-400",
      descricaoCurta: "Crie sua facção, junte aliados e domine o servidor.",
      descricaoCompleta: "Junte seus amigos, crie um Clã lendário e dispute o topo do servidor! Clãs acumulam pontos através de kills, eventos dominados e missões diárias.",
      recursos: [
        "Comandos completos de Clã (/clan criar, /clan convidav)",
        "Chat privado exclusivo para membros do clã",
        "Banco de coins e baú compartilhado do Clã",
        "Premiação em dinheiro/VIPS para o Clã #1 da temporada"
      ]
    },
    {
      id: "eventos",
      nome: "Eventos Diários",
      icone: "⚔️",
      corGlow: "from-cyan-500/20 to-cyan-900/10",
      corBorda: "border-cyan-500/40 hover:border-cyan-500/60",
      corTexto: "text-cyan-400",
      descricaoCurta: "Gladiador, Parkour, Mina VIP e Bosses automáticos.",
      descricaoCompleta: "Diversão e recompensas garantidas todos os dias! Nossos eventos automáticos acontecem em horários fixos e garantem prêmios valiosos como Chaves de Caixas, Coins e Itens Únicos.",
      recursos: [
        "Evento Gladiador semanal com arena gigante",
        "Parkour valendo prêmios em moedas",
        "Bosses Míticos que nascem no mundo com drops raros",
        "Evento Resta Um, Fight e Batata Quente"
      ]
    }
  ];

  // Buscar status em tempo real do servidor
  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.online) {
          setIsServerOnline(true);
          setOnlinePlayers(data.players.online);
        } else {
          setIsServerOnline(false);
          setOnlinePlayers(0);
        }
      })
      .catch(() => {
        setIsServerOnline(false);
        setOnlinePlayers(0);
      });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Toast de Cópia de IP */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-black px-5 py-3 rounded-full font-bold shadow-lg shadow-cyan-500/30 flex items-center gap-2 animate-bounce">
          <Check size={18} />
          <span>IP copiado com sucesso! ({SERVER_IP})</span>
        </div>
      )}

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#080b11]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400 font-black text-xl shadow-inner">
              B
            </div>
            <span className="font-extrabold text-2xl tracking-wide text-white">
              BAW<span className="text-cyan-400">MC</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#inicio" className="hover:text-cyan-400 transition-colors">Início</a>
            <a href="#noticias" className="hover:text-cyan-400 transition-colors">Notícias</a>
            <a href="#modos" className="hover:text-cyan-400 transition-colors">Modos de Jogo</a>
            <a href="#tutoriais" className="hover:text-cyan-400 transition-colors">Tutoriais</a>
            <button onClick={() => setActiveModal("regras")} className="hover:text-cyan-400 transition-colors">
              Regras
            </button>
            <a href="https://discord.gg/bawmc" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              Discord
            </a>
            <a href="#staff" className="hover:text-cyan-400 transition-colors">Staff</a>
          </nav>

          <a
            href="https://loja.bawmc.net"
            target="_blank"
            rel="noreferrer"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 text-sm"
          >
            <ShoppingBag size={18} />
            Loja Oficial
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative py-20 md:py-28 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0e131f] to-[#080b11]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          
          <div className="mb-6 relative group">
            <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full group-hover:bg-cyan-500/30 transition-all" />
            <div className="relative text-5xl md:text-7xl font-black tracking-wider text-cyan-400 drop-shadow-[0_0_25px_rgba(6,182,212,0.5)]">
              BAW<span className="text-white">MC</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-white max-w-3xl leading-tight mb-4">
            Sua melhor experiência no Minecraft Survival & PVP!
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            Prepare-se para viver momentos eletrizantes com economia equilibrada, sistemas exclusivos, eventos diários e uma comunidade incrível.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={copyToClipboard}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-7 py-3.5 rounded-full transition-all flex items-center gap-3 shadow-lg shadow-cyan-500/25 cursor-pointer text-base"
            >
              <Copy size={20} />
              <span>Copiar IP: {SERVER_IP}</span>
            </button>

            <a
              href="https://loja.bawmc.net"
              target="_blank"
              rel="noreferrer"
              className="bg-[#131926] hover:bg-[#1a2234] text-white border border-white/10 font-semibold px-7 py-3.5 rounded-full transition-all flex items-center gap-2 text-base"
            >
              <ShoppingBag size={18} className="text-cyan-400" />
              <span>Acessar Loja</span>
            </a>
          </div>

          {/* STATUS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl text-left">
            <div className="bg-[#0f1420]/80 border border-white/5 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <Wifi size={24} />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Status do Servidor</span>
                <span className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isServerOnline ? "Online e Estável" : "Em Manutenção"}
                </span>
              </div>
            </div>

            <div className="bg-[#0f1420]/80 border border-white/5 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
                <Users size={24} />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Jogadores Conectados</span>
                <span className="text-lg font-bold text-white">
                  {onlinePlayers !== null ? `${onlinePlayers} jogando agora` : "Carregando..."}
                </span>
              </div>
            </div>

            <a
              href="https://discord.gg/bawmc"
              target="_blank"
              rel="noreferrer"
              className="bg-[#0f1420]/80 border border-white/5 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm hover:border-cyan-500/30 transition-all group"
            >
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Comunidade Discord</span>
                <span className="text-lg font-bold text-indigo-400 flex items-center gap-1">
                  Entrar no Server <ChevronRight size={18} />
                </span>
              </div>
            </a>
          </div>

        </div>
      </section>

      {/* NOTÍCIAS */}
      <section id="noticias" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
              <FileText className="text-cyan-400" /> Mural de Notícias
            </h2>
            <p className="text-slate-400 text-sm mt-1">Fique por dentro das últimas atualizações do servidor</p>
          </div>
          <a
            href="https://discord.gg/bawmc"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 hidden sm:flex"
          >
            Ver avisos no Discord <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f1420] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
                  Lançamento
                </span>
                <span className="text-xs text-slate-500">Hoje</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Nova Temporada Lifesteal & Arenas</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Lançamos oficialmente o modo Lifesteal reformulado com novo sistema de corações por kill, kits ajustados e mapa zerado!
              </p>
            </div>
            <a href="https://discord.gg/bawmc" target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold text-sm hover:underline flex items-center gap-1">
              Ler no Discord <ExternalLink size={14} />
            </a>
          </div>

          <div className="bg-[#0f1420] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full">
                  Melhorias
                </span>
                <span className="text-xs text-slate-500">Ontem</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Otimizações e Ajuste no Mercado</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Corrigimos instabilidades no comando /mercado, reduzimos o delay do teleport (/tpa) e aumentamos o limite de proteção.
              </p>
            </div>
            <a href="https://discord.gg/bawmc" target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold text-sm hover:underline flex items-center gap-1">
              Ler no Discord <ExternalLink size={14} />
            </a>
          </div>

          <div className="bg-[#0f1420] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                  Manutenção
                </span>
                <span className="text-xs text-slate-500">12/09/2026</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Manutenção Preventiva Concluída</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                A máquina dedicada passou por otimizações de rede para estabilização de ping e proteção avançada contra ataques DDoS.
              </p>
            </div>
            <a href="https://discord.gg/bawmc" target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold text-sm hover:underline flex items-center gap-1">
              Ler no Discord <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* MODOS DE JOGO (CLIQUE ABRE MODAL COM DETALHES) */}
      <section id="modos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center md:justify-start gap-3">
            <Compass className="text-cyan-400" /> Modos de Jogo
          </h2>
          <p className="text-slate-400 text-sm mt-1">Clique em qualquer modo para ver informações e detalhes completos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modosDeJogo.map((modo) => (
            <div
              key={modo.id}
              onClick={() => setSelectedModo(modo)}
              className="bg-[#0f1420] border border-white/5 rounded-2xl p-5 flex items-center justify-between transition-all cursor-pointer hover:scale-[1.02] hover:bg-[#131928] group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${modo.corGlow} border ${modo.corBorda} flex items-center justify-center shadow-lg transition-transform group-hover:scale-105`}>
                  <span className="text-3xl">{modo.icone}</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                    {modo.nome}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5 line-clamp-1 max-w-[180px]">
                    {modo.descricaoCurta}
                  </p>
                </div>
              </div>

              <button className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-full transition-all flex items-center gap-1 shrink-0">
                Ver mais <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TUTORIAIS */}
      <section id="tutoriais" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center md:justify-start gap-3">
            <BookOpen className="text-cyan-400" /> Tutoriais para Iniciantes
          </h2>
          <p className="text-slate-400 text-sm mt-1">Aprenda os comandos principais para começar a jogar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f1420] border border-white/5 rounded-2xl p-6">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400 font-bold mb-4 text-xl">
              🔑
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Registro de Conta</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Use <code className="bg-black/50 text-cyan-400 px-1.5 py-0.5 rounded">/register senha senha</code> para criar sua conta e <code className="bg-black/50 text-cyan-400 px-1.5 py-0.5 rounded">/login senha</code> ao entrar.
            </p>
          </div>

          <div className="bg-[#0f1420] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center text-emerald-400 font-bold mb-4 text-xl">
                🏠
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Proteção de Terrenos</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Use <code className="bg-black/50 text-cyan-400 px-1.5 py-0.5 rounded">/terreno</code> para pegar a pá de ouro e proteger suas construções.
              </p>
            </div>
            <button
              onClick={() => setActiveModal("terrenos")}
              className="border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 font-bold text-xs px-4 py-2.5 rounded-xl transition-all w-full text-center"
            >
              Ver Guia de Proteção ↓
            </button>
          </div>

          <div className="bg-[#0f1420] border border-white/5 rounded-2xl p-6">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center text-purple-400 font-bold mb-4 text-xl">
              💲
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Economia & Lucro</h3>
            <ul className="text-slate-400 text-xs space-y-2">
              <li><code className="text-cyan-400">/mercado</code> : Mercado de jogadores</li>
              <li><code className="text-cyan-400">/venda</code> : Venda itens no servidor</li>
              <li><code className="text-cyan-400">/vender [valor]</code> : Anuncie com o item na mão</li>
            </ul>
          </div>
        </div>
      </section>

      {/* STAFF */}
      <section id="staff" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
            <Shield className="text-cyan-400" /> Nossa Equipe (Staff)
          </h2>
          <p className="text-slate-400 text-sm mt-1">Responsáveis pela administração do servidor e do site</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Staff do Minecraft</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#0f1420] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                <img src="https://mc-heads.net/avatar/excambaw/64" alt="Skin excambaw" className="w-12 h-12 rounded-xl" />
                <div>
                  <h4 className="font-bold text-white text-base">excambaw</h4>
                  <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Dono</span>
                </div>
              </div>

              <div className="bg-[#0f1420] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                <img src="https://mc-heads.net/avatar/masterhg/64" alt="Skin masterhg" className="w-12 h-12 rounded-xl" />
                <div>
                  <h4 className="font-bold text-white text-base">masterhg</h4>
                  <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Administrador</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Staff do Site</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#0f1420] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                <img src="https://mc-heads.net/avatar/batatafrita123/64" alt="Skin batatafrita123" className="w-12 h-12 rounded-xl" />
                <div>
                  <h4 className="font-bold text-white text-base">batatafrita123</h4>
                  <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Dono do Site</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#05070c] py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center text-cyan-400 font-black text-lg">
                  B
                </div>
                <span className="font-extrabold text-xl text-white">BawMC</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-2">
                Loja do servidor de Minecraft BawMC. Adquira Vips, Unban, Gemas e mais!
              </p>
              <p className="text-slate-500 text-[11px] mb-4">
                Não somos associados, afiliados pela Mojang Studios ou Microsoft.
              </p>
              <p className="text-xs text-slate-300">
                Email: <a href="mailto:suporte@bawmc.net" className="text-cyan-400 hover:underline">suporte@bawmc.net</a>
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 text-xs">
              <span className="font-bold text-white text-sm mb-1">Acesse:</span>
              <a href="#inicio" className="hover:text-cyan-400 transition-colors">Página Inicial</a>
              <a href="https://loja.bawmc.net" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">Nossa Loja</a>
              <button onClick={() => setActiveModal("regras")} className="hover:text-cyan-400 transition-colors">
                Termos de Serviço
              </button>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Copyright © 2026 BawMC. Todos os direitos reservados.
            </p>

            <div className="flex items-center gap-5 text-slate-400">
              <a href="https://discord.gg/bawmc" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <MessageSquare size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
                <Tiktok size={20} />
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* MODAL DE INFORMAÇÕES DO MODO DE JOGO */}
      {selectedModo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f1420] border border-white/10 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedModo(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedModo.corGlow} border ${selectedModo.corBorda} flex items-center justify-center text-3xl`}>
                {selectedModo.icone}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Modo de Jogo</span>
                <h3 className={`text-2xl font-black ${selectedModo.corTexto}`}>{selectedModo.nome}</h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-black/30 p-4 rounded-xl border border-white/5">
              {selectedModo.descricaoCompleta}
            </p>

            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Info size={14} className="text-cyan-400" /> Destaques e Recursos:
            </h4>

            <ul className="space-y-2 mb-6">
              {selectedModo.recursos.map((recurso, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{recurso}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-2"
              >
                <Copy size={16} /> Copiar IP para Jogar
              </button>
              <button
                onClick={() => setSelectedModo(null)}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-xl transition-all text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE REGRAS */}
      {activeModal === "regras" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f1420] border border-white/10 rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="text-cyan-400" /> Regras do Servidor
            </h3>
            <div className="space-y-3 text-xs text-slate-300 max-h-80 overflow-y-auto pr-2">
              <p><strong>1. Trapaças e Hacks:</strong> Proibido o uso de clientes modificados, KillAura, Fly, AutoClick superior a 15 CPS ou qualquer vantagem injusta.</p>
              <p><strong>2. Respeito & Conduta:</strong> Proibido ofensas graves, discriminação, racismo, ameaças ou divulgação de outros servidores no chat.</p>
              <p><strong>3. Exploit de Bugs:</strong> Abusar de falhas no jogo para duplicar itens ou se beneficiar resultará em banimento permanente.</p>
              <p><strong>4. Segurança de Conta:</strong> Sua conta é de sua inteira responsabilidade. Não compartilhe sua senha.</p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full bg-cyan-500 text-black font-bold py-2.5 rounded-xl hover:bg-cyan-400 transition-all text-xs"
            >
              Entendi as Regras
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE TERRENOS */}
      {activeModal === "terrenos" && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f1420] border border-white/10 rounded-2xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="text-emerald-400" /> Guia de Proteção
            </h3>
            <div className="space-y-3 text-xs text-slate-300 max-h-80 overflow-y-auto pr-2">
              <p><strong>Passo 1:</strong> Digite <code className="text-cyan-400">/terreno</code> para receber a Pá de Ouro.</p>
              <p><strong>Passo 2:</strong> Clique com o botão direito com a pá na mão em um canto da sua construção e depois no canto oposto.</p>
              <p><strong>Comandos Úteis:</strong></p>
              <ul className="list-disc pl-5 space-y-1 text-slate-400">
                <li><code className="text-cyan-400">/trust [nick]</code> : Dá permissão total ao amigo.</li>
                <li><code className="text-cyan-400">/untrust [nick]</code> : Remove a permissão do amigo.</li>
                <li><code className="text-cyan-400">/abandonarclaim</code> : Deleta a proteção atual.</li>
              </ul>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full bg-emerald-500 text-black font-bold py-2.5 rounded-xl hover:bg-emerald-400 transition-all text-xs"
            >
              Fechar Guia
            </button>
          </div>
        </div>
      )}

    </div>
  );
}