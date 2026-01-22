
import { describe, it, expect } from 'vitest';
import { isValidRedirectUrl } from './auth-config';

describe('isValidRedirectUrl', () => {
  it('should return true for valid relative URLs', () => {
    expect(isValidRedirectUrl('/dashboard')).toBe(true);
    expect(isValidRedirectUrl('/settings/profile')).toBe(true);
  });

  it('should return false for absolute URLs', () => {
    expect(isValidRedirectUrl('https://example.com')).toBe(false);
    expect(isValidRedirectUrl('http://malicious.com')).toBe(false);
  });

  it('should return false for protocol-relative URLs', () => {
    expect(isValidRedirectUrl('//example.com')).toBe(false);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidRedirectUrl('javascript:alert(1)')).toBe(false);
  });
});
