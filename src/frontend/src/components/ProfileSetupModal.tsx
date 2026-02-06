import { useState } from 'react';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Briefcase, User } from 'lucide-react';
import { UserRole, type UserProfile } from '../backend';

export default function ProfileSetupModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.candidate);
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      const profile: UserProfile = {
        name: name.trim(),
        email: email.trim(),
        role,
        customization: {
          bio: '',
          contactInfo: {
            email: email.trim(),
            phone: '',
          },
          profilePicture: undefined,
        },
      };
      saveProfile.mutate(profile);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Welcome to JobConnect</DialogTitle>
          <DialogDescription>Please complete your profile to get started</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>I am a...</Label>
            <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <div className="flex items-center space-x-2 rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={UserRole.candidate} id="candidate" />
                <Label htmlFor="candidate" className="flex items-center gap-2 cursor-pointer flex-1">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Job Seeker</div>
                    <div className="text-xs text-muted-foreground">Looking for opportunities</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={UserRole.employer} id="employer" />
                <Label htmlFor="employer" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Employer</div>
                    <div className="text-xs text-muted-foreground">Hiring talented professionals</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full" disabled={saveProfile.isPending}>
            {saveProfile.isPending ? 'Creating Profile...' : 'Continue'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
