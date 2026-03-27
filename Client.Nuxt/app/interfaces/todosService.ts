import { ToDo } from "@/interfaces/todo";

export abstract class ToDosService
{
  abstract getAllToDos(): Ref<ToDo[]>;
  abstract editToDoAsync(todoId: string): Promise<void>
}