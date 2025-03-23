import { useRef, useState } from "react";
import { Todo } from "./types";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
  const [todo, setTodo] = useState<Todo>({ description: '', priority: '', date: '' });
  const [todos, setTodos] = useState<Todo[]>([]);
  const gridRef = useRef<AgGridReact<Todo>>(null);

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({ description: '', priority: '', date: '' });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setTodo({ 
      ...todo, 
      date: newValue ? newValue.format('DD-MM-YY') : '' 
    });
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
      <fieldset>
        <legend>Add todo:</legend>
        
        <input
          placeholder="Description"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          value={todo.description}
          className="form-control"
        />
        <select
          value={todo.priority}
          onChange={(e) => setTodo({ ...todo, priority: e.target.value })}
          className="form-control"
        >
          <option value="" disabled>Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={todo.date ? dayjs(todo.date) : null}
            onChange={handleDateChange}
            slotProps={{
              textField: { 
                size: "small",
                sx: { width: '15%' }
              }
            }}
          />
        </LocalizationProvider>
        
        <Button onClick={addTodo} variant="contained" sx={{ marginRight: '10px', marginLeft: '10px' }}>Add</Button>
        <Button onClick={handleDelete} variant="outlined" color="error">Delete<DeleteIcon /></Button>
      </fieldset>
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