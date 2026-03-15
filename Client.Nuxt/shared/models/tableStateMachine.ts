export class TableStateMachine<TState, TEvent>
{
  private states: Map<TState, Map<TEvent, { to: TState; handler?: Action }>> = new Map();
  private stateAwaiters: Map<TState, Set<Action>> = new Map();
  private currentState: TState;

  constructor(initialState: TState, states?: Array<{
    from: TState;
    to: TState;
    event: TEvent;
    handler?: Action;
  }>)
  {
    this.currentState = initialState;

    if (states)
    {
      for (const state of states)
      {
        this.addTransition(state.from, state.to, state.event, state.handler);
      }
    }
  }

  addTransition(from: TState, to: TState, event: TEvent, handler?: Action): this
  {
    let stateTransitions = this.states.get(from);
    
    if (!stateTransitions)
    {
      stateTransitions = new Map();
      this.states.set(from, stateTransitions);
    }

    stateTransitions.set(event, { to, handler });
    
    return this;
  }

  canHandle(event: TEvent): boolean
  {
    return this.states.has(this.currentState) &&
      this.states.get(this.currentState)!.has(event);
  }

  handle(event: TEvent)
  {
    if (!this.canHandle(event))
    {
      return;
    }

    const { to, handler }  = this.states.get(this.currentState)!.get(event)!;

    handler?.();
    this.setState(to); 
  }

  getCurrentState(): TState
  {
    return this.currentState;
  }
  
  awaitState(state: TState): Promise<void>
  {
    return new Promise(resolve => {
      if(this.currentState === state)
      {
        resolve();
      }
      
      let awaiters = this.stateAwaiters.get(state);

      if (!awaiters)
      {
        awaiters = new Set<Action>();
        this.stateAwaiters.set(state, awaiters);
      }

      awaiters?.add(resolve);
    });
  }

  private setState(state: TState) {
    this.currentState = state;
    
    let stateAwaiters = this.stateAwaiters.get(state);
    
    if(stateAwaiters) {
      stateAwaiters.forEach(awaiter => awaiter());
      this.stateAwaiters.delete(state);
    }
  }
}
