import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, PlusCircle } from 'lucide-react';

export default function JobListingsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <CardTitle>Job Listings</CardTitle>
          </div>
          <CardDescription>Manage your job postings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <PlusCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Job Management Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Create, edit, and manage your job postings to attract the best candidates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
