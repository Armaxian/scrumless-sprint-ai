import { useQuery as useTanQuery, useMutation as useTanMutation, 
  UseQueryOptions, UseMutationOptions, QueryKey, 
  useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

// Helper function to create a query hook
export function useQuery<TData, TError = AxiosError>(
  queryKey: QueryKey,
  queryFn: () => Promise<AxiosResponse<TData>>,
  options?: UseQueryOptions<AxiosResponse<TData>, TError, TData>
) {
  return useTanQuery<AxiosResponse<TData>, TError, TData>({
    queryKey,
    queryFn,
    select: (data) => data.data, // Extract data from the Axios response
    ...options,
  });
}

// Helper function to create a mutation hook with auto-invalidation
export function useMutation<TData, TVariables, TError = AxiosError, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<AxiosResponse<TData>>,
  options?: UseMutationOptions<AxiosResponse<TData>, TError, TVariables, TContext> & {
    invalidateQueries?: QueryKey[];
    successMessage?: string;
    errorMessage?: string;
  }
) {
  const queryClient = useQueryClient();
  const { invalidateQueries, successMessage, errorMessage, ...mutationOptions } = options || {};

  return useTanMutation<AxiosResponse<TData>, TError, TVariables, TContext>({
    mutationFn,
    onSuccess: async (data, variables, context) => {
      // Handle success callback from options
      if (mutationOptions?.onSuccess) {
        await mutationOptions.onSuccess(data, variables, context);
      }

      // Show success toast if provided
      if (successMessage) {
        toast.success(successMessage);
      }

      // Invalidate queries if specified
      if (invalidateQueries && invalidateQueries.length > 0) {
        invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
    onError: (error, variables, context) => {
      // Show error toast
      const message = errorMessage || (error as AxiosError<{ message: string }>)?.response?.data?.message || 'An error occurred';
      toast.error(message);

      // Handle error callback from options
      if (mutationOptions?.onError) {
        return mutationOptions.onError(error, variables, context);
      }
    },
    ...mutationOptions,
  });
}

// Export optimistic update helpers
export const optimisticUpdate = <T>(queryClient: ReturnType<typeof useQueryClient>, queryKey: QueryKey, updateFn: (oldData: T) => T) => {
  return {
    onMutate: async (newData: unknown) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey });
      
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<T>(queryKey);
      
      // Optimistically update to the new value
      queryClient.setQueryData<T>(queryKey, (old) => old ? updateFn(old) : undefined);
      
      // Return a context object with the previous data
      return { previousData };
    },
    onError: (_: unknown, __: unknown, context: { previousData: T } | undefined) => {
      // If the mutation fails, roll back to the previous data
      if (context?.previousData) {
        queryClient.setQueryData<T>(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      // Always refetch after error or success to ensure data is in sync with server
      queryClient.invalidateQueries({ queryKey });
    },
  };
}; 