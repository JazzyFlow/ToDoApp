import { useState, useEffect } from 'react';
import "./ToDoComponent.css"
import axios from 'axios';

function ToDoComponent() {
    // Initial dataset
    const [todos, setTodos] = useState([
        {
            id: 1,
            task: "Clean the garage",
            isFinished: false
        },
        {
            id: 2,
            task: "Clean the gutter",
            isFinished: true
        },
        {
            id: 3,
            task: "Wash the dishes",
            isFinished: true
        },
        {
            id: 4,
            task: "Buy vegetables for dinner",
            isFinished: false
        }
    ]);
    const [task, setTask] = useState('');
    // Get todo data on backend
    useEffect(() => {
        axios.get('https://localhost:7256/ToDo')
            .then(response => setTodos([...todos, ...response.data]))
            .catch(error => console.error(error));
    }, []);
    // Set task title
    function handleTitleChange(event) {
        setTask(event.target.value);
    }
    // Add task
    function handleSubmit() {
        if (task === "") return;
        axios.post('https://localhost:7256/ToDo', { id: todos.length + 1, task, isFinished: false })
            .then(response => setTodos([...todos, { id: todos.length + 1, task, isFinished: false }]))
            .catch(error => console.error(error));
        setTask('');
    }
    // Update task status
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
    // Delete task
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
            <div className="ToDoContainer">
                <h1>ToDo App</h1>
                <form>
                    <span>Set a new task:</span>
                    <input type="text" value={task} onChange={handleTitleChange} />
                    <div className="AddButton" onClick={() => handleSubmit()}>Add</div>
                </form>
                <ul>
                    {todos.map(todo => (
                        <li key={todo.id}>
                            <input type="checkbox" checked={todo.isFinished} onChange={() => handleToggleComplete(todo)} />
                            <span style={{ textDecoration: todo.isFinished ? 'line-through' : 'none' }}>{todo.task}</span>
                            <div className='DeleteButton' onClick={() => handleDelete(todo)}>Delete</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ToDoComponent;