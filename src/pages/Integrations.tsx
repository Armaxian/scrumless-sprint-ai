import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { integrationService } from '@/lib/api';

// Mock data for integrations
const MOCK_INTEGRATION_DATA = {
  activeIntegrations: [
    {
      id: 'integration-1',
      type: 'github',
      name: 'GitHub',
      connectedAt: '2023-10-15T10:30:00Z',
      status: 'connected',
      details: {
        organization: 'scrumless-ai',
        repositories: [
          { name: 'frontend-app', status: 'synced', lastSync: '2023-10-30T14:20:00Z' },
          { name: 'backend-api', status: 'synced', lastSync: '2023-10-30T14:20:00Z' },
          { name: 'devops-tools', status: 'synced', lastSync: '2023-10-30T14:20:00Z' },
        ],
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      id: 'integration-2',
      type: 'slack',
      name: 'Slack',
      connectedAt: '2023-10-18T09:15:00Z',
      status: 'connected',
      details: {
        workspace: 'scrumless-ai',
        channels: [
          { name: '#frontend-team', status: 'active' },
          { name: '#backend-team', status: 'active' },
          { name: '#general', status: 'inactive' },
        ],
      },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2c-1.1 0-2 .9-2 2v4.5c0 1.1.9 2 2 2h4.5c1.1 0 2-.9 2-2v-4.5c0-1.1-.9-2-2-2h-4.5z" />
          <path d="M5 14.5c0-1.1.9-2 2-2h4.5c1.1 0 2 .9 2 2v4.5c0 1.1-.9 2-2 2h-4.5c-1.1 0-2-.9-2-2v-4.5z" />
          <path d="M16 14.5c-.5-.89-1.65-1.5-2.91-1.5h-4.18c-1.26 0-2.41.61-2.91 1.5" />
          <path d="M8 5c.89-.5 1.5-1.65 1.5-2.91v-4.18c0-1.26-.61-2.41-1.5-2.91" />
        </svg>
      ),
    },
  ],
  availableIntegrations: [
    {
      id: 'integration-3',
      type: 'jira',
      name: 'Jira',
      description: 'Connect to Jira for issue tracking and project management',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-8 8 8 8 8-8z" />
          <path d="M20 7 9 18" />
          <path d="m4 11 9 9" />
        </svg>
      ),
    },
    {
      id: 'integration-4',
      type: 'confluence',
      name: 'Confluence',
      description: 'Connect to Confluence for documentation and knowledge sharing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.125 17c3.125-3.75 6.25-7.5 9.375-11.25M21.875 7C18.75 10.75 15.625 14.5 12.5 18.25" />
        </svg>
      ),
    },
    {
      id: 'integration-5',
      type: 'teams',
      name: 'Microsoft Teams',
      description: 'Connect to Microsoft Teams for communication and collaboration',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <rect width="3" height="8" x="7" y="7" />
          <rect width="3" height="14" x="14" y="7" />
        </svg>
      ),
    },
    {
      id: 'integration-6',
      type: 'gitlab',
      name: 'GitLab',
      description: 'Connect to GitLab for code repositories and CI/CD',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" />
        </svg>
      ),
    },
    {
      id: 'integration-7',
      type: 'google-calendar',
      name: 'Google Calendar',
      description: 'Connect to Google Calendar for meeting scheduling and reminders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      ),
    },
  ],
  recentActivity: [
    { id: 'activity-1', message: 'GitHub integration synced 3 repositories', timestamp: '2023-10-30T14:20:00Z' },
    { id: 'activity-2', message: 'Daily standup reminders sent to Slack channels', timestamp: '2023-10-30T09:00:00Z' },
    { id: 'activity-3', message: 'Microsoft Teams integration disconnected', timestamp: '2023-10-29T16:45:00Z' },
    { id: 'activity-4', message: 'Jira connection attempt failed', timestamp: '2023-10-28T11:30:00Z' },
  ],
};

