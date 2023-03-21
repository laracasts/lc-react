import '../reset.css';
import '../App.css';
import { useState } from 'react';

function App() {
  const [tasks, setTask] = useState([
    { id: Math.floor(Math.random()*1000), task_name: 'Laundry', isCompleted: false},
    { id: Math.floor(Math.random()*1000), task_name: 'Dishes', isCompleted: true},
    { id: Math.floor(Math.random()*1000), task_name: 'Sweep', isCompleted: false},
    { id: Math.floor(Math.random()*1000), task_name: 'Electricity', isCompleted: false},
  ])

  function handleDeleteTask(id) {
    setTask(tasks.filter(task => task.id !== id));
  }

  function handleUpdateComplete(id) {
    setTask(tasks.map(task => task.id === id ? {...task, isCompleted: !task.isCompleted} : task));
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#">
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {tasks.map(task => (
            <li className="todo-item-container">
              <div className="todo-item">
                <input type="checkbox" onClick={() => handleUpdateComplete(task.id)}/>
                <span className="todo-item-label">{task.task_name}</span>
              </div>
              <button onClick={() => handleDeleteTask(task.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}

        </ul>

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
