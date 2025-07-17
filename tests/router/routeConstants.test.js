/**
 * Tests for route constants
 */

import { routePaths } from '../../src/router/routeConstants';

describe('Route Constants', () => {
  describe('routePaths Object', () => {
    test('exports routePaths as an object', () => {
      expect(routePaths).toBeDefined();
      expect(typeof routePaths).toBe('object');
      expect(routePaths).not.toBeNull();
    });

    test('contains all expected route properties', () => {
      const expectedRoutes = [
        'home',
        'snakesAndLadders',
        'chessboard',
        'rockPaperScissors',
        'cards',
        'whatsAppChat',
        '404',
      ];

      expectedRoutes.forEach(route => {
        expect(routePaths).toHaveProperty(route);
      });
    });

    test('all route values are strings', () => {
      Object.values(routePaths).forEach(path => {
        expect(typeof path).toBe('string');
      });
    });

    test('all route values start with forward slash', () => {
      Object.values(routePaths).forEach(path => {
        expect(path).toMatch(/^\//);
      });
    });
  });

  describe('Individual Route Paths', () => {
    test('home route is root path', () => {
      expect(routePaths.home).toBe('/');
    });

    test('snakesAndLadders route has correct path', () => {
      expect(routePaths.snakesAndLadders).toBe('/snakes-and-ladders');
    });

    test('chessboard route has correct path', () => {
      expect(routePaths.chessboard).toBe('/chessboard');
    });

    test('rockPaperScissors route has correct path', () => {
      expect(routePaths.rockPaperScissors).toBe('/rock-paper-scissors');
    });

    test('cards route has correct path', () => {
      expect(routePaths.cards).toBe('/cards');
    });

    test('whatsAppChat route has correct path', () => {
      expect(routePaths.whatsAppChat).toBe('/whatsapp-chat');
    });

    test('404 route has correct path', () => {
      expect(routePaths['404']).toBe('/404');
    });
  });

  describe('Route Path Validation', () => {
    test('no route paths are empty strings', () => {
      Object.values(routePaths).forEach(path => {
        expect(path).not.toBe('');
        expect(path.length).toBeGreaterThan(0);
      });
    });

    test('no route paths contain spaces', () => {
      Object.values(routePaths).forEach(path => {
        expect(path).not.toMatch(/\s/);
      });
    });

    test('kebab-case naming convention for multi-word routes', () => {
      expect(routePaths.snakesAndLadders).toMatch(/^\/[a-z]+(-[a-z]+)*$/);
      expect(routePaths.rockPaperScissors).toMatch(/^\/[a-z]+(-[a-z]+)*$/);
      expect(routePaths.whatsAppChat).toMatch(/^\/[a-z]+(-[a-z]+)*$/);
    });

    test('single-word routes follow correct pattern', () => {
      expect(routePaths.chessboard).toMatch(/^\/[a-z]+$/);
      expect(routePaths.cards).toMatch(/^\/[a-z]+$/);
    });
  });

  describe('Route Constants Immutability', () => {
    test('routePaths object is not accidentally modified', () => {
      const originalPaths = { ...routePaths };

      // Attempt to modify (this should not affect the original)
      const _modifiedPaths = { ...routePaths, newRoute: '/new-route' };

      expect(routePaths).toEqual(originalPaths);
      expect(routePaths).not.toHaveProperty('newRoute');
    });

    test('route values are primitive strings', () => {
      Object.values(routePaths).forEach(path => {
        expect(typeof path).toBe('string');
        expect(path.constructor).toBe(String);
      });
    });
  });

  describe('Route Coverage', () => {
    test('covers main application sections', () => {
      // Games section
      expect(routePaths.snakesAndLadders).toBeDefined();
      expect(routePaths.chessboard).toBeDefined();
      expect(routePaths.rockPaperScissors).toBeDefined();
      expect(routePaths.cards).toBeDefined();

      // Apps section
      expect(routePaths.whatsAppChat).toBeDefined();

      // Core routes
      expect(routePaths.home).toBeDefined();
      expect(routePaths['404']).toBeDefined();
    });

    test('total number of routes matches expected count', () => {
      const routeCount = Object.keys(routePaths).length;
      expect(routeCount).toBe(7);
    });
  });

  describe('Route Path Consistency', () => {
    test('camelCase property names map to kebab-case paths', () => {
      expect(routePaths.snakesAndLadders).toBe('/snakes-and-ladders');
      expect(routePaths.rockPaperScissors).toBe('/rock-paper-scissors');
      expect(routePaths.whatsAppChat).toBe('/whatsapp-chat');
    });

    test('single-word properties map to lowercase paths', () => {
      expect(routePaths.chessboard).toBe('/chessboard');
      expect(routePaths.cards).toBe('/cards');
    });

    test('special routes follow expected patterns', () => {
      expect(routePaths.home).toBe('/');
      expect(routePaths['404']).toBe('/404');
    });
  });

  describe('Route Utilities', () => {
    test('can extract all route paths as array', () => {
      const allPaths = Object.values(routePaths);

      expect(Array.isArray(allPaths)).toBe(true);
      expect(allPaths.length).toBe(7);
      expect(allPaths).toContain('/');
      expect(allPaths).toContain('/404');
    });

    test('can extract all route names as array', () => {
      const allNames = Object.keys(routePaths);

      expect(Array.isArray(allNames)).toBe(true);
      expect(allNames.length).toBe(7);
      expect(allNames).toContain('home');
      expect(allNames).toContain('404');
    });

    test('can check for specific route existence', () => {
      expect('home' in routePaths).toBe(true);
      expect('nonExistentRoute' in routePaths).toBe(false);
    });
  });
});
