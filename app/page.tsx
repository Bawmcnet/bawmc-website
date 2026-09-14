/* eslint-disable @next/next/no-img-element */
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
  MessageSquare,
  X,
  ShoppingBag,
  ChevronRight,
  FileText,
  Compass,
  Info,
  ArrowRight
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

interface Noticia {
  id: string;
  titulo: string;
  conteudo: string;
  tag: string;
  data: string;
  link: string;
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [isServerOnline, setIsServerOnline] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<"terrenos" | "regras" | null>(null);
  const [selectedModo, setSelectedModo] = useState<ModoJogo | null>(null);

  // Notícias do Discord/API
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loadingNoticias, setLoadingNoticias] = useState<boolean>(true);

  const SERVER_IP = "bawmc.net";

  // Lista dos Modos de Jogo
  const modosDeJogo: ModoJogo[] = [
    {
      id: "survival",
      nome: "Survival",
      icone: "⛏️",
      corGlow: "from-amber-500/20 via-amber-500/10 to-transparent",
      corBorda: "border-amber-500/40 hover:border-amber-500",
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
      corGlow: "from-red-500/20 via-red-500/10 to-transparent",
      corBorda: "border-red-500/40 hover:border-red-500",
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
      corGlow: "from-rose-500/20 via-rose-500/10 to-transparent",
      corBorda: "border-rose-500/40 hover:border-rose-500",
      corTexto: "text-rose-400",
      descricaoCurta: "Roube corações ao eliminar jogadores nas arenas.",
      descricaoCompleta: "Um modo de PvP de altíssima tensão! A cada jogador que você elimina, você rouba 1 coração máximo dele. Se perder todos os seus corações, você ficará temporariamente fora de jogo até ser revivido com um item especial!",
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
      corGlow: "from-emerald-500/20 via-emerald-500/10 to-transparent",
      corBorda: "border-emerald-500/40 hover:border-emerald-500",
      corTexto: "text-emerald-400",
      descricaoCurta: "Treine PvP 1v1, Crystal PvP e Netherite sem perder itens.",
      descricaoCompleta: "Arena de treinamento ideal para treinar suas habilidades sem risco de perder seus itens do inventário. Desafie amigos para duelos 1v1 ou entre na fila ranked de Crystal PvP e Sword.",
      recursos: [
        "Modos: Crystal, Netherite, Sword, Pot e Boxing",
        "Sistema de Ranking (ELO) e placar de líderes",
        "Sem perda de inventário após as partidas",
        "Partidas personalizadas contra amigos (/duel)"
      ]
    }
  ];

  // Status do Minecraft API
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

  // API de Notícias
  useEffect(() => {
    fetch("/api/noticias")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNoticias(data);
        }
        setLoadingNoticias(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar notícias:", err);
        setLoadingNoticias(false);
      });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "lançamento":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "melhorias":
        return "bg-cyan-500/10 border-cyan-500/30 text-cyan-400";
      case "manutenção":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      default:
        return "bg-indigo-500/10 border-indigo-500/30 text-indigo-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Toast Cópia IP */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-black px-5 py-3 rounded-full font-bold shadow-lg shadow-cyan-500/30 flex items-center gap-2 animate-bounce">
          <Check size={18} />
          <span>IP copiado com sucesso! ({SERVER_IP})</span>
        </div>
      )}

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo do Header usando BAWmc.png */}
            <img src="/BAWmc.png" alt="BAWMC Logo" className="h-10 w-auto object-contain" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#inicio" className="hover:text-cyan-400 transition-colors">Início</a>
            <a href="#noticias" className="hover:text-cyan-400 transition-colors">Notícias</a>
            <a href="#modos" className="hover:text-cyan-400 transition-colors">Modos</a>
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
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 text-sm"
          >
            <ShoppingBag size={18} />
            Loja
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="inicio" className="relative py-16 md:py-24 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0e1422] via-[#07090e] to-[#07090e]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
            
            <div className="lg:col-span-7 text-center lg:text-left">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
                🎮 Servidor Oficial de Minecraft
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                Servidor oficial do <span className="text-cyan-400">BawMC!</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                O maior e mais eletrizante servidor do Brasil! Prepare-se para viver a sua melhor experiência no Minecraft com muita emoção, adrenalina e uma comunidade insana.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={copyToClipboard}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-7 py-3.5 rounded-xl transition-all flex items-center gap-3 shadow-lg shadow-cyan-500/25 cursor-pointer text-base"
                >
                  <Copy size={18} />
                  <span>Copiar IP: {SERVER_IP}</span>
                </button>

                <a
                  href="https://loja.bawmc.net"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#0f1524] hover:bg-[#161f36] text-white border border-white/10 font-semibold px-7 py-3.5 rounded-xl transition-all flex items-center gap-2 text-base"
                >
                  <ShoppingBag size={18} className="text-cyan-400" />
                  <span>Acessar Loja</span>
                </a>
              </div>
            </div>

            {/* LOGO PRINCIPAL (Hero) usando BAWmc.png */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group flex justify-center items-center">
                <div className="absolute inset-0 bg-cyan-500/25 blur-3xl rounded-full group-hover:bg-cyan-500/40 transition-all duration-500 scale-110" />
                <img
                  src="/BAWmc.png"
                  alt="BAWMC Logo"
                  className="relative w-full max-w-xs sm:max-w-md object-contain drop-shadow-[0_0_35px_rgba(6,182,212,0.6)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

          </div>

          {/* STATUS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="bg-[#0d121d]/90 border border-white/5 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                <Wifi size={22} />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Status do Servidor</span>
                <span className="text-base font-bold text-emerald-400 flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isServerOnline ? "Online e Estável" : "Em Manutenção"}
                </span>
              </div>
            </div>

            <div className="bg-[#0d121d]/90 border border-white/5 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400">
                <Users size={22} />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">JOGADORES</span>
                <span className="text-base font-bold text-white mt-0.5 block">
                  {onlinePlayers !== null ? `${onlinePlayers} jogando agora` : "Carregando..."}
                </span>
              </div>
            </div>

            <a
              href="https://discord.gg/bawmc"
              target="_blank"
              rel="noreferrer"
              className="bg-[#0d121d]/90 border border-white/5 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm hover:border-cyan-500/30 transition-all group"
            >
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                <MessageSquare size={22} />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">COMUNIDADE</span>
                <span className="text-base font-bold text-indigo-400 flex items-center gap-1 mt-0.5">
                  Entrar no Discord <ChevronRight size={16} />
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

        {loadingNoticias ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-[#0d121d] border border-white/5 rounded-2xl p-6 h-48 animate-pulse flex flex-col justify-between">
                <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
                <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/10 rounded w-full mb-2" />
                <div className="h-4 bg-white/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {noticias.map((item) => (
              <div key={item.id} className="bg-[#0d121d] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/10 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`border text-xs font-bold px-3 py-1 rounded-full ${getTagStyle(item.tag)}`}>
                      {item.tag}
                    </span>
                    <span className="text-xs text-slate-500">{item.data}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.titulo}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {item.conteudo}
                  </p>
                </div>
                <a href={item.link} target="_blank" rel="noreferrer" className="text-cyan-400 font-semibold text-sm hover:underline flex items-center gap-1">
                  Ler no Discord <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* MODOS DE JOGO */}
      <section id="modos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center justify-center md:justify-start gap-3">
            <Compass className="text-cyan-400" /> Modos de Jogo
          </h2>
          <p className="text-slate-400 text-sm mt-1">Conheça cada um dos nossos modos e suas dinâmicas</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {modosDeJogo.map((modo) => (
            <div
              key={modo.id}
              className="bg-[#0c1017] border border-white/5 rounded-2xl p-4 flex items-center gap-4 hover:border-white/10 transition-all group relative overflow-hidden"
            >
              <div className={`w-24 h-24 rounded-xl bg-gradient-to-br ${modo.corGlow} border ${modo.corBorda} flex items-center justify-center shrink-0 shadow-lg relative group-hover:scale-105 transition-transform`}>
                <span className="text-4xl drop-shadow-md select-none">{modo.icone}</span>
              </div>

              <div className="flex flex-col justify-between h-full py-1 grow">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                    {modo.nome}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {modo.descricaoCurta}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedModo(modo)}
                  className="mt-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center justify-between w-full group/btn"
                >
                  <span>Ver informações</span>
                  <ArrowRight size={14} className="text-cyan-400 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
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
          <div className="bg-[#0d121d] border border-white/5 rounded-2xl p-6">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400 font-bold mb-4 text-xl">
              🔑
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Registro de Conta</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Use <code className="bg-black/50 text-cyan-400 px-1.5 py-0.5 rounded">/register senha senha</code> para criar sua conta e <code className="bg-black/50 text-cyan-400 px-1.5 py-0.5 rounded">/login senha</code> ao entrar.
            </p>
          </div>

          <div className="bg-[#0d121d] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
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

          <div className="bg-[#0d121d] border border-white/5 rounded-2xl p-6">
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
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">STAFF DO MINECRAFT</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#0d121d] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                <img src="https://mc-heads.net/avatar/excambaw/64" alt="Skin excambaw" className="w-12 h-12 rounded-xl" />
                <div>
                  <h4 className="font-bold text-white text-base">excambaw</h4>
                  <span className="bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Dono</span>
                </div>
              </div>

              <div className="bg-[#0d121d] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                <img src="https://mc-heads.net/avatar/masterhg/64" alt="Skin masterhg" className="w-12 h-12 rounded-xl" />
                <div>
                  <h4 className="font-bold text-white text-base">masterhg</h4>
                  <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">Administrador</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">STAFF DO SITE</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-[#0d121d] border border-white/5 rounded-2xl p-4 flex items-center gap-4">
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
      <footer className="bg-[#04060a] py-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <img src="/BAWmc.png" alt="BAWMC Logo" className="h-8 w-auto object-contain" />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-2">
                Loja do servidor de Minecraft BawMC. Adquira VIPs, Gemas, Unbans e muito mais!
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
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.33-6.33V8.8a8.3 8.3 0 0 0 4.67 1.45V6.8a4.86 4.86 0 0 1-.75-.11z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* MODAL MODO DE JOGO */}
      {selectedModo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d121d] border border-white/10 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedModo(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedModo.corGlow} border ${selectedModo.corBorda} flex items-center justify-center text-3xl shadow-lg`}>
                {selectedModo.icone}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Modo de Jogo</span>
                <h3 className={`text-2xl font-black ${selectedModo.corTexto}`}>{selectedModo.nome}</h3>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-black/40 p-4 rounded-2xl border border-white/5">
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
          <div className="bg-[#0d121d] border border-white/10 rounded-2xl max-w-lg w-full p-6 relative">
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
              <p>1. Respeite todos os jogadores e membros da equipe no servidor e no Discord.</p>
              <p>2. Proibido o uso de qualquer tipo de hack, client modificado ou vantagem injusta.</p>
              <p>3. Respeite o limite de terrenos e construções perto das áreas protegidas do spawn.</p>
              <p>4. Divulgação de outros servidores de Minecraft resulta em banimento permanente.</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}