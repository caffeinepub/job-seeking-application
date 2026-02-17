import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Analytics Dashboard</CardTitle>
          </div>
          <CardDescription>Track your job search performance and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              We're building comprehensive analytics to help you track your applications, interview performance, and career growth metrics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
