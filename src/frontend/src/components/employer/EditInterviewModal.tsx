import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

export default function EditInterviewModal() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Edit Interview</CardTitle>
          </div>
          <CardDescription>Update interview details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Interview Management Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Edit and manage interview schedules with candidates.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
