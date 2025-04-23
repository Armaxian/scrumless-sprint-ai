import axios from 'axios';

// Base API configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token to requests if available
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API service for authentication
export const authService = {
  login: async (provider: string, code: string) => {
    return apiClient.post('/auth/login', { provider, code });
  },
  logout: async () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    return apiClient.post('/auth/logout');
  },
  getCurrentUser: async () => {
    return apiClient.get('/auth/me');
  }
};

// API service for team management
export const teamService = {
  getTeams: async () => {
    return apiClient.get('/teams');
  },
  getTeamMembers: async (teamId: string) => {
    return apiClient.get(`/teams/${teamId}/members`);
  },
  createTeam: async (teamData: any) => {
    return apiClient.post('/teams', teamData);
  },
  updateTeam: async (teamId: string, teamData: any) => {
    return apiClient.put(`/teams/${teamId}`, teamData);
  }
};

// API service for standup functionality
export const standupService = {
  getStandupSummary: async (teamId: string, date?: string) => {
    const params = date ? { date } : {};
    return apiClient.get(`/teams/${teamId}/standups`, { params });
  },
  submitStandupUpdate: async (teamId: string, updateData: any) => {
    return apiClient.post(`/teams/${teamId}/standups`, updateData);
  },
  getBlockers: async (teamId: string) => {
    return apiClient.get(`/teams/${teamId}/blockers`);
  },
  resolveBlocker: async (teamId: string, blockerId: string, resolution: any) => {
    return apiClient.post(`/teams/${teamId}/blockers/${blockerId}/resolve`, resolution);
  }
};

// API service for sprint planning
export const sprintService = {
  getCurrentSprint: async (teamId: string) => {
    return apiClient.get(`/teams/${teamId}/sprints/current`);
  },
  createSprint: async (teamId: string, sprintData: any) => {
    return apiClient.post(`/teams/${teamId}/sprints`, sprintData);
  },
  updateSprint: async (teamId: string, sprintId: string, sprintData: any) => {
    return apiClient.put(`/teams/${teamId}/sprints/${sprintId}`, sprintData);
  },
  getSprintBacklog: async (teamId: string, sprintId: string) => {
    return apiClient.get(`/teams/${teamId}/sprints/${sprintId}/backlog`);
  },
  generateStories: async (teamId: string, epicId: string) => {
    return apiClient.post(`/teams/${teamId}/epics/${epicId}/generate-stories`);
  }
};

// API service for retrospectives
export const retroService = {
  getRetroData: async (teamId: string, sprintId: string) => {
    return apiClient.get(`/teams/${teamId}/sprints/${sprintId}/retro`);
  },
  generateRetroSummary: async (teamId: string, sprintId: string) => {
    return apiClient.post(`/teams/${teamId}/sprints/${sprintId}/retro/generate`);
  },
  addRetroAction: async (teamId: string, sprintId: string, actionData: any) => {
    return apiClient.post(`/teams/${teamId}/sprints/${sprintId}/retro/actions`, actionData);
  },
  completeRetroAction: async (teamId: string, sprintId: string, actionId: string) => {
    return apiClient.put(`/teams/${teamId}/sprints/${sprintId}/retro/actions/${actionId}/complete`);
  }
};

// API service for integrations
export const integrationService = {
  getIntegrations: async () => {
    return apiClient.get('/integrations');
  },
  connectIntegration: async (type: string, credentials: any) => {
    return apiClient.post(`/integrations/${type}/connect`, credentials);
  },
  disconnectIntegration: async (type: string) => {
    return apiClient.delete(`/integrations/${type}`);
  },
  syncData: async (type: string) => {
    return apiClient.post(`/integrations/${type}/sync`);
  }
};

// API service for metrics and reporting
export const metricsService = {
  getTeamMetrics: async (teamId: string, timeRange: string) => {
    return apiClient.get(`/teams/${teamId}/metrics`, { params: { timeRange } });
  },
  getVelocityData: async (teamId: string) => {
    return apiClient.get(`/teams/${teamId}/metrics/velocity`);
  },
  getBurndownData: async (teamId: string, sprintId: string) => {
    return apiClient.get(`/teams/${teamId}/sprints/${sprintId}/burndown`);
  },
  getProductivityReport: async (teamId: string, timeRange: string) => {
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