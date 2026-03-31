import { ToDo } from "../interfaces/todo";

export abstract class ToDosOwner
{
  abstract readonly todos: ComputedRef<ToDo[]>;

  abstract updateToDosAsync(): Promise<void>;

  abstract getToDoById(id: string): ToDo | undefined;
}