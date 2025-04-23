import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useToast } from '@/hooks/use-toast';
import { teamService } from '@/lib/api';

// Mock data for team settings
const MOCK_TEAM_DATA = {
  teams: [
    {
      id: '1',
      name: 'Frontend Team',
      description: 'Responsible for UI/UX implementation and client-side features',
      members: [
        { id: 'user-1', name: 'Mike Chen', email: 'mike@example.com', role: 'Developer', avatar: '' },
        { id: 'user-2', name: 'Rachel Singh', email: 'rachel@example.com', role: 'Tech Lead', avatar: '' },
        { id: 'user-3', name: 'Alex Johnson', email: 'alex@example.com', role: 'Developer', avatar: '' },
        { id: 'user-4', name: 'Priya Patel', email: 'priya@example.com', role: 'Designer', avatar: '' },
        { id: 'user-5', name: 'Sam Roberts', email: 'sam@example.com', role: 'Developer', avatar: '' },
      ],
      settings: {
        sprintLength: 2,
        startDay: 'Wednesday',
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        standupTime: '09:30',
        capacity: 75,
        estimationScale: 'fibonacci',
      },
    },
    {
      id: '2',
      name: 'Backend Team',
      description: 'Responsible for API development and server-side features',
      members: [
        { id: 'user-6', name: 'David Kim', email: 'david@example.com', role: 'Tech Lead', avatar: '' },
        { id: 'user-7', name: 'Emma Watson', email: 'emma@example.com', role: 'Developer', avatar: '' },
        { id: 'user-8', name: 'Olivia Martinez', email: 'olivia@example.com', role: 'Developer', avatar: '' },
        { id: 'user-9', name: 'Jamal Thompson', email: 'jamal@example.com', role: 'DevOps', avatar: '' },
        { id: 'user-10', name: 'Sophia Lee', email: 'sophia@example.com', role: 'Developer', avatar: '' },
        { id: 'user-11', name: 'Lucas Brown', email: 'lucas@example.com', role: 'Database Specialist', avatar: '' },
      ],
      settings: {
        sprintLength: 2,
        startDay: 'Wednesday',
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        standupTime: '09:30',
        capacity: 90,
        estimationScale: 'fibonacci',
      },
    },
    {
      id: '3',
      name: 'DevOps Team',
      description: 'Responsible for infrastructure, CI/CD, and deployment',
      members: [
        { id: 'user-12', name: 'Nina Williams', email: 'nina@example.com', role: 'Team Lead', avatar: '' },
        { id: 'user-13', name: 'Ben Thomas', email: 'ben@example.com', role: 'DevOps Engineer', avatar: '' },
        { id: 'user-14', name: 'Maya Rodriguez', email: 'maya@example.com', role: 'Site Reliability Engineer', avatar: '' },
      ],
      settings: {
        sprintLength: 2,
        startDay: 'Wednesday',
        workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        standupTime: '09:30',
        capacity: 45,
        estimationScale: 'fibonacci',
      },
    },
  ],
  invitations: [
    { email: 'newdev@example.com', team: 'Frontend Team', role: 'Developer', sentAt: '2023-10-30T12:30:00Z', status: 'pending' },
    { email: 'analyst@example.com', team: 'Backend Team', role: 'Data Analyst', sentAt: '2023-10-28T09:15:00Z', status: 'expired' },
  ],
};

const TeamSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(MOCK_TEAM_DATA);
  const [selectedTeam, setSelectedTeam] = useState('1');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Developer');
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [editingSettings, setEditingSettings] = useState(false);
  const [teamSettings, setTeamSettings] = useState({
    sprintLength: 2,
    startDay: 'Wednesday',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    standupTime: '09:30',
    capacity: 75,
    estimationScale: 'fibonacci',
  });

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        
        // In a real implementation this would be:
        // const response = await teamService.getTeamDetails(selectedTeam);
        // setData(response.data);
        
        // Simulate API delay
        setTimeout(() => {
          const team = MOCK_TEAM_DATA.teams.find(t => t.id === selectedTeam);
          if (team) {
            setTeamSettings(team.settings);
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        toast({
          title: "Error loading team data",
          description: "Please try again later",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [selectedTeam]);

  const activeTeam = data.teams.find(team => team.id === selectedTeam);

  const handleInviteMember = () => {
    if (!newMemberEmail.trim() || !newMemberRole.trim()) return;
    
    // In a real implementation this would be:
    // await teamService.inviteMember(selectedTeam, { email: newMemberEmail, role: newMemberRole });
    
    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${newMemberEmail}`,
    });
    
    // Update local state to reflect the new invitation
    setData(prevData => ({
      ...prevData,
      invitations: [
        ...prevData.invitations,
        {
          email: newMemberEmail,
          team: activeTeam ? activeTeam.name : '',
          role: newMemberRole,
          sentAt: new Date().toISOString(),
          status: 'pending',
        },
      ],
    }));
    
    setNewMemberEmail('');
    setNewMemberRole('Developer');
  };

  const handleCreateTeam = () => {
    if (!newTeamName.trim()) return;
    
    // In a real implementation this would be:
    // const response = await teamService.createTeam({ name: newTeamName, description: newTeamDescription });
    // const newTeamId = response.data.id;
    
    const newTeamId = `team-${Date.now()}`;
    
    // Update local state to reflect the new team
    setData(prevData => ({
      ...prevData,
      teams: [
        ...prevData.teams,
        {
          id: newTeamId,
          name: newTeamName,
          description: newTeamDescription,
          members: [],
          settings: {
            sprintLength: 2,
            startDay: 'Wednesday',
            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            standupTime: '09:30',
            capacity: 60,
            estimationScale: 'fibonacci',
          },
        },
      ],
    }));
    
    toast({
      title: "Team created",
      description: `${newTeamName} has been created successfully`,
    });
    
    setNewTeamName('');
    setNewTeamDescription('');
    setSelectedTeam(newTeamId);
  };

  const handleRemoveMember = (memberId: string) => {
    // In a real implementation this would be:
    // await teamService.removeMember(selectedTeam, memberId);
    
    // Update local state to reflect the member removal
    setData(prevData => ({
      ...prevData,
      teams: prevData.teams.map(team => {
        if (team.id === selectedTeam) {
          return {
            ...team,
            members: team.members.filter(member => member.id !== memberId),
          };
        }
        return team;
      }),
    }));
    
    toast({
      title: "Member removed",
      description: "Team member has been removed",
    });
  };

  const handleSaveSettings = () => {
    // In a real implementation this would be:
    // await teamService.updateTeamSettings(selectedTeam, teamSettings);
    
    // Update local state to reflect the new settings
    setData(prevData => ({
      ...prevData,
      teams: prevData.teams.map(team => {
        if (team.id === selectedTeam) {
          return {
            ...team,
            settings: teamSettings,
          };
        }
        return team;
      }),
    }));
    
    toast({
      title: "Settings saved",
      description: "Team settings have been updated",
    });
    
    setEditingSettings(false);
  };

  const handleDeleteTeam = () => {
    if (!window.confirm(`Are you sure you want to delete ${activeTeam?.name}? This action cannot be undone.`)) {
      return;
    }
    
    // In a real implementation this would be:
    // await teamService.deleteTeam(selectedTeam);
    
    // Update local state to reflect the team deletion
    setData(prevData => ({
      ...prevData,
      teams: prevData.teams.filter(team => team.id !== selectedTeam),
    }));
    
    toast({
      title: "Team deleted",
      description: `${activeTeam?.name} has been deleted`,
    });
    
    // Select another team if available
    if (data.teams.length > 1) {
      const newSelectedTeam = data.teams.find(team => team.id !== selectedTeam)?.id;
      if (newSelectedTeam) {
        setSelectedTeam(newSelectedTeam);
      }
    }
  };

  const workingDaysOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const estimationScaleOptions = [
    { value: 'fibonacci', label: 'Fibonacci (1, 2, 3, 5, 8, 13, 21)' },
    { value: 't-shirt', label: 'T-Shirt (XS, S, M, L, XL)' },
    { value: 'powers-of-two', label: 'Powers of Two (1, 2, 4, 8, 16)' },
    { value: 'linear', label: 'Linear (1, 2, 3, 4, 5)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Settings</h1>
          <p className="text-muted-foreground">
            Manage your teams and their configurations
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <select
            className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            {data.teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Spinner className="h-10 w-10" />
        </div>
      ) : (
        <Tabs defaultValue="members">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="members">Team Members</TabsTrigger>
            <TabsTrigger value="settings">Sprint Settings</TabsTrigger>
            <TabsTrigger value="new">Create Team</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="space-y-6 mt-6">
            {activeTeam && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{activeTeam.name}</CardTitle>
                        <CardDescription>{activeTeam.description}</CardDescription>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleDeleteTeam}
                      >
                        Delete Team
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Current Members ({activeTeam.members.length})</h3>
                      <div className="rounded-md border border-border">
                        <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b border-border">
                          <div className="col-span-4">Name</div>
                          <div className="col-span-4">Email</div>
                          <div className="col-span-2">Role</div>
                          <div className="col-span-2 text-right">Actions</div>
                        </div>
                        {activeTeam.members.map((member) => (
                          <div key={member.id} className="grid grid-cols-12 gap-4 p-4 border-b border-border last:border-0">
                            <div className="col-span-4 flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center font-medium text-muted-foreground">
                                {member.name.charAt(0)}
                              </div>
                              <span>{member.name}</span>
                            </div>
                            <div className="col-span-4 flex items-center">{member.email}</div>
                            <div className="col-span-2 flex items-center">{member.role}</div>
                            <div className="col-span-2 flex items-center justify-end">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-600 hover:bg-red-100"
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Invite New Member</CardTitle>
                    <CardDescription>Add team members to collaborate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full rounded-md border border-border bg-background p-2 text-sm"
                          placeholder="colleague@example.com"
                          value={newMemberEmail}
                          onChange={(e) => setNewMemberEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium mb-1">
                          Role
                        </label>
                        <select
                          id="role"
                          className="w-full rounded-md border border-border bg-background p-2 text-sm"
                          value={newMemberRole}
                          onChange={(e) => setNewMemberRole(e.target.value)}
                        >
                          <option value="Developer">Developer</option>
                          <option value="Designer">Designer</option>
                          <option value="Product Manager">Product Manager</option>
                          <option value="Tech Lead">Tech Lead</option>
                          <option value="QA Engineer">QA Engineer</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleInviteMember}>
                      Send Invitation
                    </Button>
                  </CardFooter>
                </Card>
                
                {data.invitations.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Invitations</CardTitle>
                      <CardDescription>People who have been invited but haven't joined yet</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border border-border">
                        <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b border-border">
                          <div className="col-span-4">Email</div>
                          <div className="col-span-3">Team</div>
                          <div className="col-span-2">Role</div>
                          <div className="col-span-3">Status</div>
                        </div>
                        {data.invitations.map((invitation, index) => (
                          <div key={index} className="grid grid-cols-12 gap-4 p-4 border-b border-border last:border-0">
                            <div className="col-span-4">{invitation.email}</div>
                            <div className="col-span-3">{invitation.team}</div>
                            <div className="col-span-2">{invitation.role}</div>
                            <div className="col-span-3">
                              <span className={`rounded-full px-2 py-1 text-xs font-medium 
                                ${invitation.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-700' 
                                  : 'bg-gray-100 text-gray-700'}`}
                              >
                                {invitation.status === 'pending' ? 'Pending' : 'Expired'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6 mt-6">
            {activeTeam && (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Sprint Settings</CardTitle>
                      <CardDescription>Configure how sprints work for {activeTeam.name}</CardDescription>
                    </div>
                    {!editingSettings ? (
                      <Button 
                        onClick={() => setEditingSettings(true)}
                      >
                        Edit Settings
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setEditingSettings(false);
                            setTeamSettings(activeTeam.settings);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSaveSettings}
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Sprint Length (weeks)
                        </label>
                        {editingSettings ? (
                          <select
                            className="w-full rounded-md border border-border bg-background p-2 text-sm"
                            value={teamSettings.sprintLength}
                            onChange={(e) => setTeamSettings(prev => ({ ...prev, sprintLength: parseInt(e.target.value) }))}
                          >
                            <option value={1}>1 week</option>
                            <option value={2}>2 weeks</option>
                            <option value={3}>3 weeks</option>
                            <option value={4}>4 weeks</option>
                          </select>
                        ) : (
                          <div className="rounded-md border border-border bg-muted p-2 text-sm">
                            {teamSettings.sprintLength} {teamSettings.sprintLength === 1 ? 'week' : 'weeks'}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Sprint Start Day
                        </label>
                        {editingSettings ? (
                          <select
                            className="w-full rounded-md border border-border bg-background p-2 text-sm"
                            value={teamSettings.startDay}
                            onChange={(e) => setTeamSettings(prev => ({ ...prev, startDay: e.target.value }))}
                          >
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                          </select>
                        ) : (
                          <div className="rounded-md border border-border bg-muted p-2 text-sm">
                            {teamSettings.startDay}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Daily Standup Time
                        </label>
                        {editingSettings ? (
                          <input
                            type="time"
                            className="w-full rounded-md border border-border bg-background p-2 text-sm"
                            value={teamSettings.standupTime}
                            onChange={(e) => setTeamSettings(prev => ({ ...prev, standupTime: e.target.value }))}
                          />
                        ) : (
                          <div className="rounded-md border border-border bg-muted p-2 text-sm">
                            {teamSettings.standupTime}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Team Capacity (story points)
                        </label>
                        {editingSettings ? (
                          <input
                            type="number"
                            className="w-full rounded-md border border-border bg-background p-2 text-sm"
                            value={teamSettings.capacity}
                            min={1}
                            max={200}
                            onChange={(e) => setTeamSettings(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                          />
                        ) : (
                          <div className="rounded-md border border-border bg-muted p-2 text-sm">
                            {teamSettings.capacity} points
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Working Days
                      </label>
                      {editingSettings ? (
                        <div className="flex flex-wrap gap-2">
                          {workingDaysOptions.map((day) => (
                            <label key={day} className="flex items-center gap-2 border border-border rounded-md p-2">
                              <input
                                type="checkbox"
                                checked={teamSettings.workingDays.includes(day)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setTeamSettings(prev => ({
                                      ...prev,
                                      workingDays: [...prev.workingDays, day],
                                    }));
                                  } else {
                                    setTeamSettings(prev => ({
                                      ...prev,
                                      workingDays: prev.workingDays.filter(d => d !== day),
                                    }));
                                  }
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                              />
                              {day}
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-md border border-border bg-muted p-2 text-sm">
                          {teamSettings.workingDays.join(', ')}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Estimation Scale
                      </label>
                      {editingSettings ? (
                        <select
                          className="w-full rounded-md border border-border bg-background p-2 text-sm"
                          value={teamSettings.estimationScale}
                          onChange={(e) => setTeamSettings(prev => ({ ...prev, estimationScale: e.target.value }))}
                        >
                          {estimationScaleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="rounded-md border border-border bg-muted p-2 text-sm">
                          {estimationScaleOptions.find(o => o.value === teamSettings.estimationScale)?.label || teamSettings.estimationScale}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="new" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Team</CardTitle>
                <CardDescription>Set up a new team to collaborate with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="teamName" className="block text-sm font-medium mb-1">
                      Team Name
                    </label>
                    <input
                      id="teamName"
                      type="text"
                      className="w-full rounded-md border border-border bg-background p-2 text-sm"
                      placeholder="e.g. Marketing Team"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="teamDescription" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      id="teamDescription"
                      className="w-full rounded-md border border-border bg-background p-2 text-sm resize-none"
                      placeholder="What does this team work on?"
                      rows={3}
                      value={newTeamDescription}
                      onChange={(e) => setNewTeamDescription(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleCreateTeam}
                  disabled={!newTeamName.trim()}
                >
                  Create Team
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default TeamSettings; 