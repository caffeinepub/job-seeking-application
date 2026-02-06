import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Activity } from 'lucide-react';

export default function ActivityMonitorTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <img src="/assets/generated/activity-monitor-icon-transparent.dim_32x32.png" alt="" className="w-8 h-8" />
          Activity Monitor
        </h2>
        <p className="text-muted-foreground mt-1">
          Real-time platform activity logs and system events
        </p>
      </div>

      <Alert>
        <Activity className="h-4 w-4" />
        <AlertDescription>
          Activity Monitor features are being implemented. This tab will display real-time activity logs.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Chronological logs of platform events</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Activity monitoring functionality coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
