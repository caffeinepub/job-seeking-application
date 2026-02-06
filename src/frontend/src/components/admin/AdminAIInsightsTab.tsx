import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, MapPin, Activity, Lightbulb, Award, Globe } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Timeframe = 'weekly' | 'monthly';

export default function AdminAIInsightsTab() {
  const [timeframe, setTimeframe] = useState<Timeframe>('monthly');

  // Mock data - will be replaced with actual backend data
  const inDemandSkills = [
    { skill: 'JavaScript', demand: 145, growth: 12 },
    { skill: 'Python', demand: 132, growth: 18 },
    { skill: 'React', demand: 128, growth: 15 },
    { skill: 'AWS', demand: 98, growth: 22 },
    { skill: 'SQL', demand: 87, growth: 8 },
    { skill: 'Docker', demand: 76, growth: 25 },
    { skill: 'TypeScript', demand: 72, growth: 20 },
    { skill: 'Node.js', demand: 68, growth: 14 },
  ];

  const geographicDistribution = [
    { location: 'San Francisco', jobs: 245, candidates: 380, ratio: 1.55 },
    { location: 'New York', jobs: 198, candidates: 290, ratio: 1.46 },
    { location: 'Austin', jobs: 156, candidates: 210, ratio: 1.35 },
    { location: 'Seattle', jobs: 142, candidates: 195, ratio: 1.37 },
    { location: 'Boston', jobs: 128, candidates: 175, ratio: 1.37 },
    { location: 'Remote', jobs: 312, candidates: 520, ratio: 1.67 },
  ];

  const employerActivityHeatmap = [
    { day: 'Mon', morning: 45, afternoon: 78, evening: 32 },
    { day: 'Tue', morning: 52, afternoon: 85, evening: 38 },
    { day: 'Wed', morning: 48, afternoon: 92, evening: 35 },
    { day: 'Thu', morning: 55, afternoon: 88, evening: 42 },
    { day: 'Fri', morning: 50, afternoon: 72, evening: 28 },
    { day: 'Sat', morning: 15, afternoon: 25, evening: 12 },
    { day: 'Sun', morning: 12, afternoon: 18, evening: 8 },
  ];

  const candidatePerformanceAverages = [
    { category: 'Technical Skills', average: 76, benchmark: 70 },
    { category: 'Communication', average: 81, benchmark: 75 },
    { category: 'Problem Solving', average: 73, benchmark: 68 },
    { category: 'Experience Level', average: 68, benchmark: 65 },
    { category: 'Cultural Fit', average: 83, benchmark: 78 },
    { category: 'Leadership', average: 70, benchmark: 65 },
  ];

  const platformTrends = [
    { month: 'Jan', users: 1250, jobs: 320, applications: 4500, interviews: 890 },
    { month: 'Feb', users: 1380, jobs: 345, applications: 4850, interviews: 950 },
    { month: 'Mar', users: 1520, jobs: 378, applications: 5200, interviews: 1020 },
    { month: 'Apr', users: 1680, jobs: 412, applications: 5650, interviews: 1150 },
    { month: 'May', users: 1850, jobs: 445, applications: 6100, interviews: 1280 },
    { month: 'Jun', users: 2020, jobs: 485, applications: 6580, interviews: 1420 },
  ];

  const userRoleDistribution = [
    { name: 'Candidates', value: 1520, color: 'oklch(0.7 0.15 250)' },
    { name: 'Employers', value: 485, color: 'oklch(0.65 0.15 280)' },
    { name: 'Admins', value: 15, color: 'oklch(0.6 0.15 150)' },
  ];

  const hiringSuccessMetrics = [
    { metric: 'Application Response Rate', value: 78 },
    { metric: 'Interview Scheduling Rate', value: 65 },
    { metric: 'Offer Acceptance Rate', value: 82 },
    { metric: 'Time-to-Hire Efficiency', value: 70 },
    { metric: 'Candidate Satisfaction', value: 85 },
    { metric: 'Employer Satisfaction', value: 88 },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <img src="/assets/generated/system-analytics-icon-transparent.dim_32x32.png" alt="" className="w-8 h-8" />
            Global AI Insights Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Platform-wide intelligence with predictive analytics and market insights
          </p>
        </div>
        <Select value={timeframe} onValueChange={(value) => setTimeframe(value as Timeframe)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Feature Notice */}
      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          AI Insights Dashboard is being implemented. The data shown below is for demonstration purposes.
        </AlertDescription>
      </Alert>

      {/* Key Platform Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,020</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+9.2%</span> from last {timeframe === 'weekly' ? 'week' : 'month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Success Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+4.3%</span> from last {timeframe === 'weekly' ? 'week' : 'month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Candidate Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75.2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.8%</span> from last {timeframe === 'weekly' ? 'week' : 'month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Job Markets</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1</span> new market this {timeframe === 'weekly' ? 'week' : 'month'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Most In-Demand Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/assets/generated/stats-icon-transparent.dim_24x24.png" alt="" className="w-5 h-5" />
            Most In-Demand Skills
          </CardTitle>
          <CardDescription>
            Skills with highest demand across all job postings and candidate profiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={inDemandSkills}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="demand" fill="oklch(0.7 0.15 250)" name="Total Demand" />
              <Bar yAxisId="right" dataKey="growth" fill="oklch(0.6 0.15 150)" name="Growth %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Geographic Distribution & Employer Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Geographic Job Distribution
            </CardTitle>
            <CardDescription>
              Regional hiring trends and candidate-to-job ratios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geographicDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="jobs" fill="oklch(0.7 0.15 250)" name="Job Postings" />
                <Bar dataKey="candidates" fill="oklch(0.65 0.15 280)" name="Candidates" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Employer Activity Heatmap
            </CardTitle>
            <CardDescription>
              Engagement patterns and hiring frequency by day and time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={employerActivityHeatmap}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="morning" stroke="oklch(0.7 0.15 250)" name="Morning" />
                <Line type="monotone" dataKey="afternoon" stroke="oklch(0.65 0.15 280)" name="Afternoon" />
                <Line type="monotone" dataKey="evening" stroke="oklch(0.6 0.15 150)" name="Evening" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Candidate Performance & Platform Trends */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Performance Averages</CardTitle>
            <CardDescription>
              Platform-wide performance metrics with industry benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={candidatePerformanceAverages}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Platform Average" dataKey="average" stroke="oklch(0.7 0.15 250)" fill="oklch(0.7 0.15 250)" fillOpacity={0.6} />
                <Radar name="Industry Benchmark" dataKey="benchmark" stroke="oklch(0.6 0.15 150)" fill="oklch(0.6 0.15 150)" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Growth Trends</CardTitle>
            <CardDescription>
              User acquisition, job postings, and engagement metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={platformTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="oklch(0.7 0.15 250)" name="Users" />
                <Line type="monotone" dataKey="jobs" stroke="oklch(0.65 0.15 280)" name="Jobs" />
                <Line type="monotone" dataKey="interviews" stroke="oklch(0.6 0.15 150)" name="Interviews" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Distribution & Success Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
            <CardDescription>
              Platform user composition and role breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userRoleDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userRoleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hiring Success Metrics</CardTitle>
            <CardDescription>
              Platform-wide performance indicators and satisfaction scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hiringSuccessMetrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="metric" type="category" width={180} />
                <Tooltip />
                <Bar dataKey="value" fill="oklch(0.65 0.15 250)" name="Score %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Platform Optimization Recommendations
          </CardTitle>
          <CardDescription>
            AI-generated insights for platform improvement and strategic growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  High Priority
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Expand Remote Job Market</h4>
                <p className="text-sm text-muted-foreground">
                  Remote positions show 67% higher candidate-to-job ratio. Encouraging more remote listings could increase platform engagement by 25%.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  High Priority
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Focus on High-Growth Skills</h4>
                <p className="text-sm text-muted-foreground">
                  Docker and AWS show 25% and 22% growth respectively. Creating targeted learning resources for these skills could improve candidate competitiveness.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                  Medium Priority
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Optimize Employer Activity Times</h4>
                <p className="text-sm text-muted-foreground">
                  Peak employer activity occurs Wednesday afternoons. Scheduling platform updates and maintenance during low-activity periods (weekends) could minimize disruption.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="flex-shrink-0">
                <div className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                  Medium Priority
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Improve Candidate Technical Skills</h4>
                <p className="text-sm text-muted-foreground">
                  Technical skills average 76 vs. 83 for cultural fit. Expanding technical training resources could improve overall candidate performance by 8-10%.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
