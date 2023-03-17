import { useState, useEffect } from 'react';
import axios from 'axios';

import "./ToDoListComponent.css";
import ToDoComponent from "./ToDoComponent";

function ToDoListComponent() {
    // Initial dataset
    const [todos, setTodos] = useState([
        
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
    // Update task title
    function handleChangeTitle(todo, title) {
        axios.put(`https://localhost:7256/ToDo`, { ...todo, task: title })
            .then(() => {
                const index = todos.findIndex(t => t.id === todo.id);
                const newTodos = [...todos];
                newTodos[index] = { ...todo, task: title };
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
                        <ToDoComponent todo={todo} handleDelete={handleDelete} handleToggleComplete={handleToggleComplete} handleChangeTitle={handleChangeTitle}/>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ToDoListComponent;