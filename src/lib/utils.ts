import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'agora mesmo';
  if (hours < 24) return `há ${hours} hora${hours > 1 ? 's' : ''}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `há ${days} dia${days > 1 ? 's' : ''}`;
  return 'há mais de 1 mês';
}

export function getScoreColor(score: number): string {
  if (score >= 85) return 'text-blue-400';
  if (score >= 70) return 'text-green-400';
  if (score >= 40) return 'text-amber-400';
  return 'text-red-400';
}

export function getScoreStroke(score: number): string {
  if (score >= 85) return '#3B82F6';
  if (score >= 70) return '#22C55E';
  if (score >= 40) return '#F59E0B';
  return '#EF4444';
}

export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(0)}k`;
  return views.toString();
}
