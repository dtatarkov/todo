import type { AbstractConstructor } from "~/types/abstractConstructor";
import type { UIElement } from "~/interfaces/uiElement";
import type { Action } from "~/types/action";

enum UIElementState
{
  initial      = 0,
  initializing = 3,
  initialized  = 1,
  destroyed    = 2,
}

export function WithUIElementBasics<D extends Record<string, any>, TBase extends AbstractConstructor<UIElement<D>>>(Base: TBase)
{
  abstract class UIElementWithBasics extends Base
  {
    constructor(...args: any[])
    {
      super(...args);
    }

    private _changeHandlers  = new Set<Action>();
    private _destroyHandlers = new Set<Action>();

    private state = UIElementState.initial;    

    setData(data: Partial<D>)
    {
      this.data = { ...this.data, ...data };

      this._changeHandlers.forEach(handler => handler());
    }

    async init(): Promise<void>
    {
      if (this.state != UIElementState.initial)
      {
        throw new Error('UIElement is already initialized');
      }
      
      this.state = UIElementState.initializing;
      await this.handleInitialization();
      this.state = UIElementState.initialized;
    }

    destroy(): void
    {
      if (this.state != UIElementState.initialized)
      {
        throw new Error("UIElement is not initialized");
      }

      this.handleDestruction();
      this.state = UIElementState.destroyed;
    }

    subscribe(handler: Action): Action
    {
      this._changeHandlers.add(handler);

      return () => this.unsubscribe(handler);
    }

    unsubscribe(handler: Action): void
    {
      this._changeHandlers.delete(handler);
    }

    protected async handleInitialization(): Promise<void>
    {

    }

    protected handleDestruction(): void
    {
      this._changeHandlers.clear();

      this._destroyHandlers.forEach(handler => handler());
      this._destroyHandlers.clear();
    }
  }

  return UIElementWithBasics;
}