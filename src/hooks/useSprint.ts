import { sprintService, Sprint } from '@/lib/api';
import { useQuery, useMutation } from './useQuery';

// Query keys
export const sprintKeys = {
  all: ['sprints'] as const,
  lists: () => [...sprintKeys.all, 'list'] as const,
  list: (teamId: string) => [...sprintKeys.lists(), teamId] as const,
  details: () => [...sprintKeys.all, 'detail'] as const,
  detail: (teamId: string, sprintId: string) => [...sprintKeys.details(), teamId, sprintId] as const,
  current: (teamId: string) => [...sprintKeys.all, 'current', teamId] as const,
  backlog: (teamId: string, sprintId: string) => [...sprintKeys.detail(teamId, sprintId), 'backlog'] as const,
};

// Get current sprint for a team
export const useCurrentSprint = (teamId: string) => {
  return useQuery<Sprint>(
    sprintKeys.current(teamId),
    () => sprintService.getCurrentSprint(teamId),
    {
      enabled: !!teamId,
    }
  );
};

// Create a new sprint
export const useCreateSprint = (teamId: string) => {
  return useMutation<Sprint, Omit<Sprint, 'id' | 'teamId'>>(
    (sprintData) => sprintService.createSprint(teamId, sprintData),
    {
      invalidateQueries: [sprintKeys.current(teamId), sprintKeys.list(teamId)],
      successMessage: 'Sprint created successfully',
    }
  );
};

// Update an existing sprint
export const useUpdateSprint = (teamId: string, sprintId: string) => {
  return useMutation<Sprint, Partial<Sprint>>(
    (sprintData) => sprintService.updateSprint(teamId, sprintId, sprintData),
    {
      invalidateQueries: [
        sprintKeys.detail(teamId, sprintId), 
        sprintKeys.current(teamId)
      ],
      successMessage: 'Sprint updated successfully',
    }
  );
};

// Get sprint backlog
export const useSprintBacklog = (teamId: string, sprintId: string) => {
  return useQuery(
    sprintKeys.backlog(teamId, sprintId),
    () => sprintService.getSprintBacklog(teamId, sprintId),
    {
      enabled: !!teamId && !!sprintId,
    }
  );
};

// Generate stories from an epic
export const useGenerateStories = (teamId: string) => {
  return useMutation(
    (epicId: string) => sprintService.generateStories(teamId, epicId),
    {
      successMessage: 'Stories generated successfully',
    }
  );
}; 