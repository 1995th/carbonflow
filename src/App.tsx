import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Web3Provider } from './lib/web3/Web3Provider';
import { ToastProvider } from './contexts/ToastContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardOverview } from './components/dashboard/pages/DashboardOverview';
import { DashboardMarketplace } from './components/dashboard/pages/DashboardMarketplace';
import { DashboardPortfolio } from './components/dashboard/pages/DashboardPortfolio';
import { DashboardHistory } from './components/dashboard/pages/DashboardHistory';

export default function App() {
  return (
    <ErrorBoundary>
      <Web3Provider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                  <Route index element={<DashboardOverview />} />
                  <Route path="marketplace" element={<DashboardMarketplace />} />
                  <Route path="portfolio" element={<DashboardPortfolio />} />
                  <Route path="history" element={<DashboardHistory />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </Web3Provider>
    </ErrorBoundary>
  );
}