import { ToDo } from "#shared/entities/todo";

export abstract class TodosService {
  abstract getAllToDosAsync(): Promise<ToDo[]>;
}