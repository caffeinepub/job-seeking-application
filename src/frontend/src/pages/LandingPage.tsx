import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCompanyPages } from '../hooks/useQueries';
import { Briefcase, Users, TrendingUp, Award } from 'lucide-react';

export default function LandingPage() {
  const { login, loginStatus } = useInternetIdentity();
  const { data: companyPages = [] } = useGetCompanyPages();

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Find Your Dream Job or Perfect Candidate
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect talented professionals with leading companies through our AI-powered recruitment platform
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={login} disabled={isLoggingIn}>
              {isLoggingIn ? 'Connecting...' : 'Get Started'}
            </Button>
            <Button size="lg" variant="outline" onClick={login} disabled={isLoggingIn}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      {companyPages.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Companies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyPages.slice(0, 6).map(([principal, company]) => (
                <Card key={principal.toString()} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {company.logo ? (
                        <img
                          src={company.logo.getDirectURL()}
                          alt={`${company.companyName} logo`}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Briefcase className="h-8 w-8 text-primary" />
                        </div>
                      )}
                      <div>
                        <CardTitle>{company.companyName}</CardTitle>
                        <CardDescription>{company.location}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Briefcase className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Job Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AI-powered recommendations connect you with the perfect opportunities
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Top Talent Pool</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access a diverse network of skilled professionals ready to contribute
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Career Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your progress and develop skills with personalized learning paths
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Skill Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Earn certifications and showcase verified skills to stand out
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals and companies already using our platform
          </p>
          <Button size="lg" variant="secondary" onClick={login} disabled={isLoggingIn}>
            {isLoggingIn ? 'Connecting...' : 'Sign Up Now'}
          </Button>
        </div>
      </section>
    </div>
  );
}
