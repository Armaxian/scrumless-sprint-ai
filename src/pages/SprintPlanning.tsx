import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { sprintService } from '@/lib/api';

// Mock data for the sprint planning page
const MOCK_SPRINT_DATA = {
  currentSprint: {
    id: 'sprint-25',
    name: 'Sprint 25',
    goal: 'Complete the integration with GitHub and improve dashboard performance',
    startDate: '2023-11-01',
    endDate: '2023-11-14',
    status: 'active',
    progress: 65,
    capacity: 75,
    allocated: 68,
  },
  upcomingSprint: {
    id: 'sprint-26',
    name: 'Sprint 26',
    startDate: '2023-11-15',
    endDate: '2023-11-28',
    capacity: 80,
    allocated: 0,
  },
  epics: [
    {
      id: 'epic-1',
      name: 'User Management',
      description: 'Improve user management experience and permissions system',
      stories: [
        {
          id: 'story-1',
          title: 'User roles and permissions',
          description: 'Implement a flexible role-based access control system',
          points: 8,
          status: 'backlog',
          assignee: null,
          aiSuggestion: true,
        },
        {
          id: 'story-2',
          title: 'User profile editing',
          description: 'Allow users to edit their profiles and preferences',
          points: 5,
          status: 'backlog',
          assignee: null,
          aiSuggestion: false,
        },
      ],
    },
    {
      id: 'epic-2',
      name: 'Integration Features',
      description: 'Add integrations with popular developer tools',
      stories: [
        {
          id: 'story-3',
          title: 'GitHub integration',
          description: 'Connect to GitHub repositories for tracking progress',
          points: 13,
          status: 'sprint',
          assignee: {
            id: 'user-1',
            name: 'Mike Chen',
            avatar: '',
          },
          aiSuggestion: false,
        },
        {
          id: 'story-4',
          title: 'Slack notifications',
          description: 'Send standup reminders and summaries to Slack',
          points: 8,
          status: 'sprint',
          assignee: {
            id: 'user-2',
            name: 'Rachel Singh',
            avatar: '',
          },
          aiSuggestion: false,
        },
        {
          id: 'story-5',
          title: 'Jira data import',
          description: 'Import existing projects and tickets from Jira',
          points: 13,
          status: 'backlog',
          assignee: null,
          aiSuggestion: true,
        },
      ],
    },
    {
      id: 'epic-3',
      name: 'Performance Improvements',
      description: 'Enhance application performance and responsiveness',
      stories: [
        {
          id: 'story-6',
          title: 'Dashboard optimization',
          description: 'Improve dashboard loading and rendering performance',
          points: 8,
          status: 'sprint',
          assignee: {
            id: 'user-3',
            name: 'Alex Johnson',
            avatar: '',
          },
          aiSuggestion: false,
        },
        {
          id: 'story-7',
          title: 'API response caching',
          description: 'Implement caching for frequently accessed API endpoints',
          points: 5,
          status: 'sprint',
          assignee: {
            id: 'user-4',
            name: 'Priya Patel',
            avatar: '',
          },
          aiSuggestion: false,
        },
      ],
    },
  ],
  suggestedStories: [
    {
      id: 'suggestion-1',
      epicId: 'epic-1',
      title: 'Password reset flow improvement',
      description: 'Enhance the password reset experience with clearer instructions and validation',
      points: 3,
      confidence: 'high',
    },
    {
      id: 'suggestion-2',
      epicId: 'epic-3',
      title: 'Image optimization pipeline',
      description: 'Create an automated process to optimize uploaded images for better performance',
      points: 5,
      confidence: 'medium',
    },
    {
      id: 'suggestion-3',
      epicId: 'epic-2',
      title: 'Google Calendar integration',
      description: 'Connect with Google Calendar to schedule meetings and sync events',
      points: 8,
      confidence: 'high',
    },
  ],
  team: [
    { id: 'user-1', name: 'Mike Chen', avatar: '', capacity: 15, allocated: 13 },
    { id: 'user-2', name: 'Rachel Singh', avatar: '', capacity: 15, allocated: 8 },
    { id: 'user-3', name: 'Alex Johnson', avatar: '', capacity: 15, allocated: 8 },
    { id: 'user-4', name: 'Priya Patel', avatar: '', capacity: 15, allocated: 5 },
    { id: 'user-5', name: 'Sam Roberts', avatar: '', capacity: 15, allocated: 0 },
  ],
};

