import { describe, it, expect } from 'vitest';
import { cn } from './utils';

// Basic usage

describe('cn utility', () => {
  it('combines class names as expected', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('merges Tailwind classes correctly', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4'); // tailwind-merge keeps the last
  });

  it('returns an empty string for no input', () => {
    expect(cn()).toBe('');
  });

  it('handles null, undefined, and empty values', () => {
    expect(cn(null, undefined, '', false)).toBe('');
  });

  it('handles arrays and nested arrays', () => {
    expect(cn(['foo', ['bar', false], 'baz'])).toBe('foo bar baz');
  });
}); 