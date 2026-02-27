using Core.Entities;
using Db.Postgre.Entities;

namespace Db.Postgre.Mappers;

public interface IToDoEntityMapper
{
    IToDo ToDomainModel(PostgreToDoEntity entity);
    PostgreToDoEntity ToEntity(IToDo todo);
}