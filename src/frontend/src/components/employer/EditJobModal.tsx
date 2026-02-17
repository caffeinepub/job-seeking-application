import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit } from 'lucide-react';

export default function EditJobModal() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            <CardTitle>Edit Job Posting</CardTitle>
          </div>
          <CardDescription>Update job posting details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Edit className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Job Editing Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Edit and update your job postings to keep them current.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
