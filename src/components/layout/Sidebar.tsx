import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutDashboard,
  Link2,
  Search,
  Zap,
  DollarSign,
  ShieldCheck
} from 'lucide-react';
import { mockAnalysisList } from '@/lib/mockData';
import { getScoreColor } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const username = user?.username || 'João Silva';
  const plan = user?.plan || 'free';

  const initials = username
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const recents = mockAnalysisList.slice(0, 3);

  // Main navigation elements
  const nav = [
    { to: '/', label: 'Início', icon: Home, exact: true },
    { to: '/analyze', label: 'Nova Análise', icon: Search },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/connect', label: 'Conectar Contas', icon: Link2 },
    { to: '/insights', label: 'IA Consultora', icon: Brain },
    { to: '/pricing', label: 'Preços e Planos', icon: DollarSign },
  ];

  // Dynamic admin shortcut in sidebar if role allows
  if (isAdmin) {
    nav.push({ to: '/admin', label: 'Painel Admin', icon: ShieldCheck });
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-zinc-950 border-r border-zinc-800 flex flex-col z-40 transition-all duration-300 lg:block hidden ${
        collapsed ? 'w-[64px]' : 'w-[240px]'
      }`}
    >
      <div className="relative flex h-14 items-center px-3">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-violet-500 shrink-0" fill="currentColor" />
            <span className="text-sm font-bold text-white">ViralMind System</span>
          </Link>
        )}
        {collapsed && (
          <div className="flex w-full justify-center">
            <Zap className="h-4 w-4 text-violet-500" fill="currentColor" />
          </div>
        )}
        <button
          onClick={onToggle}
          title={collapsed ? 'Expandir' : 'Recolher'}
          className="absolute right-3 top-4 text-zinc-500 hover:text-zinc-200 cursor-pointer"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex flex-col gap-1 p-2">
        {nav.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? pathname === to : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${
                active
                  ? 'bg-violet-950/50 text-violet-400 border-l-2 border-violet-500 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="mt-3 flex-1 overflow-y-auto px-3">
          <h4 className="text-xs text-zinc-500 uppercase tracking-wider px-3 mt-5 mb-2">
            RECENTES
          </h4>
          <ul className="space-y-1">
            {recents.map((analysis) => (
              <li key={analysis.id}>
                <div
                  onClick={() => navigate({ to: '/result/$id', params: { id: analysis.id } })}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer"
                >
                  <img
                    src={analysis.thumbnail_url}
                    alt=""
                    loading="lazy"
                    className="w-8 h-8 rounded-md object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1 flex flex-col">
                    <span className="text-xs text-zinc-300 line-clamp-1">
                      {analysis.title}
                    </span>
                  </div>
                  <span className={`text-xs font-mono shrink-0 ${getScoreColor(analysis.viral_score)}`}>
                    {analysis.viral_score}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto flex items-center gap-2 p-3 border-t border-zinc-800">
        <Link
          to="/profile"
          className={`flex items-center gap-2 rounded-lg p-1 transition hover:bg-zinc-800/50 w-full cursor-pointer ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-violet-700 flex items-center justify-center text-xs font-bold shrink-0 text-white">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">{username}</p>
              <span className={`text-xs rounded px-1.5 py-0.5 block w-fit mt-0.5 border ${
                plan === 'elite' 
                  ? 'bg-cyan-950 text-cyan-400 border-cyan-900 font-bold' 
                  : plan === 'pro' 
                  ? 'bg-violet-950 text-violet-400 border-violet-900 font-bold' 
                  : 'bg-zinc-850 text-zinc-400 border-zinc-700'
              }`}>
                Plano {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
export { Sidebar };
