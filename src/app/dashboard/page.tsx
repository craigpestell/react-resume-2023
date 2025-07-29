import EdgeConfigDashboard from '@/components/EdgeConfigDashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">A/B Test Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor Edge Config experiments and conversion metrics
          </p>
        </div>
        
        {/* Edge Config Experiments */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Edge Config Experiments</h2>
          <EdgeConfigDashboard />
        </div>
      </div>
    </div>
  );
}
