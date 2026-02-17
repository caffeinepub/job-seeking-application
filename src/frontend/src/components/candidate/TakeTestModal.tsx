import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileQuestion } from 'lucide-react';

export default function TakeTestModal() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-primary" />
            <CardTitle>Take Assessment</CardTitle>
          </div>
          <CardDescription>Complete skill assessments to boost your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Assessment Interface Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              An interactive test-taking interface will be available soon for completing skill assessments.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
