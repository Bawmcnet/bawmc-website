import { Users, Server, Shield, MessageSquare, Swords, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Home() {
  const serverIp = "bawmc.net";
  const discordLink = "https://discord.com/servers/bawmc-1317180458978639914";
  const storeLink = "https://loja.bawmc.net/";

  const modos = [
    {
      nome: "Survival",
      desc: "O clássico survival com economia robusta, proteção de terrenos e jogabilidade equilibrada.",
      emoji: "⛏️",
      border: "border-amber-500/40 hover:border-amber-500",
      bg: "bg-amber-500/10",
      textCol: "text-amber-400"
    },
    {
      nome: "Semi-Anarquia",
      desc: "Liberdade quase total para construir, destruir e sobreviver com economia ativa e poucas regras.",
      emoji: "🧨",
      border: "border-red-500/40 hover:border-red-500",
      bg: "bg-red-500/10",
      textCol: "text-red-400"
    },
    {
      nome: "Lifesteal (Novo)",
      desc: "Cada abate te fortalece: a cada kill, você ganha um novo coração e ganha economia. Vem testar!",
      emoji: "❤️",
      border: "border-rose-500/40 hover:border-rose-500",
      bg: "bg-rose-500/10",
      textCol: "text-rose-400"
    },
    {
      nome: "Practice e CrystalPvP",
      desc: "Treine suas habilidades de combate, cristais e domine as arenas de duelo intensas.",
      emoji: "🔮",
      border: "border-emerald-500/40 hover:border-emerald-500",
      bg: "bg-emerald-500/10",
      textCol: "text-emerald-400"
    },
    {
      nome: "Loja",
      desc: "Loja oficial do BAWMC",
      emoji: "🛒",
      border: "border-purple-500/40 hover:border-purple-500",
      bg: "bg-purple-500/10",
      textCol: "text-purple-400"
    },
    {
      nome: "Eventos",
      desc: "Participe de eventos eletrizantes organizados pela staff com prêmios imperdíveis.",
      emoji: "🎉",
      border: "border-blue-500/40 hover:border-blue-500",
      bg: "bg-blue-500/10",
      textCol: "text-blue-400"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
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
              <p className="font-bold">Online 24/7</p>
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

      <section id="modos" className="max-w-6xl mx-auto p-8 w-full">
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
              <a 
                href={storeLink} 
                target="_blank" 
                className="bg-white text-slate-950 font-bold py-2.5 px-4 rounded-xl text-center text-sm hover:bg-cyan-400 transition-colors"
              >
                Ver produtos →
              </a>
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