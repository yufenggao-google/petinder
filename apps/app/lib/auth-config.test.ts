
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { isValidRedirectUrl, authConfig } from './auth-config';

describe('isValidRedirectUrl', () => {
  const originalWindow = global.window;

  beforeEach(() => {
    global.window = {
      location: {
        origin: 'http://localhost:5173',
      },
    } as any;
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  it('should allow relative paths', () => {
    expect(isValidRedirectUrl('/dashboard')).toBe(true);
    expect(isValidRedirectUrl('/settings/profile')).toBe(true);
  });

  it('should reject absolute URLs (function enforces relative paths)', () => {
    expect(isValidRedirectUrl('http://localhost:5173/dashboard')).toBe(false);
  });

  it('should reject external URLs', () => {
    expect(isValidRedirectUrl('https://google.com')).toBe(false);
    expect(isValidRedirectUrl('http://example.com')).toBe(false);
  });

  it('should reject protocol-relative URLs', () => {
    expect(isValidRedirectUrl('//google.com')).toBe(false);
  });

  it('should reject URLs with backslashes', () => {
    expect(isValidRedirectUrl('/\\google.com')).toBe(false);
    expect(isValidRedirectUrl('\\\\google.com')).toBe(false);
    expect(isValidRedirectUrl('/path\\to\\somewhere')).toBe(false);
  });

  it('should handle invalid URLs gracefully', () => {
    expect(isValidRedirectUrl('not-a-url')).toBe(false);
  });
});