const SprintPlanning = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(MOCK_SPRINT_DATA);
  const [activeTab, setActiveTab] = useState('current');
  const [teamFilter, setTeamFilter] = useState('all');

  useEffect(() => {
    const fetchSprintData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation this would be:
        // const response = await sprintService.getSprintPlanningData();
        // setData(response.data);
        
        // Simulate API delay
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast({
          title: "Error loading sprint data",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchSprintData();
  }, []);

  const handleAddToSprint = (storyId: string) => {
    setData(prevData => {
      // Find the story and update its status
      const updatedEpics = prevData.epics.map(epic => {
        const updatedStories = epic.stories.map(story => {
          if (story.id === storyId) {
            return { ...story, status: 'sprint' };
          }
          return story;
        });
        return { ...epic, stories: updatedStories };
      });
      
      // Update the allocated points
      const allocatedPoints = updatedEpics.reduce((total, epic) => {
        return total + epic.stories.reduce((epicTotal, story) => {
          return story.status === 'sprint' ? epicTotal + story.points : epicTotal;
        }, 0);
      }, 0);
      
      return {
        ...prevData,
        epics: updatedEpics,
        upcomingSprint: {
          ...prevData.upcomingSprint,
          allocated: allocatedPoints,
        },
      };
    });
    
    toast({
      title: "Added to sprint",
      description: "Story has been added to the upcoming sprint",
    });
  };

  const handleRemoveFromSprint = (storyId: string) => {
    setData(prevData => {
      // Find the story and update its status
      const updatedEpics = prevData.epics.map(epic => {
        const updatedStories = epic.stories.map(story => {
          if (story.id === storyId) {
            return { ...story, status: 'backlog', assignee: null };
          }
          return story;
        });
        return { ...epic, stories: updatedStories };
      });
      
      // Update the allocated points
      const allocatedPoints = updatedEpics.reduce((total, epic) => {
        return total + epic.stories.reduce((epicTotal, story) => {
          return story.status === 'sprint' ? epicTotal + story.points : epicTotal;
        }, 0);
      }, 0);
      
      return {
        ...prevData,
        epics: updatedEpics,
        upcomingSprint: {
          ...prevData.upcomingSprint,
          allocated: allocatedPoints,
        },
      };
    });
    
    toast({
      title: "Removed from sprint",
      description: "Story has been moved back to the backlog",
    });
  };

  const handleAssignStory = (storyId: string, userId: string) => {
    setData(prevData => {
      // Find the user
      const assignee = prevData.team.find(member => member.id === userId);
      
      // Find the story and update its assignee
      const updatedEpics = prevData.epics.map(epic => {
        const updatedStories = epic.stories.map(story => {
          if (story.id === storyId) {
            return { ...story, assignee: assignee || null };
          }
          return story;
        });
        return { ...epic, stories: updatedStories };
      });
      
      // Update team member allocations
      const updatedTeam = prevData.team.map(member => {
        if (member.id === userId) {
          // Find all stories assigned to this member
          const allocatedPoints = updatedEpics.reduce((total, epic) => {
            return total + epic.stories.reduce((epicTotal, story) => {
              return (story.assignee?.id === userId && story.status === 'sprint') 
                ? epicTotal + story.points 
                : epicTotal;
            }, 0);
          }, 0);
          
          return { ...member, allocated: allocatedPoints };
        }
        return member;
      });
      
      return {
        ...prevData,
        epics: updatedEpics,
        team: updatedTeam,
      };
    });
    
    toast({
      title: "Story assigned",
      description: "Team member has been assigned to the story",
    });
  };

  const handleAcceptSuggestion = (suggestionId: string) => {
    setData(prevData => {
      // Find the suggestion
      const suggestion = prevData.suggestedStories.find(s => s.id === suggestionId);
      
      if (!suggestion) return prevData;
      
      // Add the suggestion to its epic as a new story
      const updatedEpics = prevData.epics.map(epic => {
        if (epic.id === suggestion.epicId) {
          return {
            ...epic,
            stories: [
              ...epic.stories,
              {
                id: `story-${Date.now()}`,
                title: suggestion.title,
                description: suggestion.description,
                points: suggestion.points,
                status: 'backlog',
                assignee: null,
                aiSuggestion: true,
              },
            ],
          };
        }
        return epic;
      });
      
      // Remove the suggestion from the list
      const updatedSuggestions = prevData.suggestedStories.filter(s => s.id !== suggestionId);
      
      return {
        ...prevData,
        epics: updatedEpics,
        suggestedStories: updatedSuggestions,
      };
    });
    
    toast({
      title: "Suggestion accepted",
      description: "AI-suggested story has been added to the backlog",
    });
  };

  const getSprintStories = () => {
    return data.epics.flatMap(epic => 
      epic.stories.filter(story => story.status === 'sprint')
    );
  };
  
  const getBacklogStories = () => {
    return data.epics.flatMap(epic => 
      epic.stories.filter(story => story.status === 'backlog')
    );
  };

  const renderPointsBadge = (points: number) => {
    let bgColor = 'bg-gray-100 text-gray-700';
    
    if (points <= 3) {
      bgColor = 'bg-green-100 text-green-700';
    } else if (points <= 8) {
      bgColor = 'bg-yellow-100 text-yellow-700';
    } else {
      bgColor = 'bg-red-100 text-red-700';
    }
    
    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${bgColor}`}>
        {points} {points === 1 ? 'point' : 'points'}
      </span>
    );
  };

  const renderAssigneeDropdown = (story: any) => {
    return (
      <select
        className="rounded-md border border-border bg-background px-2 py-1 text-sm"
        value={story.assignee?.id || ''}
        onChange={(e) => handleAssignStory(story.id, e.target.value)}
      >
        <option value="">Unassigned</option>
        {data.team.map(member => (
          <option key={member.id} value={member.id}>
            {member.name} ({member.allocated}/{member.capacity})
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sprint Planning</h1>
          <p className="text-muted-foreground">
            Organize and prioritize work for upcoming sprints
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Sprint</TabsTrigger>
              <TabsTrigger value="planning">Sprint Planning</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <TabsContent value="current" className={activeTab === 'current' ? 'block' : 'hidden'}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{data.currentSprint.name}</CardTitle>
                    <CardDescription>{data.currentSprint.goal}</CardDescription>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {data.currentSprint.startDate} to {data.currentSprint.endDate}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">{data.currentSprint.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div 
                        className="h-2 rounded-full bg-teal-500" 
                        style={{ width: `${data.currentSprint.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Capacity</span>
                      <span className="text-sm text-muted-foreground">
                        {data.currentSprint.allocated}/{data.currentSprint.capacity} points
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div 
                        className="h-2 rounded-full bg-blue-500" 
                        style={{ width: `${(data.currentSprint.allocated / data.currentSprint.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sprint Stories</CardTitle>
                <CardDescription>Stories in the current sprint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getSprintStories().map(story => (
                    <div key={story.id} className="flex items-start justify-between rounded-lg border border-border p-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{story.title}</h4>
                          {renderPointsBadge(story.points)}
                          {story.aiSuggestion && (
                            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                              AI Suggested
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{story.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Assigned to:</span>
                          {story.assignee ? (
                            <span className="font-medium">{story.assignee.name}</span>
                          ) : (
                            <span className="text-yellow-500">Unassigned</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      )}

      <TabsContent value="planning" className={activeTab === 'planning' ? 'block' : 'hidden'}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{data.upcomingSprint.name}</CardTitle>
                  <CardDescription>Next sprint planning</CardDescription>
                </div>
                <div className="text-sm text-muted-foreground">
                  {data.upcomingSprint.startDate} to {data.upcomingSprint.endDate}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Capacity</span>
                    <span className="text-sm text-muted-foreground">
                      {data.upcomingSprint.allocated}/{data.upcomingSprint.capacity} points
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div 
                      className="h-2 rounded-full bg-blue-500" 
                      style={{ width: `${(data.upcomingSprint.allocated / data.upcomingSprint.capacity) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-3">Stories In Next Sprint</h3>
                    {getSprintStories().length === 0 ? (
                      <div className="text-center p-8 border border-dashed border-border rounded-lg">
                        <p className="text-muted-foreground">No stories added to the sprint yet.</p>
                        <p className="text-sm text-muted-foreground mt-1">Add stories from the backlog.</p>
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {getSprintStories().map(story => (
                          <div key={story.id} className="rounded-lg border border-border p-3">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{story.title}</h4>
                              {renderPointsBadge(story.points)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{story.description}</p>
                            <div className="flex items-center justify-between">
                              {renderAssigneeDropdown(story)}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveFromSprint(story.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Backlog</h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {getBacklogStories().map(story => (
                        <div key={story.id} className="rounded-lg border border-border p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{story.title}</h4>
                            {renderPointsBadge(story.points)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{story.description}</p>
                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddToSprint(story.id)}
                            >
                              Add to Sprint
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI-Suggested Stories</CardTitle>
              <CardDescription>
                Based on your team's velocity, commit history, and project roadmap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.suggestedStories.length === 0 ? (
                  <div className="text-center p-8 border border-dashed border-border rounded-lg">
                    <p className="text-muted-foreground">No story suggestions available.</p>
                  </div>
                ) : (
                  data.suggestedStories.map(suggestion => (
                    <div key={suggestion.id} className="rounded-lg border border-purple-200 bg-purple-50 dark:bg-purple-900/10 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{suggestion.title}</h4>
                            {renderPointsBadge(suggestion.points)}
                            <span className={`rounded-full px-2 py-1 text-xs font-medium
                              ${suggestion.confidence === 'high' 
                                ? 'bg-green-100 text-green-700' 
                                : suggestion.confidence === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                              {suggestion.confidence} confidence
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {suggestion.description}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-200 hover:bg-purple-100 text-purple-700"
                          onClick={() => handleAcceptSuggestion(suggestion.id)}
                        >
                          Accept
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Suggested for: {data.epics.find(e => e.id === suggestion.epicId)?.name}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
                Generate More Suggestions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </TabsContent>
    </div>
  );
};

export default SprintPlanning; 