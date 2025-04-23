import { teamService, Team, User } from '@/lib/api';
import { useQuery, useMutation, optimisticUpdate } from './useQuery';
import { useQueryClient } from '@tanstack/react-query';

// Query keys
export const teamKeys = {
  all: ['teams'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...teamKeys.lists(), filters] as const,
  details: () => [...teamKeys.all, 'detail'] as const,
  detail: (id: string) => [...teamKeys.details(), id] as const,
  members: (id: string) => [...teamKeys.detail(id), 'members'] as const,
};

// Get all teams
export const useTeams = () => {
  return useQuery<Team[]>(
    teamKeys.lists(),
    () => teamService.getTeams(),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};

// Get a specific team by ID
export const useTeam = (teamId: string) => {
  return useQuery<Team>(
    teamKeys.detail(teamId),
    () => teamService.getTeam(teamId),
    {
      enabled: !!teamId,
    }
  );
};

// Get team members
export const useTeamMembers = (teamId: string) => {
  return useQuery<User[]>(
    teamKeys.members(teamId),
    () => teamService.getTeamMembers(teamId),
    {
      enabled: !!teamId,
    }
  );
};

// Create a new team
export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Team, Omit<Team, 'id'>>(
    (newTeam) => teamService.createTeam(newTeam),
    {
      invalidateQueries: [teamKeys.lists()],
      successMessage: 'Team created successfully',
    }
  );
};

// Update an existing team
export const useUpdateTeam = (teamId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation<Team, Partial<Team>>(
    (updatedTeam) => teamService.updateTeam(teamId, updatedTeam),
    {
      ...optimisticUpdate<Team>(
        queryClient,
        teamKeys.detail(teamId),
        (oldData) => ({ ...oldData, ...updatedTeam })
      ),
      invalidateQueries: [teamKeys.detail(teamId)],
      successMessage: 'Team updated successfully',
    }
  );
};

// Add a member to a team
export const useAddTeamMember = (teamId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (userId: string) => teamService.addTeamMember(teamId, userId),
    {
      invalidateQueries: [teamKeys.members(teamId)],
      successMessage: 'Team member added successfully',
    }
  );
};

// Remove a member from a team
export const useRemoveTeamMember = (teamId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (userId: string) => teamService.removeTeamMember(teamId, userId),
    {
      invalidateQueries: [teamKeys.members(teamId)],
      successMessage: 'Team member removed successfully',
    }
  );
}; 