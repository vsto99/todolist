export type Todo = {
    description: string;
    priority: string;
    date: string;
  }
  
  export type TodoTableProps = {
    todos: Todo[];
    handleDelete: (row: number) => void;
  }