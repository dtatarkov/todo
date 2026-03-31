export abstract class ToDoCard extends UIElement<string>
{
  abstract override id: string;
  abstract title: string;
  abstract description: string;
  abstract completionDatePlanned: string;
  abstract completionDateActual: string;

  abstract handleEditButtonClick(): void;
}