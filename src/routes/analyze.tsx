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
      { title: 'Analisando vídeo — ViralMind System' },
      { name: 'description', content: 'A IA está analisando seu vídeo.' },
    ],
  }),
  component: AnalyzePage,
});

const steps = [
  '🔍 Identificando plataforma e vídeo...',
  '📥 Extraindo metadados do vídeo...',
  '🧠 IA analisando estrutura e emoções...',
  '📊 Calculando Score de Viralização...',
  '✍️ Gerando relatório personalizado...',
  '✅ Análise concluída! Redirecionando...',
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
          <h1 className="text-2xl font-bold">Créditos Esgotados! ⚠️</h1>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
            Você utilizou todos os seus créditos gratuitos. Para continuar fazendo análises neurais de vídeo e gerando roteiros com IA, faça o upgrade para o plano Pro.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => navigate({ to: '/pricing' })}
              className="h-11 bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-violet-950/30"
            >
              🚀 Ver Planos & Fazer Upgrade
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
          <Brain className="w-16 h-16 text-violet-500" />
        </motion.div>

        <h1 className="text-2xl font-bold mt-6">Analisando seu vídeo...</h1>
        <p className="text-sm text-zinc-500 mt-1 truncate max-w-full">
          {url || 'link não encontrado'}
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
              className="h-full bg-violet-600 rounded-full"
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
