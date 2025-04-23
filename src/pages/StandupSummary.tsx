import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { standupService } from '@/lib/api';

// Mock data - would come from API in real implementation
const MOCK_STANDUP_SUMMARY = {
  date: new Date().toLocaleDateString(),
  teams: [
    {
      id: '1',
      name: 'Frontend Team',
      attendanceCount: 5,
      totalCount: 5,
      meetingDuration: '4 minutes',
      timeSaved: '16 minutes',
      blockers: [
        {
          id: 'b1',
          description: 'API rate limits exceeded in development environment',
          reporter: 'Mike Chen',
          status: 'unresolved',
          priority: 'high',
          createdAt: '2 hours ago',
        },
      ],
      memberUpdates: [
        {
          id: 'm1',
          name: 'Rachel Singh',
          avatarUrl: '',
          yesterday: [
            'Completed the filter component redesign',
            'Fixed three accessibility issues on the dashboard',
          ],
          today: [
            'Start implementing the new chart components',
            'Review PRs for the navbar updates',
          ],
          blockers: [],
          commits: 7,
          pullRequests: 2,
        },
        {
          id: 'm2',
          name: 'Mike Chen',
          avatarUrl: '',
          yesterday: [
            'Finished user profile API integration',
            'Updated unit tests for authentication flow',
          ],
          today: [
            'Debug API rate limiting issues',
            'Start work on activity feed component',
          ],
          blockers: ['API rate limits exceeded in development environment'],
          commits: 5,
          pullRequests: 1,
        },
        {
          id: 'm3',
          name: 'Alex Johnson',
          avatarUrl: '',
          yesterday: [
            'Implemented dark mode toggle functionality',
            'Started work on responsive layouts for mobile',
          ],
          today: [
            'Complete responsive design implementation',
            'Fix banner component overflow issues',
          ],
          blockers: [],
          commits: 9,
          pullRequests: 0,
        },
        {
          id: 'm4',
          name: 'Priya Patel',
          avatarUrl: '',
          yesterday: [
            'Created documentation for component library',
            'Fixed search functionality bugs',
          ],
          today: [
            'Meet with design team for feedback',
            'Implement search result highlighting',
          ],
          blockers: [],
          commits: 3,
          pullRequests: 1,
        },
        {
          id: 'm5',
          name: 'Sam Roberts',
          avatarUrl: '',
          yesterday: [
            'Optimized image loading performance',
            'Added error tracking for API failures',
          ],
          today: [
            'Implement lazy loading for list views',
            'Update error handling documentation',
          ],
          blockers: [],
          commits: 6,
          pullRequests: 1,
        },
      ],
    },
  ],
};

