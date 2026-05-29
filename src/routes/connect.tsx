import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '@/components/layout/AppLayout';

export const Route = createFileRoute('/connect')({
  head: () => ({
    meta: [{ title: 'Conectar contas — ViralMind AI' }],
  }),
  component: ConnectPage,
});

function ConnectPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Conectar contas</h1>
        <p className="mt-2 text-sm text-zinc-400">Em construção — próximo prompt</p>
      </div>
    </AppLayout>
  );
}
