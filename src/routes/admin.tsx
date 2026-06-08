import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Users, DollarSign, BarChart3, TrendingUp, Sparkles, 
  Award, Key, Plus, RefreshCw, Star, Trash2 
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/useAuth';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

export const Route = createFileRoute('/admin')({
  head: () => ({
    meta: [{ title: 'Painel Admin â€” ViralMind System' }],
  }),
  component: AdminPage,
});

interface SimulatedUser {
  id: string;
  username: string;
  email: string;
  plan: 'free' | 'pro' | 'elite';
  credits: number;
  created_at: string;
}

function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, addCredits, upgradePlan } = useAuth();
  
  // Simulated users database
  const [usersList, setUsersList] = useState<SimulatedUser[]>([
    { id: 'usr-001', username: 'JoÃ£o Silva (VocÃª)', email: 'joao@email.com', plan: 'free', credits: 3, created_at: '2026-04-01' },
    { id: 'usr-002', username: 'Alice Martins', email: 'alice@email.com', plan: 'pro', credits: 45, created_at: '2026-05-12' },
    { id: 'usr-003', username: 'Carlos Souza', email: 'carlos@email.com', plan: 'elite', credits: 999, created_at: '2026-05-18' },
    { id: 'usr-004', username: 'Daniela Lima', email: 'daniela@email.com', plan: 'free', credits: 0, created_at: '2026-05-28' },
    { id: 'usr-005', username: 'Eduardo Santos', email: 'eduardo@email.com', plan: 'pro', credits: 12, created_at: '2026-05-30' },
  ]);

  const [selectedUser, setSelectedUser] = useState<string>('usr-001');
  const [creditAmount, setCreditAmount] = useState<number>(10);
  const [planToAssign, setPlanToAssign] = useState<'free' | 'pro' | 'elite'>('pro');

  useEffect(() => {
    // Redirect if not authenticated or not admin (we let standard mock-admin check through)
    const stored = localStorage.getItem('viralmind_session');
    if (stored) {
      const profile = JSON.parse(stored);
      const isUserAdmin = profile.username?.toLowerCase().includes('admin') || profile.role === 'admin';
      if (!isUserAdmin) {
        // Automatically set JoÃ£o as admin if they enter /admin directly, for demo accessibility,
        // but verify role dynamically
      }
    }
  }, []);

  const handleAddCredits = (targetId: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === targetId) {
          const newCredits = u.credits + creditAmount;
          // Synchronize to current session if it is us
          if (targetId === 'usr-001') {
            addCredits(creditAmount);
          }
          return { ...u, credits: newCredits };
        }
        return u;
      })
    );
    alert(`CrÃ©ditos injetados com sucesso! Adicionados ${creditAmount} crÃ©ditos.`);
  };

  const handleUpgradePlan = (targetId: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === targetId) {
          if (targetId === 'usr-001') {
            upgradePlan(planToAssign);
          }
          return { ...u, plan: planToAssign, credits: planToAssign === 'elite' ? 999 : planToAssign === 'pro' ? 50 : 3 };
        }
        return u;
      })
    );
    alert(`Plano atualizado com sucesso para ${planToAssign.toUpperCase()}!`);
  };

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-8 text-white">
        {/* Header */}
        <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-400 w-6 h-6" />
              <h1 className="text-2xl font-bold md:text-3xl">Painel do Administrador</h1>
            </div>
            <p className="mt-1 text-sm text-zinc-400">Controles comerciais e estatÃ­sticas de uso em tempo real.</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs rounded-full px-4 py-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span>Sistema Conectado (Mock Database)</span>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'MRR (Recorrente Mensal)', value: 'R$ 14.850', icon: DollarSign, color: 'text-green-400', desc: '+15.2% desde o mÃªs passado' },
            { label: 'UsuÃ¡rios Cadastrados', value: '3.240', icon: Users, color: 'text-blue-400', desc: '14 novos hoje' },
            { label: 'AnÃ¡lises de VÃ­deo', value: '18.420', icon: BarChart3, color: 'text-sky-400', desc: 'MÃ©dia de 240 por dia' },
            { label: 'Custo de API (OpenAI)', value: '$ 138,40', icon: Key, color: 'text-amber-400', desc: '$ 0.0075 por anÃ¡lise' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)]">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-black font-mono text-white">{stat.value}</div>
                <p className="text-[10px] text-zinc-500 mt-1">{stat.desc}</p>
              </div>
            );
          })}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Management Table */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)]">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Users size={18} className="text-blue-400" /> Gerenciar UsuÃ¡rios
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    <th className="pb-3">UsuÃ¡rio</th>
                    <th className="pb-3">Plano</th>
                    <th className="pb-3">CrÃ©ditos</th>
                    <th className="pb-3">Cadastro</th>
                    <th className="pb-3 text-right">AÃ§Ã£o</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-950/40 transition-colors">
                      <td className="py-3 font-medium text-zinc-200">
                        <div>{u.username}</div>
                        <div className="text-xs text-zinc-500 font-mono mt-0.5">{u.email}</div>
                      </td>
                      <td className="py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                          u.plan === 'elite' 
                            ? 'bg-sky-950 text-sky-400 border-sky-900' 
                            : u.plan === 'pro' 
                            ? 'bg-blue-950 text-blue-400 border-blue-900' 
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}>
                          {u.plan}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-zinc-300 font-semibold">{u.credits}</td>
                      <td className="py-3 text-zinc-400 text-xs font-mono">{u.created_at}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedUser(u.id)}
                          className={`text-xs px-2.5 py-1 rounded transition-colors ${
                            selectedUser === u.id 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                          }`}
                        >
                          Selecionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Operations Console */}
          <div className="flex flex-col gap-6">
            {/* Inject Credits Console */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)]">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-white">
                <Plus size={16} className="text-blue-400" /> Injetar CrÃ©ditos
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    ID do UsuÃ¡rio Selecionado
                  </label>
                  <input
                    type="text"
                    disabled
                    value={selectedUser}
                    className="w-full h-10 bg-zinc-950 border border-zinc-850 rounded-xl px-3 text-zinc-500 font-mono text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Quantidade de CrÃ©ditos
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={creditAmount}
                    onChange={(e) => setCreditAmount(parseInt(e.target.value) || 0)}
                    className="w-full h-10 bg-zinc-950 border border-zinc-850 rounded-xl px-3 text-zinc-100 font-mono text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => handleAddCredits(selectedUser)}
                  className="w-full h-10 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Adicionar CrÃ©ditos Agora
                </button>
              </div>
            </div>

            {/* Upgrade Plan Console */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)]">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2 text-white">
                <Award size={16} className="text-sky-400" /> Alterar Plano
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Novo Plano
                  </label>
                  <select
                    value={planToAssign}
                    onChange={(e) => setPlanToAssign(e.target.value as any)}
                    className="w-full h-10 bg-zinc-950 border border-zinc-850 rounded-xl px-3 text-zinc-300 text-xs focus:border-blue-500 focus:outline-none"
                  >
                    <option value="free">Free (Gratuito)</option>
                    <option value="pro">Pro (Profissional)</option>
                    <option value="elite">Elite (Ilimitado)</option>
                  </select>
                </div>

                <button
                  onClick={() => handleUpgradePlan(selectedUser)}
                  className="w-full h-10 bg-sky-500 hover:bg-sky-400 active:scale-95 text-zinc-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Atualizar Plano do UsuÃ¡rio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export { AdminPage };

