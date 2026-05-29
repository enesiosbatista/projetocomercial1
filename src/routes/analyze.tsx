import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoadingSteps } from '@/components/ui/LoadingSteps';

export const Route = createFileRoute('/analyze')({
  head: () => ({
    meta: [
      { title: 'Analisando vídeo — ViralMind AI' },
      { name: 'description', content: 'A IA está analisando seu vídeo.' },
    ],
  }),
  component: AnalyzePage,
});

const STEPS = [
  { delay: 0, label: '🔍 Identificando plataforma e vídeo...' },
  { delay: 2500, label: '📥 Extraindo metadados do vídeo...' },
  { delay: 6000, label: '🧠 IA analisando estrutura e emoções...' },
  { delay: 12000, label: '📊 Calculando Score de Viralização...' },
  { delay: 20000, label: '✍️ Gerando relatório personalizado...' },
  { delay: 27000, label: '✅ Análise concluída! Redirecionando...' },
];

const TOTAL_MS = 30000;

const PROGRESS_VALUES = [5, 15, 35, 55, 78, 100];

function AnalyzePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    try {
      setUrl(localStorage.getItem('viralmind_url') || '');
    } catch {}

    const timeouts = STEPS.map((s, i) =>
      setTimeout(() => {
        setCurrentStep(i);
        setProgress(PROGRESS_VALUES[i]);
      }, s.delay),
    );
    const finish = setTimeout(() => {
      navigate({ to: '/result/$id', params: { id: 'mock-001' } });
    }, TOTAL_MS - 2500);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finish);
    };
  }, [navigate]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <Brain className="h-16 w-16 text-violet-500" />
        </motion.div>

        <h1 className="mt-6 text-2xl font-bold">Analisando seu vídeo...</h1>
        <p className="mt-1 max-w-full truncate text-sm text-zinc-500">
          {url || 'link não encontrado'}
        </p>

        <div className="mt-8">
          <LoadingSteps
            steps={STEPS.map((s) => s.label)}
            currentStep={currentStep}
          />
        </div>

        <div className="mt-8">
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              className="h-full rounded-full bg-violet-600"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="mt-2 text-center font-mono text-sm text-zinc-400">
            {progress}%
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
