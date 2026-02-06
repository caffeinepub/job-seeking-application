import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, CheckCircle, XCircle, Trash2, ExternalLink, AlertCircle } from 'lucide-react';
import {
  useGetAllCompanyPages,
  useApproveCompanyPage,
  useRejectCompanyPage,
  useRemoveCompanyPage,
} from '../../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Local type definitions since backend types are not available
type CompanyPageStatus = 'pending' | 'approved' | 'rejected';

interface CompanyPage {
  companyName: string;
  logo?: { getDirectURL: () => string };
  banner?: { getDirectURL: () => string };
  description: string;
  location: string;
  website: string;
  status: CompanyPageStatus;
  createdBy: { toString: () => string };
  createdAt: bigint;
  updatedAt: bigint;
}

export default function CompanyPagesTab() {
  const { data: companyPages = [], isLoading } = useGetAllCompanyPages();
  const approveCompanyPage = useApproveCompanyPage();
  const rejectCompanyPage = useRejectCompanyPage();
  const removeCompanyPage = useRemoveCompanyPage();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredCompanyPages = (companyPages as CompanyPage[]).filter((page) => {
    const matchesSearch =
      page.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || page.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: CompanyPageStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 dark:text-green-400">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const handleApprove = async (companyId: string) => {
    await approveCompanyPage.mutateAsync(companyId as any);
  };

  const handleReject = async (companyId: string) => {
    await rejectCompanyPage.mutateAsync(companyId as any);
  };

  const handleRemove = async (companyId: string) => {
    await removeCompanyPage.mutateAsync(companyId as any);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          Company Pages Management
        </h2>
        <p className="text-muted-foreground mt-1">
          Review, approve, reject, or remove company pages
        </p>
      </div>

      {/* Feature Notice */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          The company pages feature is currently being implemented. This feature will be available soon.
        </AlertDescription>
      </Alert>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'pending' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('pending')}
            size="sm"
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === 'approved' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('approved')}
            size="sm"
          >
            Approved
          </Button>
          <Button
            variant={statusFilter === 'rejected' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('rejected')}
            size="sm"
          >
            Rejected
          </Button>
        </div>
      </div>

      {/* Company Pages List */}
      {filteredCompanyPages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No company pages found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredCompanyPages.map((page) => (
            <Card key={page.createdBy.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {page.logo && (
                      <img
                        src={page.logo.getDirectURL()}
                        alt={page.companyName}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-border"
                      />
                    )}
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {page.companyName}
                        {getStatusBadge(page.status)}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {page.location}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {page.banner && (
                  <div className="w-full h-32 rounded-lg overflow-hidden border-2 border-border">
                    <img
                      src={page.banner.getDirectURL()}
                      alt={`${page.companyName} banner`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p className="text-sm text-muted-foreground line-clamp-3">{page.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                  <a
                    href={page.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline"
                  >
                    {page.website}
                  </a>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t">
                  {page.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(page.createdBy.toString())}
                        disabled={approveCompanyPage.isPending}
                        className="gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(page.createdBy.toString())}
                        disabled={rejectCompanyPage.isPending}
                        className="gap-2"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </>
                  )}
                  {page.status === 'rejected' && (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(page.createdBy.toString())}
                      disabled={approveCompanyPage.isPending}
                      className="gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                  )}
                  {page.status === 'approved' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(page.createdBy.toString())}
                      disabled={rejectCompanyPage.isPending}
                      className="gap-2"
                    >
                      <XCircle className="h-4 w-4" />
                      Revoke Approval
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="gap-2 ml-auto">
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove Company Page</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this company page? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemove(page.createdBy.toString())}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
