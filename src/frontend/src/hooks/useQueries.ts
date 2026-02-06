import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { Principal } from '@icp-sdk/core/principal';
import { toast } from 'sonner';
import type { UserProfile, ProfileCustomization, UserRole__1 } from '../backend';

// Local type definitions for features not in backend interface
export enum AppUserRole {
  candidate = 'candidate',
  employer = 'employer',
  admin = 'admin',
}

export enum ExperienceLevel {
  entryLevel = 'entryLevel',
  midLevel = 'midLevel',
  seniorLevel = 'seniorLevel',
  executive = 'executive',
}

export enum Badge {
  bronze = 'bronze',
  silver = 'silver',
  gold = 'gold',
}

export type JobSearchFilters = {
  experienceLevel?: ExperienceLevel;
  minDesiredSalary?: bigint;
  maxDesiredSalary?: bigint;
  minRating?: bigint;
};

export type CandidateSearchFilters = {
  experienceLevel?: ExperienceLevel;
  skills?: string[];
  minRating?: bigint;
};

export type JobListing = {
  id: bigint;
  employer: Principal;
  title: string;
  description: string;
  requirements: string[];
  salaryRange: string;
  location: string;
  timestamp: number;
  experienceLevel: ExperienceLevel;
  companyPageId?: Principal;
};

export type CandidateProfile = {
  id: bigint;
  user: Principal;
  name: string;
  skills: string[];
  experience: string;
  contactEmail: string;
  location: string;
  desiredSalary: string;
  timestamp: number;
  resume?: any;
  points: bigint;
  referralPoints: bigint;
  badge: Badge;
  experienceLevel: ExperienceLevel;
};

export type CandidateSearchResult = {
  candidate: CandidateProfile;
  averageRating: number;
  skillsMatchScore: number;
};

export type LearningResource = {
  id: bigint;
  title: string;
  category: string;
  url: string;
  description: string;
  roleVisibility: AppUserRole[];
  difficultyLevel: string;
  estimateHours: bigint;
  resourceType: string;
};

export type LeaderboardFilter = {
  badgeLevel?: Badge;
  sortBy: string;
  sortOrder: string;
  limit?: bigint;
};

export type LeaderboardEntry = {
  user: Principal;
  name: string;
  points: bigint;
  referralPoints: bigint;
  totalScore: bigint;
  badge: Badge;
  position: bigint;
};

export type CareerProgressData = {
  currentLevel: ExperienceLevel;
  progressPercentage: bigint;
  completedStages: bigint;
  skills: string[];
  recommendedLearningResources: LearningResource[];
  improvementTips: string[];
  skillAreas: any[];
  completedMilestones: bigint;
  careerProgressStages: any[];
  careerObjectives: any[];
  growthTrends: bigint[];
  progressHistory: bigint[];
  recommendedRoles: RecommendedRole[];
  careerProgressMetrics: any[];
  industryTrends: any;
  nextLevel?: ExperienceLevel;
  completionRate: number;
  averageCompletionTime: bigint;
  progressSnapshot: bigint[];
  progressTimeline: bigint[];
  currentRole: string;
  recommendedLearningPaths: LearningResource[];
  progressChallenges: string[];
  progressMilestones: string[];
};

export type RecommendedRole = {
  title: string;
  requiredSkills: string[];
  recommendedResources: LearningResource[];
  estimatedPreparationTime: bigint;
  successProbability: number;
  careerPathAlignment: number;
};

export type CareerPathRecommendations = {
  candidate: Principal;
  industry: string;
  recommendedRoles: RecommendedRole[];
  careerProgress: CareerProgressData;
};

export type CareerProgressUpdate = {
  candidate: Principal;
  currentLevel: ExperienceLevel;
  progressPercentage: bigint;
  skills: string[];
  completedStages: bigint;
  completedMilestones: bigint;
  currentRole: string;
  recommendedLearningResources: LearningResource[];
  industry: string;
  improvementTips: string[];
  skillAreas: any[];
  progressSnapshot: bigint[];
  progressMilestones: string[];
  progressHistory: bigint[];
  recommendedRoles: RecommendedRole[];
  careerProgressStages: any[];
  growthTrends: bigint[];
  careerProgressMetrics: any[];
  careerObjectives: any[];
  industryTrends: any;
  nextLevel?: ExperienceLevel;
  completionRate: number;
  recommendedLearningPaths: LearningResource[];
  progressChallenges: string[];
  averageCompletionTime: bigint;
  currentRating: bigint;
  challengeMap: [string, boolean][];
  milestoneCompleted: boolean;
};

