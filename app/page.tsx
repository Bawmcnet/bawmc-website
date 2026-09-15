"use client";

import React, { useState } from "react";
import { 
  Search, 
  Bell, 
  Download, 
  ChevronDown, 
  DollarSign
} from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All categories");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
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
      title: "Fast & Efficient Bonemeal Farm Design...",
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
      title: "Rail gun",
      category: "Traps",
      downloads: "7,956",
      cost: "$113,707.17",
      author: "Nateox303YTz",
      badge: "CRAZY TRAP",
      badgeColor: "bg-red-600",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const filteredSchematics = schematics.filter((item) => {
    const matchesCategory = activeCategory === "All categories" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-stone-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* HEADER / NAVBAR */}
      <header className="border-b border-stone-800 bg-[#0a0a0c]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white font-black text-xs px-2.5 py-1 rounded-md tracking-wider">
                BUILD
              </div>
              <span className="font-bold tracking-tight text-white hidden sm:inline">BAWMC</span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-400">
              <a href="#" className="text-blue-500 font-semibold">Schematics</a>
              <a href="#" className="hover:text-stone-200 transition-colors">Auction</a>
            </nav>
          </div>

          {/* SEARCH BAR */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={16} />
            <input 
              type="text" 
              placeholder="Search schematics and items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141418] border border-stone-800 rounded-full pl-9 pr-14 py-1.5 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-blue-500 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-500 font-mono bg-stone-900 border border-stone-800 px-1.5 py-0.5 rounded">
              CMD K
            </span>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <button className="p-2 text-stone-400 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <button className="text-stone-300 hover:text-white transition-colors hidden sm:block">
              Sign up
            </button>
            <button className="bg-stone-100 text-stone-900 font-semibold px-4 py-1.5 rounded-full hover:bg-white transition-all">
              Sign in
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-4">
          <span>Home</span>
          <span>/</span>
          <span className="text-blue-500 font-medium">Schematics</span>
        </div>

        {/* TITLE & DESCRIPTION */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
          Browse All Schematics
        </h1>
        <p className="text-stone-400 text-xs sm:text-sm max-w-3xl mb-8 leading-relaxed">
          Find your next BAWMC build, from farms and hidden stashes to the machines behind Team Flood and Team Drain. Browse schematics, compare material costs, and download the builds you want to bring into the server.
        </p>

        {/* CATEGORIES & FILTERS */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button className="bg-[#141418] border border-stone-800 text-stone-300 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 hover:border-stone-700 transition-all mr-2">
            <span>Sort: Most popular</span>
            <ChevronDown size={14} />
          </button>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? "bg-blue-600 text-white font-semibold" 
                      : "bg-[#141418] border border-stone-800/80 text-stone-400 hover:text-stone-200 hover:border-stone-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* SCHEMATICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchematics.map((item) => (
            <div 
              key={item.id}
              className="bg-[#121216] border border-stone-800/80 rounded-2xl overflow-hidden hover:border-stone-700 transition-all group flex flex-col justify-between"
            >
              <div>
                {/* PREVIEW */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`${item.badgeColor} text-white font-black text-[10px] tracking-wider px-2 py-0.5 rounded shadow-md`}>
                      {item.badge}
                    </span>
                  </div>

                  <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-stone-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-white/10">
                    BAWMC.BUILD
                  </span>
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <h3 className="font-semibold text-stone-100 text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="px-4 pb-4 pt-0 border-t border-stone-800/40 flex items-center justify-between text-[11px] text-stone-400 mt-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Download size={13} className="text-stone-500" />
                    {item.downloads}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <DollarSign size={13} />
                    {item.cost}
                  </span>
                </div>

                <span className="text-stone-500 flex items-center gap-1">
                  by <span className="text-stone-300 font-medium">{item.author}</span>
                </span>
              </div>

            </div>
          ))}
        </div>

      </main>

    </div>
  );
}