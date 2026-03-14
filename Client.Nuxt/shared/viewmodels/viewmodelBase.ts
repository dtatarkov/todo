import { ViewModel } from "#shared/interfaces/viewmodel";
import { Action } from "#shared/types/action";
import { TableStateMachine } from "#shared/models/tableStateMachine";

enum ViewModelState {
  initial     = 0,
  initialized = 1,
}

enum ViewModelEvent {
  init = 0
}

export abstract class ViewModelBase<D extends Record<string, any>> extends ViewModel<D> {
  protected abstract data: D;

  private _handlers = new Set<Action>();

  private stateMachine = new TableStateMachine<ViewModelState, ViewModelEvent>(ViewModelState.initial, [
    {
      from: ViewModelState.initial,
      to: ViewModelState.initialized,
      event: ViewModelEvent.init,

      handler: async () => this.handleInitialization()
    }
  ]);

  async init() {
    await this.stateMachine.handle(ViewModelEvent.init);
  }

  getData() {
    return this.data;
  }

  setData(newData: Partial<D>)
  {
    this.data = { ...this.data, ...newData };

    this._handlers.forEach(handler => handler());
  }

  subscribe(handler: Action): void {
    this._handlers.add(handler);
  }

  unsubscribe(handler: Action): void {
    this._handlers.delete(handler);
  }

  protected async handleInitialization(): Promise<void> { }
}