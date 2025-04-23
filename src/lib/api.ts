import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { z } from 'zod';
import { toast } from 'sonner';

// API Response Schemas
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().optional(),
  teams: z.array(z.string()).optional(),
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  refreshToken: z.string(),
  user: UserSchema,
});

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  members: z.array(z.string()).optional(),
});

export const StandupSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  date: z.string(),
  memberUpdates: z.array(
    z.object({
      memberId: z.string(),
      yesterday: z.string(),
      today: z.string(),
      blockers: z.string().optional(),
    })
  ),
});

export const BlockerSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  description: z.string(),
  reportedBy: z.string(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']),
  createdAt: z.string(),
  resolvedAt: z.string().optional(),
});

export const SprintSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  name: z.string(),
  goal: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED']),
});

export const RetroSchema = z.object({
  id: z.string(),
  sprintId: z.string(),
  teamId: z.string(),
  wentWell: z.array(z.string()),
  toImprove: z.array(z.string()),
  actionItems: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      assignee: z.string().optional(),
      completed: z.boolean().default(false),
    })
  ),
});

// Type exports from schemas
export type User = z.infer<typeof UserSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type Team = z.infer<typeof TeamSchema>;
export type Standup = z.infer<typeof StandupSchema>;
export type Blocker = z.infer<typeof BlockerSchema>;
export type Sprint = z.infer<typeof SprintSchema>;
export type Retro = z.infer<typeof RetroSchema>;

// Base API configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable cookies for httpOnly tokens
});

// Add auth token to requests if available
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for handling 401 errors and refreshing tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Store the original request to retry it later
    const originalRequest = error.config;
    
    // If the error is 401 Unauthorized and we have a refresh token
    if (error.response?.status === 401 && originalRequest && !originalRequest.headers['X-Retry']) {
      // Mark the request as retried to prevent infinite loops
      originalRequest.headers['X-Retry'] = 'true';
      
      try {
        // Get refresh token from httpOnly cookie (handled automatically)
        const refreshResponse = await apiClient.post('/auth/refresh');
        const { token } = refreshResponse.data;
        
        // Update the token in localStorage
        localStorage.setItem('auth_token', token);
        
        // Update the Authorization header
        originalRequest.headers.Authorization = `Bearer ${token}`;
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh token is invalid/expired, log the user out
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        
        // Redirect to login page
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle general API errors
    const errorMsg = error.response?.data?.message || 'An error occurred';
    toast.error(errorMsg);
    
    return Promise.reject(error);
  }
);

// Helper function to validate responses with Zod schemas
const validateResponse = <T extends z.ZodType>(schema: T, data: unknown): z.infer<T> => {
  try {
    return schema.parse(data);
  } catch (error) {
    console.error('API Response validation error:', error);
    throw new Error('Invalid API response format');
  }
};

// API service for authentication
export const authService = {
  login: async (provider: string, code: string): Promise<AxiosResponse<AuthResponse>> => {
    const response = await apiClient.post('/auth/login', { provider, code });
    validateResponse(AuthResponseSchema, response.data);
    return response;
  },
  logout: async (): Promise<AxiosResponse> => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    return apiClient.post('/auth/logout');
  },
  refreshToken: async (): Promise<AxiosResponse> => {
    return apiClient.post('/auth/refresh');
  },
  getCurrentUser: async (): Promise<AxiosResponse<User>> => {
    const response = await apiClient.get('/auth/me');
    validateResponse(UserSchema, response.data);
    return response;
  }
};

// API service for team management
export const teamService = {
  getTeams: async (): Promise<AxiosResponse<Team[]>> => {
    const response = await apiClient.get('/teams');
    validateResponse(z.array(TeamSchema), response.data);
    return response;
  },
  getTeam: async (teamId: string): Promise<AxiosResponse<Team>> => {
    const response = await apiClient.get(`/teams/${teamId}`);
    validateResponse(TeamSchema, response.data);
    return response;
  },
  getTeamMembers: async (teamId: string): Promise<AxiosResponse<User[]>> => {
    const response = await apiClient.get(`/teams/${teamId}/members`);
    validateResponse(z.array(UserSchema), response.data);
    return response;
  },
  createTeam: async (teamData: Omit<Team, 'id'>): Promise<AxiosResponse<Team>> => {
    const response = await apiClient.post('/teams', teamData);
    validateResponse(TeamSchema, response.data);
    return response;
  },
  updateTeam: async (teamId: string, teamData: Partial<Team>): Promise<AxiosResponse<Team>> => {
    const response = await apiClient.put(`/teams/${teamId}`, teamData);
    validateResponse(TeamSchema, response.data);
    return response;
  },
  addTeamMember: async (teamId: string, userId: string): Promise<AxiosResponse<Team>> => {
    const response = await apiClient.post(`/teams/${teamId}/members`, { userId });
    validateResponse(TeamSchema, response.data);
    return response;
  },
  removeTeamMember: async (teamId: string, userId: string): Promise<AxiosResponse<Team>> => {
    const response = await apiClient.delete(`/teams/${teamId}/members/${userId}`);
    validateResponse(TeamSchema, response.data);
    return response;
  }
};

