import { ToDoDtoMapper } from "#shared/interfaces/todoDtoMapper";
import { ToDoGetDto } from "#shared/types/toDoGetDto";
import { ToDo } from "#shared/interfaces/todo";
import { ToDoBase } from "#shared/entities/todoBase";
import { DatesService } from "#shared/interfaces/datesService";

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