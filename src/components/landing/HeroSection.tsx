import { LeafyGreen, TrendingUp, Wallet } from 'lucide-react';
import { useWeb3 } from '../../lib/web3/hooks';

export function HeroSection() {
  const { connectWallet } = useWeb3();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Accelerate Climate Action Through Carbon Credits
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join the global movement towards sustainability. Trade verified carbon credits 
            directly on the blockchain with full transparency and traceability.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={connectWallet}
              className="flex items-center px-6 py-3 rounded-lg bg-emerald-600 text-white 
                hover:bg-emerald-700 transition-colors"
            >
              <Wallet className="h-5 w-5 mr-2" />
              Connect Wallet
            </button>
            <a 
              href="#marketplace" 
              className="flex items-center px-6 py-3 rounded-lg border border-emerald-600 
                text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              View Credits
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
    </div>
  );
}