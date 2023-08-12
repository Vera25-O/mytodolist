import React, { useState } from "react";

import TodoList from "./Components/TodoList";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTask = () => {
    if (task) {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <TodoList todos={todos} onDelete={handleDeleteTask} />
    
    </div>
  );
}

export default App;
