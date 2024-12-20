import { Wallet, ShoppingCart, Award } from 'lucide-react';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Your Wallet',
    description: 'Link your Web3 wallet to start trading carbon credits securely on the blockchain.'
  },
  {
    icon: ShoppingCart,
    title: 'Purchase Credits',
    description: 'Browse and purchase verified carbon credits from environmental projects worldwide.'
  },
  {
    icon: Award,
    title: 'Retire & Track Impact',
    description: 'Retire your credits to offset emissions and track your environmental impact.'
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Get started with carbon credit trading in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-emerald-200" />
              )}
              <div className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <step.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}