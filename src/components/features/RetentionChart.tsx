import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import type { RetentionPoint } from '@/types/database';

interface Props {
  data: RetentionPoint[];
}

export function RetentionChart({ data }: Props) {
  if (!data || data.length === 0) {
    return <div className="text-sm text-zinc-500 py-10 text-center">Nenhum dado de retenção disponível.</div>;
  }

  // Maior queda
  const dropIndex = data.reduce(
    (maxIdx, _, i) =>
      i < data.length - 1 &&
      (data[i].retention - data[i + 1].retention) >
        (data[maxIdx].retention - data[maxIdx + 1].retention)
        ? i
        : maxIdx,
    0
  );

  // Pico após ponto 5
  const peakIndex =
    data
      .slice(5)
      .reduce(
        (maxIdx, item, i) =>
          item.retention > data[5 + maxIdx].retention
            ? i
            : maxIdx,
        0
      ) + 5;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          horizontal={true}
          vertical={false}
          stroke="#27272A"
        />

        <XAxis
          dataKey="second"
          tickFormatter={(v) => v + 's'}
          stroke="#52525B"
          tick={{ fontSize: 11 }}
        />

        <YAxis
          domain={[0, 100]}
          tickFormatter={(v) => v + '%'}
          stroke="#52525B"
          tick={{ fontSize: 11 }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: '#18181B',
            border: '1px solid #3F3F46',
            borderRadius: '8px',
            fontSize: '11px',
          }}
          labelFormatter={(v) => `Segundo: ${v}s`}
          formatter={(val: number) => [`${val}%`, 'Retenção']}
        />

        <Area
          type="monotone"
          dataKey="retention"
          stroke="#7C3AED"
          strokeWidth={2}
          fill="url(#retentionGradient)"
        />

        {data[dropIndex] && (
          <ReferenceLine
            x={data[dropIndex].second}
            stroke="#F59E0B"
            strokeDasharray="3 3"
            label={{
              value: '⚠ Queda',
              fill: '#FBBF24',
              fontSize: 10,
              position: 'top',
            }}
          />
        )}

        {data[peakIndex] && (
          <ReferenceLine
            x={data[peakIndex].second}
            stroke="#22C55E"
            strokeDasharray="3 3"
            label={{
              value: '📈 Pico',
              fill: '#22C55E',
              fontSize: 10,
              position: 'top',
            }}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
