import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { retroService } from '@/lib/api';

// Mock data for the retrospective page
const MOCK_RETRO_DATA = {
  sprints: [
    { id: 'sprint-24', name: 'Sprint 24', status: 'completed', startDate: '2023-10-18', endDate: '2023-10-31' },
    { id: 'sprint-23', name: 'Sprint 23', status: 'completed', startDate: '2023-10-04', endDate: '2023-10-17' },
    { id: 'sprint-22', name: 'Sprint 22', status: 'completed', startDate: '2023-09-20', endDate: '2023-10-03' },
  ],
  currentRetro: {
    sprintId: 'sprint-24',
    sprintName: 'Sprint 24',
    status: 'active',
    generatedAt: '2023-11-01T09:30:00Z',
    velocityChange: '+12%',
    completionRate: '92%',
    averageCycleTime: '2.3 days',
    wentWell: [
      {
        id: 'ww-1',
        text: 'GitHub integration was completed ahead of schedule',
        sentiment: 'positive',
        votes: 5,
        source: 'ai',
        comments: [
          { id: 'c-1', text: 'Great work by Mike and the team!', author: 'Rachel Singh' },
        ],
      },
      {
        id: 'ww-2',
        text: 'Cross-team collaboration on the API design went smoothly',
        sentiment: 'positive',
        votes: 4,
        source: 'ai',
        comments: [],
      },
      {
        id: 'ww-3',
        text: 'New standup bot saved significant time in daily meetings',
        sentiment: 'positive',
        votes: 3,
        source: 'human',
        comments: [
          { id: 'c-2', text: 'We should share this approach with other teams', author: 'Alex Johnson' },
        ],
      },
    ],
    needsImprovement: [
      {
        id: 'ni-1',
        text: 'Too many interruptions from support issues',
        sentiment: 'negative',
        votes: 6,
        source: 'ai',
        comments: [
          { id: 'c-3', text: 'We need a better rotation system for handling support', author: 'Mike Chen' },
        ],
      },
      {
        id: 'ni-2',
        text: 'Stories were not well-defined at the start of sprint',
        sentiment: 'negative',
        votes: 4,
        source: 'ai',
        comments: [],
      },
      {
        id: 'ni-3',
        text: 'Some PRs waited too long for review',
        sentiment: 'negative',
        votes: 3,
        source: 'human',
        comments: [
          { id: 'c-4', text: 'Maybe we need a "review buddies" system?', author: 'Priya Patel' },
        ],
      },
    ],
    actionItems: [
      {
        id: 'action-1',
        text: 'Implement support rotation schedule',
        status: 'open',
        assignee: 'Rachel Singh',
        source: 'ai',
      },
      {
        id: 'action-2',
        text: 'Create PR review SLA (24hr max wait time)',
        status: 'open',
        assignee: 'Alex Johnson',
        source: 'human',
      },
      {
        id: 'action-3',
        text: 'Improve story refinement process with clearer acceptance criteria',
        status: 'open',
        assignee: 'Mike Chen',
        source: 'ai',
      },
    ],
  },
  retroHistory: [
    {
      sprintId: 'sprint-23',
      sprintName: 'Sprint 23',
      summary: 'Good improvement in velocity but issues with environment stability',
      completionRate: '85%',
      actionItemsCompleted: '4/5',
    },
    {
      sprintId: 'sprint-22',
      sprintName: 'Sprint 22',
      summary: 'New team members onboarded successfully but sprint planning needs work',
      completionRate: '78%',
      actionItemsCompleted: '3/4',
    },
  ],
};

