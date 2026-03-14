import { ViewModelBase } from "#shared/viewmodels/viewmodelBase";

export type TodosViewModelData = {
  todos: TodosViewModelToDoData[]
}

export type TodosViewModelToDoData = {
  id: string
  title: string
  description: string
  completionDatePlanned: string
  completionDateActual: string
}

export abstract class TodosViewModel extends ViewModelBase<TodosViewModelData> { }