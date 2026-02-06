import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
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
} from '../ui/alert-dialog';
import { Search, Award, CheckCircle, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// Placeholder data structure
type Certification = {
  id: bigint;
  candidate: string;
  candidateName: string;
  title: string;
  description: string;
  issuedBy: string;
  issueDate: bigint;
  expiryDate?: bigint;
  status: 'active' | 'expired';
};

type CertificationStats = {
  totalIssued: number;
  activeCount: number;
  expiredCount: number;
  mostPopularType: string;
  recentIssuances: number;
};

export default function CertificationsTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Placeholder data - will be replaced with actual backend queries
  const allCertifications: Certification[] = [];
  const stats: CertificationStats = {
    totalIssued: 0,
    activeCount: 0,
    expiredCount: 0,
    mostPopularType: 'Interview Skills Mastery',
    recentIssuances: 0,
  };

  const filteredCertifications = allCertifications.filter((cert) => {
    const matchesSearch =
      cert.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleRevokeCertification = (cert: Certification) => {
    // Placeholder - will be replaced with actual backend mutation
    console.log('Revoking certification:', cert.id);
  };

  const handleValidateCertification = (cert: Certification) => {
    // Placeholder - will be replaced with actual backend mutation
    console.log('Validating certification:', cert.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Certification Management</h2>
          <p className="text-muted-foreground">
            Oversee and manage all platform certifications
          </p>
        </div>
        <img
          src="/assets/generated/certification-badge-icon-transparent.dim_32x32.png"
          alt="Certifications"
          className="w-8 h-8"
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Issued</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{stats.totalIssued}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Certifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold">{stats.activeCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Expired</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-muted-foreground" />
              <span className="text-2xl font-bold">{stats.expiredCount}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Recent Issuances (30d)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold">{stats.recentIssuances}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by candidate name or certification title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Certifications Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Certifications</CardTitle>
          <CardDescription>
            {filteredCertifications.length} {filteredCertifications.length === 1 ? 'certification' : 'certifications'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCertifications.length === 0 ? (
            <div className="text-center py-12">
              <img
                src="/assets/generated/certificate-icon-transparent.dim_24x24.png"
                alt="No certifications"
                className="w-16 h-16 mx-auto mb-4 opacity-50"
              />
              <p className="text-lg font-medium mb-2">No certifications found</p>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Certifications will appear here as candidates earn them'}
              </p>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Certification</TableHead>
                    <TableHead>Issued By</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCertifications.map((cert) => (
                    <TableRow key={cert.id.toString()}>
                      <TableCell className="font-medium">{cert.candidateName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src="/assets/generated/certification-trophy-icon-transparent.dim_24x24.png"
                            alt="Certificate"
                            className="w-5 h-5"
                          />
                          <span>{cert.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{cert.issuedBy}</TableCell>
                      <TableCell>{formatDate(cert.issueDate)}</TableCell>
                      <TableCell>
                        {cert.expiryDate ? formatDate(cert.expiryDate) : 'No expiry'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={cert.status === 'active' ? 'default' : 'secondary'}>
                          {cert.status === 'active' ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {cert.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleValidateCertification(cert)}
                          >
                            <img
                              src="/assets/generated/certification-validation-icon-transparent.dim_16x16.png"
                              alt="Validate"
                              className="w-4 h-4 mr-1"
                            />
                            Validate
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                Revoke
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Revoke Certification</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to revoke this certification? This action cannot be undone.
                                  The candidate will be notified of the revocation.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRevokeCertification(cert)}>
                                  Revoke Certification
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Most Popular Certification Type */}
      {stats.totalIssued > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Platform Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <img
                src="/assets/generated/stats-icon-transparent.dim_24x24.png"
                alt="Stats"
                className="w-8 h-8"
              />
              <div>
                <p className="text-sm text-muted-foreground">Most Popular Certification</p>
                <p className="text-lg font-semibold">{stats.mostPopularType}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
