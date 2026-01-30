
import { describe, it, expect } from 'vitest';
import { isValidRedirectUrl, getSafeRedirectUrl, shouldRefreshSession } from './auth-config';

describe('auth-config', () => {
  describe('isValidRedirectUrl', () => {
    it('should accept relative URLs starting with /', () => {
      expect(isValidRedirectUrl('/dashboard')).toBe(true);
      expect(isValidRedirectUrl('/settings/profile')).toBe(true);
    });

    it('should reject URLs not starting with /', () => {
      expect(isValidRedirectUrl('dashboard')).toBe(false);
      expect(isValidRedirectUrl('https://example.com')).toBe(false);
    });

    it('should reject protocol-relative URLs', () => {
      expect(isValidRedirectUrl('//example.com')).toBe(false);
      expect(isValidRedirectUrl('//localhost')).toBe(false);
    });

    // Security edge case: backslashes
    it('should reject URLs with backslashes that could be normalized to //', () => {
      expect(isValidRedirectUrl('/\\example.com')).toBe(false);
      expect(isValidRedirectUrl('\\\\example.com')).toBe(false);
    });

    it('should reject absolute URLs even if matching the origin (strictly relative)', () => {
       const origin = window.location.origin;
       expect(isValidRedirectUrl(`${origin}/dashboard`)).toBe(false);
    });

    it('should reject absolute URLs with different origin', () => {
       expect(isValidRedirectUrl('https://evil.com/dashboard')).toBe(false);
    });
  });

  describe('getSafeRedirectUrl', () => {
    it('should return valid URLs as is', () => {
      expect(getSafeRedirectUrl('/dashboard')).toBe('/dashboard');
    });

    it('should return / for invalid URLs', () => {
      expect(getSafeRedirectUrl('https://evil.com')).toBe('/');
      expect(getSafeRedirectUrl(null)).toBe('/');
      expect(getSafeRedirectUrl(undefined)).toBe('/');
    });
  });

  describe('shouldRefreshSession', () => {
     it('should return false if no expiry date', () => {
         expect(shouldRefreshSession(undefined)).toBe(false);
     });

     it('should return true if expiring soon', () => {
         // Default threshold is 10 minutes
         const soon = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
         expect(shouldRefreshSession(soon)).toBe(true);
     });

     it('should return false if not expiring soon', () => {
         const later = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes from now
         expect(shouldRefreshSession(later)).toBe(false);
     });

     it('should return false if already expired', () => {
         const past = new Date(Date.now() - 1000);
         expect(shouldRefreshSession(past)).toBe(false);
     });
  });
});
