import { useState } from "react";
import TodoTable from "./TodoTable";
import { Todo } from "./types";


function TodoList() {
  const [todo, setTodo] = useState<Todo>({description: '', date: ''});
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ description: '', date: '' });
  };

  const handleDelete = (index: number) => {
    const newTodos = todos.filter((_todo, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <>
      <input 
        placeholder="Description" 
        onChange={event => setTodo({...todo, description: event.target.value})} 
        value={todo.description} 
      />
            <input 
        placeholder="Date" 
        onChange={event => setTodo({...todo, date: event.target.value})} 
        value={todo.date} 
      />
      <button onClick={addTodo}>Add</button>
      <TodoTable todos={todos} handleDelete={handleDelete} />
    </>
  );
}

export default TodoList;