import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  useGetLearningResources, 
  useGetCallerUserProfile, 
  useGetLearningProgress,
  useMarkLearningResourceCompleted,
  useSaveLearningResourceForLater,
  AppUserRole,
  type LearningResource
} from '../hooks/useQueries';
import { BookOpen, ExternalLink, Bookmark, CheckCircle2, Search, GraduationCap, Code, TrendingUp, Users, Briefcase, FileText } from 'lucide-react';
import { UserRole } from '../backend';

const getCategoryIcon = (category: string) => {
  const lowerCategory = category.toLowerCase();
  if (lowerCategory.includes('interview')) return GraduationCap;
  if (lowerCategory.includes('coding') || lowerCategory.includes('proficiency')) return Code;
  if (lowerCategory.includes('career') || lowerCategory.includes('growth')) return TrendingUp;
  if (lowerCategory.includes('diversity')) return Users;
  if (lowerCategory.includes('hiring') || lowerCategory.includes('practices')) return Briefcase;
  if (lowerCategory.includes('job posting')) return FileText;
  return BookOpen;
};

const getDifficultyColor = (difficulty: string) => {
  const lower = difficulty.toLowerCase();
  if (lower === 'beginner') return 'bg-green-500/10 text-green-700 dark:text-green-400';
  if (lower === 'intermediate') return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
  if (lower === 'advanced') return 'bg-red-500/10 text-red-700 dark:text-red-400';
  return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
};

export default function LearningHubTab() {
  const { data: userProfile } = useGetCallerUserProfile();
  const userRole = userProfile?.role === UserRole.candidate ? AppUserRole.candidate : AppUserRole.employer;
  
  const { data: resources = [], isLoading } = useGetLearningResources(userRole);
  const { data: learningProgress } = useGetLearningProgress();
  const markCompleted = useMarkLearningResourceCompleted();
  const saveForLater = useSaveLearningResourceForLater();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterView, setFilterView] = useState<'all' | 'saved' | 'completed'>('all');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(resources.map(r => r.category));
    return Array.from(cats).sort();
  }, [resources]);

  // Helper functions to check completion and saved status
  const isCompleted = (resourceId: bigint) => {
    return learningProgress?.completed.some(id => id === resourceId) || false;
  };

  const isSaved = (resourceId: bigint) => {
    return learningProgress?.savedForLater.some(id => id === resourceId) || false;
  };

  const completedCount = learningProgress?.totalCompleted || 0;
  const savedCount = learningProgress?.totalSaved || 0;

  // Filter resources
  const filteredResources = useMemo(() => {
    let filtered = resources;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(query) || 
        r.description.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(r => r.category === selectedCategory);
    }

    // Filter by view (all, saved, completed)
    if (filterView === 'saved') {
      filtered = filtered.filter(r => isSaved(r.id));
    } else if (filterView === 'completed') {
      filtered = filtered.filter(r => isCompleted(r.id));
    }

    return filtered;
  }, [resources, searchQuery, selectedCategory, filterView, learningProgress]);

  const handleMarkCompleted = (resourceId: bigint) => {
    markCompleted.mutate(resourceId);
  };

  const handleToggleSaved = (resourceId: bigint) => {
    saveForLater.mutate(resourceId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading learning resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <img src="/assets/generated/learning-hub-icon-transparent.dim_32x32.png" alt="Learning Hub" className="w-8 h-8" />
            Learning Hub
          </h2>
          <p className="text-muted-foreground">
            {userRole === AppUserRole.candidate 
              ? 'Enhance your skills with personalized learning resources'
              : 'Improve your hiring practices with expert guidance'}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-muted-foreground">{Number(completedCount)} Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-600" />
            <span className="text-muted-foreground">{Number(savedCount)} Saved</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Filter */}
            <div className="flex gap-2">
              <Button
                variant={filterView === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterView('all')}
                className="flex-1"
              >
                All
              </Button>
              <Button
                variant={filterView === 'saved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterView('saved')}
                className="flex-1"
              >
                Saved
              </Button>
              <Button
                variant={filterView === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterView('completed')}
                className="flex-1"
              >
                Completed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-3">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== 'all' || filterView !== 'all'
                  ? 'No resources match your filters'
                  : 'No learning resources available yet'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const CategoryIcon = getCategoryIcon(resource.category);
            const completed = isCompleted(resource.id);
            const saved = isSaved(resource.id);

            return (
              <Card key={resource.id.toString()} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <CategoryIcon className="w-5 h-5 text-primary flex-shrink-0" />
                      <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleSaved(resource.id)}
                      className="flex-shrink-0"
                      disabled={saveForLater.isPending}
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-current text-blue-600' : ''}`} />
                    </Button>
                  </div>
                  <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.category}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(resource.difficultyLevel)}`}>
                      {resource.difficultyLevel}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {resource.resourceType}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <img src="/assets/generated/clock-icon-transparent.dim_24x24.png" alt="Time" className="w-4 h-4" />
                    <span>{Number(resource.estimateHours)} hours</span>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Resource
                    </Button>
                    {!completed && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkCompleted(resource.id)}
                        disabled={markCompleted.isPending}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    )}
                    {completed && (
                      <div className="flex items-center gap-1 px-3 py-2 bg-green-500/10 text-green-700 dark:text-green-400 rounded-md text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-xs font-medium">Done</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Results Counter */}
      {filteredResources.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredResources.length} of {resources.length} resources
        </div>
      )}
    </div>
  );
}
