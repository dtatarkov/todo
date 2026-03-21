import { ToDosOwner } from "@/interfaces/todosOwner";
import { ToDo } from "@/interfaces/todo";
import type { ToDosRepository } from "@/interfaces/todosRepository";
import type { ToDoDtoMapper } from "@/interfaces/todoDtoMapper";
import { TableStateMachine } from "@/models/tableStateMachine";

enum ToDoOwnerState
{
  initial      = 0,
  initializing = 2,
  initialized  = 1,
}

enum ToDoOwnerEvent
{
  init       = 0,
  finishInit = 1,
}

export class ToDosOwnerBase extends ToDosOwner
{
  protected todos = new Array<ToDo>();

  private stateMachine = new TableStateMachine<ToDoOwnerState, ToDoOwnerEvent>(ToDoOwnerState.initial, [
    {
      from : ToDoOwnerState.initial,
      to   : ToDoOwnerState.initializing,
      event: ToDoOwnerEvent.init,

      handler: async () =>
      {
        const todoDtos = await this.todosRepository.getAllToDosAsync();
        const todos    = todoDtos.map(todoDto => this.todoDtoMapper.mapToEntity(todoDto));

        this.todos = todos;

        this.stateMachine.handle(ToDoOwnerEvent.finishInit);
      }
    },

    {
      from : ToDoOwnerState.initializing,
      to   : ToDoOwnerState.initialized,
      event: ToDoOwnerEvent.finishInit,
    }
  ])

  constructor(
    protected todosRepository: ToDosRepository,
    protected todoDtoMapper: ToDoDtoMapper
  )
  {
    super();
  }

  getAllToDos(): ToDo[]
  {
    return this.todos;
  }

  override getToDoById(id: string): ToDo | undefined
  {
    const todo = this.todos.find(todo => todo.id === id);

    return todo;
  }

  async init()
  {
    this.stateMachine.handle(ToDoOwnerEvent.init);
    await this.stateMachine.awaitState(ToDoOwnerState.initialized);
  }
}