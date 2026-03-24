import { ToDoCard, type ToDoCardData } from "~/interfaces/todoCard";

export abstract class ToDoElementsFactory {
  abstract createToDoCard(data?: Partial<ToDoCardData>): ToDoCard;
}