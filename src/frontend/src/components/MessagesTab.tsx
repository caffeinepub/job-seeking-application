import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Mail } from 'lucide-react';

export default function MessagesTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <CardTitle>Messages</CardTitle>
          </div>
          <CardDescription>Communicate with employers and candidates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Mail className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Messaging System Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Direct messaging between employers and candidates will be available soon for seamless communication.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
