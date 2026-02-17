import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileBarChart } from 'lucide-react';

export default function TestResultsModal() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileBarChart className="h-5 w-5 text-primary" />
            <CardTitle>Test Results</CardTitle>
          </div>
          <CardDescription>View candidate assessment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileBarChart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Results Viewing Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              View detailed test results and candidate performance analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
