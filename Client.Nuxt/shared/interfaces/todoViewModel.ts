import { ViewModelBase } from "#shared/viewmodels/viewmodelBase";

export type ToDoViewModelData = {
  id: string
  title: string
  description: string
  completionDatePlanned: string
  completionDateActual: string
}

export abstract class ToDoViewModel extends ViewModelBase<ToDoViewModelData> { 
  abstract setToDoId(id: string): void;
  abstract handleEditButtonClick(): Promise<void>;
}