const StandupSummary = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [standupData, setStandupData] = useState(MOCK_STANDUP_SUMMARY);
  const [selectedTeam, setSelectedTeam] = useState('1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Simulated API call to fetch standup data
  useEffect(() => {
    const fetchStandupData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation this would be:
        // const response = await standupService.getStandupSummary(selectedTeam, selectedDate);
        // setStandupData(response.data);
        
        // Simulate API delay
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast({
          title: "Error loading standup data",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchStandupData();
  }, [selectedTeam, selectedDate]);

  const activeTeam = standupData.teams.find(team => team.id === selectedTeam);

  const handleTriggerStandup = async () => {
    try {
      setLoading(true);
      
      // In a real implementation this would be:
      // await standupService.triggerStandup(selectedTeam);
      
      toast({
        title: "Standup triggered",
        description: "Team members will be notified to submit their updates.",
      });
      
      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error triggering standup",
        description: "Please try again later",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleResolveBlocker = async (blockerId: string) => {
    try {
      // In a real implementation this would be:
      // await standupService.resolveBlocker(selectedTeam, blockerId, { resolution: 'Resolved via dashboard' });
      
      toast({
        title: "Blocker marked as resolved",
        description: "The team will be notified.",
      });
      
      // Update local state to reflect resolved blocker
      setStandupData(prev => ({
        ...prev,
        teams: prev.teams.map(team => 
          team.id === selectedTeam 
            ? {
                ...team,
                blockers: team.blockers.filter(blocker => blocker.id !== blockerId)
              }
            : team
        )
      }));
    } catch (error) {
      toast({
        title: "Error resolving blocker",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Standup Summary</h1>
          <p className="text-muted-foreground">
            Daily team updates and progress tracking
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
          <select
            className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            {standupData.teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium"
          />
          <Button
            size="sm"
            className="bg-teal-500 text-black hover:bg-teal-400"
            onClick={handleTriggerStandup}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M12 2v4" />
              <path d="M12 18v4" />
              <path d="m4.93 4.93 2.83 2.83" />
              <path d="m16.24 16.24 2.83 2.83" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
              <path d="m4.93 19.07 2.83-2.83" />
              <path d="m16.24 7.76 2.83-2.83" />
            </svg>
            Trigger New Standup
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        activeTeam && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {activeTeam.attendanceCount}/{activeTeam.totalCount}
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div 
                      className="h-2 rounded-full bg-teal-500" 
                      style={{ width: `${(activeTeam.attendanceCount / activeTeam.totalCount) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground pt-2">
                    {activeTeam.attendanceCount} team members participated
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Meeting Duration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeTeam.meetingDuration}</div>
                  <p className="text-xs text-muted-foreground pt-2">
                    Saved approximately {activeTeam.timeSaved} compared to a traditional standup
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Blockers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeTeam.blockers.length}</div>
                  <p className="text-xs text-muted-foreground pt-2">
                    {activeTeam.blockers.length === 0 
                      ? "No blockers reported today" 
                      : activeTeam.blockers.length === 1 
                        ? "1 blocker needs attention" 
                        : `${activeTeam.blockers.length} blockers need attention`}
                  </p>
                </CardContent>
              </Card>
            </div>

            {activeTeam.blockers.length > 0 && (
              <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
                <CardHeader>
                  <CardTitle className="text-red-600 dark:text-red-400">Blockers Requiring Attention</CardTitle>
                  <CardDescription>Issues that need to be resolved to maintain team velocity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeTeam.blockers.map((blocker) => (
                      <div key={blocker.id} className="flex items-start justify-between rounded-lg border border-red-200 bg-background p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-red-500"></span>
                            <p className="font-medium">{blocker.description}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Reported by {blocker.reporter} • {blocker.createdAt}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50"
                          onClick={() => handleResolveBlocker(blocker.id)}
                        >
                          Mark Resolved
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Team Member Updates</CardTitle>
                <CardDescription>What everyone is working on today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeTeam.memberUpdates.map((member) => (
                    <div key={member.id} className="rounded-lg border border-border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium text-muted-foreground">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span className="flex items-center gap-1 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m12 19-7-7 7-7" />
                                  <path d="M19 12H5" />
                                </svg>
                                {member.commits} commits
                              </span>
                              <span className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="18" cy="18" r="3" />
                                  <circle cx="6" cy="6" r="3" />
                                  <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                                  <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                                </svg>
                                {member.pullRequests} PRs
                              </span>
                            </div>
                          </div>
                        </div>
                        {member.blockers.length > 0 && (
                          <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
                            Has blockers
                          </div>
                        )}
                      </div>
                      <Tabs defaultValue="today">
                        <TabsList className="mb-2">
                          <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
                          <TabsTrigger value="today">Today</TabsTrigger>
                        </TabsList>
                        <TabsContent value="yesterday" className="mt-0">
                          <ul className="space-y-1 text-sm list-disc pl-5">
                            {member.yesterday.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </TabsContent>
                        <TabsContent value="today" className="mt-0">
                          <ul className="space-y-1 text-sm list-disc pl-5">
                            {member.today.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  Standup summary automatically generated at 9:30 AM today from GitHub, Jira, and Slack activity.
                </p>
              </CardFooter>
            </Card>
          </div>
        )
      )}
    </div>
  );
};

export default StandupSummary; 