import type { ToDo } from "~/interfaces/todo";
import type { ToDoCardData } from "~/interfaces/todoCard";

export abstract class ToDoCardDataMapper
{
  abstract map(todo: ToDo): ToDoCardData;
}