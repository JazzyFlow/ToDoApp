public interface IToDoService
{
    Task<List<ToDoItem>> GetAll();
    Task<ToDoItem> GetById(int id);
    Task<ToDoItem> Add(ToDoItem item);
    Task<bool> Update(ToDoItem item);
    Task<bool> Delete(int id);
}