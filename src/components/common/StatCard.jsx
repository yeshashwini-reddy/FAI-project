import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const StatCard = ({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  color = 'crimson',
  sublabel,
  onClick,
  className = ''
}) => {
  const colorMap = {
    crimson: {
      bg: 'group-hover:border-crimson-500/40',
      iconBg: 'bg-crimson-950/60 border-crimson-800/60 text-crimson-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(225,29,72,0.15)]',
      valueColor: 'text-slate-100'
    },
    cyan: {
      bg: 'group-hover:border-cyan-500/40',
      iconBg: 'bg-cyan-950/60 border-cyan-800/60 text-cyan-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]',
      valueColor: 'text-slate-100'
    },
    emerald: {
      bg: 'group-hover:border-emerald-500/40',
      iconBg: 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]',
      valueColor: 'text-slate-100'
    },
    amber: {
      bg: 'group-hover:border-amber-500/40',
      iconBg: 'bg-amber-950/60 border-amber-800/60 text-amber-400',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      valueColor: 'text-slate-100'
    }
  };

  const scheme = colorMap[color] || colorMap.crimson;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={clsx(
        'group relative bg-dark-900/90 border border-slate-800/80 rounded-xl p-5 backdrop-blur-md transition-all duration-300',
        scheme.bg,
        scheme.glow,
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono font-medium text-slate-400 tracking-wider uppercase">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={clsx('text-3xl font-mono font-bold tracking-tight', scheme.valueColor)}>
              {value}
            </span>
            {sublabel && (
              <span className="text-xs text-slate-500 font-mono">{sublabel}</span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={clsx('p-2.5 rounded-lg border flex items-center justify-center transition-transform group-hover:scale-110 duration-300', scheme.iconBg)}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(trend || trendLabel) && (
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>{trendLabel || 'Activity index'}</span>
          {trend && (
            <span className="text-emerald-400 font-semibold">{trend}</span>
          )}
        </div>
      )}
    </motion.div>
  );
};
