import { describe, it, expect } from 'vitest';
import { isValidRedirectUrl, shouldRefreshSession, authConfig } from './auth-config';

describe('isValidRedirectUrl', () => {
  it('should return true for valid relative URLs', () => {
    // Verify that the current window origin is in the allowed list
    const origin = window.location.origin;
    // Note: If this fails, it means the test environment setup doesn't match the code's assumption
    // about window.location.origin being available at module load time.
    // In happy-dom, window is available.

    expect(isValidRedirectUrl('/dashboard')).toBe(true);
    expect(isValidRedirectUrl('/settings/profile')).toBe(true);
  });

  it('should return false for absolute URLs to external domains', () => {
    expect(isValidRedirectUrl('https://google.com')).toBe(false);
    expect(isValidRedirectUrl('//google.com')).toBe(false);
  });

  it('should return false for invalid URLs', () => {
      // javascript: is technically a relative URL in some contexts or parsed weirdly,
      // but new URL('javascript:alert(1)', origin) might throw or produce opaque origin.
      // But our check is: !url.startsWith("/")
      expect(isValidRedirectUrl('javascript:alert(1)')).toBe(false);
  });

  it('should return false for backslashes (open redirect prevention)', () => {
      expect(isValidRedirectUrl('\\google.com')).toBe(false);
  });
});

describe('shouldRefreshSession', () => {
  it('should return true if session is expiring soon', () => {
    const threshold = authConfig.session.refreshThreshold;
    const now = Date.now();
    // expiring in threshold - 1 second (so strictly less than threshold)
    const expiresAt = new Date(now + threshold - 1000);

    expect(shouldRefreshSession(expiresAt)).toBe(true);
  });

  it('should return false if session has plenty of time', () => {
    const threshold = authConfig.session.refreshThreshold;
    const now = Date.now();
    // expiring in threshold + 1 second
    const expiresAt = new Date(now + threshold + 1000);

    expect(shouldRefreshSession(expiresAt)).toBe(false);
  });

  it('should return false if session is already expired', () => {
      const now = Date.now();
      const expiresAt = new Date(now - 1000);
      expect(shouldRefreshSession(expiresAt)).toBe(false);
  });
});
