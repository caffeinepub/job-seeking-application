import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users } from 'lucide-react';

export default function ApplicationsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Applications</CardTitle>
          </div>
          <CardDescription>Review and manage candidate applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Application Management Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Review applications, shortlist candidates, and manage your hiring pipeline all in one place.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