const Retrospective = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(MOCK_RETRO_DATA);
  const [selectedSprint, setSelectedSprint] = useState(MOCK_RETRO_DATA.currentRetro.sprintId);
  const [newComment, setNewComment] = useState('');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [newActionItem, setNewActionItem] = useState('');
  const [newActionAssignee, setNewActionAssignee] = useState('');

  useEffect(() => {
    const fetchRetroData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation this would be:
        // const response = await retroService.getRetroData(selectedSprint);
        // setData(response.data);
        
        // Simulate API delay
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast({
          title: "Error loading retrospective data",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchRetroData();
  }, [selectedSprint]);

  const handleGenerateRetro = async () => {
    try {
      setLoading(true);
      toast({
        title: "Generating retrospective",
        description: "Processing sprint data and team feedback...",
      });
      
      // In a real implementation this would be:
      // await retroService.generateRetroSummary(selectedSprint);
      
      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
        toast({
          title: "Retrospective generated",
          description: "The AI has analyzed your sprint and provided insights.",
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Error generating retrospective",
        description: "Please try again later",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleVote = (id: string, category: 'wentWell' | 'needsImprovement') => {
    setData(prevData => {
      const items = [...prevData.currentRetro[category]];
      const index = items.findIndex(item => item.id === id);
      
      if (index !== -1) {
        items[index] = { ...items[index], votes: items[index].votes + 1 };
      }
      
      return {
        ...prevData,
        currentRetro: {
          ...prevData.currentRetro,
          [category]: items,
        },
      };
    });
  };

  const handleAddComment = (itemId: string, category: 'wentWell' | 'needsImprovement') => {
    if (!newComment.trim()) return;
    
    setData(prevData => {
      const items = [...prevData.currentRetro[category]];
      const index = items.findIndex(item => item.id === itemId);
      
      if (index !== -1) {
        const newCommentObj = {
          id: `c-${Date.now()}`,
          text: newComment,
          author: 'You', // In a real app, this would be the logged-in user
        };
        
        items[index] = {
          ...items[index],
          comments: [...items[index].comments, newCommentObj],
        };
      }
      
      return {
        ...prevData,
        currentRetro: {
          ...prevData.currentRetro,
          [category]: items,
        },
      };
    });
    
    setNewComment('');
    setCommentingOn(null);
  };

  const handleAddActionItem = () => {
    if (!newActionItem.trim()) return;
    
    setData(prevData => {
      const newAction = {
        id: `action-${Date.now()}`,
        text: newActionItem,
        status: 'open',
        assignee: newActionAssignee || 'Unassigned',
        source: 'human',
      };
      
      return {
        ...prevData,
        currentRetro: {
          ...prevData.currentRetro,
          actionItems: [...prevData.currentRetro.actionItems, newAction],
        },
      };
    });
    
    toast({
      title: "Action item added",
      description: "New action item has been added to the list",
    });
    
    setNewActionItem('');
    setNewActionAssignee('');
  };

  const handleCompleteActionItem = (actionId: string) => {
    setData(prevData => {
      const actions = [...prevData.currentRetro.actionItems];
      const index = actions.findIndex(action => action.id === actionId);
      
      if (index !== -1) {
        actions[index] = { ...actions[index], status: 'completed' };
      }
      
      return {
        ...prevData,
        currentRetro: {
          ...prevData.currentRetro,
          actionItems: actions,
        },
      };
    });
    
    toast({
      title: "Action item completed",
      description: "The action item has been marked as completed",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Retrospective</h1>
          <p className="text-muted-foreground">
            Reflect on past sprints and identify improvements
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <select
            className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium"
            value={selectedSprint}
            onChange={(e) => setSelectedSprint(e.target.value)}
          >
            {data.sprints.map((sprint) => (
              <option key={sprint.id} value={sprint.id}>
                {sprint.name} ({sprint.startDate.substring(5)} - {sprint.endDate.substring(5)})
              </option>
            ))}
          </select>
          <Button
            size="sm"
            className="bg-teal-500 text-black hover:bg-teal-400"
            onClick={handleGenerateRetro}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M12 3v3" />
              <path d="M18.5 8.5 16 11" />
              <path d="M8 12H5" />
              <path d="M8.5 18.5 11 16" />
              <path d="M12 19v3" />
              <path d="M18.5 15.5 16 13" />
              <path d="M19 12h3" />
              <path d="M8.5 5.5 11 8" />
            </svg>
            {data.currentRetro ? "Regenerate" : "Generate"} Retro
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{data.currentRetro.sprintName} Summary</CardTitle>
                  <CardDescription>
                    Generated {new Date(data.currentRetro.generatedAt).toLocaleString()}
                  </CardDescription>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-500">{data.currentRetro.completionRate}</div>
                    <div className="text-xs text-muted-foreground">Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-500">{data.currentRetro.velocityChange}</div>
                    <div className="text-xs text-muted-foreground">Velocity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{data.currentRetro.averageCycleTime}</div>
                    <div className="text-xs text-muted-foreground">Cycle Time</div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="bg-green-50 dark:bg-green-900/10 border-b border-green-100">
                <CardTitle className="text-green-700 dark:text-green-400">What Went Well</CardTitle>
                <CardDescription>Positive aspects from the sprint</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {data.currentRetro.wentWell.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          <button 
                            className="mt-1 flex flex-col items-center text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => handleVote(item.id, 'wentWell')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m12 19-7-7 7-7" />
                              <path d="M5 12h14" />
                            </svg>
                            <span>{item.votes}</span>
                          </button>
                          <div>
                            <p className="font-medium">
                              {item.text}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {item.source === 'ai' && (
                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                                  AI Detected
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {item.comments.length > 0 && (
                        <div className="ml-9 mt-3 space-y-2">
                          {item.comments.map((comment) => (
                            <div key={comment.id} className="rounded-lg bg-muted p-2 text-sm">
                              <p>{comment.text}</p>
                              <p className="text-xs text-muted-foreground mt-1">— {comment.author}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {commentingOn === item.id ? (
                        <div className="ml-9 mt-3">
                          <textarea
                            className="w-full rounded-md border border-border bg-background p-2 text-sm resize-none"
                            placeholder="Add your comment..."
                            rows={2}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setCommentingOn(null);
                                setNewComment('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleAddComment(item.id, 'wentWell')}
                            >
                              Comment
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="ml-9 mt-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setCommentingOn(item.id)}
                        >
                          Add comment...
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="bg-red-50 dark:bg-red-900/10 border-b border-red-100">
                <CardTitle className="text-red-700 dark:text-red-400">Needs Improvement</CardTitle>
                <CardDescription>Areas where we can do better</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {data.currentRetro.needsImprovement.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          <button 
                            className="mt-1 flex flex-col items-center text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => handleVote(item.id, 'needsImprovement')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m12 19-7-7 7-7" />
                              <path d="M5 12h14" />
                            </svg>
                            <span>{item.votes}</span>
                          </button>
                          <div>
                            <p className="font-medium">
                              {item.text}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {item.source === 'ai' && (
                                <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                                  AI Detected
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {item.comments.length > 0 && (
                        <div className="ml-9 mt-3 space-y-2">
                          {item.comments.map((comment) => (
                            <div key={comment.id} className="rounded-lg bg-muted p-2 text-sm">
                              <p>{comment.text}</p>
                              <p className="text-xs text-muted-foreground mt-1">— {comment.author}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {commentingOn === item.id ? (
                        <div className="ml-9 mt-3">
                          <textarea
                            className="w-full rounded-md border border-border bg-background p-2 text-sm resize-none"
                            placeholder="Add your comment..."
                            rows={2}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setCommentingOn(null);
                                setNewComment('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleAddComment(item.id, 'needsImprovement')}
                            >
                              Comment
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="ml-9 mt-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setCommentingOn(item.id)}
                        >
                          Add comment...
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
              <CardDescription>Follow-up tasks to address feedback</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {data.currentRetro.actionItems.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={action.status === 'completed'}
                        onChange={() => action.status !== 'completed' && handleCompleteActionItem(action.id)}
                        className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <div>
                        <p className={`font-medium ${action.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                          {action.text}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>Assigned to: {action.assignee}</span>
                          {action.source === 'ai' && (
                            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                              AI Suggested
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {action.status !== 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCompleteActionItem(action.id)}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                ))}
                
                <div className="p-4">
                  <h3 className="text-sm font-medium mb-2">Add New Action Item</h3>
                  <div className="space-y-3">
                    <textarea
                      className="w-full rounded-md border border-border bg-background p-2 text-sm resize-none"
                      placeholder="Describe the action item..."
                      rows={2}
                      value={newActionItem}
                      onChange={(e) => setNewActionItem(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full rounded-md border border-border bg-background p-2 text-sm"
                      placeholder="Assignee name"
                      value={newActionAssignee}
                      onChange={(e) => setNewActionAssignee(e.target.value)}
                    />
                    <Button onClick={handleAddActionItem}>
                      Add Action Item
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Previous Retrospectives</CardTitle>
              <CardDescription>History of past sprint reflections</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {data.retroHistory.map((retro) => (
                  <div key={retro.sprintId} className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{retro.sprintName}</h3>
                      <div className="flex items-center gap-3">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Completion: </span>
                          <span className="font-medium">{retro.completionRate}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Actions: </span>
                          <span className="font-medium">{retro.actionItemsCompleted}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {retro.summary}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Retrospective; 