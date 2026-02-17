import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProfileSetupModal from './components/ProfileSetupModal';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AIChatAssistant from './components/AIChatAssistant';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from './hooks/useQueries';
import { UserRole } from './backend';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  // Show loading spinner while initializing or while fetching profile after login
  if (isInitializing || (isAuthenticated && (profileLoading || adminLoading))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Determine which dashboard to show based on admin status and user role
  const renderDashboard = () => {
    if (isAdmin) {
      return <AdminDashboard />;
    }
    
    if (userProfile?.role === UserRole.employer) {
      return <EmployerDashboard />;
    }
    
    // Default to candidate dashboard
    return <CandidateDashboard />;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {!isAuthenticated ? (
          <LandingPage />
        ) : showProfileSetup ? (
          <ProfileSetupModal />
        ) : (
          renderDashboard()
        )}
      </main>
      <Footer />
      {isAuthenticated && userProfile && <AIChatAssistant />}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
