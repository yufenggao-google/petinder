
import { describe, it, expect, beforeAll } from 'vitest';
import { isValidRedirectUrl } from './auth-config';

describe('isValidRedirectUrl', () => {
  const originalLocation = window.location;

  beforeAll(() => {
    // Mock window.location if not available (though happy-dom should provide it)
    if (!window.location) {
        Object.defineProperty(global, 'window', {
            value: {
                location: {
                    origin: 'http://localhost:5173'
                }
            },
            writable: true
        });
    }
  });

  it('should allow simple relative paths', () => {
    expect(isValidRedirectUrl('/dashboard')).toBe(true);
    expect(isValidRedirectUrl('/settings/profile')).toBe(true);
  });

  it('should reject absolute URLs even if origin matches', () => {
    expect(isValidRedirectUrl('http://localhost:5173/dashboard')).toBe(false);
  });

  it('should reject external URLs', () => {
    expect(isValidRedirectUrl('https://google.com')).toBe(false);
    expect(isValidRedirectUrl('http://malicious.com')).toBe(false);
  });

  it('should reject protocol-relative URLs', () => {
    expect(isValidRedirectUrl('//google.com')).toBe(false);
  });

  it('should reject URLs with backslashes (potential open redirect)', () => {
    // This is the one we expect to fail currently if the fix isn't applied
    expect(isValidRedirectUrl('/\\google.com')).toBe(false);
    expect(isValidRedirectUrl('\\google.com')).toBe(false);
    expect(isValidRedirectUrl('/\\/google.com')).toBe(false);
  });
});
