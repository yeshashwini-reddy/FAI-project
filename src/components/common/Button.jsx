import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-crimson-600 hover:bg-crimson-500 text-white border border-crimson-500/50 shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] focus:ring-crimson-500',
    secondary: 'bg-dark-800 hover:bg-dark-750 text-slate-200 border border-slate-700/80 hover:border-slate-600 hover:text-white shadow-sm focus:ring-cyan-500',
    cyan: 'bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400/50 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] focus:ring-cyan-400',
    ghost: 'bg-transparent hover:bg-dark-800/80 text-slate-300 hover:text-white border border-transparent hover:border-slate-700/50 focus:ring-slate-500',
    outline: 'bg-transparent hover:bg-slate-800/40 text-slate-200 border border-slate-700 hover:border-slate-500 focus:ring-slate-500',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white border border-rose-500 shadow-sm focus:ring-rose-500'
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
    icon: 'p-2'
  };

  return (
    <button
      type={type}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 flex-shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 flex-shrink-0" />}
        </>
      )}
    </button>
  );
};
