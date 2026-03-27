import { ToDo } from "@/interfaces/todo";

export abstract class ToDosOwner
{
  abstract readonly todos: ComputedRef<ToDo[]>;
  
  abstract getToDoById(id: string): ToDo | undefined;
}