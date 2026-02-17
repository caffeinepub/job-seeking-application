import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Target } from 'lucide-react';

export default function JobRecommendationsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Job Recommendations</CardTitle>
          </div>
          <CardDescription>Personalized job matches based on your skills and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Target className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">AI Recommendations Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Our AI will analyze your profile and suggest the best job matches tailored to your skills, experience, and career goals.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
