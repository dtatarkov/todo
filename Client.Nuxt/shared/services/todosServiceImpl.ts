import { TodosService } from "#shared/interfaces/todosService";
import { ToDo } from "#shared/interfaces/todo";
import { ToDoBase } from "#shared/entities/todoBase";

const mock_todos: ToDo[] = [
  new ToDoBase({
    id: '1',
    title: "Todo 1",
    description: "Description 1"
  }),
  
  new ToDoBase({
    id: '2',
    title: "Todo 2",
    description: "Description 2"
  })
];

export class TodosServiceImpl extends TodosService {
  async getAllToDosAsync(): Promise<ToDo[]> {
    return mock_todos;
  }
}