import { ToDo } from "@/interfaces/todo";

export abstract class ToDosService
{
  abstract getAllToDosRef(): ComputedRef<ToDo[]>;

  abstract updateToDosAsync(): Promise<void>;

  abstract editToDoAsync(todoId: string): Promise<void>
}