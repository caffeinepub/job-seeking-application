import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause } from 'lucide-react';

export default function SimulationMode() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            <CardTitle>Simulation Mode</CardTitle>
          </div>
          <CardDescription>Interactive demo of the platform workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Pause className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Simulation Mode Coming Soon</h3>
            <p className="text-muted-foreground max-w-md">
              Experience an interactive walkthrough of the complete hiring workflow from job posting to candidate selection.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