const Integrations = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(MOCK_INTEGRATION_DATA);
  const [connecting, setConnecting] = useState(false);
  const [syncingIntegration, setSyncingIntegration] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntegrationData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation this would be:
        // const response = await integrationService.getIntegrations();
        // setData(response.data);
        
        // Simulate API delay
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast({
          title: "Error loading integrations",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchIntegrationData();
  }, []);

  const handleConnect = async (integrationType: string) => {
    try {
      setConnecting(true);
      
      // In a real implementation, this would typically redirect to OAuth flow
      // For demo purposes, we'll simulate success after a delay
      // await integrationService.connectIntegration(integrationType);
      
      toast({
        title: "Redirecting to authorization",
        description: `You'll be redirected to authorize ${integrationType}`,
      });
      
      // Simulate the OAuth flow completing
      setTimeout(() => {
        // Find the integration to "connect"
        const integration = data.availableIntegrations.find(i => i.type === integrationType);
        
        if (integration) {
          // Update state to reflect the new connection
          setData(prevData => ({
            ...prevData,
            activeIntegrations: [
              ...prevData.activeIntegrations,
              {
                id: `new-${integrationType}-${Date.now()}`,
                type: integrationType,
                name: integration.name,
                connectedAt: new Date().toISOString(),
                status: 'connected',
                details: {
                  // Mock details based on integration type
                  organization: integrationType === 'github' ? 'scrumless-ai' : undefined,
                  workspace: integrationType === 'slack' ? 'scrumless-ai' : undefined,
                  repositories: integrationType === 'github' ? [{ name: 'example-repo', status: 'synced', lastSync: new Date().toISOString() }] : undefined,
                  channels: integrationType === 'slack' ? [{ name: '#general', status: 'active' }] : undefined,
                },
                icon: integration.icon,
              },
            ],
            availableIntegrations: prevData.availableIntegrations.filter(i => i.type !== integrationType),
          }));
          
          toast({
            title: "Integration connected",
            description: `Successfully connected to ${integration.name}`,
          });
        }
        
        setConnecting(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Could not connect to the service. Please try again.",
        variant: "destructive",
      });
      setConnecting(false);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    try {
      // In a real implementation this would be:
      // await integrationService.disconnectIntegration(integrationId);
      
      // Find the integration to disconnect
      const integration = data.activeIntegrations.find(i => i.id === integrationId);
      
      if (integration) {
        // Update state to reflect the disconnection
        setData(prevData => ({
          ...prevData,
          activeIntegrations: prevData.activeIntegrations.filter(i => i.id !== integrationId),
          availableIntegrations: [
            ...prevData.availableIntegrations,
            {
              id: `available-${integration.type}-${Date.now()}`,
              type: integration.type,
              name: integration.name,
              description: `Connect to ${integration.name} for code repositories and collaboration`,
              icon: integration.icon,
            },
          ],
          recentActivity: [
            {
              id: `activity-${Date.now()}`,
              message: `${integration.name} integration disconnected`,
              timestamp: new Date().toISOString(),
            },
            ...prevData.recentActivity,
          ],
        }));
        
        toast({
          title: "Integration disconnected",
          description: `Successfully disconnected from ${integration.name}`,
        });
      }
    } catch (error) {
      toast({
        title: "Disconnection failed",
        description: "Could not disconnect the integration. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSync = async (integrationId: string) => {
    try {
      setSyncingIntegration(integrationId);
      
      // In a real implementation this would be:
      // await integrationService.syncData(integrationId);
      
      // Simulate API delay
      setTimeout(() => {
        // Update the last sync time
        setData(prevData => ({
          ...prevData,
          activeIntegrations: prevData.activeIntegrations.map(integration => {
            if (integration.id === integrationId) {
              // Update details based on the integration type
              if (integration.type === 'github' && integration.details.repositories) {
                return {
                  ...integration,
                  details: {
                    ...integration.details,
                    repositories: integration.details.repositories.map(repo => ({
                      ...repo,
                      status: 'synced',
                      lastSync: new Date().toISOString(),
                    })),
                  },
                };
              }
              return integration;
            }
            return integration;
          }),
          recentActivity: [
            {
              id: `activity-${Date.now()}`,
              message: `${prevData.activeIntegrations.find(i => i.id === integrationId)?.name} integration synced`,
              timestamp: new Date().toISOString(),
            },
            ...prevData.recentActivity,
          ],
        }));
        
        toast({
          title: "Sync complete",
          description: "Successfully synchronized data from the integration",
        });
        
        setSyncingIntegration(null);
      }, 2000);
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "Could not synchronize data. Please try again.",
        variant: "destructive",
      });
      setSyncingIntegration(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Connect with your development and collaboration tools
          </p>
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
              <CardTitle>Active Integrations</CardTitle>
              <CardDescription>Tools and services currently connected to Scrumless.ai</CardDescription>
            </CardHeader>
            <CardContent>
              {data.activeIntegrations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 border border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground">No active integrations</p>
                  <p className="text-sm text-muted-foreground mt-1">Connect tools from the available integrations below</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {data.activeIntegrations.map((integration) => (
                    <div 
                      key={integration.id} 
                      className="flex flex-col rounded-lg border border-border overflow-hidden"
                    >
                      <div className="flex items-center gap-4 border-b border-border p-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary-50 text-primary-600">
                          {integration.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{integration.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Connected {new Date(integration.connectedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSync(integration.id)}
                            disabled={syncingIntegration === integration.id}
                          >
                            {syncingIntegration === integration.id ? (
                              <>
                                <Spinner className="mr-2 h-4 w-4" />
                                Syncing...
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                  <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m-9 9a9 9 0 0 1 9-9" />
                                </svg>
                                Sync
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleDisconnect(integration.id)}
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 flex-1">
                        {integration.type === 'github' && integration.details.repositories && (
                          <div>
                            <p className="text-sm font-medium mb-2">Connected Repositories</p>
                            <div className="space-y-2">
                              {integration.details.repositories.map((repo, index) => (
                                <div 
                                  key={index} 
                                  className="flex items-center justify-between px-3 py-2 bg-muted rounded-md text-sm"
                                >
                                  <span>{repo.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                      {repo.status === 'synced' 
                                        ? `Last sync: ${new Date(repo.lastSync).toLocaleTimeString()}`
                                        : 'Not synced'
                                      }
                                    </span>
                                    <span className={`h-2 w-2 rounded-full ${repo.status === 'synced' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {integration.type === 'slack' && integration.details.channels && (
                          <div>
                            <p className="text-sm font-medium mb-2">Connected Channels</p>
                            <div className="space-y-2">
                              {integration.details.channels.map((channel, index) => (
                                <div 
                                  key={index} 
                                  className="flex items-center justify-between px-3 py-2 bg-muted rounded-md text-sm"
                                >
                                  <span>{channel.name}</span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">
                                      {channel.status}
                                    </span>
                                    <span className={`h-2 w-2 rounded-full ${channel.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Integrations</CardTitle>
              <CardDescription>Connect to additional tools to enhance your workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.availableIntegrations.map((integration) => (
                  <div 
                    key={integration.id} 
                    className="flex flex-col rounded-lg border border-border p-4 h-full"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary-50 text-primary-600">
                        {integration.icon}
                      </div>
                      <h3 className="font-medium">{integration.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground flex-1 mb-4">
                      {integration.description}
                    </p>
                    <Button
                      onClick={() => handleConnect(integration.type)}
                      disabled={connecting}
                      className="w-full"
                    >
                      {connecting ? (
                        <>
                          <Spinner className="mr-2 h-4 w-4" />
                          Connecting...
                        </>
                      ) : (
                        <>Connect</>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events from your integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentActivity.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
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

export default Integrations; 