type Notification = {
  id: bigint;
  user: Principal;
  notificationType: string;
  content: string;
  isRead: boolean;
  timestamp: bigint;
};

type SkillGrowthData = {
  overallProgressPercentage: bigint;
  skillAreaProgress: any[];
  cumulativeGrowthMetrics: any;
  activityHistory: any[];
  assessmentContributions: any[];
  feedbackContributions: any[];
};

type LearningProgress = {
  completed: bigint[];
  savedForLater: bigint[];
  totalCompleted: bigint;
  totalSaved: bigint;
};

type Certification = {
  id: bigint;
  candidate: Principal;
  title: string;
  description: string;
  issuedBy: string;
  issueDate: bigint;
  expiryDate?: bigint;
  status: 'active' | 'expired';
};

type CertificationProgress = {
  certificationType: string;
  progressPercentage: number;
  milestonesCompleted: number;
  totalMilestones: number;
};

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  // Return custom state that properly reflects actor dependency
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetUserProfile(userPrincipal: Principal | null) {
  const { actor, isFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ['userProfile', userPrincipal?.toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return null;
    },
    enabled: false,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      // First save the profile using setProfileCustomization
      await actor.setProfileCustomization({
        bio: profile.customization.bio,
        contactInfo: profile.customization.contactInfo,
        profilePicture: profile.customization.profilePicture,
      });
      // Store the full profile in the query cache for immediate use
      queryClient.setQueryData(['currentUserProfile'], profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Profile saved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save profile: ${error.message}`);
    },
  });
}

export function useUpdateProfileCustomization() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (customization: ProfileCustomization) => {
      if (!actor) throw new Error('Actor not available');
      return actor.setProfileCustomization(customization);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
      toast.success('Profile customization updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    },
  });
}

// Notification Queries - Placeholder implementations
export function useGetNotifications() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Notification[]>({
    queryKey: ['notifications', identity?.getPrincipal().toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return [];
    },
    enabled: false,
    refetchInterval: 10000,
  });
}

export function useGetUnreadNotificationCount() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<bigint>({
    queryKey: ['notifications', 'unread', identity?.getPrincipal().toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return BigInt(0);
    },
    enabled: false,
    refetchInterval: 10000,
  });
}

export function useMarkNotificationAsRead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation({
    mutationFn: async (notificationId: bigint) => {
      toast.info('Notification feature coming soon');
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark notification as read: ${error.message}`);
    },
  });
}

// Admin Queries
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Advanced Search and Filtering Queries - Placeholder implementations
export function useSearchJobsWithFilters(filters: JobSearchFilters) {
  const { actor, isFetching } = useActor();

  return useQuery<JobListing[]>({
    queryKey: ['jobSearch', filters],
    queryFn: async () => {
      // Backend method not implemented yet
      return [];
    },
    enabled: false,
  });
}

export function useSearchCandidatesWithFilters(filters: CandidateSearchFilters) {
  const { actor, isFetching } = useActor();

  return useQuery<CandidateSearchResult[]>({
    queryKey: ['candidateSearch', filters],
    queryFn: async () => {
      // Backend method not implemented yet
      return [];
    },
    enabled: false,
  });
}

// Learning Hub Queries - Placeholder implementations
export function useGetLearningResources(role: AppUserRole) {
  const { actor, isFetching } = useActor();

  return useQuery<LearningResource[]>({
    queryKey: ['learningResources', role],
    queryFn: async () => {
      // Backend method not implemented yet
      return [];
    },
    enabled: false,
  });
}

export function useGetLearningResourcesByCategory(role: AppUserRole, category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<LearningResource[]>({
    queryKey: ['learningResources', role, category],
    queryFn: async () => {
      // Backend method not implemented yet
      return [];
    },
    enabled: false,
  });
}

