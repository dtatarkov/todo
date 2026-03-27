import { ToDo } from "@/interfaces/todo";

export abstract class ToDosService
{
  abstract getAllToDosAsync(): Promise<ToDo[]>;
  abstract getToDoByIdAsync(todoId: string): Promise<ToDo | undefined>;
  abstract getToDoByIdOrDefaultAsync(todoId: string): Promise<ToDo>;
  abstract editToDoAsync(todoId: string): Promise<void>
}