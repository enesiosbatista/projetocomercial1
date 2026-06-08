import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ShieldAlert } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoadingSteps } from '@/components/ui/LoadingSteps';
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute('/analyze')({
  head: () => ({
    meta: [
      { title: 'Analisando vÃ­deo â€” ViralMind System' },
      { name: 'description', content: 'A IA estÃ¡ analisando seu vÃ­deo.' },
    ],
  }),
  component: AnalyzePage,
});

const steps = [
  'ðŸ” Identificando plataforma e vÃ­deo...',
  'ðŸ“¥ Extraindo metadados do vÃ­deo...',
  'ðŸ§  IA analisando estrutura e emoÃ§Ãµes...',
  'ðŸ“Š Calculando Score de ViralizaÃ§Ã£o...',
  'âœï¸ Gerando relatÃ³rio personalizado...',
  'âœ… AnÃ¡lise concluÃ­da! Redirecionando...',
];

const timings = [0, 2500, 6000, 12000, 20000, 27000];
const progressValues = [5, 15, 35, 55, 78, 100];

function AnalyzePage() {
  const navigate = useNavigate();
  const { deductCredit } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string>('');
  const [outOfCredits, setOutOfCredits] = useState(false);

  useEffect(() => {
    try {
      setUrl(localStorage.getItem('viralmind_url') || '');
    } catch {}

    // Verify credits first before executing analysis sequence
    const currentSession = localStorage.getItem('viralmind_session');
    let hasAvailableCredits = true;
    if (currentSession) {
      const profile = JSON.parse(currentSession);
      if (profile.credits <= 0 && profile.plan !== 'elite') {
        hasAvailableCredits = false;
      }
    }

    if (!hasAvailableCredits) {
      setOutOfCredits(true);
      return;
    }

    // Deduct 1 credit upon starting analysis
    deductCredit();

    const timeouts = timings.map((time, index) =>
      setTimeout(() => {
        setCurrentStep(index);
        setProgress(progressValues[index]);
      }, time)
    );

    // Redirect final: ao atingir o passo 5 (27000ms), aguarda 500ms e redireciona (total 27500ms)
    const redirectTimeout = setTimeout(() => {
      navigate({ to: '/result/$id', params: { id: 'mock-001' } });
    }, 27500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  if (outOfCredits) {
    return (
      <AppLayout>
        <div className="max-w-md mx-auto text-center px-4 py-24 text-white">
          <div className="inline-flex p-3 bg-red-950/40 border border-red-800 rounded-xl mb-4">
            <ShieldAlert className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold">CrÃ©ditos Esgotados! âš ï¸</h1>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            VocÃª utilizou todos os seus crÃ©ditos gratuitos. Para continuar fazendo anÃ¡lises neurais de vÃ­deo e gerando roteiros com IA, faÃ§a o upgrade para o plano Pro.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => navigate({ to: '/pricing' })}
              className="h-11 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-blue-950/30"
            >
              ðŸš€ Ver Planos & Fazer Upgrade
            </button>
            <button
              onClick={() => navigate({ to: '/dashboard' })}
              className="h-11 border border-zinc-800 hover:bg-zinc-900 active:scale-95 text-zinc-300 font-semibold rounded-xl text-sm transition-all cursor-pointer"
            >
              Voltar ao Painel
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto text-center px-4 py-20 text-white">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <Brain className="w-16 h-16 text-blue-500" />
        </motion.div>

        <h1 className="text-2xl font-bold mt-6">Analisando seu vÃ­deo...</h1>
        <p className="text-sm text-zinc-500 mt-1 truncate max-w-full">
          {url || 'link nÃ£o encontrado'}
        </p>

        <div className="mt-8">
          <LoadingSteps
            steps={steps}
            currentStep={currentStep}
          />
        </div>

        <div className="mt-8">
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600 rounded-full"
              animate={{ width: progress + '%' }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-sm font-mono text-zinc-400 mt-2 text-center">
            {progress}%
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export { AnalyzePage };

