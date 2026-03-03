namespace Core.Exceptions;

public class EntityNotFoundException(string entityName, object entityId) : Exception($"{entityName}[{entityId}] was not found")
{
    public static void ThrowIfNull(object? entity, string entityName, object entityId)
    {
        if (entity is null)
        {
            throw new EntityNotFoundException(entityName, entityId);
        }
    }
}