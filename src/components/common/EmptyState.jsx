import React from 'react';
import { ShieldAlert, Search } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Search,
  title = "No results found",
  description = "Try adjusting your search criteria or clear active filters.",
  actionLabel,
  onAction,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-dark-900/40 border border-dashed border-slate-800/80 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 mb-4 shadow-inner">
        <Icon className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-200">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-400 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="secondary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
