import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase } from 'lucide-react';

export default function MyApplicationsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>My Applications</CardTitle>
          </div>
          <CardDescription>Track the status of your job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Application Tracking Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Keep track of all your job applications, their status, and receive updates when employers review your profile.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
