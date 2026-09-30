import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useCase } from '../../context/CaseContext';

export const Breadcrumbs = ({ customItems }) => {
  const location = useLocation();
  const { activeCase } = useCase();

  if (customItems) {
    return (
      <nav className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
        <Link to="/dashboard" className="hover:text-slate-200 transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
        </Link>
        {customItems.map((item, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            {item.href ? (
              <Link to={item.href} className="hover:text-slate-200 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-200 font-medium truncate max-w-[200px]">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  }

  // Auto-generate from pathname
  const pathnames = location.pathname.split('/').filter(x => x);

  const getReadableName = (part, index) => {
    if (part === 'dashboard') return 'Dashboard';
    if (part === 'cases') return 'Cases';
    if (part === 'evidence') return 'Evidence';
    if (part === 'timeline') return 'Timeline';
    if (part === 'people') return 'People';
    if (part === 'connections') return 'Connections';
    if (part === 'investigation') return 'AI Investigation';
    if (part === 'reports') return 'Reports';
    if (part.startsWith('CASE-')) {
      return activeCase?.title || part;
    }
    return part.charAt(0).toUpperCase() + part.slice(1);
  };

  return (
    <nav className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
      <Link to="/dashboard" className="hover:text-slate-200 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = getReadableName(value, index);

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            {isLast ? (
              <span className="text-crimson-400 font-medium truncate max-w-[200px]">{name}</span>
            ) : (
              <Link to={to} className="hover:text-slate-200 transition-colors">
                {name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
