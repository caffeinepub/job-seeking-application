import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart3 } from 'lucide-react';

export default function SystemAnalyticsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <img src="/assets/generated/system-analytics-icon-transparent.dim_32x32.png" alt="" className="w-8 h-8" />
          System Analytics
        </h2>
        <p className="text-muted-foreground mt-1">
          Aggregated platform statistics and performance metrics
        </p>
      </div>

      <Alert>
        <BarChart3 className="h-4 w-4" />
        <AlertDescription>
          System Analytics features are being implemented. This tab will display comprehensive platform statistics.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
          <CardDescription>Key metrics and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            System analytics functionality coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
