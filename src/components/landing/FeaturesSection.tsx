import { Shield, Leaf, LineChart, Users } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Projects',
    description: 'All carbon credits are sourced from internationally recognized verification standards.'
  },
  {
    icon: Leaf,
    title: 'Real Impact',
    description: 'Track your environmental impact with transparent reporting and retirement verification.'
  },
  {
    icon: LineChart,
    title: 'Market Insights',
    description: 'Access real-time market data and analytics to make informed trading decisions.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join a growing community of individuals and organizations fighting climate change.'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose CarbonFlow?
          </h2>
          <p className="text-lg text-gray-600">
            Our platform combines blockchain technology with environmental action to create 
            a transparent and efficient carbon credit marketplace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}