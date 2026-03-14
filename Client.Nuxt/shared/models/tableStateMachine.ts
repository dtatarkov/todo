import type { Func } from "#shared/types/func";

export class TableStateMachine<TState, TEvent>
{
  private states: Map<TState, Map<TEvent, { to: TState; handler: Func<Promise<void>> }>> = new Map();
  private currentState: TState;

  constructor(initialState: TState, states?: Array<{
    from: TState;
    to: TState;
    event: TEvent;
    handler: Func<Promise<void>>;
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

  addTransition(from: TState, to: TState, event: TEvent, handler: Func<Promise<void>>): this
  {
    if (!this.states.has(from))
    {
      this.states.set(from, new Map());
    }
    
    this.states.get(from)!.set(event, { to, handler });
    
    return this;
  }

  canHandle(event: TEvent): boolean
  {
    return this.states.has(this.currentState) &&
      this.states.get(this.currentState)!.has(event);
  }

  async handle(event: TEvent)
  {
    if (!this.canHandle(event))
    {
      return;
    }

    const { to, handler }  = this.states.get(this.currentState)!.get(event)!;

    await handler();
    this.currentState = to;    
  }

  getCurrentState(): TState
  {
    return this.currentState;
  }
}
