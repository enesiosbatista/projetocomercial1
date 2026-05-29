import { createFileRoute } from '@tanstack/react-router';
import { AppLayout } from '@/components/layout/AppLayout';

export const Route = createFileRoute('/insights')({
  head: () => ({
    meta: [{ title: 'Insights — ViralMind AI' }],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <AppLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Insights</h1>
        <p className="mt-2 text-sm text-zinc-400">Em construção — próximo prompt</p>
      </div>
    </AppLayout>
  );
}
