import { CheckCircle, Circle, Loader2 } from 'lucide-react';

interface Props {
  steps: string[];
  currentStep: number;
}

export function LoadingSteps({ steps, currentStep }: Props) {
  return (
    <ul className="space-y-2 mt-8 text-left">
      {steps.map((step, i) => {
        const isDone = i < currentStep;
        const isActive = i === currentStep;

        if (isDone) {
          return (
            <li key={i} className="flex items-center gap-3 text-zinc-500">
              <CheckCircle className="text-green-500 w-4 h-4 shrink-0" />
              <span className="text-sm line-through decoration-zinc-700">{step}</span>
            </li>
          );
        }

        if (isActive) {
          return (
            <li key={i} className="flex items-center gap-3 text-white">
              <Loader2 className="text-blue-400 w-4 h-4 animate-spin shrink-0" />
              <span className="text-sm font-medium">{step}</span>
            </li>
          );
        }

        // Future
        return (
          <li key={i} className="flex items-center gap-3 text-zinc-600">
            <Circle className="text-zinc-700 w-4 h-4 shrink-0" />
            <span className="text-sm">{step}</span>
          </li>
        );
      })}
    </ul>
  );
}


