namespace Core.Exceptions;

public class EntityNotFoundException(string entityName, object id) : Exception($"{entityName}[{id}] was not found");