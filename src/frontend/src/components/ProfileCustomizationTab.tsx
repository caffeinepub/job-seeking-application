import { useState, useRef, useEffect } from 'react';
import { useGetCallerUserProfile, useUpdateProfileCustomization } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, Upload, Loader2, X, AlertCircle } from 'lucide-react';
import { ExternalBlob } from '../backend';
import type { ProfileCustomization } from '../backend';

export default function ProfileCustomizationTab() {
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const updateCustomization = useUpdateProfileCustomization();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [profilePictureBlob, setProfilePictureBlob] = useState<ExternalBlob | undefined>(undefined);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile?.customization) {
      setBio(userProfile.customization.bio || '');
      setEmail(userProfile.customization.contactInfo.email || '');
      setPhone(userProfile.customization.contactInfo.phone || '');
      
      if (userProfile.customization.profilePicture) {
        const url = userProfile.customization.profilePicture.getDirectURL();
        setProfilePictureUrl(url);
        setProfilePictureBlob(userProfile.customization.profilePicture);
      } else {
        // Clear state when no picture is returned from backend
        setProfilePictureUrl(null);
        setProfilePictureBlob(undefined);
      }
    }
  }, [userProfile]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValidationError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setValidationError('Please select an image file (JPG, PNG, GIF, etc.)');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setValidationError('Image size must be less than 5MB. Please choose a smaller image.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      setProfilePictureBlob(blob);
      const url = blob.getDirectURL();
      setProfilePictureUrl(url);
    } catch (error) {
      console.error('Failed to upload image:', error);
      setValidationError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePictureUrl(null);
    setProfilePictureBlob(undefined);
    setValidationError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updates: ProfileCustomization = {
      bio: bio.trim(),
      contactInfo: {
        email: email.trim(),
        phone: phone.trim(),
      },
      profilePicture: profilePictureBlob,
    };

    updateCustomization.mutate(updates);
  };

  const getUserInitials = () => {
    if (!userProfile) return 'U';
    return userProfile.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Customize Profile</h2>
        <p className="text-muted-foreground">Update your profile picture, bio, and contact information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Customization</CardTitle>
          <CardDescription>Make your profile stand out with a photo and personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="space-y-4">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  {profilePictureUrl ? (
                    <AvatarImage src={profilePictureUrl} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {getUserInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading || updateCustomization.isPending}
                      className="flex-1 sm:flex-none"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading... {uploadProgress}%
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          {profilePictureUrl ? 'Change Photo' : 'Upload Photo'}
                        </>
                      )}
                    </Button>
                    {profilePictureUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleRemovePhoto}
                        disabled={isUploading || updateCustomization.isPending}
                        className="flex-shrink-0"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommended: Square image, max 5MB (JPG, PNG, GIF)
                  </p>
                  {validationError && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio / Summary</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself, your experience, and what makes you unique..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">{bio.length}/500 characters</p>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={updateCustomization.isPending || isUploading}
            >
              {updateCustomization.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
