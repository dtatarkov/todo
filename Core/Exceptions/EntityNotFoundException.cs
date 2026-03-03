namespace Core.Exceptions;

public class EntityNotFoundException(string entityName, object id) : Exception($"{entityName}[{id}] was not found")
{
    public static void ThrowIfNull(object? entity, string entityName, object id)
    {
        if (entity is null)
        {
            throw new EntityNotFoundException(entityName, id);
        }
    }
}