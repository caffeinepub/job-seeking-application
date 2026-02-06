import { useGetResumeAnalysis, useGetResumeRecommendations } from '../../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ResumeAnalysisTab() {
  const { data: resumeAnalysis, isLoading } = useGetResumeAnalysis();
  const { data: recommendations = [] } = useGetResumeRecommendations();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Resume Analysis</h2>
        <p className="text-muted-foreground">AI-powered insights to improve your resume</p>
      </div>

      {/* Feature Notice */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          The resume analysis feature is currently being implemented. This feature will be available soon.
        </AlertDescription>
      </Alert>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <img 
            src="/assets/generated/resume-analysis-icon-transparent.dim_32x32.png" 
            alt="Resume Analysis" 
            className="h-16 w-16 mb-4 opacity-50"
          />
          <h3 className="text-lg font-semibold mb-2">No Resume Analysis Available</h3>
          <p className="text-muted-foreground mb-4">
            Upload your resume and request analysis to get AI-powered insights
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
