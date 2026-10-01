import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CaseProvider } from './context/CaseContext';
import { AppLayout } from './components/layout/AppLayout';

import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Cases } from './pages/Cases';
import { CaseDetails } from './pages/CaseDetails';
import { SolveCasePage } from './pages/SolveCasePage';
import { Evidence } from './pages/Evidence';
import { TimelinePage } from './pages/TimelinePage';
import { People } from './pages/People';
import { Connections } from './pages/Connections';
import { Investigation } from './pages/Investigation';
import { Reports } from './pages/Reports';

export function App() {
  return (
    <CaseProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page with custom hero layout */}
          <Route path="/" element={<Landing />} />

          {/* Main App Workspace inside AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/cases/:caseId" element={<CaseDetails />} />
            <Route path="/cases/:caseId/solve" element={<SolveCasePage />} />
            <Route path="/evidence" element={<Evidence />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/people" element={<People />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/investigation" element={<Investigation />} />
            <Route path="/reports" element={<Reports />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CaseProvider>
  );
}

export default App;
