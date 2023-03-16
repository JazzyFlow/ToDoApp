using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class ToDoController : ControllerBase
{
    private readonly IToDoService _service;

    public ToDoController(IToDoService service)
    {
        _service = service;
    }
    [EnableCors("AllowAnyOrigin")]
    [HttpGet]
    public async Task<List<ToDoItem>> GetAll()
    {
        return await _service.GetAll();
    }
    [EnableCors("AllowAnyOrigin")]
    [HttpGet("{id}")]
    public async Task<ToDoItem> GetById(int id)
    {
        return await _service.GetById(id);
    }
    [EnableCors("AllowAnyOrigin")]
    [HttpPost]
    public async Task<ToDoItem> Add(ToDoItem item)
    {
        return await _service.Add(item);
    }
    [EnableCors("AllowAnyOrigin")]
    [HttpPut]
    public async Task<bool> Update(ToDoItem item)
    {
        return await _service.Update(item);
    }
    [EnableCors("AllowAnyOrigin")]
    [HttpDelete("{id}")]
    public async Task<bool> Delete(int id)
    {
        return await _service.Delete(id);
    }
}