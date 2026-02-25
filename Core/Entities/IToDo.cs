namespace Core.Entities;

public interface IToDo
{
    Guid Id { get; set; }
    string Title { get; set; }
    string Description { get; set; }
}