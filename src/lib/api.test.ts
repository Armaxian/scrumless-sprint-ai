import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { authService, teamService, UserSchema, TeamSchema } from './api';

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    })),
  },
}));

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('API Services', () => {
  const mockAxios = axios.create() as ReturnType<typeof vi.mocked<typeof axios.create>> & {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    mockAxios.get.mockClear();
    mockAxios.post.mockClear();
    mockAxios.put.mockClear();
    mockAxios.delete.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Auth Service', () => {
    const mockUserData = {
      id: 'user123',
      name: 'Test User',
      email: 'test@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    };

    const mockAuthResponse = {
      data: {
        token: 'jwt-token',
        refreshToken: 'refresh-token',
        user: mockUserData,
      },
    };

    it('should validate user data with zod schema', () => {
      const result = UserSchema.safeParse(mockUserData);
      expect(result.success).toBe(true);
    });

    it('should call login endpoint with correct parameters', async () => {
      mockAxios.post.mockResolvedValueOnce(mockAuthResponse);
      
      await authService.login('github', 'test-code');
      
      expect(mockAxios.post).toHaveBeenCalledWith('/auth/login', {
        provider: 'github',
        code: 'test-code',
      });
    });

    it('should store auth token in localStorage after login', async () => {
      mockAxios.post.mockResolvedValueOnce(mockAuthResponse);
      
      await authService.login('github', 'test-code');
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith('auth_token', 'jwt-token');
    });

    it('should remove auth token from localStorage after logout', async () => {
      mockLocalStorage.setItem('auth_token', 'jwt-token');
      mockAxios.post.mockResolvedValueOnce({});
      
      await authService.logout();
      
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('auth_token');
    });
  });

  describe('Team Service', () => {
    const mockTeam = {
      id: 'team123',
      name: 'Test Team',
      description: 'A test team',
      members: ['user1', 'user2'],
    };

    it('should validate team data with zod schema', () => {
      const result = TeamSchema.safeParse(mockTeam);
      expect(result.success).toBe(true);
    });

    it('should call getTeams endpoint', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: [mockTeam] });
      
      await teamService.getTeams();
      
      expect(mockAxios.get).toHaveBeenCalledWith('/teams');
    });

    it('should call getTeam endpoint with correct ID', async () => {
      mockAxios.get.mockResolvedValueOnce({ data: mockTeam });
      
      await teamService.getTeam('team123');
      
      expect(mockAxios.get).toHaveBeenCalledWith('/teams/team123');
    });

    it('should call createTeam endpoint with correct data', async () => {
      const newTeam = { name: 'New Team', description: 'A new team' };
      mockAxios.post.mockResolvedValueOnce({ data: { id: 'new123', ...newTeam } });
      
      await teamService.createTeam(newTeam);
      
      expect(mockAxios.post).toHaveBeenCalledWith('/teams', newTeam);
    });

    it('should call updateTeam endpoint with correct data', async () => {
      const updateData = { name: 'Updated Team' };
      mockAxios.put.mockResolvedValueOnce({ data: { ...mockTeam, ...updateData } });
      
      await teamService.updateTeam('team123', updateData);
      
      expect(mockAxios.put).toHaveBeenCalledWith('/teams/team123', updateData);
    });
  });
}); 