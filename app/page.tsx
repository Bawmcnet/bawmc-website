import { Users, Server, Shield, MessageSquare, Swords } from "lucide-react";

async function getServerStatus() {
  try {
    const res = await fetch("https://api.mcsrvstat.us/3/bawmc.net", { 
      cache: "no-store" 
    });
    const data = await res.json();
    
    if (data && data.online) {
      return {
        text: `${data.players.online} / ${data.players.max || 2000} Online`,
        isOnline: true
      };
    }
    return { text: "Servidor Online", isOnline: true };
  } catch (error) {
    return { text: "Servidor Online", isOnline: true };
  }
}

// Força a página a ser dinâmica a cada requisição
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { text } = await getServerStatus();
  const serverIp = "bawmc.net";
  const discordLink = "https://discord.com/servers/bawmc-1317180458978639914";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Menu Superior */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-emerald-500 tracking-wider">BAWMC</h1>
          <div className="flex gap-6 text-sm font-semibold text-slate-300">
            <a href="#inicio" className="hover:text-emerald-400">Início</a>
            <a href="#modos" className="hover:text-emerald-400">Modos</a>
            <a href="#regras" className="hover:text-emerald-400">Regras</a>
            <a href={discordLink} target="_blank" className="hover:text-emerald-400">Discord</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-slate-900 to-slate-950">
        <h2 className="text-5xl md:text-7xl font-black mb-4">
          BEM-VINDO AO <span className="text-emerald-500">BAWMC</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-xl mb-8">
          Sua melhor experiência no Minecraft Survival e PvP. Entre agora e faça parte da nossa comunidade!
        </p>

        {/* IP do Servidor */}
        <div className="flex items-center gap-3 bg-emerald-500 text-slate-950 font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/20 mb-12">
          <span>IP: {serverIp}</span>
        </div>

        {/* Status do Servidor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
            <Server className="w-8 h-8 text-emerald-500" />
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase font-semibold">IP do Servidor</p>
              <p className="font-bold">{serverIp}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4">
            <Users className="w-8 h-8 text-emerald-500" />
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase font-semibold">Jogadores</p>
              <p className="font-bold">{text}</p>
            </div>
          </div>
          <a href={discordLink} target="_blank" className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex items-center gap-4 hover:border-emerald-500 transition-colors">
            <MessageSquare className="w-8 h-8 text-emerald-500" />
            <div className="text-left">
              <p className="text-xs text-slate-400 uppercase font-semibold">Comunidade</p>
              <p className="font-bold">Discord Ativo</p>
            </div>
          </a>
        </div>
      </section>

      {/* Modos de Jogo */}
      <section id="modos" className="max-w-6xl mx-auto p-8 w-full">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Swords className="text-emerald-500" /> Modos de Jogo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-emerald-400 mb-2">Semi-Anarquia</h4>
            <p className="text-slate-400 text-sm">Liberdade quase total para construir, destruir e sobreviver com poucas regras.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-emerald-400 mb-2">Lifesteal (Novo)</h4>
            <p className="text-slate-400 text-sm">Cada abate rouba corações do inimigo. Quanto mais você luta, mais forte fica!</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-emerald-400 mb-2">Survival</h4>
            <p className="text-slate-400 text-sm">O clássico survival com economia, proteção de terrenos e jogabilidade equilibrada.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-emerald-400 mb-2">Practice</h4>
            <p className="text-slate-400 text-sm">Treine suas habilidades de combate em diferentes cenários e kits variados.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-emerald-400 mb-2">Crystal PvP</h4>
            <p className="text-slate-400 text-sm">Focado inteiramente no PvP de cristais com arenas de treino dinâmicas.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-emerald-400 mb-2">Eventos</h4>
            <p className="text-slate-400 text-sm">Eventos especiais organizados pela administração com prêmios exclusivos para os participantes.</p>
          </div>
        </div>
      </section>

      {/* Regras Rápidas */}
      <section id="regras" className="max-w-6xl mx-auto p-8 w-full border-t border-slate-800">
        <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Shield className="text-emerald-500" /> Regras Principais
        </h3>
        <ul className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 text-slate-300">
          <li>• Proibido o uso de hacks, clientes modificados ou cheats.</li>
          <li>• Respeite todos os jogadores e membros da equipe no chat.</li>
          <li>• Proibido o aproveitamento de bugs ou exploits.</li>
        </ul>
      </section>

      {/* Rodapé */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} BAWMC. Todos os direitos reservados.
      </footer>
    </div>
  );
}