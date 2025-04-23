import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/authContext';
import { metricsService, standupService, sprintService } from '@/lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data - would come from API in real implementation
const MOCK_METRICS = {
  velocityData: [
    { sprint: 'Sprint 1', planned: 45, completed: 38 },
    { sprint: 'Sprint 2', planned: 50, completed: 42 },
    { sprint: 'Sprint 3', planned: 55, completed: 52 },
    { sprint: 'Sprint 4', planned: 60, completed: 56 },
    { sprint: 'Sprint 5', planned: 60, completed: 59 },
  ],
  burndownData: [
    { day: 1, remaining: 55, ideal: 55 },
    { day: 2, remaining: 51, ideal: 50 },
    { day: 3, remaining: 48, ideal: 45 },
    { day: 4, remaining: 45, ideal: 40 },
    { day: 5, remaining: 40, ideal: 35 },
    { day: 6, remaining: 35, ideal: 30 },
    { day: 7, remaining: 32, ideal: 25 },
    { day: 8, remaining: 28, ideal: 20 },
    { day: 9, remaining: 22, ideal: 15 },
    { day: 10, remaining: 15, ideal: 10 },
  ],
  blockersCount: 3,
  sprintProgress: 65,
  blockerResolutionTime: '2.3 days'
};

const MOCK_ACTIVITY = [
  { id: 1, message: "Daily standup summary generated", time: "1 hour ago", type: "standup" },
  { id: 2, message: "Rachel S. completed 'Add filtering to reports' task", time: "2 hours ago", type: "task" },
  { id: 3, message: "Blocker identified: 'API rate limits exceeded'", time: "3 hours ago", type: "blocker" },
  { id: 4, message: "Alex resolved blocker: 'Missing dev credentials'", time: "5 hours ago", type: "resolved" },
  { id: 5, message: "Sprint planning suggestions generated", time: "1 day ago", type: "sprint" },
  { id: 6, message: "Added GitHub integration for 'frontend-team'", time: "1 day ago", type: "integration" },
];

const MOCK_TEAMS = [
  { id: '1', name: 'Frontend Team', members: 5 },
  { id: '2', name: 'Backend Team', members: 6 },
  { id: '3', name: 'DevOps Team', members: 3 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(MOCK_METRICS);
  const [activities, setActivities] = useState(MOCK_ACTIVITY);
  const [teams, setTeams] = useState(MOCK_TEAMS);
  const [selectedTeam, setSelectedTeam] = useState('1');
  const [timeRange, setTimeRange] = useState('sprint');

  // Simulate data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, these would be API calls:
        // const metricsData = await metricsService.getTeamMetrics(selectedTeam, timeRange);
        // const standupData = await standupService.getStandupSummary(selectedTeam);
        // etc.
        
        // Simulate API delay
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        toast({
          title: "Error loading dashboard data",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [selectedTeam, timeRange]);

  // Function to get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'standup':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          </div>
        );
      case 'task':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
          </div>
        );
      case 'blocker':
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
          </div>
        );
      case 'resolved':
        return (
          <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
          </div>
        );
      case 'sprint':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14" /><path d="M5 2h14" /><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" /><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" /></svg>
          </div>
        );
      case 'integration':
        return (
          <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.8 5.4A1.5 1.5 0 1 1 5.8 7" /><path d="M3.5 20.5A1.5 1.5 0 1 0 5.5 19" /><path d="M20.2 18.6A1.5 1.5 0 1 1 18.2 17" /><path d="M20.5 3.5A1.5 1.5 0 1 0 18.5 5" /><path d="m6 12 6-3v6l6-3" /></svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'teammate'}!
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
          <select
            className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            Refresh
          </Button>
          <Button size="sm" className="bg-teal-500 text-black hover:bg-teal-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
              <path d="M13 13h4" />
              <path d="M13 17h4" />
              <path d="M9 13h.01" />
              <path d="M9 17h.01" />
            </svg>
            Start Standup
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sprint Progress</CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.sprintProgress}%</div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div 
                    className="h-2 rounded-full bg-teal-500" 
                    style={{ width: `${metrics.sprintProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  9 out of 14 days completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Blockers
                </CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.blockersCount}</div>
                <p className="text-xs text-muted-foreground pt-2">
                  Avg. resolution time: {metrics.blockerResolutionTime}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sprint Velocity
                </CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">59</div>
                <p className="text-xs text-muted-foreground pt-2">
                  +12% from last sprint
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Meeting Time Saved
                </CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.5 hrs</div>
                <p className="text-xs text-muted-foreground pt-2">
                  This week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Team Activity</CardTitle>
                <CardDescription>
                  Recent events and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-start gap-4 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
                    >
                      {getActivityIcon(activity.type)}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.message}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <Tabs defaultValue="velocity">
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle>Sprint Metrics</CardTitle>
                    <TabsList>
                      <TabsTrigger value="velocity">Velocity</TabsTrigger>
                      <TabsTrigger value="burndown">Burndown</TabsTrigger>
                    </TabsList>
                  </div>
                  <CardDescription>
                    Track your team's performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="velocity" className="mt-2 h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={metrics.velocityData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="sprint" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="planned" fill="#94a3b8" name="Planned" />
                        <Bar dataKey="completed" fill="#14b8a6" name="Completed" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="burndown" className="mt-2 h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={metrics.burndownData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="remaining" stroke="#14b8a6" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
                        <Line type="monotone" dataKey="ideal" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={false} name="Ideal" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 