export function useGetLearningResource(resourceId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery<LearningResource | null>({
    queryKey: ['learningResource', resourceId.toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return null;
    },
    enabled: false,
  });
}

export function useCreateLearningResource() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resource: LearningResource) => {
      toast.info('Learning resource creation feature coming soon');
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningResources'] });
      toast.success('Learning resource created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create learning resource: ${error.message}`);
    },
  });
}

export function useUpdateLearningResource() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ resourceId, resource }: { resourceId: bigint; resource: LearningResource }) => {
      toast.info('Learning resource update feature coming soon');
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningResources'] });
      toast.success('Learning resource updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update learning resource: ${error.message}`);
    },
  });
}

export function useDeleteLearningResource() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resourceId: bigint) => {
      toast.info('Learning resource deletion feature coming soon');
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningResources'] });
      toast.success('Learning resource deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete learning resource: ${error.message}`);
    },
  });
}

// Learning Progress Queries - Placeholder implementations
export function useGetLearningProgress(candidatePrincipal?: Principal) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const principal = candidatePrincipal || identity?.getPrincipal();

  return useQuery<LearningProgress | null>({
    queryKey: ['learningProgress', principal?.toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return null;
    },
    enabled: false,
  });
}

export function useMarkLearningResourceCompleted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resourceId: bigint) => {
      toast.info('Learning progress tracking feature coming soon');
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningProgress'] });
      queryClient.invalidateQueries({ queryKey: ['skillGrowthData'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['careerPath'] });
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast.success('Resource marked as completed!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to mark resource as completed: ${error.message}`);
    },
  });
}

export function useSaveLearningResourceForLater() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resourceId: bigint) => {
      toast.info('Learning progress tracking feature coming soon');
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['learningProgress'] });
      toast.success('Resource saved for later!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to save resource: ${error.message}`);
    },
  });
}

// Skill Growth Tracker Queries - Placeholder implementations
export function useGetSkillGrowthData(candidatePrincipal?: Principal) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const principal = candidatePrincipal || identity?.getPrincipal();

  return useQuery<SkillGrowthData | null>({
    queryKey: ['skillGrowthData', principal?.toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return null;
    },
    enabled: false,
  });
}

export function useGetCandidateGrowthData() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<SkillGrowthData | null>({
    queryKey: ['candidateGrowthData', identity?.getPrincipal().toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return null;
    },
    enabled: false,
  });
}

// Leaderboard Queries - Placeholder implementations
export function useGetLeaderboard(filter: LeaderboardFilter) {
  const { actor, isFetching } = useActor();

  return useQuery<LeaderboardEntry[]>({
    queryKey: ['leaderboard', filter],
    queryFn: async () => {
      // Backend method not implemented yet
      return [];
    },
    enabled: false,
    refetchInterval: 30000,
  });
}

// Career Path Recommendations Queries - Placeholder implementations
export function useGetCareerPathRecommendations(candidatePrincipal?: Principal) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const principal = candidatePrincipal || identity?.getPrincipal();

  return useQuery<CareerPathRecommendations | null>({
    queryKey: ['careerPath', principal?.toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return null;
    },
    enabled: false,
    retry: false,
  });
}

export function useGetCareerProgressData(candidatePrincipal?: Principal) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const principal = candidatePrincipal || identity?.getPrincipal();

  return useQuery<CareerProgressData | null>({
    queryKey: ['careerProgressData', principal?.toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return null;
    },
    enabled: false,
  });
}

export function useGetCandidateCareerPathSummary(candidatePrincipal: Principal) {
  const { actor, isFetching } = useActor();

  return useQuery<CareerPathRecommendations | null>({
    queryKey: ['careerPathSummary', candidatePrincipal.toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return null;
    },
    enabled: false,
  });
}

export function useGenerateCareerPathRecommendations() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (update: CareerProgressUpdate) => {
      toast.info('Career path generation feature coming soon');
      return Promise.resolve();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['careerPath', variables.candidate.toString()] });
      queryClient.invalidateQueries({ queryKey: ['careerProgressData', variables.candidate.toString()] });
      toast.success('Career path recommendations generated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to generate career path: ${error.message}`);
    },
  });
}

