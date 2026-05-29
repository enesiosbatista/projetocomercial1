import { useEffect, useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutDashboard,
  Link2,
  Search,
  Zap,
} from 'lucide-react';
import { mockAnalysisList, mockUser } from '@/lib/mockData';
import { getScoreColor } from '@/lib/utils';

const STORAGE_KEY = 'viralmind_sidebar_collapsed';

const nav: { to: string; label: string; icon: typeof Home; exact?: boolean }[] = [
  { to: '/', label: 'Início', icon: Home, exact: true },
  { to: '/analyze', label: 'Nova Análise', icon: Search },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/connect', label: 'Conectar Contas', icon: Link2 },
  { to: '/insights', label: 'IA Consultora', icon: Brain },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') setCollapsed(true);
  }, []);

  const toggle = () => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
      return next;
    });
  };

  const recents = mockAnalysisList.slice(0, 3);
  const initials = mockUser.username
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-zinc-800 bg-zinc-950 transition-all duration-300 lg:flex ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="relative flex h-14 items-center border-b border-zinc-800 px-3">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-violet-500" fill="currentColor" />
            <span className="text-sm font-bold text-white">ViralMind AI</span>
          </Link>
        )}
        <button
          onClick={toggle}
          title={collapsed ? 'Expandir' : 'Recolher'}
          className="ml-auto rounded-md p-1.5 text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-200"
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
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? 'border-l-2 border-violet-500 bg-violet-950/50 font-medium text-violet-400'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
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
          <h4 className="mb-2 px-3 text-xs uppercase tracking-wider text-zinc-500">
            Recentes
          </h4>
          <ul className="space-y-1">
            {recents.map((a) => (
              <li key={a.id}>
                <Link
                  to="/result/$id"
                  params={{ id: a.id }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-zinc-800/50"
                >
                  <img
                    src={a.thumbnail_url}
                    alt=""
                    loading="lazy"
                    className="h-8 w-8 shrink-0 rounded-md object-cover"
                  />
                  <span className="flex-1 truncate text-xs text-zinc-300">{a.title}</span>
                  <span className={`font-mono text-xs ${getScoreColor(a.viral_score)}`}>
                    {a.viral_score}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto border-t border-zinc-800 p-3">
        <Link
          to="/profile"
          className={`flex items-center gap-2 rounded-lg p-1 transition hover:bg-zinc-800/50 ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-700 text-xs font-bold text-white">
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{mockUser.username}</p>
              <span className="mt-0.5 inline-block rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-zinc-400">
                Plano {mockUser.plan === 'free' ? 'Free' : mockUser.plan}
              </span>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
