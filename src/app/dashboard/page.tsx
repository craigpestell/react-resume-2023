import ExperimentDashboard from '@/components/ExperimentDashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">A/B Test Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor multivariate testing experiments and conversion metrics
          </p>
        </div>
        <ExperimentDashboard />
      </div>
    </div>
  );
}
