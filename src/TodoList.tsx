import { useRef, useState } from "react";
import { Todo } from "./types";
import { AgGridReact } from "ag-grid-react"
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community"


ModuleRegistry.registerModules([AllCommunityModule]);


function TodoList() {
  const [todo, setTodo] = useState<Todo>({ description: '', priority: 'Medium', date: '' });
  const [todos, setTodos] = useState<Todo[]>([]);
  const gridRef = useRef<AgGridReact<Todo>>(null);


  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ description: '', priority: 'Medium', date: '' });
  };
  
  
  const [columnDefs] = useState<ColDef<Todo>[]>([
    { field: "description", 
      sortable: true, 
      filter: true, 
      floatingFilter: true,
      resizable: false,
      flex: 1

     },
    {
      field: "priority",
      sortable: true,
      floatingFilter: true,
      filter: true,
      resizable: false,
      flex: 1,

      
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : 
        params.value === "Medium" ? { color: "orange" } : 
        params.value === "Low" ? { color: "green" } : null,
    },
    { field: "date",
      sortable: true, 
      filter: true, 
      floatingFilter: true,
      resizable: false,
      flex: 1
     },
      
  ]);

  const handleDelete = () => {
    if (gridRef.current?.api.getSelectedNodes().length) {
      setTodos(
        todos.filter(
          (_, index) => index !== Number(gridRef.current?.api.getSelectedNodes()[0].id)
        )
      )
    } else {
      alert("Select a row first!")
    }
  }


  return (
    <>
      <input
        placeholder="Description"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        value={todo.description}
      />
      <select
        value={todo.priority}
        onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        placeholder="Date"
        type="date"
        onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        value={todo.date}
      />
      <button onClick={addTodo}>Add</button>
      <button onClick={handleDelete}>Delete</button>
      <div style={{ width: 700, height: 500 }}>
        <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
          <AgGridReact
            ref={gridRef}
            rowData={todos}
            columnDefs={columnDefs}
            rowSelection="multiple"
          />
        </div>
      </div>
    </>
  );
}

export default TodoList;