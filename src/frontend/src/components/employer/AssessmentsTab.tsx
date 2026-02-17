import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck, PlusCircle } from 'lucide-react';

export default function AssessmentsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            <CardTitle>Skill Assessments</CardTitle>
          </div>
          <CardDescription>Create and manage skill tests for candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <PlusCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Assessment Creation Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Create custom skill assessments to evaluate candidates and view their test results to make better hiring decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
