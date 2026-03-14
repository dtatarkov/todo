import { ViewModelBase } from "#shared/viewmodels/viewmodelBase";

export type TodosViewModelData = {
  todos: TodosViewModelToDoData[]
}

export type TodosViewModelToDoData = {
  id: string
}

export abstract class TodosViewModel extends ViewModelBase<TodosViewModelData> { }