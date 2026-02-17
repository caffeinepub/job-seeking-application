import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck, Trophy } from 'lucide-react';

export default function SkillTestsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            <CardTitle>Skill Assessments</CardTitle>
          </div>
          <CardDescription>Take tests to showcase your skills to employers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Skill Tests Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Demonstrate your expertise by taking skill assessments and earn certifications that employers can see on your profile.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
