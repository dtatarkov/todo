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
  protected state = ToDoOwnerState.initial;

  private _todos = shallowRef(new Array<ToDo>());
  
  readonly todos = computed(() => this._todos.value);

  constructor(
    protected todosRepository: ToDosRepository,
    protected todoDtoMapper: ToDoDtoMapper,
    protected ssrLoader: SSRLoader
  )
  {
    super();

    this.init();
  }

  override getToDoById(id: string): ToDo | undefined
  {
    const result = this.todos.value.find(todo => todo.id === id);

    return result;
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

    this._todos.value = todos;

    this.state = ToDoOwnerState.initialized;
  }
}