import { describe, it, expect } from 'vitest';
import { isValidRedirectUrl } from './auth-config';

describe('isValidRedirectUrl', () => {
  it('allows simple relative paths', () => {
    expect(isValidRedirectUrl('/dashboard')).toBe(true);
    expect(isValidRedirectUrl('/settings/profile')).toBe(true);
  });

  it('rejects absolute URLs', () => {
    expect(isValidRedirectUrl('https://google.com')).toBe(false);
    expect(isValidRedirectUrl('http://malicious.com')).toBe(false);
  });

  it('rejects protocol-relative URLs', () => {
    expect(isValidRedirectUrl('//google.com')).toBe(false);
  });

  it('rejects URLs with backslashes', () => {
    expect(isValidRedirectUrl('/path\\with\\backslashes')).toBe(false);
    expect(isValidRedirectUrl('\\path')).toBe(false);
    expect(isValidRedirectUrl('/\\google.com')).toBe(false);
  });
});
