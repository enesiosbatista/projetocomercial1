import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Bell, Plus, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const username = user?.username || 'JoÃ£o Silva';
  const credits = user?.credits ?? 3;

  const initials = username
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800 flex items-center justify-between px-4 text-white">
      <div className="flex items-center gap-3 lg:hidden">
        <Link to="/" className="text-sm font-bold text-white flex items-center gap-2">
          <span>âš¡</span>
          <span>ViralMind System</span>
        </Link>
      </div>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <div className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded-full px-3 py-1 font-mono">
          {credits} crÃ©ditos
        </div>

        <button
          onClick={() => navigate({ to: '/analyze' })}
          className="hidden lg:flex bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 h-8 rounded-lg items-center gap-1.5 transition-all cursor-pointer active:scale-95"
        >
          <Plus size={14} />
          <span>Nova AnÃ¡lise</span>
        </button>

        <div className="relative">
          <Bell className="w-5 h-5 text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold text-white">
            2
          </span>
        </div>

        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold cursor-pointer text-white transition hover:scale-105"
          >
            {initials}
          </button>
          {open && (
            <div className="absolute right-0 top-10 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-1 w-48 z-50">
              {isAdmin && (
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate({ to: '/admin' });
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-blue-300 transition hover:bg-zinc-800 rounded-lg flex items-center gap-1.5 font-medium cursor-pointer"
                >
                  <ShieldCheck size={14} />
                  <span>Painel Admin</span>
                </button>
              )}
              <button
                onClick={() => {
                  setOpen(false);
                  navigate({ to: '/profile' });
                }}
                className="block w-full text-left px-4 py-2.5 text-sm text-zinc-200 transition hover:bg-zinc-800 rounded-lg font-medium cursor-pointer"
              >
                Meu Perfil
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  navigate({ to: '/pricing' });
                }}
                className="block w-full text-left px-4 py-2.5 text-sm text-sky-300 transition hover:bg-zinc-800 rounded-lg font-medium cursor-pointer"
              >
                PreÃ§os e Planos
              </button>
              <div className="border-t border-zinc-800 my-1" />
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                  navigate({ to: '/auth' });
                }}
                className="block w-full text-left px-4 py-2.5 text-sm text-red-400 transition hover:bg-zinc-800 rounded-lg font-medium cursor-pointer"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export { Header };

