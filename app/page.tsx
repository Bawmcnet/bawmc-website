"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Copy, Check, Compass, BookOpen, ShieldAlert, ShoppingBag, Key, Home as HomeIcon, DollarSign, X } from "lucide-react";

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
  const [modalTerrenosOpen, setModalTerrenosOpen] = useState(false);
  
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
              <img src="/logo-icon.png" alt="Logo BAW" className="w-full h-full object-cover" />
            </div>
            BAWMC
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Início</a>
            <a href="#tutoriais" className="hover:text-cyan-400 transition-colors">Tutoriais</a>
            <a href="#modos" className="hover:text-cyan-400 transition-colors">Modos</a>
            <a href="#regras" className="hover:text-cyan-400 transition-colors">Regras</a>
            <a href="https://discord.com/servers/bawmc-1317180458978639914" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Discord</a>
            <a href="#staff" className="hover:text-cyan-400 transition-colors">Staff</a>
          </div>

          <a 
            href="https://loja.bawmc.net/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-xl hover:bg-cyan-400 transition-colors text-sm shadow-lg shadow-cyan-500/20"
          >
            <ShoppingBag className="w-4 h-4" /> Loja
          </a>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto p-8 w-full space-y-10">
        {/* Barra Superior Compacta de Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <p className="text-[11px] text-slate-400 font-medium leading-none">Status do Servidor</p>
                <p className="text-sm font-bold text-white mt-1 leading-none">Online</p>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-slate-800" />

            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>{serverStatus?.players || 702} jogando agora</span>
            </div>
          </div>

          <button
            onClick={handleCopyIp}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all text-sm shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "IP Copiado!" : `Copiar IP: ${serverIp}`}</span>
          </button>
        </div>

        {/* Grade de Modos */}
        <div id="modos" className="space-y-4">
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

        {/* Seção de Tutoriais */}
        <div id="tutoriais" className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Tutoriais para Iniciantes
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Registro de Conta */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Key className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-amber-400 text-lg">Registro de Conta</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Use <code className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400 font-mono text-xs">/register senha senha</code> para criar sua conta e <code className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400 font-mono text-xs">/login senha</code> ao entrar.
                </p>
              </div>
            </div>

            {/* Card 2: Proteção de Terrenos */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <HomeIcon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-emerald-400 text-lg">Proteção de Terrenos</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Use <code className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400 font-mono text-xs">/terreno</code> para pegar a pá e o graveto, marque dois cantos opostos. Comece com 500 blocos e gerencie com comandos avançados.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => setModalTerrenosOpen(true)}
                  className="w-full bg-emerald-950/60 border border-emerald-500/30 hover:bg-emerald-900/50 text-emerald-400 font-medium py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                >
                  Ver mais (Comandos & Guia) ↓
                </button>

                <a
                  href="https://www.youtube.com/watch?v=TbpLadLuGTE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1 text-cyan-400 hover:underline text-xs font-semibold py-1"
                >
                  ► Ver vídeo explicativo
                </a>
              </div>
            </div>

            {/* Card 3: Economia & Lucro */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-purple-400 text-lg">Economia & Lucro</h4>
                <ul className="text-slate-300 text-xs space-y-2">
                  <li className="flex items-center gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400 font-mono text-[11px]">/mercado</code>: Compra de jogadores</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400 font-mono text-[11px]">/compra</code>: Itens do servidor</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400 font-mono text-[11px]">/venda</code>: Vende pro servidor</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400 font-mono text-[11px]">/vender [valor]</code>: Anuncia na mão</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Staff */}
        <div id="staff" className="space-y-6">
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

      {/* Modal: Guia Completo de Proteção de Terrenos */}
      {modalTerrenosOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                🏠 Guia Completo de Proteção de Terrenos
              </h3>
              <button
                onClick={() => setModalTerrenosOpen(false)}
                className="text-slate-400 hover:text-white bg-slate-800/60 p-1.5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Bloco 1 */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  🛠️ Processo de Proteção
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Use <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400 font-mono">/terreno</code> para receber a pá de ouro e o graveto. Clique com o botão direito em dois cantos opostos para proteger automaticamente da Bedrock até o limite do céu.
                </p>
              </div>

              {/* Bloco 2 */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  📊 Gerenciamento de Blocos
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  O comando <code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400 font-mono">/blocosprotecao</code> mostra seus blocos disponíveis (início com 500 blocos, aumentando conforme o tempo online). O graveto serve para verificar o dono do terreno.
                </p>
              </div>

              {/* Bloco 3 */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  ⚙️ Comandos Avançados & Permissões
                </h4>
                <ul className="text-slate-300 text-xs space-y-2">
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400 font-mono">/permitir &lt;nick&gt;</code>: Concede acesso ao terreno.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400 font-mono">/proibir &lt;nick&gt;</code>: Remove o acesso do jogador.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400 font-mono">/terrenofilho</code>: Cria sub-áreas dentro do terreno principal.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400 font-mono">/terrenoexplosao</code>: Habilita TNT e Wither na área.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400 font-mono">/permitirbau #publico</code>: Permite acesso livre a baús (farms).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400 font-mono">/transferirterreno &lt;nick&gt;</code>: Passa a posse para outro jogador.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-500">•</span>
                    <span><code className="bg-slate-900 px-1.5 py-0.5 rounded text-cyan-400 font-mono">/preso</code>: Teletransporta para fora se ficar preso.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500 mt-12">
        <p>© 2026 BAWMC Server. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}