// API service for standup functionality
export const standupService = {
  getStandupSummary: async (teamId: string, date?: string): Promise<AxiosResponse<Standup>> => {
    const params = date ? { date } : {};
    const response = await apiClient.get(`/teams/${teamId}/standups`, { params });
    validateResponse(StandupSchema, response.data);
    return response;
  },
  submitStandupUpdate: async (teamId: string, updateData: Omit<Standup, 'id' | 'teamId' | 'date'>): Promise<AxiosResponse<Standup>> => {
    const response = await apiClient.post(`/teams/${teamId}/standups`, updateData);
    validateResponse(StandupSchema, response.data);
    return response;
  },
  getBlockers: async (teamId: string): Promise<AxiosResponse<Blocker[]>> => {
    const response = await apiClient.get(`/teams/${teamId}/blockers`);
    validateResponse(z.array(BlockerSchema), response.data);
    return response;
  },
  resolveBlocker: async (teamId: string, blockerId: string, resolution: { resolution: string }): Promise<AxiosResponse<Blocker>> => {
    const response = await apiClient.post(`/teams/${teamId}/blockers/${blockerId}/resolve`, resolution);
    validateResponse(BlockerSchema, response.data);
    return response;
  }
};

// API service for sprint planning
export const sprintService = {
  getCurrentSprint: async (teamId: string): Promise<AxiosResponse<Sprint>> => {
    const response = await apiClient.get(`/teams/${teamId}/sprints/current`);
    validateResponse(SprintSchema, response.data);
    return response;
  },
  createSprint: async (teamId: string, sprintData: Omit<Sprint, 'id' | 'teamId'>): Promise<AxiosResponse<Sprint>> => {
    const response = await apiClient.post(`/teams/${teamId}/sprints`, sprintData);
    validateResponse(SprintSchema, response.data);
    return response;
  },
  updateSprint: async (teamId: string, sprintId: string, sprintData: Partial<Sprint>): Promise<AxiosResponse<Sprint>> => {
    const response = await apiClient.put(`/teams/${teamId}/sprints/${sprintId}`, sprintData);
    validateResponse(SprintSchema, response.data);
    return response;
  },
  getSprintBacklog: async (teamId: string, sprintId: string): Promise<AxiosResponse<unknown>> => {
    return apiClient.get(`/teams/${teamId}/sprints/${sprintId}/backlog`);
  },
  generateStories: async (teamId: string, epicId: string): Promise<AxiosResponse<unknown>> => {
    return apiClient.post(`/teams/${teamId}/epics/${epicId}/generate-stories`);
  }
};

// API service for retrospectives
export const retroService = {
  getRetroData: async (teamId: string, sprintId: string): Promise<AxiosResponse<Retro>> => {
    const response = await apiClient.get(`/teams/${teamId}/sprints/${sprintId}/retro`);
    validateResponse(RetroSchema, response.data);
    return response;
  },
  generateRetroSummary: async (teamId: string, sprintId: string): Promise<AxiosResponse<Retro>> => {
    const response = await apiClient.post(`/teams/${teamId}/sprints/${sprintId}/retro/generate`);
    validateResponse(RetroSchema, response.data);
    return response;
  },
  addRetroAction: async (teamId: string, sprintId: string, actionData: { description: string, assignee?: string }): Promise<AxiosResponse<Retro>> => {
    const response = await apiClient.post(`/teams/${teamId}/sprints/${sprintId}/retro/actions`, actionData);
    validateResponse(RetroSchema, response.data);
    return response;
  },
  completeRetroAction: async (teamId: string, sprintId: string, actionId: string): Promise<AxiosResponse<Retro>> => {
    const response = await apiClient.put(`/teams/${teamId}/sprints/${sprintId}/retro/actions/${actionId}/complete`);
    validateResponse(RetroSchema, response.data);
    return response;
  }
};

// API service for integrations
export const integrationService = {
  getIntegrations: async (): Promise<AxiosResponse<unknown>> => {
    return apiClient.get('/integrations');
  },
  connectIntegration: async (type: string, credentials: unknown): Promise<AxiosResponse<unknown>> => {
    return apiClient.post(`/integrations/${type}/connect`, credentials);
  },
  disconnectIntegration: async (type: string): Promise<AxiosResponse<unknown>> => {
    return apiClient.delete(`/integrations/${type}`);
  },
  syncData: async (type: string): Promise<AxiosResponse<unknown>> => {
    return apiClient.post(`/integrations/${type}/sync`);
  }
};

// API service for metrics and reporting
export const metricsService = {
  getTeamMetrics: async (teamId: string, timeRange: string): Promise<AxiosResponse<unknown>> => {
    return apiClient.get(`/teams/${teamId}/metrics`, { params: { timeRange } });
  },
  getVelocityData: async (teamId: string): Promise<AxiosResponse<unknown>> => {
    return apiClient.get(`/teams/${teamId}/metrics/velocity`);
  },
  getBurndownData: async (teamId: string, sprintId: string): Promise<AxiosResponse<unknown>> => {
    return apiClient.get(`/teams/${teamId}/sprints/${sprintId}/burndown`);
  },
  getProductivityReport: async (teamId: string, timeRange: string): Promise<AxiosResponse<unknown>> => {
    return apiClient.get(`/teams/${teamId}/reports/productivity`, { params: { timeRange } });
  }
};

export default {
  auth: authService,
  teams: teamService,
  standups: standupService,
  sprints: sprintService,
  retros: retroService,
  integrations: integrationService,
  metrics: metricsService
}; 