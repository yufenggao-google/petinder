import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('should merge classes', () => {
    expect(cn('p-4', 'bg-red-500')).toBe('p-4 bg-red-500');
  });

  it('should handle conditional classes', () => {
    expect(cn('p-4', true && 'bg-red-500', false && 'text-white')).toBe('p-4 bg-red-500');
  });

  it('should handle tailwind merge conflicts', () => {
      expect(cn('p-4', 'p-8')).toBe('p-8');
  });
});
