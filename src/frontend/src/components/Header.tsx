import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Briefcase, Moon, Sun, Play } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onOpenSimulation?: () => void;
}

export default function Header({ onOpenSimulation }: HeaderProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin = false } = useIsCallerAdmin();
  const queryClient = useQueryClient();
  const { theme, setTheme } = useTheme();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const buttonText = loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const getUserInitials = () => {
    if (!userProfile) return 'U';
    return userProfile.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const profilePictureUrl = userProfile?.customization?.profilePicture?.getDirectURL();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">JobConnect</h1>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && userProfile && (
            <div className="hidden sm:flex items-center gap-3">
              <Avatar className="h-8 w-8">
                {profilePictureUrl ? (
                  <AvatarImage src={profilePictureUrl} alt={userProfile.name} />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {getUserInitials()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{userProfile.name}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {isAdmin ? 'Admin' : userProfile.role}
                </span>
              </div>
            </div>
          )}

          {isAdmin && onOpenSimulation && (
            <Button variant="outline" size="sm" onClick={onOpenSimulation} className="gap-2">
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Simulation</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={handleAuth} disabled={disabled} variant={isAuthenticated ? 'outline' : 'default'}>
            {buttonText}
          </Button>
        </div>
      </div>
    </header>
  );
}
