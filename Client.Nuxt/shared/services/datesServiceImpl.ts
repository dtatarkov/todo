import { DateTime } from 'luxon';
import { DatesService } from '#shared/interfaces/datesService';

export class DatesServiceImpl extends DatesService {
  fromString(dateString: string): Date {
    const dateTime = DateTime.fromISO(dateString);
    return dateTime.toJSDate();
  }

  formatDate(date: Date, options = DateTime.DATETIME_SHORT): string {
    const dateTime = DateTime.fromJSDate(date);
    const result = dateTime.toLocaleString(options);
    
    if(!result)
    {
      throw new Error(`Date(${date.toString()}) formatting error`);
    }
    
    return result;
  }

  formatDateOptional(date?: Date, options?: Intl.DateTimeFormatOptions): string {
    if(!date)
    {
      return '';
    }
    
    return this.formatDate(date, options);
  }
  
  isDate(value: any): value is Date {
    return value instanceof Date;
  }
}
