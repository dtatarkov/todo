import { ToDo } from "@/interfaces/todo";

export abstract class ToDosService
{
  abstract getAllToDosRef(): ComputedRef<ToDo[]>;
  abstract editToDoAsync(todoId: string): Promise<void>
}