import React, { useState } from 'react';
import { useSearchJobsWithFilters, ExperienceLevel, type JobSearchFilters } from '../../hooks/useQueries';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Briefcase, MapPin, DollarSign, Star, X, Filter } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

const experienceLevelLabels: Record<string, string> = {
  entryLevel: 'Entry Level',
  midLevel: 'Mid Level',
  seniorLevel: 'Senior Level',
  executive: 'Executive',
};

export default function JobSearchTab() {
  const [filters, setFilters] = useState<JobSearchFilters>({
    experienceLevel: undefined,
    minDesiredSalary: undefined,
    maxDesiredSalary: undefined,
    minRating: undefined,
  });

  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const { data: jobs = [], isLoading } = useSearchJobsWithFilters(filters);

  const handleExperienceLevelChange = (value: string) => {
    if (value === 'all') {
      setFilters({ ...filters, experienceLevel: undefined });
    } else {
      setFilters({ ...filters, experienceLevel: value as ExperienceLevel });
    }
  };

  const handleMinSalaryChange = (value: string) => {
    setMinSalary(value);
    const numValue = value ? BigInt(parseInt(value)) : undefined;
    setFilters({ ...filters, minDesiredSalary: numValue });
  };

  const handleMaxSalaryChange = (value: string) => {
    setMaxSalary(value);
    const numValue = value ? BigInt(parseInt(value)) : undefined;
    setFilters({ ...filters, maxDesiredSalary: numValue });
  };

  const handleRatingChange = (value: string) => {
    if (value === 'all') {
      setFilters({ ...filters, minRating: undefined });
    } else {
      setFilters({ ...filters, minRating: BigInt(parseInt(value)) });
    }
  };

  const clearFilters = () => {
    setFilters({
      experienceLevel: undefined,
      minDesiredSalary: undefined,
      maxDesiredSalary: undefined,
      minRating: undefined,
    });
    setMinSalary('');
    setMaxSalary('');
  };

  const hasActiveFilters = 
    filters.experienceLevel !== undefined ||
    filters.minDesiredSalary !== undefined ||
    filters.maxDesiredSalary !== undefined ||
    filters.minRating !== undefined;

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Job Search</h2>
          <p className="text-muted-foreground">Find your next opportunity</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <Label htmlFor="min-salary">Min Salary ($)</Label>
                  <Input
                    id="min-salary"
                    type="number"
                    placeholder="e.g., 50000"
                    value={minSalary}
                    onChange={(e) => handleMinSalaryChange(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-salary">Max Salary ($)</Label>
                  <Input
                    id="max-salary"
                    type="number"
                    placeholder="e.g., 150000"
                    value={maxSalary}
                    onChange={(e) => handleMaxSalaryChange(e.target.value)}
                  />
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
                  {filters.minDesiredSalary && (
                    <Badge variant="secondary" className="gap-1">
                      Min: ${filters.minDesiredSalary.toString()}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => {
                          setFilters({ ...filters, minDesiredSalary: undefined });
                          setMinSalary('');
                        }}
                      />
                    </Badge>
                  )}
                  {filters.maxDesiredSalary && (
                    <Badge variant="secondary" className="gap-1">
                      Max: ${filters.maxDesiredSalary.toString()}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => {
                          setFilters({ ...filters, maxDesiredSalary: undefined });
                          setMaxSalary('');
                        }}
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

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">No jobs found</p>
            <p className="text-muted-foreground">
              {hasActiveFilters
                ? 'Try adjusting your filters to see more results'
                : 'Check back later for new opportunities'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <Card key={job.id.toString()} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {job.description.length > 150
                        ? `${job.description.substring(0, 150)}...`
                        : job.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {experienceLevelLabels[job.experienceLevel]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salaryRange}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src="/assets/generated/experience-level-icon-transparent.dim_20x20.png" alt="experience" className="w-4 h-4" />
                      <span className="text-muted-foreground">{experienceLevelLabels[job.experienceLevel]}</span>
                    </div>
                  </div>

                  {job.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.slice(0, 5).map((req, idx) => (
                        <Badge key={idx} variant="secondary">
                          {req}
                        </Badge>
                      ))}
                      {job.requirements.length > 5 && (
                        <Badge variant="secondary">+{job.requirements.length - 5} more</Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Employer Rating:</span>
                      {renderStars(4)}
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
