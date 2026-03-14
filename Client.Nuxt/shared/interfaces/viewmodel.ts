import { Action } from "#shared/types/action";

export abstract class ViewModel<D extends Record<string, any>> {
  readonly abstract name: string;
  
  abstract init(): Promise<void>
  abstract getData(): D
  abstract setData(newData: Partial<D>): void;
  abstract subscribe(handler: Action): void
  abstract unsubscribe(handler: Action): void
}