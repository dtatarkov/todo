import { describe, it, expect } from 'vitest';
import { DatesServiceImpl } from '#shared/services/datesServiceImpl';

describe('DatesServiceImpl', () => {
  const service = new DatesServiceImpl();

  it('should convert ASP.NET Core date string to Date object', () => {
    const dateString = '2023-10-15T10:00:00';
    const expectedDate = new Date(2023, 9, 15, 10, 0, 0)

    const result = service.fromString(dateString);

    expect(result).toEqual(expectedDate);
  });

  it('should handle null input', () => {
    expect(() => service.fromString(null as any)).toThrow();
  });

  it('should handle undefined input', () => {
    expect(() => service.fromString(undefined as any)).toThrow();
  });

  it('should handle invalid date string', () => {
    expect(() => service.fromString('invalid-date')).toThrow();
  });

  it('should handle empty string', () => {
    expect(() => service.fromString('')).toThrow();
  });

  it('should convert ISO date string with milliseconds', () => {
    const dateString = '2023-10-15T10:00:00.123';
    const expectedDate = new Date(2023, 9, 15, 10, 0, 0, 123);

    const result = service.fromString(dateString);

    expect(result).toEqual(expectedDate);
  });

  it('should handle null input for fromStringOptional', () => {
    const result = service.fromStringOptional(null as any);
    expect(result).toBeUndefined();
  });

  it('should handle undefined input for fromStringOptional', () => {
    const result = service.fromStringOptional(undefined as any);
    expect(result).toBeUndefined();
  });

  it('should handle empty string for fromStringOptional', () => {
    const result = service.fromStringOptional('');
    expect(result).toBeUndefined();
  });

  it('should handle valid date string for fromStringOptional', () => {
    const dateString = '2023-10-15T10:00:00';
    const expectedDate = new Date(2023, 9, 15, 10, 0, 0);

    const result = service.fromStringOptional(dateString);

    expect(result).toEqual(expectedDate);
  });

  it('should handle invalid date string for fromStringOptional', () => {
    expect(() => service.fromStringOptional('invalid-date')).toThrow();
  });

  it('should correctly identify Date objects', () => {
    const date = new Date();
    const result = service.isDate(date);
    expect(result).toBe(true);
  });

  it('should return false for non-Date objects', () => {
    expect(service.isDate('not a date')).toBe(false);
    expect(service.isDate(123)).toBe(false);
    expect(service.isDate(null)).toBe(false);
    expect(service.isDate(undefined)).toBe(false);
    expect(service.isDate({})).toBe(false);
  });

  it('should format date with default options', () => {
    const date = new Date(2023, 9, 15, 10, 30, 45);
    const result = service.formatDate(date);

    expect(result).toBe('15.10.2023, 10:30'); // Russian locale formatting
  });

  it('should throw error for invalid date formatting', () => {
    const date = new Date('invalid-date');

    expect(() => service.formatDate(date)).toThrow();
  });

  it('should return empty string for undefined date in formatDateOptional', () => {
    const result = service.formatDateOptional(undefined);

    expect(result).toBe('');
  });

  it('should return formatted date for valid date in formatDateOptional', () => {
    const date = new Date(2023, 9, 23, 10, 42, 45);
    const result = service.formatDateOptional(date);

    expect(result).toBe('23.10.2023, 10:42');
  });
});