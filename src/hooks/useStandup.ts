import { standupService, Standup, Blocker } from '@/lib/api';
import { useQuery, useMutation } from './useQuery';

// Query keys
export const standupKeys = {
  all: ['standups'] as const,
  summaries: () => [...standupKeys.all, 'summaries'] as const,
  summary: (teamId: string, date?: string) => [...standupKeys.summaries(), teamId, date] as const,
  blockers: () => [...standupKeys.all, 'blockers'] as const,
  teamBlockers: (teamId: string) => [...standupKeys.blockers(), teamId] as const,
};

// Get standup summary for a team on a specific date
export const useStandupSummary = (teamId: string, date?: string) => {
  return useQuery<Standup>(
    standupKeys.summary(teamId, date),
    () => standupService.getStandupSummary(teamId, date),
    {
      enabled: !!teamId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );
};

// Submit standup update
export const useSubmitStandupUpdate = (teamId: string) => {
  return useMutation<Standup, Omit<Standup, 'id' | 'teamId' | 'date'>>(
    (updateData) => standupService.submitStandupUpdate(teamId, updateData),
    {
      invalidateQueries: [standupKeys.summary(teamId)],
      successMessage: 'Standup update submitted successfully',
    }
  );
};

// Get all blockers for a team
export const useTeamBlockers = (teamId: string) => {
  return useQuery<Blocker[]>(
    standupKeys.teamBlockers(teamId),
    () => standupService.getBlockers(teamId),
    {
      enabled: !!teamId,
    }
  );
};

// Resolve a blocker
export const useResolveBlocker = (teamId: string, blockerId: string) => {
  return useMutation<Blocker, { resolution: string }>(
    (resolution) => standupService.resolveBlocker(teamId, blockerId, resolution),
    {
      invalidateQueries: [standupKeys.teamBlockers(teamId)],
      successMessage: 'Blocker resolved successfully',
    }
  );
}; 