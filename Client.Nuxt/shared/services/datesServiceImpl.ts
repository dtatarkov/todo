import { DateTime } from 'luxon';
import { DatesService } from '#shared/interfaces/datesService';

export class DatesServiceImpl extends DatesService {
  fromString(dateString: string): Date {
    const dateTime = DateTime.fromISO(dateString);
    return dateTime.toJSDate();
  }
}