export function useUpdateCareerPathProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (update: CareerProgressUpdate) => {
      toast.info('Career path progress update feature coming soon');
      return Promise.resolve();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['careerPath', variables.candidate.toString()] });
      queryClient.invalidateQueries({ queryKey: ['careerProgressData', variables.candidate.toString()] });
      toast.success('Career path progress updated!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update career path progress: ${error.message}`);
    },
  });
}

// Certification Queries - Placeholder implementations
export function useGetCandidateCertifications(candidatePrincipal?: Principal) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const principal = candidatePrincipal || identity?.getPrincipal();

  return useQuery<Certification[]>({
    queryKey: ['certifications', principal?.toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return [];
    },
    enabled: false,
  });
}

export function useGetAllCertifications() {
  const { actor, isFetching } = useActor();

  return useQuery<Certification[]>({
    queryKey: ['allCertifications'],
    queryFn: async () => {
      // Backend method not implemented yet
      return [];
    },
    enabled: false,
  });
}

export function useGetCertificationProgress(candidatePrincipal?: Principal) {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();

  const principal = candidatePrincipal || identity?.getPrincipal();

  return useQuery<CertificationProgress[]>({
    queryKey: ['certificationProgress', principal?.toString()],
    queryFn: async () => {
      // Backend method not implemented yet
      return [];
    },
    enabled: false,
  });
}

export function useValidateCertification() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (certificationId: bigint) => {
      toast.info('Certification validation feature coming soon');
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCertifications'] });
      toast.success('Certification validated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to validate certification: ${error.message}`);
    },
  });
}

export function useRevokeCertification() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ certificationId, reason }: { certificationId: bigint; reason: string }) => {
      toast.info('Certification revocation feature coming soon');
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCertifications'] });
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast.success('Certification revoked successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to revoke certification: ${error.message}`);
    },
  });
}

// Placeholder hooks for features not yet implemented in backend
export function useAnalyzeResume() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Resume analysis feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useGetResumeAnalysis() {
  return useQuery({
    queryKey: ['resumeAnalysis'],
    queryFn: async () => null,
    enabled: false,
  });
}

export function useGetResumeRecommendations() {
  return useQuery({
    queryKey: ['resumeRecommendations'],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useGetCompanyPage() {
  return useQuery({
    queryKey: ['companyPage'],
    queryFn: async () => null,
    enabled: false,
  });
}

export function useGetCallerCompanyPage() {
  return useQuery({
    queryKey: ['companyPage'],
    queryFn: async () => null,
    enabled: false,
  });
}

export function useCreateCompanyPage() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Company pages feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useUpdateCompanyPage() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Company pages feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useUploadCompanyLogo() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Company pages feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useUploadCompanyBanner() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Company pages feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useGetAllCompanyPages() {
  return useQuery({
    queryKey: ['allCompanyPages'],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useApproveCompanyPage() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Company pages feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useRejectCompanyPage() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Company pages feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useRemoveCompanyPage() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Company pages feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useCreateReferral() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Referral system feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useCompleteReferral() {
  return useMutation({
    mutationFn: async () => {
      toast.info('Referral system feature coming soon');
      return Promise.resolve();
    },
  });
}

export function useGetUserReferrals() {
  return useQuery({
    queryKey: ['referrals'],
    queryFn: async () => [],
    enabled: false,
  });
}

export function useGetReferralStats() {
  return useQuery({
    queryKey: ['referralStats'],
    queryFn: async () => ({
      totalReferredUsers: BigInt(0),
      totalReferralPoints: BigInt(0),
      successfulReferrals: BigInt(0),
      failedReferrals: BigInt(0),
    }),
    enabled: false,
  });
}

export function useGetTotalReferralPoints() {
  return useQuery({
    queryKey: ['totalReferralPoints'],
    queryFn: async () => BigInt(0),
    enabled: false,
  });
}

export function useGetAllReferrals() {
  return useQuery({
    queryKey: ['allReferrals'],
    queryFn: async () => [],
    enabled: false,
  });
}
