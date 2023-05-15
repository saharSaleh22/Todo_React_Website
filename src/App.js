import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const API_BASE_URL = "http://localhost:3000";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/todos`, {
        title: newTask,
        description: newTaskDescription,
        completed: false,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
      setNewTaskDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      await axios.put(`${API_BASE_URL}/todos/${taskId}`, updatedTask);
      const updatedTasks = tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...updatedTask };
        }
        return task;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${taskId}`);
      const filteredTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(filteredTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div className="TodoWrapper">
        <input
          className="todo-input"
          type="text"
          placeholder="Task Title"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <textarea
          className="todo-input"
          placeholder="Task Description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        ></textarea>
        <button className="todo-btn" onClick={createTask}>
          Add Task
        </button>
      </div>
      <ul className="TodoWrapper">
        {tasks.map((task) => (
          <li className="Todo" key={task.id}>
            <div className="title">
              <strong className={`${task.completed ? "completed" : ""}`}>
                {task.title}
              </strong>
              <span className={`${task.completed ? "completed" : ""}`}>
                {task.description}
              </span>{" "}
            </div>
            <div className="icons">
              <CheckBoxIcon
                onClick={() =>
                  updateTask(task.id, {
                    completed: !task.completed,
                    title: task.title,
                    description: task.description,
                  })
                }
              />
              <DeleteIcon
                icon={DeleteIcon}
                onClick={() => deleteTask(task.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
