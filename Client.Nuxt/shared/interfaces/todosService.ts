import { ToDo } from "#shared/interfaces/todo";

export abstract class TodosService {
  abstract getAllToDosAsync(): Promise<ToDo[]>;
  abstract getToDoByIdAsync(todoId: string): Promise<ToDo | undefined>;
  abstract getToDoByIdOrDefaultAsync(todoId: string): Promise<ToDo>;
  abstract editToDoAsync(todoId: string): Promise<void>
}