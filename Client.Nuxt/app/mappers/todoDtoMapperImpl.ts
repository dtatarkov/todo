import { ToDoDtoMapper } from "@/interfaces/todoDtoMapper";
import type { ToDoGetDto } from "@/types/toDoGetDto";
import { ToDo } from "@/interfaces/todo";
import { ToDoBase } from "@/entities/todoBase";
import { DatesService } from "@/interfaces/datesService";

export class ToDoDtoMapperImpl extends ToDoDtoMapper
{
  constructor(protected datesService: DatesService)
  {
    super();
  }

  mapToEntity(dto: ToDoGetDto): ToDo
  {
    return new ToDoBase({
      id                   : dto.id,
      title                : dto.title,
      description          : dto.description,
      completionDateActual : this.datesService.fromStringOptional(dto.completionDateActual),
      completionDatePlanned: this.datesService.fromStringOptional(dto.completionDatePlanned),
    });
  }
}