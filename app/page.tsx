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
  ArrowRight,
  Search,
  Bell,
  Download,
  DollarSign,
  Gavel,
  Layers,
  Clock,
  Sparkles,
  Home as HomeIcon,
  Tag
} from "lucide-react";

interface ModoJogo {
  id: string;
  nome: string;
  iconeUrl: string;
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

// Notícias padrão
const NOTICIAS_PADRAO: Noticia[] = [
  {
    id: "1",
    titulo: "Lançamento do Novo Site Oficial!",
    conteudo: "Seja bem-vindo ao portal do BawMC! Acompanhe por aqui e no nosso Discord as novidades, eventos e atualizações que estão por vir.",
    tag: "Lançamento",
    data: "Hoje",
    link: "https://discord.gg/bawmc"
  },
  {
    id: "2",
    titulo: "Melhorias de Performance e Latência",
    conteudo: "Otimizamos nossos servidores para garantir o menor ping possível, jogabilidade fluida e zero lag em todos os modos de jogo.",
    tag: "Melhorias",
    data: "Recente",
    link: "https://discord.gg/bawmc"
  },
  {
    id: "3",
    titulo: "Sistemas Survival & Economia Ativos",
    conteudo: "O sistema de proteção por pá de ouro (/terreno), mercado de jogadores (/mercado) e evento Gladiador já estão funcionando perfeitamente!",
    tag: "Atualização",
    data: "Recente",
    link: "https://discord.gg/bawmc"
  }
];

// DADOS MOCKADOS: Schematics
const schematicCategories = ["Todos", "Bases", "Mobtraps", "Redstone", "Farm", "Decoração"];
const schematics = [
  { id: 1, name: "Base Survival Épica", author: "excambaw", downloads: 1240, type: "Bases", version: "1.20+", image: "https://images.unsplash.com/photo-1605639906660-f4b93b2a2651?q=80&w=400&h=250&fit=crop" },
  { id: 2, name: "Mobtrap de Esqueleto", author: "masterhg", downloads: 850, type: "Mobtraps", version: "1.19+", image: "https://images.unsplash.com/photo-1623933215907-744047a0c87d?q=80&w=400&h=250&fit=crop" },
  { id: 3, name: "Sistema de Armazém", author: "batatafrita123", downloads: 2100, type: "Redstone", version: "1.20+", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&h=250&fit=crop" },
  { id: 4, name: "Farm de Ferro Eficiente", author: "PlayerPro", downloads: 3420, type: "Farm", version: "1.20+", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=400&h=250&fit=crop" },
];

// DADOS MOCKADOS: Leilões
const auctionCategories = ["Todos", "Ferramentas", "Armaduras", "Blocos", "Itens Especiais", "Raros"];
const auctions = [
  { id: 1, name: "Picareta Eficiência V", seller: "masterhg", currentBid: 50000, buyout: 75000, timeLeft: "2h 15m", category: "Ferramentas", image: "https://cdn-icons-png.flaticon.com/512/8251/8251648.png" },
  { id: 2, name: "Armadura de Netherite Full", seller: "excambaw", currentBid: 250000, buyout: 300000, timeLeft: "45m", category: "Armaduras", image: "https://cdn-icons-png.flaticon.com/512/7504/7504060.png" },
  { id: 3, name: "Pack de Diamantes (64x)", seller: "Minerador01", currentBid: 15000, buyout: 20000, timeLeft: "5h 30m", category: "Blocos", image: "https://cdn-icons-png.flaticon.com/512/2850/2850893.png" },
  { id: 4, name: "Estrela do Nether", seller: "PvPMaster", currentBid: 100000, buyout: null, timeLeft: "12h 00m", category: "Itens Especiais", image: "https://cdn-icons-png.flaticon.com/512/10008/10008985.png" },
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [onlinePlayers, setOnlinePlayers] = useState<number | null>(null);
  const [isServerOnline, setIsServerOnline] = useState<boolean>(true);
  const [activeModal, setActiveModal] = useState<"regras" | null>(null);
  const [selectedModo, setSelectedModo] = useState<ModoJogo | null>(null);
  const [noticias, setNoticias] = useState<Noticia[]>(NOTICIAS_PADRAO);
  
  // Controle de navegação (Home vs Hub vs Schematics vs Auction)
  const [currentView, setCurrentView] = useState<"home" | "hub" | "schematics" | "auction">("home");

  // Filtros internos
  const [schemCategory, setSchemCategory] = useState("Todos");
  const [schemSearch, setSchemSearch] = useState("");
  const [auctionCategory, setAuctionCategory] = useState("Todos");
  const [auctionSearch, setAuctionSearch] = useState("");

  const SERVER_IP = "bawmc.net";

  const modosDeJogo: ModoJogo[] = [
    {
      id: "survival",
      nome: "Survival",
      iconeUrl: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png",
      corGlow: "from-emerald-500/20 via-emerald-500/10 to-transparent",
      corBorda: "border-emerald-500/40 hover:border-emerald-500",
      corTexto: "text-emerald-400",
      descricaoCurta: "Economia equilibrada, proteção de terrenos, kits e clans.",
      descricaoCompleta: "O modo Survival clássico reformulado para oferecer a melhor experiência competitiva e amigável.",
      recursos: ["Proteção por Terreno (/terreno)", "Economia Baseada em Jogadores", "Kits Diários e VIP", "Eventos Automáticos"]
    },
    {
      id: "pvp",
      nome: "Full PvP",
      iconeUrl: "https://cdn-icons-png.flaticon.com/512/3305/3305803.png",
      corGlow: "from-red-500/20 via-red-500/10 to-transparent",
      corBorda: "border-red-500/40 hover:border-red-500",
      corTexto: "text-red-400",
      descricaoCurta: "Ação frenética, gladiador semanal e kits customizados.",
      descricaoCompleta: "Teste suas habilidades de combate no X1, 1v1, e no temido evento Gladiador.",
      recursos: ["Glad Semanal com Premiação", "Sistema de X1 com Apostas", "Kits Balanceados", "Ranking de abates (Kills)"]
    },
    {
      id: "skyblock",
      nome: "SkyBlock",
      iconeUrl: "https://cdn-icons-png.flaticon.com/512/2619/2619586.png",
      corGlow: "from-sky-500/20 via-sky-500/10 to-transparent",
      corBorda: "border-sky-500/40 hover:border-sky-500",
      corTexto: "text-sky-400",
      descricaoCurta: "Ilha flutuante, missões, geradores customizados e minions.",
      descricaoCompleta: "Evolua sua ilha do zero, complete desafios épicos e domine o top ilhas do servidor.",
      recursos: ["Geradores Personalizados", "Missões Diárias", "Minions Auxiliares", "Loja de Ilha"]
    }
  ];

  useEffect(() => {
    // Buscar status do servidor Minecraft (Exemplo com api.mcsrvstat.us)
    fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.online) {
          setIsServerOnline(true);
          setOnlinePlayers(data.players.online);
        } else {
          setIsServerOnline(false);
          setOnlinePlayers(0);
        }
      })
      .catch(() => {
        setIsServerOnline(true);
        setOnlinePlayers(124); // Fallback visual
      });
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Filtragem de Schematics
  const filteredSchematics = schematics.filter((item) => {
    const matchesCat = schemCategory === "Todos" || item.type === schemCategory;
    const matchesSearch = item.name.toLowerCase().includes(schemSearch.toLowerCase()) || item.author.toLowerCase().includes(schemSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtragem de Leilões
  const filteredAuctions = auctions.filter((item) => {
    const matchesCat = auctionCategory === "Todos" || item.category === auctionCategory;
    const matchesSearch = item.name.toLowerCase().includes(auctionSearch.toLowerCase()) || item.seller.toLowerCase().includes(auctionSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-600/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-[600px] right-[-200px] w-[600px] h-[600px] bg-blue-600/5 blur-[180px] pointer-events-none rounded-full" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => setCurrentView("home")} 
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              B
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
                BAW<span className="text-emerald-400">MC</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                Network 1.20+
              </span>
            </div>
          </button>

          {/* Links de Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
            <button
              onClick={() => setCurrentView("home")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentView === "home" ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20" : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setCurrentView("hub")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                currentView === "hub" || currentView === "schematics" || currentView === "auction"
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Hub & Ferramentas
            </button>
            <a
              href="#modos"
              onClick={() => setCurrentView("home")}
              className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              Modos
            </a>
            <a
              href="#noticias"
              onClick={() => setCurrentView("home")}
              className="px-4 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
            >
              Notícias
            </a>
          </nav>

          {/* Ações Direitas (IP / Loja / Discord) */}
          <div className="flex items-center gap-3">
            <button
              onClick={copyIP}
              className="hidden sm:flex items-center gap-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 transition-all hover:border-emerald-500/50 group shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-emerald-400">{SERVER_IP}</span>
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />}
            </button>

            <a
              href="https://discord.gg/bawmc"
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Discord</span>
            </a>
          </div>
        </div>
      </header>

      {/* ROTEAMENTO DE TELA (HOME vs HUB vs SCHEMATICS vs AUCTION) */}

      {/* VIEW: HOME */}
      {currentView === "home" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* HERO SECTION */}
          <div className="text-center py-16 sm:py-24 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Servidor Atualizado para a Versão 1.20+
            </div>

            <h1 className="text-4xl sm:text-7xl font-black tracking-tight mb-6 leading-tight">
              A melhor experiência <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Minecraft Survival & PvP
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg mb-10 font-normal leading-relaxed">
              Entre em um universo sem lag, com economia equilibrada, sistemas exclusivos, eventos diários e uma comunidade incrível esperando por você.
            </p>

            {/* BOTÕES DO HERO */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={copyIP}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Wifi className="w-5 h-5" />
                {copied ? "IP Copiado com Sucesso!" : `Conectar (${SERVER_IP})`}
              </button>

              {/* BOTÃO NOVO PARA O HUB */}
              <button
                onClick={() => setCurrentView("hub")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-700/80 text-white font-bold text-sm flex items-center justify-center gap-3 transition-all hover:border-emerald-500/50 group shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                Hub (Schematics & Leilão)
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* STATUS RÁPIDO ONLINE */}
            <div className="mt-12 inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 shadow-sm">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>
                Jogadores Online: <strong className="text-white font-mono">{onlinePlayers !== null ? onlinePlayers : "Carregando..."}</strong>
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isServerOnline ? "Servidor Online" : "Instável"}
              </span>
            </div>
          </div>

          {/* MODOS DE JOGO */}
          <section id="modos" className="py-20 border-t border-slate-900">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Modos de Jogo Exclusivos</h2>
              <p className="text-slate-400 text-sm">Escolha sua aventura favorita e comece a jogar agora mesmo.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {modosDeJogo.map((modo) => (
                <div
                  key={modo.id}
                  onClick={() => setSelectedModo(modo)}
                  className={`relative p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border ${modo.corBorda} transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group overflow-hidden shadow-xl`}
                >
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${modo.corGlow} rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform`} />
                  
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                    <img src={modo.iconeUrl} alt={modo.nome} className="w-8 h-8 object-contain" />
                  </div>

                  <h3 className={`text-xl font-bold mb-2 ${modo.corTexto}`}>{modo.nome}</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">{modo.descricaoCurta}</p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 group-hover:text-white">
                    <span>Ver detalhes</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NOTÍCIAS RECENTES */}
          <section id="noticias" className="py-20 border-t border-slate-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">Últimas Notícias</h2>
                <p className="text-slate-400 text-sm">Fique por dentro de todas as atualizações do servidor.</p>
              </div>
              <a
                href="https://discord.gg/bawmc"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
              >
                <span>Ver canal no Discord</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {noticias.map((noticia) => (
                <div key={noticia.id} className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                        {noticia.tag}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {noticia.data}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{noticia.titulo}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">{noticia.conteudo}</p>
                  </div>
                  <a
                    href={noticia.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Ler completo no Discord</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* VIEW: HUB PRINCIPAL DE FERRAMENTAS */}
      {currentView === "hub" && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Ferramentas Exclusivas da Comunidade
            </div>
            <h1 className="text-3xl sm:text-5xl font-black mb-4">Hub BawMC</h1>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Escolha abaixo a ferramenta que deseja acessar para otimizar sua gameplay ou gerenciar seus itens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CARD SCHEMATICS */}
            <div
              onClick={() => setCurrentView("schematics")}
              className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-white">Schematics Hub</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Baixe construções prontas, bases seguras, mobtraps eficientes e sistemas avançados de redstone criados pela nossa comunidade.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Acessar Schematics</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* CARD LEILÃO */}
            <div
              onClick={() => setCurrentView("auction")}
              className="group relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Gavel className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-white">Leilão Online</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Acompanhe os leilões ativos no servidor em tempo real, veja lances atuais, itens raros à venda e planeje suas compras e vendas.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Acessar Leilão</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW: SCHEMATICS */}
      {currentView === "schematics" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Top Bar Interna */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <button
              onClick={() => setCurrentView("hub")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Voltar ao Hub
            </button>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              Schematics Disponíveis
            </h1>
          </div>

          {/* Barra de Pesquisa e Filtros */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar schematic ou autor..."
                value={schemSearch}
                onChange={(e) => setSchemSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {schematicCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSchemCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    schemCategory === cat ? "bg-emerald-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Schematics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSchematics.map((item) => (
              <div key={item.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group">
                <div>
                  <div className="relative h-40 overflow-hidden bg-slate-950">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-emerald-400 border border-slate-800">
                      {item.version}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest">{item.type}</span>
                    <h3 className="text-base font-bold text-white mt-1 mb-1">{item.name}</h3>
                    <p className="text-xs text-slate-400">Por <span className="text-slate-200 font-medium">{item.author}</span></p>
                  </div>
                </div>
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    {item.downloads} downs
                  </span>
                  <button className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20">
                    Baixar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* VIEW: LEILÕES */}
      {currentView === "auction" && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Top Bar Interna */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <button
              onClick={() => setCurrentView("hub")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Voltar ao Hub
            </button>
            <h1 className="text-2xl font-black text-white flex items-center gap-2">
              <Gavel className="w-6 h-6 text-amber-400" />
              Leilões Ativos no Servidor
            </h1>
          </div>

          {/* Barra de Pesquisa e Filtros */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar item ou vendedor..."
                value={auctionSearch}
                onChange={(e) => setAuctionSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
              {auctionCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAuctionCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    auctionCategory === cat ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Leilões */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAuctions.map((item) => (
              <div key={item.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {item.timeLeft}
                    </span>
                  </div>

                  <div className="w-16 h-16 mx-auto my-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  <h3 className="text-base font-bold text-white text-center mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-400 text-center mb-4">Vendedor: <span className="text-slate-200 font-medium">{item.seller}</span></p>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Lance Atual:</span>
                      <span className="font-mono font-bold text-emerald-400">${item.currentBid.toLocaleString()}</span>
                    </div>
                    {item.buyout && (
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Compre Agora:</span>
                        <span className="font-mono font-bold text-amber-400">${item.buyout.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20">
                  Dar Lance / Comprar
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* MODAL DETALHES DO MODO DE JOGO */}
      {selectedModo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedModo(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                <img src={selectedModo.iconeUrl} alt={selectedModo.nome} className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${selectedModo.corTexto}`}>{selectedModo.nome}</h3>
                <span className="text-xs text-slate-400">Modo Oficial BawMC</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-6 leading-relaxed">{selectedModo.descricaoCompleta}</p>

            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Recursos Principais:</h4>
            <ul className="space-y-2 mb-8">
              {selectedModo.recursos.map((recurso, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 bg-slate-950/60 px-3.5 py-2.5 rounded-xl border border-slate-800/80">
                  <Check className="w-4 h-4 text-emerald-400" />
                  {recurso}
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                setSelectedModo(null);
                copyIP();
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Wifi className="w-4 h-4" />
              Entrar e Jogar Agora
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                B
              </div>
              <span className="font-extrabold text-base tracking-wider text-white">BAWMC</span>
            </div>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} BawMC Network. Todos os direitos reservados. Não afiliado à Mojang AB.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="https://discord.gg/bawmc" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              Discord
            </a>
            <span>•</span>
            <button onClick={() => setCurrentView("hub")} className="hover:text-white transition-colors">
              Hub de Schematics & Leilão
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}