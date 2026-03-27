import type { Action } from "~/types/action";

export class ObservableBase<D> {
  private handlers = new Set<Action<[D]>>();
  
  constructor(private data: D) { }
  
  get(): D {
    return this.data;
  }
  
  set(value: D) {
    this.data = value;
   
    this.handlers.forEach(handler => handler(value));
  }
  
  subscribe(handler: Action<[D]>): Action
  {
    this.handlers.add(handler);
    
    return () => {
      this.unsubscribe(handler);
    }
  }
  
  unsubscribe(handler: Action<[D]>)
  {
    this.handlers.delete(handler);
  }
  
  destroy()
  {
    this.handlers.clear();
  }
}