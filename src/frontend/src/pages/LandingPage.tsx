import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Briefcase, Users, Search, CheckCircle, Building2 } from 'lucide-react';
import { useGetAllCompanyPages } from '../hooks/useQueries';

export default function LandingPage() {
  const { login, loginStatus } = useInternetIdentity();
  const { data: companyPages = [] } = useGetAllCompanyPages();

  // Get approved company pages for featured section (empty for now since backend not implemented)
  const approvedCompanies = companyPages.filter((page: any) => page?.status === 'approved').slice(0, 6);

  return (
    <div className="container py-12 space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 dark:opacity-10"
          style={{ backgroundImage: 'url(/assets/generated/office-hero.dim_1200x600.jpg)' }}
        />
        <div className="relative px-8 py-24 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Connect Talent with Opportunity
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The modern platform where employers find exceptional candidates and job seekers discover their next career move
          </p>
          <Button size="lg" onClick={login} disabled={loginStatus === 'logging-in'} className="text-lg px-8 py-6">
            {loginStatus === 'logging-in' ? 'Connecting...' : 'Get Started'}
          </Button>
        </div>
      </section>

      {/* Featured Companies Section */}
      {approvedCompanies.length > 0 && (
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Featured Companies</h2>
            <p className="text-muted-foreground">Join top companies hiring on JobConnect</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedCompanies.map((company: any) => (
              <Card key={company.createdBy?.toString() || Math.random()} className="hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-4">
                    {company.logo ? (
                      <img
                        src={company.logo.getDirectURL()}
                        alt={company.companyName}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg">{company.companyName}</CardTitle>
                      <CardDescription className="text-sm">{company.location}</CardDescription>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Why Choose JobConnect?</h2>
          <p className="text-muted-foreground">Everything you need to succeed in your hiring or job search journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Briefcase className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Post Jobs Easily</CardTitle>
              <CardDescription>
                Create detailed job listings with requirements, salary ranges, and locations in minutes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Browse Candidates</CardTitle>
              <CardDescription>
                Access a pool of talented professionals with detailed profiles showcasing their skills and experience
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Search className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart Search</CardTitle>
              <CardDescription>
                Filter jobs by title, location, and salary range to find the perfect match for your needs
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Easy Applications</CardTitle>
              <CardDescription>
                Apply to jobs with one click and track all your applications in one convenient dashboard
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Building2 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Company Branding</CardTitle>
              <CardDescription>
                Showcase your company with custom branding, logos, and banners to attract top talent
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Profile Showcase</CardTitle>
              <CardDescription>
                Create a comprehensive profile highlighting your skills, experience, and career aspirations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Join JobConnect today and take the next step in your career journey or find your next great hire
        </p>
        <Button size="lg" onClick={login} disabled={loginStatus === 'logging-in'}>
          {loginStatus === 'logging-in' ? 'Connecting...' : 'Sign Up Now'}
        </Button>
      </section>
    </div>
  );
}
