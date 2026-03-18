import { DateTime } from 'luxon';
import { DatesService } from '#shared/interfaces/datesService';

export class DatesServiceImpl extends DatesService {
  private config = useRuntimeConfig();
  
  fromString(dateString: string): Date {
    const dateTime = DateTime.fromISO(dateString);
    
    if(!dateTime.isValid)
    {
      throw new Error(`Date(${dateString}) parsing error`);
    }
    
    return dateTime.toJSDate();
  }

  fromStringOptional(dateString?: string): Date | undefined {
    if(!dateString)
    {
      return undefined;
    }
    
    const date = this.fromString(dateString);
    return date;
  }

  formatDate(date: Date, options = DateTime.DATETIME_SHORT): string {
    const dateTime = DateTime.fromJSDate(date);

    if(!dateTime.isValid)
    {
      throw new Error(`Invalid date(${date.toString()})`);
    }
    
    const result = dateTime
      .setLocale(this.config.public.locale)
      .toLocaleString(options);
    
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
