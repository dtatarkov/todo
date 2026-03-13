import { ToDo } from "#shared/interfaces/todo";

export abstract class TodosOwner {
  abstract getAllToDosAsync(): Promise<ToDo[]>;
  abstract init(): Promise<void>
}