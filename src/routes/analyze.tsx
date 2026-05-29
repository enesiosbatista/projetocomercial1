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
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    try {
      setUrl(localStorage.getItem('viralmind_url') || '');
    } catch {}

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

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto text-center px-4 py-20">
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
