import { retroService, Retro } from '@/lib/api';
import { useQuery, useMutation } from './useQuery';

// Query keys
export const retroKeys = {
  all: ['retros'] as const,
  lists: () => [...retroKeys.all, 'list'] as const,
  list: (teamId: string) => [...retroKeys.lists(), teamId] as const,
  details: () => [...retroKeys.all, 'detail'] as const,
  detail: (teamId: string, sprintId: string) => [...retroKeys.details(), teamId, sprintId] as const,
};

// Get retrospective data for a sprint
export const useRetroData = (teamId: string, sprintId: string) => {
  return useQuery<Retro>(
    retroKeys.detail(teamId, sprintId),
    () => retroService.getRetroData(teamId, sprintId),
    {
      enabled: !!teamId && !!sprintId,
    }
  );
};

// Generate a retrospective summary
export const useGenerateRetroSummary = (teamId: string, sprintId: string) => {
  return useMutation<Retro, void>(
    () => retroService.generateRetroSummary(teamId, sprintId),
    {
      invalidateQueries: [retroKeys.detail(teamId, sprintId)],
      successMessage: 'Retrospective summary generated successfully',
    }
  );
};

// Add a retrospective action item
export const useAddRetroAction = (teamId: string, sprintId: string) => {
  return useMutation<Retro, { description: string, assignee?: string }>(
    (actionData) => retroService.addRetroAction(teamId, sprintId, actionData),
    {
      invalidateQueries: [retroKeys.detail(teamId, sprintId)],
      successMessage: 'Action item added successfully',
    }
  );
};

// Complete a retrospective action item
export const useCompleteRetroAction = (teamId: string, sprintId: string) => {
  return useMutation<Retro, string>(
    (actionId) => retroService.completeRetroAction(teamId, sprintId, actionId),
    {
      invalidateQueries: [retroKeys.detail(teamId, sprintId)],
      successMessage: 'Action item completed',
    }
  );
}; 