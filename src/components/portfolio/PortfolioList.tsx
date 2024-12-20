import { usePortfolio } from '../../hooks/usePortfolio';
import { useAuthContext } from '../../contexts/AuthContext';
import { PortfolioCard } from './PortfolioCard';
import { Loader } from '../ui/Loader';
import { ErrorMessage } from '../ui/ErrorMessage';
import { EmptyState } from '../ui/EmptyState';

export function PortfolioList() {
  const { user } = useAuthContext();
  const { portfolio, loading, error } = usePortfolio(user?.id);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!portfolio.length) return <EmptyState message="No credits in your portfolio yet" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolio.map((item) => (
        <PortfolioCard key={item.id} portfolioItem={item} />
      ))}
    </div>
  );
}