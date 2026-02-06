import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useGetCareerPathRecommendations, useGenerateCareerPathRecommendations } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { TrendingUp, Target, BookOpen, Award, Clock, ExternalLink, Lightbulb, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

const experienceLevelLabels: Record<string, string> = {
  entryLevel: 'Entry Level',
  midLevel: 'Mid Level',
  seniorLevel: 'Senior Level',
  executive: 'Executive',
};

const experienceLevelOrder = ['entryLevel', 'midLevel', 'seniorLevel', 'executive'];

export default function CareerPathTab() {
  const { identity } = useInternetIdentity();
  const candidatePrincipal = identity?.getPrincipal();
  
  const { data: careerPath, isLoading, refetch } = useGetCareerPathRecommendations(candidatePrincipal);
  const generateMutation = useGenerateCareerPathRecommendations();
  
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCareerPath = async () => {
    if (!candidatePrincipal) return;
    
    setIsGenerating(true);
    try {
      // Mock data for demonstration - in production this would come from actual user data
      await generateMutation.mutateAsync({
        candidate: candidatePrincipal,
        currentLevel: 'midLevel' as any,
        progressPercentage: BigInt(65),
        completedStages: BigInt(2),
        skills: ['React', 'TypeScript', 'Node.js'],
        completedMilestones: BigInt(3),
        currentRole: 'Frontend Developer',
        recommendedLearningResources: [],
        industry: 'Technology',
        improvementTips: [],
        skillAreas: [],
        progressSnapshot: [],
        progressMilestones: [],
        progressHistory: [],
        recommendedRoles: [],
        careerProgressStages: [],
        growthTrends: [],
        careerProgressMetrics: [],
        careerObjectives: [],
        industryTrends: { currentTrends: [], emergingSkills: [] },
        nextLevel: 'seniorLevel' as any,
        completionRate: 0.65,
        recommendedLearningPaths: [],
        progressChallenges: [],
        averageCompletionTime: BigInt(180),
        currentRating: BigInt(4),
        challengeMap: [],
        milestoneCompleted: false,
      });
      await refetch();
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your career path...</p>
        </div>
      </div>
    );
  }

  if (!careerPath) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <img src="/assets/generated/career-path-roadmap-icon-transparent.dim_32x32.png" alt="Career Path" className="w-20 h-20 mx-auto opacity-50" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Generate Your Career Path</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Get personalized career recommendations based on your skills, learning progress, and goals. 
                We'll help you chart your path to success!
              </p>
            </div>
            <Button 
              onClick={handleGenerateCareerPath} 
              disabled={isGenerating}
              size="lg"
              className="mt-4"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Generate Career Path
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = careerPath.careerProgress;
  const currentLevelIndex = experienceLevelOrder.indexOf(progress.currentLevel);
  const nextLevelIndex = progress.nextLevel ? experienceLevelOrder.indexOf(progress.nextLevel) : -1;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <img src="/assets/generated/career-path-roadmap-icon-transparent.dim_32x32.png" alt="Career Path" className="w-8 h-8" />
            Your Career Path
          </h2>
          <p className="text-muted-foreground">
            Personalized recommendations to advance your career in {careerPath.industry}
          </p>
        </div>
        <Button variant="outline" onClick={handleGenerateCareerPath} disabled={isGenerating}>
          <TrendingUp className="w-4 h-4 mr-2" />
          Refresh Recommendations
        </Button>
      </div>

      {/* Career Progression Timeline */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/assets/generated/career-timeline-icon-transparent.dim_24x24.png" alt="Timeline" className="w-6 h-6" />
            Career Progression Timeline
          </CardTitle>
          <CardDescription>Your journey from {experienceLevelLabels[progress.currentLevel]} to the next level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Visual Timeline */}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              {experienceLevelOrder.map((level, index) => {
                const isCompleted = index < currentLevelIndex;
                const isCurrent = index === currentLevelIndex;
                const isNext = index === nextLevelIndex;
                
                return (
                  <div key={level} className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 ${
                      isCompleted ? 'bg-primary border-primary text-primary-foreground' :
                      isCurrent ? 'bg-primary/20 border-primary text-primary' :
                      isNext ? 'bg-secondary border-secondary text-secondary-foreground' :
                      'bg-muted border-muted-foreground/20 text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <Award className="w-6 h-6" />
                      ) : isCurrent ? (
                        <MapPin className="w-6 h-6" />
                      ) : (
                        <Target className="w-6 h-6" />
                      )}
                    </div>
                    <span className={`text-xs font-medium text-center ${
                      isCurrent ? 'text-primary' : isNext ? 'text-secondary-foreground' : 'text-muted-foreground'
                    }`}>
                      {experienceLevelLabels[level]}
                    </span>
                    {isCurrent && (
                      <Badge variant="default" className="mt-1 text-xs">Current</Badge>
                    )}
                    {isNext && (
                      <Badge variant="secondary" className="mt-1 text-xs">Next Goal</Badge>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-semibold">{Number(progress.progressPercentage)}%</span>
              </div>
              <Progress value={Number(progress.progressPercentage)} className="h-3" />
            </div>
          </div>

          {/* Current Role & Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Number(progress.completedStages)}</div>
              <div className="text-xs text-muted-foreground">Stages Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{Number(progress.completedMilestones)}</div>
              <div className="text-xs text-muted-foreground">Milestones Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{(progress.completionRate * 100).toFixed(0)}%</div>
              <div className="text-xs text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Next Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/assets/generated/next-role-icon-transparent.dim_24x24.png" alt="Next Roles" className="w-6 h-6" />
            Recommended Next Roles
          </CardTitle>
          <CardDescription>Career opportunities aligned with your skills and growth trajectory</CardDescription>
        </CardHeader>
        <CardContent>
          {careerPath.recommendedRoles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Complete more learning activities to unlock role recommendations</p>
            </div>
          ) : (
            <div className="space-y-4">
              {careerPath.recommendedRoles.map((role, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{role.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="secondary">
                            Success Rate: {(role.successProbability * 100).toFixed(0)}%
                          </Badge>
                          <Badge variant="outline">
                            Alignment: {(role.careerPathAlignment * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{Number(role.estimatedPreparationTime)} days</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Required Skills */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <img src="/assets/generated/skill-priority-icon-transparent.dim_20x20.png" alt="Skills" className="w-4 h-4" />
                        Required Skills
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.requiredSkills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Resources */}
                    {role.recommendedResources.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <BookOpen className="w-4 h-4" />
                          Recommended Learning Resources
                        </div>
                        <div className="space-y-2">
                          {role.recommendedResources.slice(0, 3).map((resource) => (
                            <div key={resource.id.toString()} className="flex items-center justify-between p-2 bg-muted/50 rounded text-sm">
                              <div className="flex items-center gap-2">
                                <ExternalLink className="w-3 h-3" />
                                <span>{resource.title}</span>
                                <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">{Number(resource.estimateHours)}h</span>
                            </div>
                          ))}
                          {role.recommendedResources.length > 3 && (
                            <p className="text-xs text-muted-foreground text-center">
                              +{role.recommendedResources.length - 3} more resources
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skill Development Priorities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/assets/generated/skill-priority-icon-transparent.dim_20x20.png" alt="Priorities" className="w-6 h-6" />
            Priority Skill Development Areas
          </CardTitle>
          <CardDescription>Focus on these skills to advance your career</CardDescription>
        </CardHeader>
        <CardContent>
          {progress.skills.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Update your profile with skills to get personalized recommendations</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {progress.skills.map((skill, idx) => (
                  <Badge key={idx} variant="default" className="text-sm px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>

              {progress.improvementTips.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Lightbulb className="w-4 h-4" />
                    Improvement Tips
                  </div>
                  <ul className="space-y-2">
                    {progress.improvementTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Resources Aligned with Career Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Career-Aligned Learning Resources
          </CardTitle>
          <CardDescription>Resources recommended to help you reach your career goals</CardDescription>
        </CardHeader>
        <CardContent>
          {progress.recommendedLearningResources.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Learning resources will appear here based on your career path</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {progress.recommendedLearningResources.map((resource) => (
                <Card key={resource.id.toString()} className="border-l-4 border-l-secondary">
                  <CardContent className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{resource.title}</h4>
                          <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                          <Badge variant="secondary" className="text-xs">{resource.difficultyLevel}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{Number(resource.estimateHours)}h</span>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Career Milestones */}
      {progress.progressMilestones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <img src="/assets/generated/career-milestone-icon-transparent.dim_24x24.png" alt="Milestones" className="w-6 h-6" />
              Career Milestones
            </CardTitle>
            <CardDescription>Track your achievements on your career journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {progress.progressMilestones.map((milestone, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm">{milestone}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Industry Trends */}
      {progress.industryTrends && (progress.industryTrends.currentTrends.length > 0 || progress.industryTrends.emergingSkills.length > 0) && (
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Industry Trends in {careerPath.industry}
            </CardTitle>
            <CardDescription>Stay ahead with current market insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {progress.industryTrends.currentTrends.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Current Trends</h4>
                <div className="flex flex-wrap gap-2">
                  {progress.industryTrends.currentTrends.map((trend, idx) => (
                    <Badge key={idx} variant="secondary">{trend}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {progress.industryTrends.emergingSkills.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Emerging Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {progress.industryTrends.emergingSkills.map((skill, idx) => (
                    <Badge key={idx} variant="default">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
