import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Upload, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import {
  useGetCallerCompanyPage,
  useCreateCompanyPage,
  useUpdateCompanyPage,
  useUploadCompanyLogo,
  useUploadCompanyBanner,
} from '../../hooks/useQueries';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CompanyBrandingTab() {
  const { data: companyPage, isLoading } = useGetCallerCompanyPage();
  const createCompanyPage = useCreateCompanyPage();
  const updateCompanyPage = useUpdateCompanyPage();
  const uploadLogo = useUploadCompanyLogo();
  const uploadBanner = useUploadCompanyBanner();

  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  // Initialize form with existing company page data
  useEffect(() => {
    if (companyPage) {
      setCompanyName((companyPage as any).companyName || '');
      setDescription((companyPage as any).description || '');
      setLocation((companyPage as any).location || '');
      setWebsite((companyPage as any).website || '');
      if ((companyPage as any).logo) {
        setLogoPreview((companyPage as any).logo.getDirectURL());
      }
      if ((companyPage as any).banner) {
        setBannerPreview((companyPage as any).banner.getDirectURL());
      }
    }
  }, [companyPage]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    await uploadLogo.mutateAsync();
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setBannerPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    await uploadBanner.mutateAsync();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || !description || !location || !website) {
      alert('Please fill in all required fields');
      return;
    }

    if (companyPage) {
      await updateCompanyPage.mutateAsync();
    } else {
      await createCompanyPage.mutateAsync();
    }
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            Company Branding
          </h2>
          <p className="text-muted-foreground mt-1">
            Create and manage your company page with branding elements
          </p>
        </div>
      </div>

      {/* Feature Notice */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          The company branding feature is currently being implemented. This feature will be available soon.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Logo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Company Logo
            </CardTitle>
            <CardDescription>Upload your company logo (recommended: 200x200px)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {logoPreview && (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-border">
                <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setLogoPreview(null);
                    if (logoInputRef.current) logoInputRef.current.value = '';
                  }}
                  className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-4">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => logoInputRef.current?.click()}
                disabled={uploadLogo.isPending}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadLogo.isPending ? 'Uploading...' : 'Upload Logo'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Company Banner */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Company Banner
            </CardTitle>
            <CardDescription>Upload your company banner image (recommended: 800x300px)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bannerPreview && (
              <div className="relative w-full max-w-2xl h-48 rounded-lg overflow-hidden border-2 border-border">
                <img src={bannerPreview} alt="Company Banner" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setBannerPreview(null);
                    if (bannerInputRef.current) bannerInputRef.current.value = '';
                  }}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-4">
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="hidden"
                id="banner-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => bannerInputRef.current?.click()}
                disabled={uploadBanner.isPending}
              >
                <Upload className="h-4 w-4 mr-2" />
                {uploadBanner.isPending ? 'Uploading...' : 'Upload Banner'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Provide details about your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your company, mission, and values"
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., San Francisco, CA"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website *</Label>
              <Input
                id="website"
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.example.com"
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={createCompanyPage.isPending || updateCompanyPage.isPending}
          >
            {createCompanyPage.isPending || updateCompanyPage.isPending
              ? 'Saving...'
              : companyPage
              ? 'Update Company Page'
              : 'Create Company Page'}
          </Button>
        </div>
      </form>
    </div>
  );
}
