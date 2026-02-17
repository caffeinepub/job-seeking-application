import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Award } from 'lucide-react';

export default function MyProfileTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>My Profile</CardTitle>
          </div>
          <CardDescription>Manage your professional profile and resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Award className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Profile Management Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Build a comprehensive profile with your skills, experience, education, and upload your resume to stand out to employers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
