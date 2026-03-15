import { ViewModel } from "#shared/interfaces/viewmodel";
import { Action } from "#shared/types/action";
import { TableStateMachine } from "#shared/models/tableStateMachine";

enum ViewModelState
{
  initial     = 0,
  initialized = 1,
  destroyed   = 2,
}

enum ViewModelEvent
{
  init    = 0,
  destroy = 1,
}

export abstract class ViewModelBase<D extends Record<string, any>> extends ViewModel<D>
{
  protected abstract data: D;

  private _changeHandlers  = new Set<Action>();
  private _destroyHandlers = new Set<Action>();

  private stateMachine = new TableStateMachine<ViewModelState, ViewModelEvent>(ViewModelState.initial, [
    {
      from : ViewModelState.initial,
      to   : ViewModelState.initialized,
      event: ViewModelEvent.init,

      handler: async () => this.handleInitialization()
    },

    {
      from : ViewModelState.initialized,
      to   : ViewModelState.destroyed,
      event: ViewModelEvent.destroy,

      handler: async () => this.handleDestruction()
    }
  ]);

  async init(): Promise<void>
  {
    await this.stateMachine.handle(ViewModelEvent.init);
  }

  async destroy(): Promise<void>
  {
    await this.stateMachine.handle(ViewModelEvent.destroy);
  }

  getData(): D
  {
    return this.data;
  }

  setData(newData: Partial<D>): void
  {
    this.data = { ...this.data, ...newData };

    this._changeHandlers.forEach(handler => handler());
  }

  subscribe(handler: Action): void
  {
    this._changeHandlers.add(handler);
  }

  unsubscribe(handler: Action): void
  {
    this._changeHandlers.delete(handler);
  }

  protected async handleInitialization(): Promise<void>
  {

  }

  protected async handleDestruction(): Promise<void>
  {
    this._changeHandlers.clear();

    this._destroyHandlers.forEach(handler => handler());
    this._destroyHandlers.clear();
  }

  protected addDestroyHandler(handler: Action)
  {
    this._destroyHandlers.add(handler);
  }
}