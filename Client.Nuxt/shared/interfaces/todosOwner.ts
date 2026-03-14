import { ToDo } from "#shared/interfaces/todo";

export abstract class ToDosOwner
{
  abstract getAllToDos(): ToDo[];
  abstract getToDoById(id: string): ToDo | undefined;
  abstract init(): Promise<void>
}