import { Action } from "#shared/types/action";

export abstract class ViewModel<D extends Record<string, any>> {
  protected abstract data: D;
  
  private _handlers = new Set<Action>();
  private _is_initialized = false;

  async init() {
    if(this._is_initialized)
    {
      return;
    }

    await this.handleInitialization();
    this._is_initialized = true;
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