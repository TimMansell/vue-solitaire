import { describe, it, expect } from 'vitest';
import { matchesMedia } from '../matchMedia';
import matchMedia from '../../__tests__/__mocks__/matchMedia.mock';

describe('MatchMedia', () => {
  describe('should match media', () => {
    it('should match xs', () => {
      matchMedia.useMediaQuery('(min-width: 360px)');

      const matches = matchesMedia('xs');

      expect(matches).toBe(true);
    });

    it('should match sm', () => {
      matchMedia.useMediaQuery('(min-width: 480px)');

      const matches = matchesMedia('sm');

      expect(matches).toBe(true);
    });

    it('should match md', () => {
      matchMedia.useMediaQuery('(min-width: 768px)');

      const matches = matchesMedia('md');

      expect(matches).toBe(true);
    });

    it('should match lg', () => {
      matchMedia.useMediaQuery('(min-width: 1024px)');

      const matches = matchesMedia('lg');

      expect(matches).toBe(true);
    });

    it('should match xl', () => {
      matchMedia.useMediaQuery('(min-width: 1366px)');

      const matches = matchesMedia('xl');

      expect(matches).toBe(true);
    });
  });

  describe('should not match media', () => {
    it('should not match xs', () => {
      matchMedia.useMediaQuery('(min-width: 361px)');

      const matches = matchesMedia('xs');

      expect(matches).toBe(false);
    });

    it('should not match sm', () => {
      matchMedia.useMediaQuery('(min-width: 481px)');

      const matches = matchesMedia('sm');

      expect(matches).toBe(false);
    });

    it('should not match md', () => {
      matchMedia.useMediaQuery('(min-width: 769px)');

      const matches = matchesMedia('md');

      expect(matches).toBe(false);
    });

    it('should not match lg', () => {
      matchMedia.useMediaQuery('(min-width: 1025px)');

      const matches = matchesMedia('lg');

      expect(matches).toBe(false);
    });

    it('should not match xl', () => {
      matchMedia.useMediaQuery('(min-width: 1367px)');

      const matches = matchesMedia('xl');

      expect(matches).toBe(false);
    });
  });
});
