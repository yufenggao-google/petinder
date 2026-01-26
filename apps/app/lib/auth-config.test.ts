import { describe, it, expect } from 'vitest';
import { isValidRedirectUrl } from './auth-config';

describe('isValidRedirectUrl', () => {
  it('should allow valid relative paths', () => {
    expect(isValidRedirectUrl('/dashboard')).toBe(true);
    expect(isValidRedirectUrl('/settings/profile')).toBe(true);
    expect(isValidRedirectUrl('/?foo=bar')).toBe(true);
  });

  it('should reject absolute URLs', () => {
    expect(isValidRedirectUrl('https://example.com')).toBe(false);
    expect(isValidRedirectUrl('http://example.com')).toBe(false);
    expect(isValidRedirectUrl('ftp://example.com')).toBe(false);
  });

  it('should reject protocol-relative URLs', () => {
    expect(isValidRedirectUrl('//example.com')).toBe(false);
  });

  it('should reject URLs with backslashes', () => {
    // These might be caught by URL parsing depending on environment,
    // but we want explicit rejection.
    expect(isValidRedirectUrl('/\\example.com')).toBe(false);

    // This one should definitely pass currently (return true) if we don't check backslashes,
    // because it's just a path. But we want to fail it.
    expect(isValidRedirectUrl('/path\\with\\backslashes')).toBe(false);
  });
});
