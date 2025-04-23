import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Define handlers for mock API
const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token',
      user: {
        id: 'user1',
        name: 'Test User',
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      },
    });
  }),
  
  http.post('/api/auth/logout', () => {
    return new HttpResponse(null, { status: 204 });
  }),
  
  http.get('/api/auth/me', () => {
    return HttpResponse.json({
      id: 'user1',
      name: 'Test User',
      email: 'test@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
    });
  }),
  
  // Teams endpoints
  http.get('/api/teams', () => {
    return HttpResponse.json([
      {
        id: 'team1',
        name: 'Frontend Team',
        description: 'Frontend development team',
        members: ['user1', 'user2'],
      },
      {
        id: 'team2',
        name: 'Backend Team',
        description: 'Backend development team',
        members: ['user3', 'user4'],
      },
    ]);
  }),
];

// Setup MSW server
const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Clean up after each test
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Close server after all tests
afterAll(() => server.close());

// Global mocks
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})); 