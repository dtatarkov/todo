import type { Action } from "~/types/action";

export abstract class Observable<D>
{
  abstract value: D;

  abstract subscribe(handler: Action<[D]>): Action
  abstract unsubscribe(handler: Action<[D]>): void
  abstract destroy(): void
}