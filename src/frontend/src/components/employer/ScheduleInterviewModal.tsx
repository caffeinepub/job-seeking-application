import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarPlus } from 'lucide-react';

export default function ScheduleInterviewModal() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5 text-primary" />
            <CardTitle>Schedule Interview</CardTitle>
          </div>
          <CardDescription>Set up an interview with a candidate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CalendarPlus className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Interview Scheduling Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Schedule interviews with candidates and send automated invitations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
