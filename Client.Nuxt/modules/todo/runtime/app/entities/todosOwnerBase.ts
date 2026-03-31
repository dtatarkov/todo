import { ToDosOwner } from "../interfaces/todosOwner";
import { ToDo } from "../interfaces/todo";
import type { ToDosRepository } from "../interfaces/todosRepository";
import type { ToDoDtoMapper } from "../interfaces/todoDtoMapper";
import type { ToDoGetDto } from "../types/toDoGetDto";

export class ToDosOwnerBase extends ToDosOwner
{
  private _todos = shallowRef(new Array<ToDo>());

  readonly todos = computed(() => this._todos.value);

  states: Record<'initial' | 'initializing' | 'initialized', TodosOwnerBaseState>
  state: TodosOwnerBaseState;

  constructor(
    protected todosRepository: ToDosRepository,
    protected todoDtoMapper: ToDoDtoMapper,
    protected ssrLoader: SSRLoader
  )
  {
    super();

    this.states = {
      initial     : new ToDosOwnerBaseStateInitial(this.todosRepository, this.todoDtoMapper, this.ssrLoader),
      initializing: new ToDosOwnerBaseStateInitializing(),
      initialized : new ToDosOwnerBaseStateInitialized(this.todosRepository, this.todoDtoMapper)
    }

    this.state = this.states.initial;
  }

  setToDos(todos: ToDo[])
  {
    this._todos.value = todos;
  }

  override getToDoById(id: string): ToDo | undefined
  {
    const result = this.todos.value.find(todo => todo.id === id);

    return result;
  }

  async updateToDosAsync()
  {
    await this.state.updateToDosAsync(this);
  }
}

abstract class TodosOwnerBaseState
{
  abstract updateToDosAsync(owner: ToDosOwnerBase): Promise<void>;
}

class ToDosOwnerBaseStateBase extends TodosOwnerBaseState
{
  async updateToDosAsync(owner: ToDosOwnerBase): Promise<void>
  {
  }
}

class ToDosOwnerBaseStateInitial extends ToDosOwnerBaseStateBase
{
  constructor(
    private todosRepository: ToDosRepository,
    private todoDtoMapper: ToDoDtoMapper,
    private ssrLoader: SSRLoader
  )
  {
    super();
  }

  override async updateToDosAsync(owner: ToDosOwnerBase): Promise<void>
  {
    owner.state = owner.states.initializing;

    const todoDtos: ToDoGetDto[] = await this.ssrLoader.loadAsync('todos', () => this.todosRepository.getAllToDosAsync());
    const todos                  = todoDtos.map(todoDto => this.todoDtoMapper.mapToEntity(todoDto));

    owner.setToDos(todos);

    owner.state = owner.states.initialized;
  }
}

class ToDosOwnerBaseStateInitializing extends ToDosOwnerBaseStateBase
{
}

class ToDosOwnerBaseStateInitialized extends ToDosOwnerBaseStateBase
{
  constructor(
    private todosRepository: ToDosRepository,
    private todoDtoMapper: ToDoDtoMapper,
  )
  {
    super();
  }

  override async updateToDosAsync(owner: ToDosOwnerBase): Promise<void>
  {
    const todoDtos = await this.todosRepository.getAllToDosAsync();
    const todos    = todoDtos.map(todoDto => this.todoDtoMapper.mapToEntity(todoDto));

    owner.setToDos(todos);
  }
}