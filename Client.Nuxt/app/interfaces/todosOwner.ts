import { ToDo } from "@/interfaces/todo";

export abstract class ToDosOwner
{
  abstract getAllToDos(): ToDo[];
  abstract getToDoById(id: string): ToDo | undefined;
  abstract init(): Promise<void>
}