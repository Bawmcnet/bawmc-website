"use client";

import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  Download, 
  ChevronDown, 
  DollarSign, 
  Gavel, 
  Layers, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  Flame,
  Home as HomeIcon
} from "lucide-react";

export default function Home() {
  // Controle de Tela: 'home' | 'schematics' | 'auction'
  const [currentView, setCurrentView] = useState<"home" | "schematics" | "auction">("home");

  // Estados de Filtros e Busca de Schematics
  const [schematicsCategory, setSchematicsCategory] = useState("All categories");
  const [schematicsSearch, setSchematicsSearch] = useState("");

  // Estados de Filtros e Busca do Leilão
  const [auctionCategory, setAuctionCategory] = useState("Todos");
  const [auctionSearch, setAuctionSearch] = useState("");

  // --- DADOS DOS SCHEMATICS ---
  const schematicCategories = [
    "All categories",
    "Farms",
    "Stashes",
    "Traps",
    "Redstone",
    "Decorations",
    "Misc",
    "Drainers",
    "Flooders",
    "Gambling Bases"
  ];

  const schematics = [
    {
      id: 1,
      title: "Small Fast Kelp Farm",
      category: "Farms",
      downloads: "19,080",
      cost: "$84,999.36",
      author: "TheCommand",
      badge: "10M PER HOUR",
      badgeColor: "bg-emerald-500",
      image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Beginner Bonemeal Farm",
      category: "Farms",
      downloads: "17,988",
      cost: "$707,725.56",
      author: "kekw kekw",
      badge: "BAWMC BUILD",
      badgeColor: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Farex's stash",
      category: "Stashes",
      downloads: "14,357",
      cost: "$3,299,061.53",
      author: "btwreynahd",
      badge: "UNRAIDABLE",
      badgeColor: "bg-purple-600",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Auto regear by Hendog official",
      category: "Redstone",
      downloads: "10,462",
      cost: "$101,438.75",
      author: "Smizley",
      badge: "AUTO REGEAR",
      badgeColor: "bg-rose-600",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Fast & Efficient Bonemeal Farm",
      category: "Farms",
      downloads: "10,033",
      cost: "$327,971.87",
      author: "TheCommand",
      badge: "100M PER HOUR",
      badgeColor: "bg-amber-500",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Rail gun Trap",
      category: "Traps",
      downloads: "7,956",
      cost: "$113,707.17",
      author: "Nateox303YTz",
      badge: "CRAZY TRAP",
      badgeColor: "bg-red-600",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  // --- DADOS DO LEILÃO (AUCTION) ---
  const auctionCategories = ["Todos", "Armas", "Armaduras", "Kits", "Itens Raros", "Shulkers"];

  const auctions = [
    {
      id: 101,
      title: "Set God Proteção IV V6 (Netherite)",
      category: "Armaduras",
      currentBid: "$450,000",
      buyout: "$600,000",
      timeLeft: "01h 12m",
      bidsCount: 14,
      seller: "PvPKiller_99",
      rarity: "LENDÁRIO",
      rarityColor: "bg-amber-500",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 102,
      title: "Full Shulker Box de Totems da Eternidade",
      category: "Shulkers",
      currentBid: "$1,200,000",
      buyout: "$1,500,000",
      timeLeft: "00h 24m",
      bidsCount: 29,
      seller: "StashMaster",
      rarity: "MÍTICO",
      rarityColor: "bg-purple-600",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 103,
      title: "Espada Netherite Afiação V + Aspecto Flamejante",
      category: "Armas",
      currentBid: "$280,000",
      buyout: "$350,000",
      timeLeft: "03h 45m",
      bidsCount: 8,
      seller: "LordBawmc",
      rarity: "RARO",
      rarityColor: "bg-blue-600",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 104,
      title: "Kit Raiding Completo (Obsidian + C4 Redstone)",
      category: "Kits",
      currentBid: "$890,000",
      buyout: "$1,000,000",
      timeLeft: "05h 10m",
      bidsCount: 19,
      seller: "TeamDrain_Leader",
      rarity: "LENDÁRIO",
      rarityColor: "bg-amber-500",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop"
    }
  ];

  // Filtros aplicados
  const filteredSchematics = schematics.filter((item) => {
    const matchesCat = schematicsCategory === "All categories" || item.category === schematicsCategory;
    const matchesSearch = item.title.toLowerCase().includes(schematicsSearch.toLowerCase()) || 
                          item.author.toLowerCase().includes(schematicsSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredAuctions = auctions.filter((item) => {
    const matchesCat = auctionCategory === "Todos" || item.category === auctionCategory;
    const matchesSearch = item.title.toLowerCase().includes(auctionSearch.toLowerCase()) || 
                          item.seller.toLowerCase().includes(auctionSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-stone-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* NAVBAR */}
      <header className="border-b border-stone-800 bg-[#0a0a0c]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          
          {/* LOGO & MENU DE NAVEGAÇÃO */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setCurrentView("home")}
              className="flex items-center gap-2 hover:opacity-90 transition-opacity text-left"
            >
              <div className="bg-blue-600 text-white font-black text-xs px-2.5 py-1 rounded-md tracking-wider">
                BUILD
              </div>
              <span className="font-bold tracking-tight text-white hidden sm:inline">BAWMC</span>
            </button>

            <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
              <button 
                onClick={() => setCurrentView("home")}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === "home" ? "bg-stone-800 text-white font-semibold" : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <HomeIcon size={15} />
                <span className="hidden sm:inline">Início</span>
              </button>

              <button 
                onClick={() => setCurrentView("schematics")}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === "schematics" ? "bg-blue-600 text-white font-semibold" : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <Layers size={15} />
                <span>Schematics</span>
              </button>

              <button 
                onClick={() => setCurrentView("auction")}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  currentView === "auction" ? "bg-amber-600 text-white font-semibold" : "text-stone-400 hover:text-stone-200"
                }`}
              >
                <Gavel size={15} />
                <span>Leilão</span>
              </button>
            </nav>
          </div>

          {/* BOTÕES DE LOGIN / PERFIL */}
          <div className="flex items-center gap-3 text-xs font-medium">
            <button className="p-2 text-stone-400 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <button className="bg-stone-100 text-stone-900 font-semibold px-4 py-1.5 rounded-full hover:bg-white transition-all">
              Sign in
            </button>
          </div>

        </div>
      </header>

      {/* CONTEÚDO DINÂMICO CONFORME A TELA SELECIONADA */}

      {/* ==================== TELA 1: HOME (LANDING HUB) ==================== */}
      {currentView === "home" && (
        <main className="max-w-7xl mx-auto px-6 py-12">
          
          {/* HERO BANNER */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
              <Sparkles size={14} /> Plataforma Oficial BAWMC
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">
              O Hub de Construções e Mercado do BAWMC
            </h1>
            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              Encontre os melhores schematics de farms, máquinas de redstone e stashes para o servidor, ou dispute itens raros e kits no Leilão Oficial.
            </p>
          </div>

          {/* OS DOIS BOTÕES GIGANTES DE NAVEGAÇÃO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* CARD / BOTÃO SCHEMATICS */}
            <div 
              onClick={() => setCurrentView("schematics")}
              className="bg-gradient-to-br from-[#121218] to-[#181824] border border-blue-500/30 hover:border-blue-500 rounded-3xl p-8 cursor-pointer group transition-all duration-300 shadow-xl hover:shadow-blue-500/10 relative overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all" />
              
              <div>
                <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <Layers size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  Schematics BAWMC
                  <ArrowRight size={20} className="text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Explore e baixe schematics testados. Mapeamento de farms de kelp, bonemeal, armadilhas de redstone e stashes inquebráveis.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-800/80 flex items-center justify-between text-xs text-blue-400 font-semibold">
                <span>Navegar pelo Catálogo</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[11px]">Acessar →</span>
              </div>
            </div>

            {/* CARD / BOTÃO LEILÃO */}
            <div 
              onClick={() => setCurrentView("auction")}
              className="bg-gradient-to-br from-[#121218] to-[#221a14] border border-amber-500/30 hover:border-amber-500 rounded-3xl p-8 cursor-pointer group transition-all duration-300 shadow-xl hover:shadow-amber-500/10 relative overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl group-hover:bg-amber-600/20 transition-all" />

              <div>
                <div className="w-14 h-14 bg-amber-600/20 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                  <Gavel size={28} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  Leilão BAWMC (Auction)
                  <ArrowRight size={20} className="text-amber-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                  Mercado em tempo real da comunidade. Dê lances em sets god, shulkers cheios de recursos, espadas e kits de raid.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-800/80 flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>Ver Lances e Ofertas</span>
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-[11px]">Acessar →</span>
              </div>
            </div>

          </div>

        </main>
      )}

      {/* ==================== TELA 2: SCHEMATICS (CATÁLOGO DONUT.BUILD) ==================== */}
      {currentView === "schematics" && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
            <button onClick={() => setCurrentView("home")} className="hover:text-stone-300">Home</button>
            <span>/</span>
            <span className="text-blue-500 font-medium">Schematics</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Browse All Schematics</h1>
              <p className="text-stone-400 text-xs sm:text-sm">Encontre farms, máquinas e construções para o servidor BAWMC.</p>
            </div>

            {/* BUSCA DE SCHEMATICS */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
              <input 
                type="text" 
                placeholder="Buscar schematic..."
                value={schematicsSearch}
                onChange={(e) => setSchematicsSearch(e.target.value)}
                className="w-full bg-[#141418] border border-stone-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* FILTROS DE CATEGORIA */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {schematicCategories.map((cat) => {
              const isActive = schematicsCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSchematicsCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? "bg-blue-600 text-white font-semibold" 
                      : "bg-[#141418] border border-stone-800/80 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* GRID DE CARDS SCHEMATICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchematics.map((item) => (
              <div 
                key={item.id}
                className="bg-[#121216] border border-stone-800/80 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`${item.badgeColor} text-white font-black text-[10px] tracking-wider px-2 py-0.5 rounded shadow-md`}>
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-stone-100 text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="px-4 pb-4 border-t border-stone-800/40 flex items-center justify-between text-[11px] text-stone-400 mt-2 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Download size={13} className="text-stone-500" />{item.downloads}</span>
                    <span className="flex items-center gap-1 text-emerald-400 font-medium"><DollarSign size={13} />{item.cost}</span>
                  </div>
                  <span className="text-stone-500">by <span className="text-stone-300 font-medium">{item.author}</span></span>
                </div>
              </div>
            ))}
          </div>

        </main>
      )}

      {/* ==================== TELA 3: LEILÃO (AUCTION BAWMC) ==================== */}
      {currentView === "auction" && (
        <main className="max-w-7xl mx-auto px-6 py-8">
          
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
            <button onClick={() => setCurrentView("home")} className="hover:text-stone-300">Home</button>
            <span>/</span>
            <span className="text-amber-500 font-medium">Leilão</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
                Leilão BAWMC <Gavel size={24} className="text-amber-500" />
              </h1>
              <p className="text-stone-400 text-xs sm:text-sm">Compre e venda itens lendários com outros jogadores em tempo real.</p>
            </div>

            {/* BUSCA NO LEILÃO */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
              <input 
                type="text" 
                placeholder="Buscar no leilão..."
                value={auctionSearch}
                onChange={(e) => setAuctionSearch(e.target.value)}
                className="w-full bg-[#141418] border border-stone-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          {/* FILTROS DE CATEGORIA DO LEILÃO */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {auctionCategories.map((cat) => {
              const isActive = auctionCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setAuctionCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? "bg-amber-600 text-white font-semibold" 
                      : "bg-[#141418] border border-stone-800/80 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* GRID DE CARDS DO LEILÃO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((item) => (
              <div 
                key={item.id}
                className="bg-[#121216] border border-stone-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`${item.rarityColor} text-white font-black text-[10px] tracking-wider px-2 py-0.5 rounded shadow-md`}>
                        {item.rarity}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-amber-400 text-[11px] font-mono px-2.5 py-1 rounded-md border border-amber-500/30 flex items-center gap-1.5">
                      <Clock size={12} />
                      {item.timeLeft}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-stone-100 text-sm group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-stone-500">Vendedor: <span className="text-stone-300 font-medium">{item.seller}</span></p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-stone-800/40 mt-2">
                  <div className="flex items-center justify-between mb-3 pt-3">
                    <div>
                      <span className="text-[10px] text-stone-500 block uppercase">Lance Atual</span>
                      <span className="text-sm font-bold text-emerald-400">{item.currentBid}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 block uppercase">Compre Já</span>
                      <span className="text-xs font-semibold text-stone-300">{item.buyout}</span>
                    </div>
                  </div>

                  <button className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-600/10">
                    <Gavel size={14} /> Dar Lance ({item.bidsCount} lances)
                  </button>
                </div>

              </div>
            ))}
          </div>

        </main>
      )}

    </div>
  );
}