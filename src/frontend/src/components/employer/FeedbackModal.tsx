import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function FeedbackModal() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle>Provide Feedback</CardTitle>
          </div>
          <CardDescription>Share feedback with candidates after interviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Feedback System Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Provide constructive feedback to help candidates improve.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
