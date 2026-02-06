import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Calendar, Target, Lightbulb, Award } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Timeframe = 'weekly' | 'monthly';

export default function AIInsightsTab() {
  const [timeframe, setTimeframe] = useState<Timeframe>('monthly');

  // Mock data - will be replaced with actual backend data
  const topPerformingJobs = [
    { name: 'Senior Developer', applications: 45, interviews: 12, hires: 3, successRate: 25 },
    { name: 'Product Manager', applications: 38, interviews: 10, hires: 2, successRate: 20 },
    { name: 'UX Designer', applications: 32, interviews: 8, hires: 2, successRate: 25 },
    { name: 'Data Analyst', applications: 28, interviews: 7, hires: 1, successRate: 14 },
  ];

  const candidateScores = [
    { category: 'Technical Skills', average: 78 },
    { category: 'Communication', average: 82 },
    { category: 'Problem Solving', average: 75 },
    { category: 'Experience', average: 70 },
    { category: 'Cultural Fit', average: 85 },
  ];

  const interviewToHireData = [
    { month: 'Jan', interviews: 15, hires: 3, ratio: 20 },
    { month: 'Feb', interviews: 18, hires: 4, ratio: 22 },
    { month: 'Mar', interviews: 22, hires: 5, ratio: 23 },
    { month: 'Apr', interviews: 20, hires: 6, ratio: 30 },
    { month: 'May', interviews: 25, hires: 7, ratio: 28 },
    { month: 'Jun', interviews: 28, hires: 8, ratio: 29 },
  ];

  const skillPerformanceData = [
    { skill: 'JavaScript', count: 45, avgScore: 82 },
    { skill: 'React', count: 38, avgScore: 78 },
    { skill: 'Python', count: 32, avgScore: 85 },
    { skill: 'SQL', count: 28, avgScore: 75 },
    { skill: 'AWS', count: 25, avgScore: 70 },
  ];

  const hiringFunnelData = [
    { name: 'Applications', value: 150, color: 'oklch(0.7 0.15 250)' },
    { name: 'Screened', value: 80, color: 'oklch(0.65 0.15 250)' },
    { name: 'Interviewed', value: 35, color: 'oklch(0.6 0.15 250)' },
    { name: 'Offered', value: 12, color: 'oklch(0.55 0.15 250)' },
    { name: 'Hired', value: 8, color: 'oklch(0.5 0.15 250)' },
  ];

  const recommendations = [
    {
      title: 'Optimize Job Descriptions',
      description: 'Your "Senior Developer" posting has 40% higher engagement. Consider using similar language in other postings.',
      impact: 'High',
    },
    {
      title: 'Improve Interview Process',
      description: 'Average time-to-hire is 45 days. Streamlining your interview stages could reduce this by 30%.',
      impact: 'Medium',
    },
    {
      title: 'Expand Skill Requirements',
      description: 'Candidates with Python skills show 15% higher performance. Consider adding this to your requirements.',
      impact: 'Medium',
    },
    {
      title: 'Enhance Candidate Experience',
      description: 'Response time to applications averages 5 days. Faster responses could improve acceptance rates by 20%.',
      impact: 'High',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Timeframe Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <img src="/assets/generated/system-analytics-icon-transparent.dim_32x32.png" alt="" className="w-8 h-8" />
            AI Insights Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Intelligent analytics and predictive insights to optimize your hiring performance
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

      {/* Key Metrics Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Candidate Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last {timeframe === 'weekly' ? 'week' : 'month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview-to-Hire Ratio</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3.1%</span> from last {timeframe === 'weekly' ? 'week' : 'month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time-to-Hire</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+2 days</span> from last {timeframe === 'weekly' ? 'week' : 'month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hiring Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last {timeframe === 'weekly' ? 'week' : 'month'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Job Listings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/assets/generated/stats-icon-transparent.dim_24x24.png" alt="" className="w-5 h-5" />
            Top Performing Job Listings
          </CardTitle>
          <CardDescription>
            Job postings with highest application rates and conversion metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topPerformingJobs}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="oklch(0.7 0.15 250)" name="Applications" />
              <Bar dataKey="interviews" fill="oklch(0.65 0.15 280)" name="Interviews" />
              <Bar dataKey="hires" fill="oklch(0.6 0.15 150)" name="Hires" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Average Candidate Scores & Interview-to-Hire Ratio */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Average Candidate Scores</CardTitle>
            <CardDescription>
              Performance across different evaluation categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={candidateScores} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="category" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="average" fill="oklch(0.65 0.15 250)" name="Average Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview-to-Hire Conversion</CardTitle>
            <CardDescription>
              Tracking your hiring funnel efficiency over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={interviewToHireData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="interviews" stroke="oklch(0.7 0.15 250)" name="Interviews" />
                <Line yAxisId="left" type="monotone" dataKey="hires" stroke="oklch(0.6 0.15 150)" name="Hires" />
                <Line yAxisId="right" type="monotone" dataKey="ratio" stroke="oklch(0.65 0.15 280)" name="Conversion %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skill Performance & Hiring Funnel */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Skill Performance Analytics</CardTitle>
            <CardDescription>
              Most in-demand skills and candidate competency levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="count" fill="oklch(0.7 0.15 250)" name="Candidates" />
                <Bar yAxisId="right" dataKey="avgScore" fill="oklch(0.6 0.15 150)" name="Avg Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hiring Funnel Analysis</CardTitle>
            <CardDescription>
              Candidate progression through your hiring stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={hiringFunnelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {hiringFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Recommended Hiring Actions
          </CardTitle>
          <CardDescription>
            AI-generated insights to optimize your hiring process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      rec.impact === 'High'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}
                  >
                    {rec.impact} Impact
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
