import React, { useState } from 'react';
import { useSearchCandidatesWithFilters, useGetSkillGrowthData, useGetCandidateCareerPathSummary, ExperienceLevel, type CandidateSearchFilters } from '../../hooks/useQueries';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { User, MapPin, Mail, Star, X, Filter, TrendingUp, Target, Award, CheckCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';

const experienceLevelLabels: Record<string, string> = {
  entryLevel: 'Entry Level',
  midLevel: 'Mid Level',
  seniorLevel: 'Senior Level',
  executive: 'Executive',
};

const badgeIcons: Record<string, string> = {
  bronze: '/assets/generated/bronze-badge-icon-transparent.dim_32x32.png',
  silver: '/assets/generated/silver-badge-icon-transparent.dim_32x32.png',
  gold: '/assets/generated/gold-badge-icon-transparent.dim_32x32.png',
};

type SortOption = 'experience' | 'rating' | 'skillsMatch';
type SortOrder = 'asc' | 'desc';

// Placeholder certification type
type Certification = {
  id: bigint;
  title: string;
  issuedBy: string;
  issueDate: bigint;
  status: 'active' | 'expired';
};

function CandidateGrowthSummary({ candidatePrincipal }: { candidatePrincipal: string }) {
  const { data: growthData } = useGetSkillGrowthData(candidatePrincipal as any);

  if (!growthData) {
    return null;
  }

  const overallProgress = Number(growthData.overallProgressPercentage);
  const metrics = growthData.cumulativeGrowthMetrics;

  return (
    <div className="mt-3 pt-3 border-t space-y-3">
      <div className="flex items-center gap-2">
        <img src="/assets/generated/growth-tracker-icon-transparent.dim_32x32.png" alt="Growth" className="w-5 h-5" />
        <span className="text-sm font-medium">Skill Growth Progress</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-semibold">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center p-2 bg-muted/50 rounded">
          <div className="font-semibold">{Number(metrics.resourcesCompleted)}</div>
          <div className="text-muted-foreground">Resources</div>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded">
          <div className="font-semibold">{Number(metrics.assessmentsTaken)}</div>
          <div className="text-muted-foreground">Assessments</div>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded">
          <div className="font-semibold">{Number(metrics.feedbackReceived)}</div>
          <div className="text-muted-foreground">Feedback</div>
        </div>
      </div>

      {growthData.skillAreaProgress.length > 0 && (
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Top Skill Areas:</span>
          <div className="flex flex-wrap gap-1">
            {growthData.skillAreaProgress.slice(0, 3).map((skill) => (
              <Badge key={skill.skillCategory} variant="secondary" className="text-xs">
                {skill.skillCategory}: {Number(skill.percentage)}%
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CandidateCareerPathSummary({ candidatePrincipal }: { candidatePrincipal: string }) {
  const { data: careerPath } = useGetCandidateCareerPathSummary(candidatePrincipal as any);

  if (!careerPath) {
    return null;
  }

  const progress = careerPath.careerProgress;

  return (
    <div className="mt-3 pt-3 border-t space-y-3">
      <div className="flex items-center gap-2">
        <img src="/assets/generated/career-path-roadmap-icon-transparent.dim_32x32.png" alt="Career Path" className="w-5 h-5" />
        <span className="text-sm font-medium">Career Path & Growth Potential</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Current Role</span>
          <Badge variant="outline">{progress.currentRole}</Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Career Progress</span>
          <span className="font-semibold">{Number(progress.progressPercentage)}%</span>
        </div>
        <Progress value={Number(progress.progressPercentage)} className="h-2" />
      </div>

      {careerPath.recommendedRoles.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Recommended Next Roles:</span>
          <div className="space-y-1">
            {careerPath.recommendedRoles.slice(0, 2).map((role, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded text-xs">
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3" />
                  <span className="font-medium">{role.title}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {(role.successProbability * 100).toFixed(0)}% match
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="text-center p-2 bg-muted/50 rounded">
          <div className="font-semibold">{Number(progress.completedMilestones)}</div>
          <div className="text-muted-foreground">Milestones</div>
        </div>
        <div className="text-center p-2 bg-muted/50 rounded">
          <div className="font-semibold">{(progress.completionRate * 100).toFixed(0)}%</div>
          <div className="text-muted-foreground">Completion</div>
        </div>
      </div>
    </div>
  );
}

function CandidateCertifications({ candidatePrincipal }: { candidatePrincipal: string }) {
  // Placeholder - will be replaced with actual backend query
  const certifications: Certification[] = [];

  if (certifications.length === 0) {
    return null;
  }

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="mt-3 pt-3 border-t space-y-3">
      <div className="flex items-center gap-2">
        <img src="/assets/generated/certification-badge-icon-transparent.dim_32x32.png" alt="Certifications" className="w-5 h-5" />
        <span className="text-sm font-medium">Professional Certifications</span>
      </div>

      <div className="space-y-2">
        {certifications.slice(0, 3).map((cert) => (
          <div key={cert.id.toString()} className="flex items-center justify-between p-2 bg-muted/50 rounded text-xs">
            <div className="flex items-center gap-2 flex-1">
              <img src="/assets/generated/certification-trophy-icon-transparent.dim_24x24.png" alt="Certificate" className="w-4 h-4" />
              <div className="flex-1">
                <div className="font-medium">{cert.title}</div>
                <div className="text-muted-foreground">{cert.issuedBy} • {formatDate(cert.issueDate)}</div>
              </div>
            </div>
            <Badge variant={cert.status === 'active' ? 'default' : 'secondary'} className="text-xs">
              {cert.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : null}
              {cert.status}
            </Badge>
          </div>
        ))}
        {certifications.length > 3 && (
          <div className="text-xs text-muted-foreground text-center">
            +{certifications.length - 3} more {certifications.length - 3 === 1 ? 'certification' : 'certifications'}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CandidatesTab() {
  const [filters, setFilters] = useState<CandidateSearchFilters>({
    experienceLevel: undefined,
    skills: undefined,
    minRating: undefined,
  });

  const [skillInput, setSkillInput] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('experience');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const { data: candidateResults = [], isLoading } = useSearchCandidatesWithFilters(filters);

  const handleExperienceLevelChange = (value: string) => {
    if (value === 'all') {
      setFilters({ ...filters, experienceLevel: undefined });
    } else {
      setFilters({ ...filters, experienceLevel: value as ExperienceLevel });
    }
  };

  const handleRatingChange = (value: string) => {
    if (value === 'all') {
      setFilters({ ...filters, minRating: undefined });
    } else {
      setFilters({ ...filters, minRating: BigInt(parseInt(value)) });
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !selectedSkills.includes(skillInput.trim())) {
      const newSkills = [...selectedSkills, skillInput.trim()];
      setSelectedSkills(newSkills);
      setFilters({ ...filters, skills: newSkills });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const newSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(newSkills);
    setFilters({ ...filters, skills: newSkills.length > 0 ? newSkills : undefined });
  };

  const clearFilters = () => {
    setFilters({
      experienceLevel: undefined,
      skills: undefined,
      minRating: undefined,
    });
    setSelectedSkills([]);
    setSkillInput('');
  };

  const hasActiveFilters =
    filters.experienceLevel !== undefined ||
    (filters.skills && filters.skills.length > 0) ||
    filters.minRating !== undefined;

  const sortedCandidates = [...candidateResults].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'experience') {
      const expOrder = ['entryLevel', 'midLevel', 'seniorLevel', 'executive'];
      const aIndex = expOrder.indexOf(a.candidate.experienceLevel);
      const bIndex = expOrder.indexOf(b.candidate.experienceLevel);
      comparison = aIndex - bIndex;
    } else if (sortBy === 'rating') {
      comparison = a.averageRating - b.averageRating;
    } else if (sortBy === 'skillsMatch') {
      comparison = a.skillsMatchScore - b.skillsMatchScore;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <img
            key={star}
            src={star <= rating ? '/assets/generated/star-filled-icon-transparent.dim_16x16.png' : '/assets/generated/star-empty-icon-transparent.dim_16x16.png'}
            alt={star <= rating ? 'filled star' : 'empty star'}
            className="w-4 h-4"
          />
        ))}
      </div>
    );
  };

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Browse Candidates</h2>
          <p className="text-muted-foreground">Find the perfect match for your team</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {candidateResults.length} {candidateResults.length === 1 ? 'candidate' : 'candidates'} found
          </span>
        </div>
      </div>

      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/assets/generated/advanced-search-filter-icon-transparent.dim_24x24.png" alt="filter" className="w-6 h-6" />
                <CardTitle>Search Filters</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <img src="/assets/generated/clear-filters-icon-transparent.dim_20x20.png" alt="clear" className="w-4 h-4 mr-1" />
                    Clear Filters
                  </Button>
                )}
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience-level">Experience Level</Label>
                  <Select
                    value={filters.experienceLevel || 'all'}
                    onValueChange={handleExperienceLevelChange}
                  >
                    <SelectTrigger id="experience-level">
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="entryLevel">Entry Level</SelectItem>
                      <SelectItem value="midLevel">Mid Level</SelectItem>
                      <SelectItem value="seniorLevel">Senior Level</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills"
                      placeholder="e.g., React, TypeScript"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <Button type="button" onClick={handleAddSkill}>Add</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Minimum Rating</Label>
                  <Select
                    value={filters.minRating?.toString() || 'all'}
                    onValueChange={handleRatingChange}
                  >
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="All ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="1">1+ Stars</SelectItem>
                      <SelectItem value="2">2+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Selected skills:</span>
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => handleRemoveSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {filters.experienceLevel && (
                    <Badge variant="secondary" className="gap-1">
                      {experienceLevelLabels[filters.experienceLevel]}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setFilters({ ...filters, experienceLevel: undefined })}
                      />
                    </Badge>
                  )}
                  {filters.minRating && (
                    <Badge variant="secondary" className="gap-1">
                      {filters.minRating.toString()}+ Stars
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setFilters({ ...filters, minRating: undefined })}
                      />
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Sort Results</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={sortBy === 'experience' ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleSort('experience')}
              >
                Experience
                {sortBy === 'experience' && (
                  <img
                    src={sortOrder === 'asc' ? '/assets/generated/sort-ascending-icon-transparent.dim_16x16.png' : '/assets/generated/sort-descending-icon-transparent.dim_16x16.png'}
                    alt="sort"
                    className="w-4 h-4 ml-1"
                  />
                )}
              </Button>
              <Button
                variant={sortBy === 'skillsMatch' ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleSort('skillsMatch')}
              >
                Skills Match
                {sortBy === 'skillsMatch' && (
                  <img
                    src={sortOrder === 'asc' ? '/assets/generated/sort-ascending-icon-transparent.dim_16x16.png' : '/assets/generated/sort-descending-icon-transparent.dim_16x16.png'}
                    alt="sort"
                    className="w-4 h-4 ml-1"
                  />
                )}
              </Button>
              <Button
                variant={sortBy === 'rating' ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleSort('rating')}
              >
                Rating
                {sortBy === 'rating' && (
                  <img
                    src={sortOrder === 'asc' ? '/assets/generated/sort-ascending-icon-transparent.dim_16x16.png' : '/assets/generated/sort-descending-icon-transparent.dim_16x16.png'}
                    alt="sort"
                    className="w-4 h-4 ml-1"
                  />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading candidates...</p>
        </div>
      ) : sortedCandidates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">No candidates found</p>
            <p className="text-muted-foreground">
              {hasActiveFilters
                ? 'Try adjusting your filters to see more results'
                : 'Check back later for new candidates'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedCandidates.map((result) => {
            const candidate = result.candidate;
            const profilePictureUrl = candidate.resume?.getDirectURL() || '/assets/generated/default-avatar-transparent.dim_100x100.png';
            
            return (
              <Card key={candidate.id.toString()} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profilePictureUrl} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{candidate.name}</CardTitle>
                        <Badge variant="outline">
                          {experienceLevelLabels[candidate.experienceLevel]}
                        </Badge>
                        <img
                          src={badgeIcons[candidate.badge]}
                          alt={`${candidate.badge} badge`}
                          className="w-6 h-6"
                          title={`${candidate.badge.charAt(0).toUpperCase() + candidate.badge.slice(1)} Badge`}
                        />
                      </div>
                      <CardDescription className="text-base">
                        {candidate.experience.length > 120
                          ? `${candidate.experience.substring(0, 120)}...`
                          : candidate.experience}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{candidate.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{candidate.contactEmail}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <img src="/assets/generated/points-icon-transparent.dim_24x24.png" alt="points" className="w-4 h-4" />
                        <span className="text-muted-foreground">{candidate.points.toString()} points</span>
                      </div>
                    </div>

                    {candidate.skills.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <img src="/assets/generated/skills-match-icon-transparent.dim_24x24.png" alt="skills" className="w-4 h-4" />
                          <span className="text-sm font-medium">Skills Match: {Math.round(result.skillsMatchScore * 100)}%</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 6).map((skill, idx) => (
                            <Badge key={idx} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 6 && (
                            <Badge variant="secondary">+{candidate.skills.length - 6} more</Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <CandidateGrowthSummary candidatePrincipal={candidate.user.toString()} />
                    <CandidateCareerPathSummary candidatePrincipal={candidate.user.toString()} />
                    <CandidateCertifications candidatePrincipal={candidate.user.toString()} />

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Average Rating:</span>
                        {renderStars(Math.round(result.averageRating))}
                        <span className="text-sm text-muted-foreground">({result.averageRating.toFixed(1)})</span>
                      </div>
                      <div className="flex gap-2">
                        {candidate.resume && (
                          <Button variant="outline" size="sm">
                            View Resume
                          </Button>
                        )}
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
