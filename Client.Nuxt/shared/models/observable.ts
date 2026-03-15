export class Observable<D> {
  private handlers = new Set<Action<[D]>>();
  
  constructor(private data: D) { }
  
  get(): D {
    return this.data;
  }
  
  set(value: D) {
    this.data = value;
   
    this.handlers.forEach(handler => handler(value));
  }
  
  subscribe(handler: Action<[D]>)
  {
    this.handlers.add(handler);
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