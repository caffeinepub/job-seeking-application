import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGetCandidateGrowthData, useGetLearningProgress } from '../../hooks/useQueries';
import { TrendingUp, BookOpen, Award, MessageSquare, Target, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function GrowthTrackerTab() {
  const { data: growthData, isLoading: isLoadingGrowth } = useGetCandidateGrowthData();
  const { data: learningProgress, isLoading: isLoadingProgress } = useGetLearningProgress();

  if (isLoadingGrowth || isLoadingProgress) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your growth data...</p>
        </div>
      </div>
    );
  }

  if (!growthData) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <img src="/assets/generated/growth-tracker-icon-transparent.dim_32x32.png" alt="Growth Tracker" className="w-16 h-16 mx-auto opacity-50" />
            <p className="text-muted-foreground">No growth data available yet. Start completing learning resources and taking assessments!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const overallProgress = Number(growthData.overallProgressPercentage);
  const metrics = growthData.cumulativeGrowthMetrics;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <img src="/assets/generated/growth-tracker-icon-transparent.dim_32x32.png" alt="Growth Tracker" className="w-8 h-8" />
            Skill Growth Tracker
          </h2>
          <p className="text-muted-foreground">
            Track your learning progress and skill development journey
          </p>
        </div>
      </div>

      {/* Overall Progress Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/assets/generated/progress-percentage-icon-transparent.dim_32x32.png" alt="Progress" className="w-6 h-6" />
            Overall Growth Progress
          </CardTitle>
          <CardDescription>Your cumulative skill development across all activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-bold text-primary">{overallProgress}%</span>
              <Badge variant={overallProgress >= 75 ? 'default' : overallProgress >= 50 ? 'secondary' : 'outline'} className="text-lg px-4 py-1">
                {overallProgress >= 75 ? 'Excellent' : overallProgress >= 50 ? 'Good Progress' : 'Getting Started'}
              </Badge>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Learning Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">{Number(metrics.resourcesCompleted)}</div>
              <p className="text-xs text-muted-foreground">Resources completed</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Contribution:</span>
                <Badge variant="secondary">{(metrics.resourcesWeight * 100).toFixed(0)}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4 text-green-600" />
              Skill Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">{Number(metrics.assessmentsTaken)}</div>
              <p className="text-xs text-muted-foreground">Assessments completed</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Contribution:</span>
                <Badge variant="secondary">{(metrics.assessmentsWeight * 100).toFixed(0)}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              Feedback Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-bold">{Number(metrics.feedbackReceived)}</div>
              <p className="text-xs text-muted-foreground">Feedback from employers</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Contribution:</span>
                <Badge variant="secondary">{(metrics.feedbackWeight * 100).toFixed(0)}%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Individual Skill Areas Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/assets/generated/skill-progress-bar-icon-transparent.dim_24x24.png" alt="Skills" className="w-6 h-6" />
            Skill Area Progress
          </CardTitle>
          <CardDescription>Track your development across different skill categories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {growthData.skillAreaProgress.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Start learning to see your skill area progress</p>
            </div>
          ) : (
            growthData.skillAreaProgress.map((skillArea) => (
              <div key={skillArea.skillCategory} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skillArea.skillCategory}</span>
                    {skillArea.milestone && (
                      <Badge variant="default" className="text-xs">
                        <img src="/assets/generated/growth-milestone-icon-transparent.dim_24x24.png" alt="Milestone" className="w-3 h-3 mr-1" />
                        Milestone
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{Number(skillArea.percentage)}%</span>
                    {skillArea.improvement > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +{Number(skillArea.improvement)}
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress value={Number(skillArea.percentage)} className="h-2" />
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Recent Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Learning Activity
          </CardTitle>
          <CardDescription>Your latest completed resources and assessments</CardDescription>
        </CardHeader>
        <CardContent>
          {growthData.activityHistory.length === 0 && growthData.assessmentContributions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No activity yet. Start your learning journey!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Learning Activities */}
              {growthData.activityHistory.slice(0, 5).map((activity, idx) => (
                <div key={`activity-${idx}`} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="mt-1">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Completed Learning Resource</p>
                    <p className="text-xs text-muted-foreground">Resource ID: {activity.resourceId.toString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(Number(activity.dateCompleted) / 1000000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Assessment Contributions */}
              {growthData.assessmentContributions.slice(0, 5).map((assessment, idx) => (
                <div key={`assessment-${idx}`} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="mt-1">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Completed Skill Assessment</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">Score: {Number(assessment.score)}%</Badge>
                      <Badge variant="outline" className="text-xs">{assessment.skillCategory}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(Number(assessment.dateTaken) / 1000000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* Feedback Contributions */}
              {growthData.feedbackContributions.slice(0, 3).map((feedback, idx) => (
                <div key={`feedback-${idx}`} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="mt-1">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Received Feedback</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">Rating: {Number(feedback.rating)}/5</Badge>
                      <Badge variant="outline" className="text-xs">{feedback.skillCategory}</Badge>
                    </div>
                    {feedback.comment && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{feedback.comment}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(Number(feedback.dateReceived) / 1000000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Growth Tips */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/assets/generated/growth-trend-icon-transparent.dim_24x24.png" alt="Tips" className="w-6 h-6" />
            Tips to Boost Your Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Complete learning resources regularly to increase your overall progress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Take skill assessments to demonstrate your expertise and earn points</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Attend interviews and receive feedback to improve your professional skills</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Focus on skill areas with lower progress to achieve balanced growth</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
