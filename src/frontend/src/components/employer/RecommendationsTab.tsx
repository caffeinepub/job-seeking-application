import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Target } from 'lucide-react';

export default function RecommendationsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Candidate Recommendations</CardTitle>
          </div>
          <CardDescription>Discover candidates that match your job requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Target className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Recommendations Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Our AI will match the best candidates to your job postings based on skills, experience, and cultural fit.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
