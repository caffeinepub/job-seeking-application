import Time "mo:core/Time";
import Map "mo:core/Map";
import Float "mo:core/Float";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import CareerPath "career-path";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  include MixinStorage();

  type ContactInfo = {
    email : Text;
    phone : Text;
  };

  public type ProfileCustomization = {
    bio : Text;
    contactInfo : ContactInfo;
    profilePicture : ?Storage.ExternalBlob;
  };

  public type UserProfile = {
    name : Text;
    role : UserRole;
    email : Text;
    customization : ProfileCustomization;
  };

  public type UserProfileInputs = {
    name : Text;
    role : UserRole;
    email : Text;
    bio : Text;
    contactInfo : ContactInfo;
    profilePictureRef : ?Storage.ExternalBlob;
  };

  type ExperienceLevel = {
    #entryLevel;
    #midLevel;
    #seniorLevel;
    #executive;
  };

  public type UserRole = {
    #employer;
    #candidate;
  };

  type CompanyPageStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type CompanyPage = {
    companyName : Text;
    logo : ?Storage.ExternalBlob;
    banner : ?Storage.ExternalBlob;
    description : Text;
    location : Text;
    website : Text;
    status : CompanyPageStatus;
    createdBy : Principal;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type JobListing = {
    id : Nat;
    employer : Principal;
    title : Text;
    description : Text;
    requirements : [Text];
    salaryRange : Text;
    location : Text;
    timestamp : Nat;
    experienceLevel : ExperienceLevel;
    companyPageId : ?Principal;
  };

  type Badge = {
    #bronze;
    #silver;
    #gold;
  };

  type CandidateProfile = {
    id : Nat;
    user : Principal;
    name : Text;
    skills : [Text];
    experience : Text;
    contactEmail : Text;
    location : Text;
    desiredSalary : Text;
    timestamp : Nat;
    resume : ?Storage.ExternalBlob;
    points : Nat;
    referralPoints : Nat;
    badge : Badge;
    experienceLevel : ExperienceLevel;
  };

  type LeaderboardEntry = {
    user : Principal;
    name : Text;
    points : Nat;
    referralPoints : Nat;
    totalScore : Nat;
    badge : Badge;
    position : Nat;
  };

  type LeaderboardFilter = {
    badgeLevel : ?Badge;
    sortBy : Text;
    sortOrder : Text;
    limit : ?Nat;
  };

  type JobApplication = {
    id : Nat;
    candidate : Principal;
    jobListing : Nat;
    applicationDate : Time.Time;
    status : Text;
  };

  type Message = {
    id : Nat;
    sender : Principal;
    recipient : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  type Notification = {
    id : Nat;
    user : Principal;
    notificationType : Text;
    content : Text;
    isRead : Bool;
    timestamp : Time.Time;
  };

  type SimulationStep = {
    #start;
    #jobPosting;
    #profileApplication;
    #employerResponse;
    #candidateCommunication;
    #end;
  };

  type SimulationState = {
    currentStep : SimulationStep;
    isRunning : Bool;
    demoEmployer : ?Principal;
    demoCandidate : ?Principal;
    demoJobId : ?Nat;
    demoProfileId : ?Nat;
    lastUpdated : Time.Time;
  };

  type InterviewSchedule = {
    id : Nat;
    applicationId : Nat;
    employer : Principal;
    candidate : Principal;
    scheduledTime : Time.Time;
    meetingLink : Text;
    status : Text;
    notes : Text;
  };

  type ResumeAnalysis = {
    candidate : Principal;
    resume : Storage.ExternalBlob;
    resumeAnalysisScore : Nat;
    extractedSkills : [Text];
    educationLevel : Text;
    suggestions : [Text];
    lastUpdated : Time.Time;
  };

  type Feedback = {
    id : Nat;
    employer : Principal;
    candidate : Principal;
    interviewId : Nat;
    rating : Nat;
    comments : Text;
    date : Time.Time;
  };

  type Question = {
    id : Nat;
    questionText : Text;
    choices : [Text];
    correctAnswerIndex : Nat;
  };

  type Assessment = {
    id : Nat;
    title : Text;
    description : Text;
    questions : [Question];
    creator : Principal;
  };

  type Answer = {
    questionId : Nat;
    chosenAnswerIndex : Nat;
  };

  type TestResult = {
    id : Nat;
    assessmentId : Nat;
    candidate : Principal;
    employer : Principal;
    answers : [Answer];
    score : Nat;
    timestamp : Time.Time;
  };

  type AnalyticsData = {
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

  type GamificationStatus = {
    points : Nat;
    referralPoints : Nat;
    badge : Badge;
  };

  type AdminAnalyticsData = {
    totalEmployers : Nat;
    totalCandidates : Nat;
    totalJobListings : Nat;
    totalApplications : Nat;
    totalInterviews : Nat;
    totalFeedback : Nat;
    totalAssessments : Nat;
    totalTestResults : Nat;
    totalPointsAwarded : Nat;
    totalBronzeBadges : Nat;
    totalSilverBadges : Nat;
    totalGoldBadges : Nat;
    averageEmployerRating : Float;
    averageCandidateScore : Float;
    topSkills : [(Text, Nat)];
    topLocations : [(Text, Nat)];
  };

  type AdminActivityLog = {
    id : Nat;
    user : Principal;
    eventType : Text;
    description : Text;
    timestamp : Time.Time;
  };

  type Referral = {
    id : Nat;
    referrer : Principal;
    referredUser : Principal;
    referralDate : Time.Time;
    pointsAwarded : Nat;
    status : ReferralStatus;
  };

  type ReferralStatus = {
    #pending;
    #completed;
    #failed;
  };

  type ReferralStats = {
    totalReferredUsers : Nat;
    totalReferralPoints : Nat;
    successfulReferrals : Nat;
    failedReferrals : Nat;
  };

  type ChatMessage = {
    id : Nat;
    user : Principal;
    content : Text;
    sender : Text;
    timestamp : Int;
    roleType : Text;
  };

  type QuickAction = {
    textLabel : Text;
    actionType : Text;
  };

  type ConversationalResponse = {
    id : Nat;
    responseText : Text;
    quickActions : [QuickAction];
    roleType : Text;
  };

  type AIChatAssistant = {
    chatHistory : [ChatMessage];
    conversationalFlow : [ConversationalResponse];
    quickActions : [Text];
    lastUpdated : Time.Time;
  };

  type JobSearchFilters = {
    experienceLevel : ?ExperienceLevel;
    minDesiredSalary : ?Nat;
    maxDesiredSalary : ?Nat;
    minRating : ?Nat;
  };

  type CandidateSearchFilters = {
    experienceLevel : ?ExperienceLevel;
    skills : ?[Text];
    minRating : ?Nat;
  };

  type CandidateSearchResult = {
    candidate : CandidateProfile;
    averageRating : Float;
    skillsMatchScore : Float;
  };

  type LearningResource = {
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

  type LearningProgress = {
    completed : [Nat];
    savedForLater : [Nat];
    totalCompleted : Nat;
    totalSaved : Nat;
  };

  type SkillGrowthProgress = {
    skillCategory : Text;
    percentage : Nat;
    improvement : Nat;
    trend : [Nat];
    milestone : Bool;
  };

  type CumulativeGrowthMetrics = {
    resourcesCompleted : Nat;
    assessmentsTaken : Nat;
    feedbackReceived : Nat;
    overallProgressPercentage : Nat;
    resourcesWeight : Float;
    assessmentsWeight : Float;
    feedbackWeight : Float;
    resourcesContribution : Float;
    assessmentsContribution : Float;
    feedbackContribution : Float;
  };

  type LearningActivity = {
    resourceId : Nat;
    dateCompleted : Time.Time;
    contributions : [Text];
  };

  type AssessmentContribution = {
    testId : Nat;
    score : Nat;
    contribution : Float;
    dateTaken : Time.Time;
    skillCategory : Text;
  };

  type FeedbackContribution = {
    rating : Nat;
    comment : Text;
    contribution : Float;
    dateReceived : Time.Time;
    skillCategory : Text;
  };

  type ValidationError = {
    error : Text;
    rejectedId : ?Nat;
  };

  type SkillGrowthData = {
    overallProgressPercentage : Nat;
    skillAreaProgress : [SkillGrowthProgress];
    cumulativeGrowthMetrics : CumulativeGrowthMetrics;
    activityHistory : [LearningActivity];
    assessmentContributions : [AssessmentContribution];
    feedbackContributions : [FeedbackContribution];
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();
  let jobListings = Map.empty<Nat, JobListing>();
  let candidateProfiles = Map.empty<Nat, CandidateProfile>();
  let jobApplications = Map.empty<Nat, JobApplication>();
  let messages = Map.empty<Nat, Message>();
  let notifications = Map.empty<Principal, List.List<Notification>>();
  let interviewSchedules = Map.empty<Nat, InterviewSchedule>();
  let feedbacks = Map.empty<Nat, Feedback>();
  let assessments = Map.empty<Nat, Assessment>();
  let testResults = Map.empty<Nat, TestResult>();
  let activityLogs = Map.empty<Nat, AdminActivityLog>();
  let resumeAnalyses = Map.empty<Principal, ResumeAnalysis>();
  let companyPages = Map.empty<Principal, CompanyPage>();
  let referrals = Map.empty<Nat, Referral>();
  let chatMessages = Map.empty<Principal, List.List<ChatMessage>>();
  let conversationalFlows = Map.empty<Text, List.List<ConversationalResponse>>();
  let aiChatAssistants = Map.empty<Principal, AIChatAssistant>();
  let learningResources = Map.empty<Nat, LearningResource>();
  let learningProgress = Map.empty<Principal, LearningProgress>();
  let careerPathRecommendations = Map.empty<Principal, CareerPath.CareerPathRecommendations>();

  var simulationState : ?SimulationState = null;

  var nextJobListingId = 1;
  var nextCandidateProfileId = 1;
  var nextJobApplicationId = 1;
  var nextMessageId = 1;
  var nextNotificationId = 1;
  var nextInterviewScheduleId = 1;
  var nextFeedbackId = 1;
  var nextAssessmentId = 1;
  var nextQuestionId = 1;
  var nextTestResultId = 1;
  var nextActivityLogId = 1;
  var nextReferralId = 1;
  var nextChatMessageId = 1;
  var nextConversationalResponseId = 1;
  var nextLearningResourceId = 1;

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(updates : UserProfileInputs) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    let newCustomization = {
      profilePicture = updates.profilePictureRef;
      bio = updates.bio;
      contactInfo = updates.contactInfo;
    };

    let newProfile = {
      updates with
      customization = newCustomization;
    };

    userProfiles.add(caller, newProfile);
  };

  public shared ({ caller }) func setProfileCustomization(customization : ProfileCustomization) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update profile customization");
    };

    switch (userProfiles.get(caller)) {
      case (?existingProfile) {
        let updatedProfile = {
          existingProfile with
          customization = customization;
        };
        userProfiles.add(caller, updatedProfile);
      };
      case null {
        Runtime.trap("Profile not found: Create a profile first");
      };
    };
  };
};
