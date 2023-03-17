import { useRef, useState } from 'react';

function ToDoComponent({ todo, handleDelete, handleToggleComplete, handleChangeTitle}) {
    const [editable, setEditable] = useState(false);
    const text = useRef("");
    return(
        <li key={todo.id}>
            <input type="checkbox" checked={todo.isFinished} onChange={() => handleToggleComplete(todo)} />
            {
                <span ref={text} contentEditable={editable} style={{ textDecoration: todo.isFinished ? 'line-through' : 'none' }}>{todo.task}</span>
            }
            <div className='ActionCollection'>
                {
                    editable ? 
                    <div className='SaveButton' onClick={() => {
                        text.current.focus();
                        handleChangeTitle(todo, text.current.innerText)
                        setEditable(false);
                    }}>Save</div> : <div className='EditButton' onClick={() => setEditable(!editable)}>Edit</div>
                }
                <div className='DeleteButton' onClick={() => handleDelete(todo)}>Delete</div>
            </div>
        </li>
    );
}

export default ToDoComponent;