import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface Props {
  message: string;
  type: 'warning' | 'info' | 'success';
  onDismiss: () => void;
}

const styles = {
  warning: {
    cls: 'bg-amber-950/40 border-amber-800 text-amber-300',
    icon: AlertTriangle,
  },
  info: {
    cls: 'bg-sky-950/40 border-sky-800 text-sky-300',
    icon: Info,
  },
  success: {
    cls: 'bg-green-950/40 border-green-800 text-green-300',
    icon: CheckCircle,
  },
};

export function AlertBanner({ message, type, onDismiss }: Props) {
  const config = styles[type];
  const Icon = config.icon;

  return (
    <div className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 text-sm mb-3 ${config.cls}`}>
      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex-1 pr-6">{message}</span>
      <button
        onClick={onDismiss}
        title="Dispensar"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-current opacity-50 hover:opacity-100 cursor-pointer transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

