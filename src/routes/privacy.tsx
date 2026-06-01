import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Shield, ArrowLeft } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [{ title: 'Política de Privacidade — ViralMind System' }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-12 text-white">
        {/* Back Button */}
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 text-xs font-semibold uppercase tracking-wider mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Voltar para o início
        </button>

        {/* Heading */}
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <div className="flex items-center gap-2 text-cyan-400 mb-3">
            <Shield size={20} />
            <span className="text-xs font-semibold uppercase tracking-wider">Segurança e Dados</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Política de Privacidade</h1>
          <p className="text-xs text-zinc-500 mt-2 font-mono">Última atualização: 1 de Junho de 2026</p>
        </div>

        {/* Contents */}
        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">1. Coleta de Informações</h2>
            <p>
              Coletamos informações cadastrais básicas necessárias para estabelecer sua conta (como endereço de e-mail e nome completo) no momento do registro no **ViralMind System**. Adicionalmente, quando você utiliza a nossa inteligência artificial para avaliar links públicos de vídeo, mantemos o histórico das análises associado ao seu perfil para fins de exibição no seu Dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">2. Processamento e Segurança dos Dados</h2>
            <p>
              Toda transação financeira (Stripe Checkout) é processada de ponta a ponta com segurança bancária HTTPS SSL pela própria Stripe — a Plataforma não possui acesso direto, nem armazena números de cartões de crédito ou dados bancários privados de pagamento.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">3. Compartilhamento com Terceiros</h2>
            <p>
              Não compartilhamos ou vendemos suas informações cadastrais a agências de publicidade ou a terceiros estranhos à operação regular do serviço. As chamadas enviadas à API da OpenAI/Anthropic contêm estritamente os metadados do vídeo analisado e não carregam dados de identificação pessoal dos usuários.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">4. Direitos e LGPD / GDPR Compliance</h2>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD) brasileira e com o Regulamento Geral sobre a Proteção de Dados (GDPR) europeu, garantimos a você o direito de exportar o conjunto total de seus dados ou solicitar a exclusão permanente de todas as suas análises e do seu perfil de usuário a qualquer momento. Para isso, utilize os botões em seu **Meu Perfil**.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">5. Uso de Cookies</h2>
            <p>
              Utilizamos cookies estritamente necessários para manter a persistência da sua sessão autenticada de usuário e lembrar preferências de exibição do layout da Sidebar (colapsado ou expandido).
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
export { PrivacyPage };
