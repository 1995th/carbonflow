import { Loader2 } from 'lucide-react';

interface AuthButtonProps {
  isConnected: boolean;
  isLoading?: boolean;
  type?: 'submit' | 'button';
  onClick?: () => void;
  children: React.ReactNode;
}

export function AuthButton({ 
  isConnected, 
  isLoading, 
  type = 'submit',
  onClick,
  children 
}: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg 
        hover:from-emerald-600 hover:to-blue-600 transition-all duration-200 transform hover:-translate-y-0.5
        disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
      {isConnected ? children : `Connect Wallet & ${children}`}
    </button>
  );
}