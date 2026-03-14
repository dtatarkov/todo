import { ToDo } from "#shared/interfaces/todo";

export abstract class ToDoDtoMapper
{
  abstract mapToEntity(dto: ToDoGetDto): ToDo;
}