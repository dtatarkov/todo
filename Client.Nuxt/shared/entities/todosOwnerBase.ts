import { ToDosOwner } from "#shared/interfaces/todosOwner";
import { ToDo } from "#shared/interfaces/todo";
import type { ToDosRepository } from "#shared/interfaces/todosRepository";
import type { ToDoDtoMapper } from "#shared/interfaces/todoDtoMapper";
import { TableStateMachine } from "#shared/models/tableStateMachine";

enum ToDoOwnerState {
  initial     = 0,
  initialized = 1,
}

enum ToDoOwnerEvent {
  init = 0
}

export class ToDosOwnerBase extends ToDosOwner
{
  protected todos = new Array<ToDo>();
  
  private stateMachine = new TableStateMachine<ToDoOwnerState, ToDoOwnerEvent>(ToDoOwnerState.initial, [
    {
      from: ToDoOwnerState.initial,
      to: ToDoOwnerState.initialized,
      event: ToDoOwnerEvent.init,
      
      handler: async () => {
        const todoDtos = await this.todosRepository.getAllToDosAsync();
        const todos    = todoDtos.map(todoDto => this.todoDtoMapper.mapToEntity(todoDto));

        this.todos = todos;
      }
    }
  ]) 

  constructor(
    protected todosRepository: ToDosRepository,
    protected todoDtoMapper: ToDoDtoMapper
  )
  {
    super();
  }

  async getAllToDosAsync(): Promise<ToDo[]>
  {
    await this.init();

    return this.todos;
  }

  async init()
  {
    await this.stateMachine.handle(ToDoOwnerEvent.init);
  }
}