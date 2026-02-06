import { useState } from 'react';
import { useGetLeaderboard, Badge } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge as BadgeUI } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function LeaderboardTab() {
  const { identity } = useInternetIdentity();
  const [badgeFilter, setBadgeFilter] = useState<Badge | 'all'>('all');
  const [sortBy, setSortBy] = useState<'totalScore' | 'points' | 'referralPoints'>('totalScore');
  const [sortOrder] = useState<'asc' | 'desc'>('desc');

  const { data: leaderboardData, isLoading } = useGetLeaderboard({
    badgeLevel: badgeFilter === 'all' ? undefined : badgeFilter,
    sortBy,
    sortOrder,
    limit: BigInt(50),
  });

  const currentUserPrincipal = identity?.getPrincipal().toString();
  const currentUserEntry = leaderboardData?.find(entry => entry.user.toString() === currentUserPrincipal);

  const getBadgeColor = (badge: Badge) => {
    switch (badge) {
      case Badge.gold:
        return 'bg-yellow-500 text-yellow-900';
      case Badge.silver:
        return 'bg-gray-400 text-gray-900';
      case Badge.bronze:
        return 'bg-orange-600 text-orange-100';
      default:
        return 'bg-gray-300 text-gray-900';
    }
  };

  const getBadgeIcon = (badge: Badge) => {
    switch (badge) {
      case Badge.gold:
        return <Trophy className="h-4 w-4" />;
      case Badge.silver:
        return <Medal className="h-4 w-4" />;
      case Badge.bronze:
        return <Award className="h-4 w-4" />;
      default:
        return <Award className="h-4 w-4" />;
    }
  };

  const getPositionStyling = (position: number) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 font-bold';
    if (position === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 font-bold';
    if (position === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600 text-orange-900 font-bold';
    return 'bg-muted text-muted-foreground';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Loading Leaderboard...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <img src="/assets/generated/leaderboard-trophy-icon-transparent.dim_32x32.png" alt="Leaderboard" className="h-8 w-8" />
            Leaderboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Compete with other candidates and see where you rank
          </p>
        </div>
      </div>

      {/* Current User Position Card */}
      {currentUserEntry && (
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Position
            </CardTitle>
            <CardDescription>Your current ranking and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center h-12 w-12 rounded-full ${getPositionStyling(Number(currentUserEntry.position))}`}>
                  <span className="text-xl font-bold">#{Number(currentUserEntry.position)}</span>
                </div>
                <div>
                  <p className="font-semibold text-lg">{currentUserEntry.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <BadgeUI className={getBadgeColor(currentUserEntry.badge)}>
                      <span className="flex items-center gap-1">
                        {getBadgeIcon(currentUserEntry.badge)}
                        {currentUserEntry.badge.charAt(0).toUpperCase() + currentUserEntry.badge.slice(1)}
                      </span>
                    </BadgeUI>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{Number(currentUserEntry.totalScore)} pts</p>
                <p className="text-sm text-muted-foreground">
                  Activity: {Number(currentUserEntry.points)} | Referrals: {Number(currentUserEntry.referralPoints)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter & Sort</CardTitle>
          <CardDescription>Customize your leaderboard view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Badge Level</label>
              <Select value={badgeFilter} onValueChange={(value) => setBadgeFilter(value as Badge | 'all')}>
                <SelectTrigger>
                  <SelectValue placeholder="All Badges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Badges</SelectItem>
                  <SelectItem value={Badge.bronze}>Bronze</SelectItem>
                  <SelectItem value={Badge.silver}>Silver</SelectItem>
                  <SelectItem value={Badge.gold}>Gold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'totalScore' | 'points' | 'referralPoints')}>
                <SelectTrigger>
                  <SelectValue placeholder="Total Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="totalScore">Total Score</SelectItem>
                  <SelectItem value="points">Activity Points</SelectItem>
                  <SelectItem value="referralPoints">Referral Points</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
          <CardDescription>
            {badgeFilter === 'all' ? 'All candidates' : `${badgeFilter.charAt(0).toUpperCase() + badgeFilter.slice(1)} badge holders`} ranked by {sortBy === 'totalScore' ? 'total score' : sortBy === 'points' ? 'activity points' : 'referral points'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!leaderboardData || leaderboardData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <img src="/assets/generated/leaderboard-podium-icon-transparent.dim_32x32.png" alt="No data" className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>No leaderboard data available yet.</p>
              <p className="text-sm mt-2">Complete activities and earn points to appear on the leaderboard!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboardData.map((entry, index) => {
                const isCurrentUser = entry.user.toString() === currentUserPrincipal;
                const position = Number(entry.position);
                
                return (
                  <div
                    key={entry.user.toString()}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      isCurrentUser ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Position Badge */}
                      <div className={`flex items-center justify-center h-10 w-10 rounded-full ${getPositionStyling(position)}`}>
                        <span className="font-bold">{position <= 3 ? (position === 1 ? '🥇' : position === 2 ? '🥈' : '🥉') : `#${position}`}</span>
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/assets/generated/default-avatar-transparent.dim_100x100.png`} />
                        <AvatarFallback>{entry.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{entry.name}</p>
                          {isCurrentUser && (
                            <BadgeUI variant="outline" className="text-xs">You</BadgeUI>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <BadgeUI className={`${getBadgeColor(entry.badge)} text-xs`}>
                            <span className="flex items-center gap-1">
                              {getBadgeIcon(entry.badge)}
                              {entry.badge.charAt(0).toUpperCase() + entry.badge.slice(1)}
                            </span>
                          </BadgeUI>
                        </div>
                      </div>

                      {/* Points Breakdown */}
                      <div className="text-right">
                        <p className="text-xl font-bold">{Number(entry.totalScore)} pts</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <img src="/assets/generated/points-icon-transparent.dim_24x24.png" alt="Activity" className="h-4 w-4" />
                            {Number(entry.points)}
                          </span>
                          <span className="flex items-center gap-1">
                            <img src="/assets/generated/referral-icon-transparent.dim_32x32.png" alt="Referrals" className="h-4 w-4" />
                            {Number(entry.referralPoints)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Motivational Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <img src="/assets/generated/achievement-milestone-icon-transparent.dim_24x24.png" alt="Achievement" className="h-6 w-6" />
            Keep Growing!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Earn points by completing skill assessments, attending interviews, receiving positive feedback, and referring new users. 
            Climb the leaderboard and unlock higher badge levels!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-2xl font-bold text-primary">+10</p>
              <p className="text-xs text-muted-foreground">Skill Tests</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-2xl font-bold text-primary">+5</p>
              <p className="text-xs text-muted-foreground">Interviews</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-2xl font-bold text-primary">+5</p>
              <p className="text-xs text-muted-foreground">Feedback</p>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <p className="text-2xl font-bold text-primary">+10</p>
              <p className="text-xs text-muted-foreground">Referrals</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
