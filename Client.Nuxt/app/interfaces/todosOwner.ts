import { ToDo } from "@/interfaces/todo";

export abstract class ToDosOwner
{
  abstract readonly todos: Ref<ToDo[]>;
  abstract getToDoById(id: string): ToDo | undefined;
}