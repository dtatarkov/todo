import { UIElement } from "~/interfaces/uiElement";

export type ToDoCardData = {
  id: string;
  title: string;
  description: string;
  completionDatePlanned: string;
  completionDateActual: string;
}

export abstract class ToDoCard extends UIElement<ToDoCardData> {
  abstract handleEditButtonClick(): void;
}