import { Users, Server, Shield, MessageSquare, Swords, ShoppingBag } from "lucide-react";
import Image from "next/image";

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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { text } = await getServerStatus();
  const serverIp = "bawmc.net";
  const discordLink = "https://discord.com/servers/bawmc-1317180458978639914";
  const storeLink = "https://loja.bawmc.net/";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Menu Superior */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 relative overflow-hidden rounded-lg">
              <Image 
                src="/logo-icon.png" 
                alt="Logo BAW" 
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xl font-black text-cyan-400 tracking-wider">BAWMC</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-300">
            <a href="#inicio" className="hover:text-cyan-400">Início</a>
            <a href="#modos" className="hover:text-cyan-400">Modos</a>
            <a href="#regras" className="hover:text-cyan-400">Regras</a>
            <a href={discordLink} target="_blank" className="hover:text-cyan-400">Discord</a>
            <a href={storeLink} target="_blank" className="bg-cyan-500 text-slate-950 px-4 py-2 rounded-lg font-bold hover:bg-cyan-400 transition-colors flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Loja
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mb-6 w-full max-w-md flex justify-center">
          <Image 
            src="/logo-hero.png" 
            alt="BAWMC Logo Principal" 
            width={450} 
            height={180} 
            className="w-auto h-28 md:h-36 object-contain drop-shadow-[0_10px_25px_rgba(6,182,212,0.3)]"
            priority
          />
        </div>

        <p className="text-lg text-slate-400 max-w-xl mb-8">
          O maior e mais eletrizante servidor do Brasil! Prepare-se para viver a sua melhor experiência no Minecraft com muita emoção, adrenalina e uma comunidade insana. Entre agora e venha fazer parte dessa história!
        </p>

        {/* Botões de Ação (IP e Loja) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-3 bg-cyan-500 text-slate-950 font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/20">
            <span>IP: {serverIp}</span>
          </div>
          <a href={storeLink} target="_blank" className="flex items-center gap-3 bg-slate-900 border border-slate-700 text-cyan-400 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:border-cyan-500 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span>Acessar Loja</span>
          </a>
        </div>

        {/* Status do Servidor */}
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
              <p className="font-bold">{text}</p>
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

      {/* Modos de Jogo */}
      <section id="modos" className="max-w-6xl mx-auto p-8 w-full">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Swords className="text-cyan-400" /> Modos de Jogo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-cyan-400 mb-2">Semi-Anarquia</h4>
            <p className="text-slate-400 text-sm">Liberdade quase total para construir, destruir e sobreviver com economia ativa e poucas regras.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-cyan-400 mb-2">Lifesteal (Novo)</h4>
            <p className="text-slate-400 text-sm">Cada abate te fortalece: a cada kill, você ganha um novo coração e ganha economia. Vem testar!</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-cyan-400 mb-2">Survival</h4>
            <p className="text-slate-400 text-sm">O clássico survival com economia robusta, proteção de terrenos e jogabilidade equilibrada.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-cyan-400 mb-2">Box PvP</h4>
            <p className="text-slate-400 text-sm">Caia direto na Ação: pegue seus kits em arenas fechadas e enfrente os melhores em ritmo frenético.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-cyan-400 mb-2">Practice</h4>
            <p className="text-slate-400 text-sm">Treine suas habilidades de combate em diferentes cenários e kits variados.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <h4 className="text-xl font-bold text-cyan-400 mb-2">Crystal PvP</h4>
            <p className="text-slate-400 text-sm">Focado inteiramente no PvP de cristais com arenas de treino dinâmicas.</p>
          </div>
        </div>
      </section>

      {/* Regras Rápidas */}
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

      {/* Rodapé */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} BAWMC. Todos os direitos reservados.
      </footer>
    </div>
  );
}