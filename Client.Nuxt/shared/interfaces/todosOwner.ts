import { ToDo } from "#shared/interfaces/todo";

export abstract class ToDosOwner
{
  abstract getAllToDosAsync(): Promise<ToDo[]>;
  abstract init(): Promise<void>
}