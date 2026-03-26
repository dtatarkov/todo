import { ToDosOwner } from "@/interfaces/todosOwner";
import { ToDo } from "@/interfaces/todo";
import type { ToDosRepository } from "@/interfaces/todosRepository";
import type { ToDoDtoMapper } from "@/interfaces/todoDtoMapper";
import type { SSRLoader } from "~/interfaces/ssrLoader";

enum ToDoOwnerState
{
  initial      = 0,
  initializing = 2,
  initialized  = 1,
}

export class ToDosOwnerBase extends ToDosOwner
{
  protected todos = new Array<ToDo>();

  protected state = ToDoOwnerState.initial;

  constructor(
    protected todosRepository: ToDosRepository,
    protected todoDtoMapper: ToDoDtoMapper,
    protected ssrLoader: SSRLoader
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
    if (this.state != ToDoOwnerState.initial)
    {
      return;
    }

    this.state = ToDoOwnerState.initializing;

    const todoDtos = await this.ssrLoader.loadAsync('todos', () => this.todosRepository.getAllToDosAsync());
    const todos    = todoDtos.map(todoDto => this.todoDtoMapper.mapToEntity(todoDto));

    this.todos = todos;

    this.state = ToDoOwnerState.initialized;
  }
}