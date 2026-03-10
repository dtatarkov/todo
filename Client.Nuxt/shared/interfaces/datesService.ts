export abstract class DatesService {
  abstract fromString(dateString: string): Date;
  abstract formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string;
  abstract formatDateOptional(date?: Date, options?: Intl.DateTimeFormatOptions): string;
  abstract isDate(value?: any): value is Date;
}
