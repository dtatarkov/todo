import { TodosOwner } from "#shared/interfaces/todosOwner";
import { ToDo } from "#shared/interfaces/todo";
import { ToDoBase } from "#shared/entities/todoBase";

const mock_todos: ToDo[] = [
  new ToDoBase({
    id         : '1',
    title      : "Todo 1",
    description: "Description 1"
  }),

  new ToDoBase({
    id         : '2',
    title      : "Todo 2",
    description: "Description 2"
  })
];

export class TodosOwnerBase extends TodosOwner {
  protected todos = new Array<ToDo>();
  
  private _is_initialized = false;
  
  async getAllToDosAsync(): Promise<ToDo[]> {
    await this.init();
    
    return this.todos;
  }
  
  async init() {
    if(this._is_initialized)
    {
      return;
    }
    
    this.todos = mock_todos;
    
    this._is_initialized = true;
  }
}