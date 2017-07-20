import React from 'react';
import $ from 'jquery'; 

export function Todo(props) {
    const { todo } = props;
    var todoText = todo.text;
    if(todo.isDone) {
        if(todo.text && todo.text.length > 25){
            todoText = todo.text.substring(0, 25) + '...';
            return <span className='complete-task' title={todo.text}>{todoText}</span>;
        }
        else
            return <span className='complete-task'>{todoText}</span>;
    } else {
        if(todo.text && todo.text.length > 25){
            todoText = todo.text.substring(0, 25) + '...';
            return <span title={todo.text}>{todoText}</span>;
        }
        else
            return <span>{todoText}</span>;
    }
}

export function TodoList(props) {
    const { todos, toggleTodo, addTodo, deleteTodo } = props;

    const onSubmit = (event) => {
        const input = event.target;
        const text = input.value;
        if(event.which == 13 && text.length > 0) {
            input.value = '';
            addTodo(text);
        }
    };

    const toggleClick = id => event => {
        toggleTodo(id);
    }
    const deleteTask = id => event => {
        deleteTodo(id);
       // $(document.getElementById(id)).hide();
    };

    return (
      <div className='todo'>
        <input className='todo-task' type='text'
        placeholder='Add task name'
        onKeyDown={onSubmit} />
        <div>
            {todos.map(t => (
              <div className='todo-item' id={t.get('id')}>
                  <span key={t.get('id')} onClick={toggleClick(t.get('id'))}>
                    <Todo todo={t.toJS()} />
                  </span>
                 <button className='delete-btn' onClick={deleteTask(t.get('id'))}>Delete</button>          
               </div>
            ))}
        </div>
      </div>
  );
}

