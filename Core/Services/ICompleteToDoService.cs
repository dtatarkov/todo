namespace Core.Services;

public interface ICompleteToDoService
{
    Task CompleteToDoAsync(Guid todoId);
}