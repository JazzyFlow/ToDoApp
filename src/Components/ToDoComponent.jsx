import { useState, useEffect } from 'react';
import axios from 'axios';

function ToDoComponent() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        axios.get('https://localhost:7256/ToDo')
            .then(response => setTodos(response.data))
            .catch(error => console.error(error));
    }, []);

    function handleTitleChange(event) {
        setTask(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('https://localhost:7256/ToDo', { id: todos.length + 1, task, isFinished: false })
            .then(response => setTodos([...todos, { id: todos.length + 1, task, isFinished: false }]))
            .catch(error => console.error(error));
        setTask('');
    }

    function handleToggleComplete(todo) {
        axios.put(`https://localhost:7256/ToDo`, { ...todo, isFinished: !todo.isFinished })
            .then(() => {
                const index = todos.findIndex(t => t.id === todo.id);
                const newTodos = [...todos];
                newTodos[index] = { ...todo, isFinished: !todo.isFinished };
                setTodos(newTodos);
            })
            .catch(error => console.error(error));
    }

    function handleDelete(todo) {
        axios.delete(`https://localhost:7256/ToDo/${todo.id}`)
            .then(() => {
                const index = todos.findIndex(t => t.id === todo.id);
                const newTodos = [...todos];
                newTodos.splice(index, 1);
                setTodos(newTodos);
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="App">
            <h1>ToDo App</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={task} onChange={handleTitleChange} />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input type="checkbox" checked={todo.isFinished} onChange={() => handleToggleComplete(todo)} />
                        <span style={{ textDecoration: todo.isFinished ? 'line-through' : 'none' }}>{todo.task}</span>
                        <button onClick={() => handleDelete(todo)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoComponent;