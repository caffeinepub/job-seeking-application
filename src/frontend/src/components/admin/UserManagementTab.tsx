import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users } from 'lucide-react';

export default function UserManagementTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <img src="/assets/generated/user-management-icon-transparent.dim_32x32.png" alt="" className="w-8 h-8" />
          User Management
        </h2>
        <p className="text-muted-foreground mt-1">
          Browse and manage all registered users on the platform
        </p>
      </div>

      <Alert>
        <Users className="h-4 w-4" />
        <AlertDescription>
          User Management features are being implemented. This tab will display user directory with search and filtering capabilities.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>Complete list of registered users with role-based filtering</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            User management functionality coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
