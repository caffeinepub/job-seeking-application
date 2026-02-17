import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function CreateJobModal() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle>Create Job Posting</CardTitle>
          </div>
          <CardDescription>Post a new job opening</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Briefcase className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Job Posting Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Create and publish job postings to attract qualified candidates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
