import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileEdit } from 'lucide-react';

export default function CreateAssessmentModal() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileEdit className="h-5 w-5 text-primary" />
            <CardTitle>Create Assessment</CardTitle>
          </div>
          <CardDescription>Build custom skill tests for candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileEdit className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Assessment Builder Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              A comprehensive assessment builder will be available soon for creating custom skill tests.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
