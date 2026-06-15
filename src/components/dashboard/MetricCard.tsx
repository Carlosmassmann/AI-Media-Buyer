import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number; // percentage change vs previous period
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
}

export function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-violet-400",
  description,
}: MetricCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {title}
          </p>
          <p className="mt-2 text-2xl font-bold text-white tracking-tight">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-xs text-zinc-500">{description}</p>
          )}
        </div>
        <div
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-800",
            iconColor
          )}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="w-3 h-3 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3 h-3 text-red-400" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              isPositive ? "text-emerald-400" : "text-red-400"
            )}
          >
            {isPositive ? "+" : ""}
            {change.toFixed(1)}%
          </span>
          <span className="text-xs text-zinc-600">vs. mês anterior</span>
        </div>
      )}
    </div>
  );
}
