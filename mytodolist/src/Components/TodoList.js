import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (taskText.trim() !== "") {
      setTasks([...tasks, { text: taskText, done: false }]);
      setTaskText("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleDone = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <FontAwesomeIcon icon={faPlus} onClick={addTask} className="addicon" />
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? "done" : ""}>
            <input
              type="checkbox"
              className="checkbox"
              checked={task.done}
              onChange={() => toggleDone(index)}
            />
            <input
              type="text"
              value={task.text}
              onChange={(e) => editTask(index, e.target.value)}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="deleteicon"
              onClick={() => deleteTask(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
