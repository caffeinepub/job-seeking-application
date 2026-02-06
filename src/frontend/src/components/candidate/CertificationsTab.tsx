import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Award, Calendar, CheckCircle, Clock, Trophy } from 'lucide-react';

// Placeholder data structure for certifications
type Certification = {
  id: bigint;
  candidate: string;
  title: string;
  description: string;
  issuedBy: string;
  issueDate: bigint;
  expiryDate?: bigint;
  status: 'active' | 'expired';
};

type CertificationProgress = {
  certificationType: string;
  progressPercentage: number;
  milestonesCompleted: number;
  totalMilestones: number;
  estimatedCompletion: string;
};

export default function CertificationsTab() {
  // Placeholder data - will be replaced with actual backend queries
  const earnedCertifications: Certification[] = [];
  const certificationProgress: CertificationProgress[] = [
    {
      certificationType: 'Interview Skills Mastery',
      progressPercentage: 65,
      milestonesCompleted: 13,
      totalMilestones: 20,
      estimatedCompletion: '2 weeks',
    },
    {
      certificationType: 'Coding Proficiency',
      progressPercentage: 40,
      milestonesCompleted: 8,
      totalMilestones: 20,
      estimatedCompletion: '4 weeks',
    },
    {
      certificationType: 'Career Development Excellence',
      progressPercentage: 30,
      milestonesCompleted: 6,
      totalMilestones: 20,
      estimatedCompletion: '6 weeks',
    },
  ];

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isExpiringSoon = (expiryDate?: bigint) => {
    if (!expiryDate) return false;
    const expiry = new Date(Number(expiryDate) / 1000000);
    const now = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Professional Certifications</h2>
          <p className="text-muted-foreground">
            Track your earned certifications and progress toward new achievements
          </p>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/assets/generated/certification-badge-icon-transparent.dim_32x32.png"
            alt="Certifications"
            className="w-8 h-8"
          />
        </div>
      </div>

      {/* Earned Certifications Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <CardTitle>Earned Certifications</CardTitle>
          </div>
          <CardDescription>
            {earnedCertifications.length === 0
              ? 'Complete learning milestones to earn your first certification'
              : `You have earned ${earnedCertifications.length} professional ${earnedCertifications.length === 1 ? 'certification' : 'certifications'}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {earnedCertifications.length === 0 ? (
            <div className="text-center py-12">
              <img
                src="/assets/generated/certificate-icon-transparent.dim_24x24.png"
                alt="No certifications"
                className="w-16 h-16 mx-auto mb-4 opacity-50"
              />
              <p className="text-lg font-medium mb-2">No certifications yet</p>
              <p className="text-muted-foreground">
                Complete learning resources, skill assessments, and receive positive feedback to earn certifications
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {earnedCertifications.map((cert) => (
                <Card key={cert.id.toString()} className="border-2 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src="/assets/generated/certification-trophy-icon-transparent.dim_24x24.png"
                            alt="Certificate"
                            className="w-6 h-6"
                          />
                          <CardTitle className="text-lg">{cert.title}</CardTitle>
                        </div>
                        <CardDescription className="text-sm">{cert.description}</CardDescription>
                      </div>
                      <Badge
                        variant={cert.status === 'active' ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {cert.status === 'active' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {cert.status === 'active' ? 'Active' : 'Expired'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <img
                        src="/assets/generated/qualification-shield-icon-transparent.dim_24x24.png"
                        alt="Issued by"
                        className="w-4 h-4"
                      />
                      <span>Issued by: {cert.issuedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Issued: {formatDate(cert.issueDate)}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span
                          className={
                            isExpiringSoon(cert.expiryDate)
                              ? 'text-orange-600 dark:text-orange-400 font-medium'
                              : 'text-muted-foreground'
                          }
                        >
                          Expires: {formatDate(cert.expiryDate)}
                          {isExpiringSoon(cert.expiryDate) && ' (Expiring Soon)'}
                        </span>
                      </div>
                    )}
                    {cert.status === 'active' && (
                      <div className="pt-2 border-t">
                        <img
                          src="/assets/generated/certification-validation-icon-transparent.dim_16x16.png"
                          alt="Verified"
                          className="w-4 h-4 inline mr-2"
                        />
                        <span className="text-xs text-muted-foreground">Verified Certification</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Certification Progress Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/certification-milestone-icon-transparent.dim_20x20.png"
              alt="Progress"
              className="w-5 h-5"
            />
            <CardTitle>Certification Progress</CardTitle>
          </div>
          <CardDescription>
            Track your progress toward earning new professional certifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {certificationProgress.map((progress, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="font-medium">{progress.certificationType}</span>
                  </div>
                  <Badge variant="outline">
                    {progress.milestonesCompleted}/{progress.totalMilestones} milestones
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{progress.progressPercentage}%</span>
                  </div>
                  <Progress value={progress.progressPercentage} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Estimated completion: {progress.estimatedCompletion}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>How to Earn Certifications</CardTitle>
          <CardDescription>Complete these activities to unlock professional certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex gap-3 p-4 bg-muted/50 rounded-lg">
              <img
                src="/assets/generated/learning-hub-icon-transparent.dim_32x32.png"
                alt="Learning"
                className="w-8 h-8"
              />
              <div>
                <h4 className="font-medium mb-1">Complete Learning Resources</h4>
                <p className="text-sm text-muted-foreground">
                  Finish specific collections of learning materials in the Learning Hub
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-muted/50 rounded-lg">
              <img
                src="/assets/generated/skill-assessment-icon-transparent.dim_32x32.png"
                alt="Assessments"
                className="w-8 h-8"
              />
              <div>
                <h4 className="font-medium mb-1">Achieve High Assessment Scores</h4>
                <p className="text-sm text-muted-foreground">
                  Score above minimum thresholds on skill assessments
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-muted/50 rounded-lg">
              <img
                src="/assets/generated/feedback-icon-transparent.dim_32x32.png"
                alt="Feedback"
                className="w-8 h-8"
              />
              <div>
                <h4 className="font-medium mb-1">Receive Positive Feedback</h4>
                <p className="text-sm text-muted-foreground">
                  Earn high ratings from employers after interviews
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-muted/50 rounded-lg">
              <img
                src="/assets/generated/career-milestone-icon-transparent.dim_24x24.png"
                alt="Milestones"
                className="w-8 h-8"
              />
              <div>
                <h4 className="font-medium mb-1">Complete Career Milestones</h4>
                <p className="text-sm text-muted-foreground">
                  Achieve career path milestones and skill development goals
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
