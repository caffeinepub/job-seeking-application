import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileCustomizationTab from '../components/ProfileCustomizationTab';
import CompanyBrandingTab from '../components/employer/CompanyBrandingTab';
import ReferralsTab from '../components/ReferralsTab';
import LearningHubTab from '../components/LearningHubTab';
import LeaderboardTab from '../components/LeaderboardTab';
import AIInsightsTab from '../components/employer/AIInsightsTab';

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('learninghub');

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage your company, learning resources, referrals, and view candidate rankings</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-6xl grid-cols-6">
          <TabsTrigger value="learninghub">Learning Hub</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="aiinsights">AI Insights</TabsTrigger>
          <TabsTrigger value="branding">Company Branding</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="profile">Customize Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="learninghub" className="mt-6">
          <LearningHubTab />
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <LeaderboardTab />
        </TabsContent>

        <TabsContent value="aiinsights" className="mt-6">
          <AIInsightsTab />
        </TabsContent>

        <TabsContent value="branding" className="mt-6">
          <CompanyBrandingTab />
        </TabsContent>

        <TabsContent value="referrals" className="mt-6">
          <ReferralsTab />
        </TabsContent>

        <TabsContent value="profile" className="mt-6">
          <ProfileCustomizationTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
