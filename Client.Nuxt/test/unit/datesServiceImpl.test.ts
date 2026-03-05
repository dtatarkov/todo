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
});