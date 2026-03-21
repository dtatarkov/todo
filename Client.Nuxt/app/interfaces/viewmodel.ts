import type { Action } from "@/types/action";

export abstract class ViewModel<D extends Record<string, any>> {
  readonly abstract name: string;
  
  abstract updateData(): Promise<void>
  abstract init(): void
  abstract destroy(): void
  abstract getData(): D
  abstract setData(newData: Partial<D>): void;
  abstract subscribe(handler: Action): Action
  abstract unsubscribe(handler: Action): void
}