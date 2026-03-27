import { UIElement } from "~/interfaces/uiElement";

export abstract class ToDoCard extends UIElement
{
  abstract id: string;
  abstract title: string;
  abstract description: string;
  abstract completionDatePlanned: string;
  abstract completionDateActual: string;

  abstract handleEditButtonClick(): void;
}