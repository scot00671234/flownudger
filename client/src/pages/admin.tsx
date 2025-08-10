import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Users, Calendar } from "lucide-react";
import { format } from "date-fns";

interface WaitlistSignup {
  id: number;
  email: string;
  createdAt: string;
}

export default function Admin() {
  const { data: signupsData, isLoading } = useQuery<{ signups: WaitlistSignup[] }>({
    queryKey: ["/api/admin/waitlist"],
  });

  const signups = signupsData?.signups || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading waitlist data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Flow Admin Dashboard</h1>
          <p className="text-slate-600">Manage your waitlist signups</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Signups</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-signups">
                {signups.length}
              </div>
              <p className="text-xs text-muted-foreground">
                people on the waitlist
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Signups</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {signups.filter(signup => {
                  const signupDate = new Date(signup.createdAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return signupDate >= weekAgo;
                }).length}
              </div>
              <p className="text-xs text-muted-foreground">
                in the past week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest Signup</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {signups.length > 0 ? format(new Date(signups[signups.length - 1].createdAt), 'MMM dd') : 'None'}
              </div>
              <p className="text-xs text-muted-foreground">
                most recent signup
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Waitlist Signups</CardTitle>
            <p className="text-sm text-muted-foreground">
              All email addresses that have joined the waitlist
            </p>
          </CardHeader>
          <CardContent>
            {signups.length === 0 ? (
              <div className="text-center py-8">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No signups yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {signups.map((signup, index) => (
                  <div 
                    key={signup.id} 
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    data-testid={`signup-item-${index}`}
                  >
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">#{signup.id}</Badge>
                      <div>
                        <p className="font-medium" data-testid={`email-${index}`}>
                          {signup.email}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Joined {format(new Date(signup.createdAt), 'PPP')}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {format(new Date(signup.createdAt), 'MMM dd, yyyy')}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}