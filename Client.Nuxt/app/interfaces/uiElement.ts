import type { Action } from "~/types/action";
export abstract class UIElement<D extends Record<string, any>> {
  abstract name: string;
  abstract data: D;
  
  abstract setData(data: Partial<D>): void;
  
  abstract init(): Promise<void>;
  abstract destroy(): void;
  abstract subscribe(handler: Action): Action;
  abstract unsubscribe(handler: Action): void
}