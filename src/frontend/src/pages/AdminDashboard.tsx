import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagementTab from '../components/admin/UserManagementTab';
import SystemAnalyticsTab from '../components/admin/SystemAnalyticsTab';
import ActivityMonitorTab from '../components/admin/ActivityMonitorTab';
import CompanyPagesTab from '../components/admin/CompanyPagesTab';
import AdminAIInsightsTab from '../components/admin/AdminAIInsightsTab';
import CertificationsTab from '../components/admin/CertificationsTab';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, monitor system activity, oversee certifications, and view platform insights</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-6xl grid-cols-6">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">System Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity Monitor</TabsTrigger>
          <TabsTrigger value="companies">Company Pages</TabsTrigger>
          <TabsTrigger value="aiinsights">AI Insights</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <UserManagementTab />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <SystemAnalyticsTab />
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <ActivityMonitorTab />
        </TabsContent>

        <TabsContent value="companies" className="mt-6">
          <CompanyPagesTab />
        </TabsContent>

        <TabsContent value="aiinsights" className="mt-6">
          <AdminAIInsightsTab />
        </TabsContent>

        <TabsContent value="certifications" className="mt-6">
          <CertificationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
