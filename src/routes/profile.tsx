import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/hooks/useAuth';
import { Download, ShieldCheck, HelpCircle } from 'lucide-react';

export const Route = createFileRoute('/profile')({
  head: () => ({ meta: [{ title: 'Perfil — ViralMind System' }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const username = user?.username || 'João Silva';
  const plan = user?.plan || 'free';
  const credits = user?.credits ?? 3;

  const initials = username
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  const totalCredits = plan === 'elite' ? 999 : plan === 'pro' ? 50 : 3;
  const pct = Math.min(100, (credits / totalCredits) * 100);

  const handleExportData = () => {
    try {
      const dataToExport = {
        profile: {
          id: user?.id || 'usr-mock',
          username,
          plan,
          credits,
          created_at: user?.created_at || new Date().toISOString(),
        },
        terms_accepted: true,
        gdpr_lgpd_compliant: true,
        generated_at: new Date().toISOString(),
      };
      
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json;charset=utf-8' });
      const linkUrl = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = linkUrl;
      tempLink.download = 'viralmind_dados_exportacao.json';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(linkUrl);
      
      alert('Seus dados cadastrais foram compilados e o download foi iniciado com sucesso!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-2xl px-4 py-8 md:px-6 md:py-12 text-white">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 md:p-8 shadow-[0_0_0_1px_#3F3F46,0_4px_24px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 text-2xl font-bold text-white shadow-lg shadow-violet-950">
              {initials}
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white">{username}</h1>
            <p className="mt-1 text-sm text-zinc-400 font-mono">joao@email.com</p>
            
            <span className={`mt-3 inline-block rounded-full px-3.5 py-1 text-xs font-bold uppercase border ${
              plan === 'elite' 
                ? 'bg-cyan-950 text-cyan-400 border-cyan-900' 
                : plan === 'pro' 
                ? 'bg-violet-950 text-violet-400 border-violet-900' 
                : 'bg-zinc-800 text-zinc-300 border-zinc-700'
            }`}>
              Plano {plan === 'free' ? 'Gratuito' : plan === 'pro' ? 'Pro' : 'Elite'}
            </span>
            <p className="mt-2 max-w-sm text-xs text-zinc-500">
              {plan === 'free' && 'Acesso a 3 análises de vídeo iniciais com relatórios básicos.'}
              {plan === 'pro' && 'Acesso a 50 análises de vídeo com IA, ganchos e recreação de roteiros.'}
              {plan === 'elite' && 'Acesso ilimitado total sem restrições a todos os recursos da plataforma.'}
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-950/50 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-400">Créditos restantes</span>
              <span className="font-mono text-sm text-violet-300 font-bold">
                {plan === 'elite' ? '∞' : `${credits} / ${totalCredits}`}
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className={`h-full rounded-full transition-all ${
                  plan === 'elite' ? 'bg-cyan-400' : 'bg-violet-500'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-800 pt-6 space-y-4">
            <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Ações de Conformidade</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleExportData}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 hover:border-zinc-500 px-4 py-2.5 text-center text-sm font-semibold text-zinc-200 transition cursor-pointer"
              >
                <Download size={14} /> Exportar Meus Dados
              </button>
              
              <button
                onClick={() => alert('Mock: Todos os seus logs e registros foram excluídos permanentemente.')}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-red-950 hover:bg-red-950/20 px-4 py-2.5 text-center text-sm font-semibold text-red-400 transition cursor-pointer"
              >
                Excluir Minha Conta
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-800 pt-6 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={() => navigate({ to: '/pricing' })}
              className="flex-grow rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white transition cursor-pointer active:scale-95 text-center"
            >
              Gerenciar Plano & Assinaturas
            </button>
            
            <button
              onClick={() => {
                logout();
                navigate({ to: '/auth' });
              }}
              className="flex-grow sm:flex-grow-0 rounded-lg border border-zinc-700 px-6 py-2.5 text-center text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800 cursor-pointer"
            >
              Sair da Conta
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export { ProfilePage };
