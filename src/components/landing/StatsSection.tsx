export function StatsSection() {
  return (
    <section className="py-20 bg-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            number="1M+"
            label="Carbon Credits Traded"
            sublabel="Through our platform"
          />
          <StatCard
            number="500k"
            label="Tons CO₂ Offset"
            sublabel="Direct environmental impact"
          />
          <StatCard
            number="1000+"
            label="Active Traders"
            sublabel="Growing community"
          />
          <StatCard
            number="50+"
            label="Verified Projects"
            sublabel="Worldwide coverage"
          />
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  number: string;
  label: string;
  sublabel: string;
}

function StatCard({ number, label, sublabel }: StatCardProps) {
  return (
    <div className="text-center">
      <p className="text-4xl font-bold text-white mb-2">{number}</p>
      <p className="text-lg font-medium text-emerald-100 mb-1">{label}</p>
      <p className="text-sm text-emerald-200/80">{sublabel}</p>
    </div>
  );
}