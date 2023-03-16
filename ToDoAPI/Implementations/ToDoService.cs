public class ToDoService : IToDoService
{
    private readonly List<ToDoItem> _items;

    public ToDoService()
    {
        _items = new List<ToDoItem>();
    }

    public async Task<List<ToDoItem>> GetAll()
    {
        return await Task.FromResult(_items);
    }

    public async Task<ToDoItem> GetById(int id)
    {
        return await Task.FromResult(_items.FirstOrDefault(item => item.Id == id));
    }

    public async Task<ToDoItem> Add(ToDoItem item)
    {
        _items.Add(item);

        return await Task.FromResult(item);
    }

    public async Task<bool> Update(ToDoItem item)
    {
        var index = _items.FindIndex(i => i.Id == item.Id);
        if (index == -1)
        {
            return false;
        }

        _items[index] = item;

        return await Task.FromResult(true);
    }

    public async Task<bool> Delete(int id)
    {
        var item = _items.FirstOrDefault(i => i.Id == id);
        if (item == null)
        {
            return false;
        }

        _items.Remove(item);

        return await Task.FromResult(true);
    }
}