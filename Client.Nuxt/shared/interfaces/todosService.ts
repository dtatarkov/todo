import { ToDo } from "#shared/interfaces/todo";

export abstract class TodosService {
  abstract getAllToDosAsync(): Promise<ToDo[]>;
  abstract getToDoByIdOrDefaultAsync(id: string): Promise<ToDo>;
}