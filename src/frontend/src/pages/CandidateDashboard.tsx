import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResumeAnalysisTab from '../components/candidate/ResumeAnalysisTab';
import ProfileCustomizationTab from '../components/ProfileCustomizationTab';
import ReferralsTab from '../components/ReferralsTab';
import LearningHubTab from '../components/LearningHubTab';
import GrowthTrackerTab from '../components/candidate/GrowthTrackerTab';
import LeaderboardTab from '../components/LeaderboardTab';
import CareerPathTab from '../components/candidate/CareerPathTab';
import CertificationsTab from '../components/candidate/CertificationsTab';

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState('learninghub');

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile, learning, growth tracking, career path, certifications, and compete on the leaderboard</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-6xl grid-cols-8">
          <TabsTrigger value="learninghub">Learning Hub</TabsTrigger>
          <TabsTrigger value="growthtracker">Growth Tracker</TabsTrigger>
          <TabsTrigger value="careerpath">Career Path</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="resumeanalysis">Resume Analysis</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="profile">Customize Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="learninghub" className="mt-6">
          <LearningHubTab />
        </TabsContent>

        <TabsContent value="growthtracker" className="mt-6">
          <GrowthTrackerTab />
        </TabsContent>

        <TabsContent value="careerpath" className="mt-6">
          <CareerPathTab />
        </TabsContent>

        <TabsContent value="certifications" className="mt-6">
          <CertificationsTab />
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-6">
          <LeaderboardTab />
        </TabsContent>

        <TabsContent value="resumeanalysis" className="mt-6">
          <ResumeAnalysisTab />
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
