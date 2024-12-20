import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = 'Loading...' }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}