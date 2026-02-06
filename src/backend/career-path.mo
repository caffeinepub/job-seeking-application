import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Float "mo:core/Float";

module {
  public type ExperienceLevel = {
    #entryLevel;
    #midLevel;
    #seniorLevel;
    #executive;
  };

  public type LearningResource = {
    id : Nat;
    title : Text;
    category : Text;
    url : Text;
    description : Text;
    roleVisibility : [UserRole];
    difficultyLevel : Text;
    estimateHours : Nat;
    resourceType : Text;
  };

  public type UserRole = {
    #employer;
    #candidate;
  };

  public type AnalyticsData = {
    totalJobsPosted : Nat;
    applicationsReceived : Nat;
    interviewsScheduled : Nat;
    feedbackSubmitted : Nat;
    applicationsSubmitted : Nat;
    interviewsAttended : Nat;
    feedbackReceived : Nat;
    testsCompleted : Nat;
    referralPointsEarned : Nat;
  };

  public type GamificationStatus = {
    points : Nat;
    referralPoints : Nat;
    badge : Badge;
  };

  public type CandidateProfile = {
    id : Nat;
    user : Principal;
    name : Text;
    skills : [Text];
    experience : Text;
    contactEmail : Text;
    location : Text;
    desiredSalary : Text;
    timestamp : Nat;
    resume : ?(); // Blob reference in main actor
    points : Nat;
    referralPoints : Nat;
    badge : Badge;
    experienceLevel : ExperienceLevel;
  };

  public type InterviewSchedule = {
    id : Nat;
    applicationId : Nat;
    employer : Principal;
    candidate : Principal;
    scheduledTime : Time.Time;
    meetingLink : Text;
    status : Text;
    notes : Text;
  };

  public type ResumeAnalysis = {
    candidate : Principal;
    resume : (); // Blob reference in main actor
    resumeAnalysisScore : Nat;
    extractedSkills : [Text];
    educationLevel : Text;
    suggestions : [Text];
    lastUpdated : Time.Time;
  };

  public type Feedback = {
    id : Nat;
    employer : Principal;
    candidate : Principal;
    interviewId : Nat;
    rating : Nat;
    comments : Text;
    date : Time.Time;
  };

  public type Question = {
    id : Nat;
    questionText : Text;
    choices : [Text];
    correctAnswerIndex : Nat;
  };

  public type Assessment = {
    id : Nat;
    title : Text;
    description : Text;
    questions : [Question];
    creator : Principal;
  };

  public type Answer = {
    questionId : Nat;
    chosenAnswerIndex : Nat;
  };

  public type TestResult = {
    id : Nat;
    assessmentId : Nat;
    candidate : Principal;
    employer : Principal;
    answers : [Answer];
    score : Nat;
    timestamp : Time.Time;
  };

  public type JobRecommendation = {
    jobId : Nat;
    title : Text;
    company : Text;
    score : Nat;
    matchPercentage : Float;
    location : Text;
    salaryRange : Text;
    requirements : [Text];
    experienceLevel : ExperienceLevel;
    companyBranding : ?CompanyPage;
    industry : Text;
    roleType : Text;
    recommendations : [Text];
  };
  public type Badge = {
    #bronze;
    #silver;
    #gold;
  };

  public type CompanyPageStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type CompanyPage = {
    companyName : Text;
    logo : ?(); // Blob reference in main actor
    banner : ?(); // Blob reference in main actor
    description : Text;
    location : Text;
    website : Text;
    status : CompanyPageStatus;
    createdBy : Principal;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type SkillArea = {
    skillCategory : Text;
    level : Text;
    growthProgress : Nat;
    trend : [Nat];
    recentActivity : [Nat];
    improvementTips : [Text];
  };

  public type CareerProgressStage = {
    level : ExperienceLevel;
    title : Text;
    requirements : [Text];
    recommendedSkills : [Text];
    learningResources : [LearningResource];
  };

  public type CareerObjective = {
    objective : Text;
    targetLevel : ExperienceLevel;
    requiredSkills : [Text];
    recommendedResources : [LearningResource];
    targetCompletionTime : Nat;
  };

  public type RecommendedRole = {
    title : Text;
    requiredSkills : [Text];
    recommendedResources : [LearningResource];
    estimatedPreparationTime : Nat;
    successProbability : Float;
    careerPathAlignment : Float;
  };

  public type CareerProgressMetrics = {
    level : ExperienceLevel;
    title : Text;
    completionRate : Float;
    requiredSkills : [Text];
    recommendedResources : [LearningResource];
    nextMilestone : Text;
    improvementTips : [Text];
    progressSnapshot : [Nat];
    progressHistory : [Nat];
  };

  public type IndustryTrends = {
    currentTrends : [Text];
    emergingSkills : [Text];
  };

  public type CareerProgressData = {
    currentLevel : ExperienceLevel;
    progressPercentage : Nat;
    completedStages : Nat;
    skills : [Text];
    recommendedLearningResources : [LearningResource];
    improvementTips : [Text];
    skillAreas : [SkillArea];
    completedMilestones : Nat;
    careerProgressStages : [CareerProgressStage];
    careerObjectives : [CareerObjective];
    growthTrends : [Nat];
    progressHistory : [Nat];
    recommendedRoles : [RecommendedRole];
    careerProgressMetrics : [CareerProgressMetrics];
    industryTrends : IndustryTrends;
    nextLevel : ?ExperienceLevel;
    completionRate : Float;
    averageCompletionTime : Nat;
    progressSnapshot : [Nat];
    progressTimeline : [Nat];
    currentRole : Text;
    recommendedLearningPaths : [LearningResource];
    progressChallenges : [Text];
    progressMilestones : [Text];
  };

  public type CareerPathRecommendations = {
    candidate : Principal;
    industry : Text;
    recommendedRoles : [RecommendedRole];
    careerProgress : CareerProgressData;
  };

  public type CareerProgressUpdate = {
    candidate : Principal;
    currentLevel : ExperienceLevel;
    progressPercentage : Nat;
    skills : [Text];
    completedStages : Nat;
    completedMilestones : Nat;
    currentRole : Text;
    recommendedLearningResources : [LearningResource];
    industry : Text;
    improvementTips : [Text];
    skillAreas : [SkillArea];
    progressSnapshot : [Nat];
    progressMilestones : [Text];
    progressHistory : [Nat];
    recommendedRoles : [RecommendedRole];
    careerProgressStages : [CareerProgressStage];
    growthTrends : [Nat];
    careerProgressMetrics : [CareerProgressMetrics];
    careerObjectives : [CareerObjective];
    industryTrends : IndustryTrends;
    nextLevel : ?ExperienceLevel;
    completionRate : Float;
    recommendedLearningPaths : [LearningResource];
    progressChallenges : [Text];
    averageCompletionTime : Nat;
    currentRating : Nat;
    challengeMap : [(Text, Bool)];
    milestoneCompleted : Bool;
  };

  // --- Core Logic ---
  public func generateCareerPathRecommendations(update : CareerProgressUpdate) : CareerPathRecommendations {
    {
      candidate = update.candidate;
      industry = update.industry;
      recommendedRoles = update.recommendedRoles;
      careerProgress = {
        currentLevel = update.currentLevel;
        progressPercentage = update.progressPercentage;
        completedStages = update.completedStages;
        skills = update.skills;
        recommendedLearningResources = update.recommendedLearningResources;
        improvementTips = update.improvementTips;
        skillAreas = update.skillAreas;
        completedMilestones = update.completedMilestones;
        careerProgressStages = update.careerProgressStages;
        careerObjectives = update.careerObjectives;
        growthTrends = update.growthTrends;
        progressHistory = update.progressHistory;
        recommendedRoles = update.recommendedRoles;
        careerProgressMetrics = update.careerProgressMetrics;
        industryTrends = update.industryTrends;
        nextLevel = update.nextLevel;
        completionRate = update.completionRate;
        averageCompletionTime = update.averageCompletionTime;
        progressSnapshot = update.progressSnapshot;
        progressTimeline = [];
        currentRole = update.currentRole;
        recommendedLearningPaths = update.recommendedLearningPaths;
        progressChallenges = update.progressChallenges;
        progressMilestones = update.progressMilestones;
      };
    };
  };
};
