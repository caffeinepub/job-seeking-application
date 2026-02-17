import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Video } from 'lucide-react';

export default function CandidateInterviewsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>My Interviews</CardTitle>
          </div>
          <CardDescription>View and manage your scheduled interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Video className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Interview Scheduling Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Soon you'll be able to view upcoming interviews, join video calls, and track your interview history all in one place.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
