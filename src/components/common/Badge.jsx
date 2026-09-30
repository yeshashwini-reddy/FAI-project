import React from 'react';
import clsx from 'clsx';

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  dot = false,
  className = '' 
}) => {
  const variantStyles = {
    default: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
    primary: 'bg-crimson-950/60 text-crimson-400 border-crimson-800/50',
    cyan: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/50',
    success: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50',
    warning: 'bg-amber-950/60 text-amber-400 border-amber-800/50',
    danger: 'bg-rose-950/60 text-rose-400 border-rose-800/50',
    purple: 'bg-purple-950/60 text-purple-400 border-purple-800/50',
    outline: 'bg-transparent text-slate-400 border-slate-700/80'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wide',
    lg: 'text-sm px-3 py-1.5'
  };

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-crimson-500 animate-pulse',
    cyan: 'bg-cyan-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-rose-500 animate-pulse',
    purple: 'bg-purple-400',
    outline: 'bg-slate-500'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-mono uppercase font-semibold rounded-md border backdrop-blur-sm transition-colors',
        variantStyles[variant] || variantStyles.default,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full', dotColors[variant] || dotColors.default)} />
      )}
      {children}
    </span>
  );
};
