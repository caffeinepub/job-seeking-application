import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetUserReferrals, useGetReferralStats, useCreateReferral } from '../hooks/useQueries';
import { Principal } from '@icp-sdk/core/principal';
import { Users, TrendingUp, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Local type definitions since backend types are not available
type ReferralStatus = 'pending' | 'completed' | 'failed';

interface Referral {
  id: bigint;
  referrer: Principal;
  referredUser: Principal;
  referralDate: bigint;
  pointsAwarded: bigint;
  status: ReferralStatus;
}

export default function ReferralsTab() {
  const [referredUserInput, setReferredUserInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: referrals = [], isLoading: referralsLoading } = useGetUserReferrals();
  const { data: stats, isLoading: statsLoading } = useGetReferralStats();
  const createReferralMutation = useCreateReferral();

  const handleCreateReferral = async () => {
    if (!referredUserInput.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createReferralMutation.mutateAsync();
      setReferredUserInput('');
    } catch (error) {
      console.error('Failed to create referral:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: ReferralStatus) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      case 'pending':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (referralsLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading referral data...</div>
      </div>
    );
  }

  const totalReferralPoints = stats ? Number(stats.totalReferralPoints) : 0;
  const totalReferredUsers = stats ? Number(stats.totalReferredUsers) : 0;
  const successfulReferrals = stats ? Number(stats.successfulReferrals) : 0;
  const successRate = totalReferredUsers > 0 ? ((successfulReferrals / totalReferredUsers) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6">
      {/* Feature Notice */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          The referral system is currently being implemented. This feature will be available soon.
        </AlertDescription>
      </Alert>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referral Points</CardTitle>
            <img src="/assets/generated/referral-icon-transparent.dim_32x32.png" alt="Referral" className="h-6 w-6" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReferralPoints}</div>
            <p className="text-xs text-muted-foreground">Points earned from referrals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReferredUsers}</div>
            <p className="text-xs text-muted-foreground">Users you have referred</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">{successfulReferrals} successful referrals</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Referral Section */}
      <Card>
        <CardHeader>
          <CardTitle>Refer a New User</CardTitle>
          <CardDescription>
            Enter the Principal ID of the user you want to refer. You'll earn 10 points when they complete registration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="referredUser">User Principal ID</Label>
              <Input
                id="referredUser"
                placeholder="Enter Principal ID (e.g., xxxxx-xxxxx-xxxxx-xxxxx-xxx)"
                value={referredUserInput}
                onChange={(e) => setReferredUserInput(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleCreateReferral} disabled={isSubmitting || !referredUserInput.trim()}>
                {isSubmitting ? 'Creating...' : 'Create Referral'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
          <CardDescription>View all your referrals and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No referrals yet. Start referring users to earn points!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Referred User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Points Awarded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(referrals as Referral[]).map((referral) => (
                  <TableRow key={Number(referral.id)}>
                    <TableCell className="font-mono text-xs">
                      {referral.referredUser.toString().substring(0, 20)}...
                    </TableCell>
                    <TableCell>{formatDate(referral.referralDate)}</TableCell>
                    <TableCell>{getStatusBadge(referral.status)}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {Number(referral.pointsAwarded) > 0 ? (
                        <span className="text-green-600">+{Number(referral.pointsAwarded)}</span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
