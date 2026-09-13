"use client";

import { Users, Server, Shield, MessageSquare, Swords, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const serverIp = "bawmc.net";
  const discordLink = "https://discord.com/servers/bawmc-1317180458978639914";
  const storeLink = "https://loja.bawmc.net/";

  const [playerStatus, setPlayerStatus] = useState("Carregando...");
  const [showTerrainModal, setShowTerrainModal] = useState(false);

  useEffect(() => {
    fetch("https://api.mcsrvstat.us/3/bawmc.net")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.online) {
          setPlayerStatus(`${data.players.online} / ${data.players.max || 2000} Online`);
        } else {
          setPlayerStatus("Servidor Online");
        }
      })
      .catch(() => {
        setPlayerStatus("Servidor Online");
      });
  }, []);

  const modos = [
    {
      id: "survival",
      nome: "Survival",
      desc: "O clássico survival com economia robusta, proteção de terrenos e jogabilidade equilibrada.",
      emoji: "⛏️",
      border: "border-amber-500/40 hover:border-amber-500",
      bg: "bg-amber-500/10",
      textCol: "text-amber-400",
      isStore: false
    },
    {
      id: "semi-anarquia",
      nome: "Semi-Anarquia",
      desc: "Liberdade quase total para construir, destruir e sobreviver com economia ativa e poucas regras.",
      emoji: "🧨",
      border: "border-red-500/40 hover:border-red-500",
      bg: "bg-red-500/10",
      textCol: "text-red-400",
      isStore: false
    },
    {
      id: "lifesteal",
      nome: "Lifesteal (Novo)",
      desc: "Cada abate te fortalece: a cada kill, você ganha um novo coração e ganha economia. Vem testar!",
      emoji: "❤️",
      border: "border-rose-500/40 hover:border-rose-500",
      bg: "bg-rose-500/10",
      textCol: "text-rose-400",
      isStore: false
    },
    {
      id: "practice-e-crystalpvp",
      nome: "Practice e CrystalPvP",
      desc: "Treine suas habilidades de combate, cristais e domine as arenas de duelo intensas.",
      emoji: "🔮",
      border: "border-emerald-500/40 hover:border-emerald-500",
      bg: "bg-emerald-500/10",
      textCol: "text-emerald-400",
      isStore: false
    },
    {
      id: "eventos",
      nome: "Eventos",
      desc: "Participe de eventos eletrizantes organizados pela staff com prêmios imperdíveis.",
      emoji: "🎉",
      border: "border-blue-500/40 hover:border-blue-500",
      bg: "bg-blue-500/10",
      textCol: "text-blue-400",
      isStore: false
    },
    {
      id: "loja",
      nome: "Loja",
      desc: "Loja oficial do BAWMC",
      emoji: "🛒",
      border: "border-purple-500/40 hover:border-purple-500",
      bg: "bg-purple-500/10",
      textCol: "text-purple-400",
      isStore: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans relative">
      <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="#inicio" className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 relative overflow-hidden rounded-lg">
              <Image 
                src="/logo-icon.png" 
                alt="Logo BAW" 
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-black text-cyan-400 tracking-wider">BAWMC</span>
          </a>
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-300">
            <a href="#inicio" className="hover:text-cyan-400">Início</a>
            <a href="#tutoriais" className="hover:text-cyan-400">Tutoriais</a>
            <a href="#modos" className="hover:text-cyan-400">Modos</a>
            <a href="#regras" className="hover:text-cyan-400">Regras</a>
            <a href={discordLink} target="_blank" className="hover:text-cyan-400">Discord</a>
            <a 
              href="#staff" 
              onClick={(e) => {
                e.preventDefault();
                alert("EM BREVE! A lista de administradores estará disponível em breve.");
              }} 
              className="hover:text-cyan-400 cursor-pointer"
            >
              Staff
            </a>
            <a href={storeLink} target="_blank" className="bg-cyan-500 text-slate-950 px-4 py-2 rounded-lg font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Loja
            </a>
          </div>
        </div>
      </nav>

      <section id="inicio" className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mb-6 w-full max-w-xl flex justify-center">
          <div className="animate-bounce-slow">
            <Image 
              src="/logo-hero.png" 
              alt="BAWMC Logo Principal" 
              width={520} 
              height={210} 
              className="w-auto h-36 md:h-44 object-contain drop-shadow-[0_15px_30px_rgba(6,182,212,0.4)]"
              priority
            />
          </div>
        </div>

        <p className="text-lg text-slate-400 max-w-xl mb-8">
          O maior e mais eletrizante servidor do Brasil! Prepare-se para viver a sua melhor experiência no Minecraft com muita emoção, adrenalina e uma comunidade insana. Entre agora e venha fazer parte dessa história!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-3 bg-cyan-500 text-slate-950 font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/20">
            <span>IP: {serverIp}</span>
          </div>
          <a href={storeLink} target="_blank" className="flex items-center gap-3 bg-slate-900 border border-slate-700 text-cyan-400 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:border-cyan-500 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span>Acessar Loja</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
            <Server className="w-8 h-8 text-cyan-400" />
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase font-semibold">IP do Servidor</p>
              <p className="font-bold">{serverIp}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
            <Users className="w-8 h-8 text-cyan-400" />
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase font-semibold">Jogadores</p>
              <p className="font-bold">{playerStatus}</p>
            </div>
          </div>
          <a href={discordLink} target="_blank" className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4 hover:border-cyan-500 transition-colors">
            <MessageSquare className="w-8 h-8 text-cyan-400" />
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase font-semibold">Comunidade</p>
              <p className="font-bold">Discord Ativo</p>
            </div>
          </a>
        </div>
      </section>

      {/* Tutoriais para Iniciantes */}
      <section id="tutoriais" className="max-w-6xl mx-auto p-8 w-full border-t border-slate-800">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
          📖 Tutoriais para Iniciantes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-2xl mb-4">🔑</div>
              <h4 className="text-lg font-bold text-amber-400 mb-2">Registro de Conta</h4>
              <p className="text-slate-400 text-sm">
                Use <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400">/register senha senha</code> para criar sua conta e <code className="bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400">/login senha</code> ao entrar.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-2xl mb-4">🏡</div>
              <h4 className="text-lg font-bold text-emerald-400 mb-2">Proteção de Terrenos</h4>
              <p className="text-slate-400 text-sm mb-3">
                Use <code className="text-cyan-400">/terreno</code> para pegar a pá e o graveto, marque dois cantos opostos. Comece com 500 blocos e gerencie com comandos avançados.
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <button 
                onClick={() => setShowTerrainModal(true)}
                className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-bold py-2 px-3 rounded-lg transition-colors text-center w-full"
              >
                Ver mais (Comandos & Guia) ↓
              </button>
              <a 
                href="https://www.youtube.com/watch?v=TbpLadLuGTE" 
                target="_blank" 
                className="text-xs text-cyan-400 hover:underline font-semibold flex items-center justify-center gap-1"
              >
                ▶ Ver vídeo explicativo
              </a>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-2xl mb-4">💰</div>
              <h4 className="text-lg font-bold text-purple-400 mb-2">Economia & Lucro</h4>
              <p className="text-slate-400 text-sm space-y-1">
                • <code className="text-cyan-400">/mercado</code>: Compra de jogadores<br/>
                • <code className="text-cyan-400">/compra</code>: Itens do servidor<br/>
                • <code className="text-cyan-400">/venda</code>: Vende pro servidor<br/>
                • <code className="text-cyan-400">/vender [valor]</code>: Anuncia na mão
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal / Detalhes Completos de Terrenos */}
      {showTerrainModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setShowTerrainModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>
            
            <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              🏡 Guia Completo de Proteção de Terrenos
            </h3>
            
            <div className="space-y-4 text-slate-300 text-sm">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-1">🛠️ Processo de Proteção</h4>
                <p>Use <code className="text-cyan-400">/terreno</code> para receber a pá de ouro e o graveto. Clique com o botão direito em dois cantos opostos para proteger automaticamente da Bedrock até o limite do céu.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-1">📊 Gerenciamento de Blocos</h4>
                <p>O comando <code className="text-cyan-400">/blocosprotecao</code> mostra seus blocos disponíveis (início com 500 blocos, aumentando conforme o tempo online). O graveto serve para verificar o dono do terreno.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <h4 className="font-bold text-white mb-1">⚙️ Comandos Avançados & Permissões</h4>
                <ul className="space-y-1.5 mt-2">
                  <li>• <code className="text-cyan-400">/permitir &lt;nick&gt;</code>: Concede acesso ao terreno.</li>
                  <li>• <code className="text-cyan-400">/proibir &lt;nick&gt;</code>: Remove o acesso do jogador.</li>
                  <li>• <code className="text-cyan-400">/terrenofilho</code>: Cria sub-áreas dentro do terreno principal.</li>
                  <li>• <code className="text-cyan-400">/terrenoexplosao</code>: Habilita TNT e Wither na área.</li>
                  <li>• <code className="text-cyan-400">/permitirbau #publico</code>: Permite acesso livre a baús (farms).</li>
                  <li>• <code className="text-cyan-400">/transferirterreno &lt;nick&gt;</code>: Passa a posse para outro jogador.</li>
                  <li>• <code className="text-cyan-400">/preso</code>: Teletransporta para fora se ficar preso.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowTerrainModal(false)}
                className="bg-cyan-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl hover:bg-cyan-400 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="modos" className="max-w-6xl mx-auto p-8 w-full border-t border-slate-800">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Swords className="text-cyan-400" /> Modos & Categorias
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modos.map((modo, index) => (
            <div key={index} className={`bg-slate-900 border ${modo.border} p-6 rounded-2xl flex flex-col justify-between transition-all hover:shadow-lg hover:shadow-cyan-500/5`}>
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl ${modo.bg} flex items-center justify-center text-3xl shadow-inner`}>
                    {modo.emoji}
                  </div>
                  <h4 className={`text-xl font-bold ${modo.textCol}`}>{modo.nome}</h4>
                </div>
                <p className="text-slate-400 text-sm mb-6">{modo.desc}</p>
              </div>
              {modo.isStore ? (
                <a 
                  href={storeLink} 
                  target="_blank" 
                  className="bg-white text-slate-950 font-bold py-2.5 px-4 rounded-xl text-center text-sm hover:bg-cyan-400 transition-colors"
                >
                  Ir para Loja →
                </a>
              ) : (
                <Link 
                  href={`/modo/${modo.id}`}
                  className="bg-slate-950 border border-slate-800 text-slate-300 font-medium py-2.5 px-4 rounded-xl text-center text-sm hover:border-cyan-500 hover:text-cyan-400 transition-colors block"
                >
                  Ver informações
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="regras" className="max-w-6xl mx-auto p-8 w-full border-t border-slate-800">
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Shield className="text-cyan-400" /> Regras Principais
        </h3>
        <ul className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 text-slate-300">
          <li>• Proibido o uso de hacks, clientes modificados ou cheats.</li>
          <li>• Respeite todos os jogadores e membros da equipe no chat.</li>
          <li>• Proibido o aproveitamento de bugs ou exploits.</li>
        </ul>
      </section>

      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} BAWMC. Todos os direitos reservados.
      </footer>
    </div>
  );
}