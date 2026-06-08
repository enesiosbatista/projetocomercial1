import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Shield, ArrowLeft } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [{ title: 'PolÃ­tica de Privacidade â€” ViralMind System' }],
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
          <ArrowLeft size={14} /> Voltar para o inÃ­cio
        </button>

        {/* Heading */}
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <div className="flex items-center gap-2 text-sky-400 mb-3">
            <Shield size={20} />
            <span className="text-xs font-semibold uppercase tracking-wider">SeguranÃ§a e Dados</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">PolÃ­tica de Privacidade</h1>
          <p className="text-xs text-zinc-500 mt-2 font-mono">Ãšltima atualizaÃ§Ã£o: 1 de Junho de 2026</p>
        </div>

        {/* Contents */}
        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">1. Coleta de InformaÃ§Ãµes</h2>
            <p>
              Coletamos informaÃ§Ãµes cadastrais bÃ¡sicas necessÃ¡rias para estabelecer sua conta (como endereÃ§o de e-mail e nome completo) no momento do registro no **ViralMind System**. Adicionalmente, quando vocÃª utiliza a nossa inteligÃªncia artificial para avaliar links pÃºblicos de vÃ­deo, mantemos o histÃ³rico das anÃ¡lises associado ao seu perfil para fins de exibiÃ§Ã£o no seu Dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">2. Processamento e SeguranÃ§a dos Dados</h2>
            <p>
              Toda transaÃ§Ã£o financeira (Stripe Checkout) Ã© processada de ponta a ponta com seguranÃ§a bancÃ¡ria HTTPS SSL pela prÃ³pria Stripe â€” a Plataforma nÃ£o possui acesso direto, nem armazena nÃºmeros de cartÃµes de crÃ©dito ou dados bancÃ¡rios privados de pagamento.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">3. Compartilhamento com Terceiros</h2>
            <p>
              NÃ£o compartilhamos ou vendemos suas informaÃ§Ãµes cadastrais a agÃªncias de publicidade ou a terceiros estranhos Ã  operaÃ§Ã£o regular do serviÃ§o. As chamadas enviadas Ã  API da OpenAI/Anthropic contÃªm estritamente os metadados do vÃ­deo analisado e nÃ£o carregam dados de identificaÃ§Ã£o pessoal dos usuÃ¡rios.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">4. Direitos e LGPD / GDPR Compliance</h2>
            <p>
              Em conformidade com a Lei Geral de ProteÃ§Ã£o de Dados (LGPD) brasileira e com o Regulamento Geral sobre a ProteÃ§Ã£o de Dados (GDPR) europeu, garantimos a vocÃª o direito de exportar o conjunto total de seus dados ou solicitar a exclusÃ£o permanente de todas as suas anÃ¡lises e do seu perfil de usuÃ¡rio a qualquer momento. Para isso, utilize os botÃµes em seu **Meu Perfil**.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-zinc-100 mb-3">5. Uso de Cookies</h2>
            <p>
              Utilizamos cookies estritamente necessÃ¡rios para manter a persistÃªncia da sua sessÃ£o autenticada de usuÃ¡rio e lembrar preferÃªncias de exibiÃ§Ã£o do layout da Sidebar (colapsado ou expandido).
            </p>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
export { PrivacyPage };

