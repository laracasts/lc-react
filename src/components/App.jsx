import '../reset.css';
import '../App.css';
import { useState } from 'react';

function App() {
  const [tasks, setTask] = useState([
    {
      id: Math.floor(Math.random()*1000),
      task_name: 'Laundry',
      isCompleted: false,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random()*1000),
      task_name: 'Dishes',
      isCompleted: true,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random()*1000),
      task_name: 'Sweep',
      isCompleted: false,
      isEditing: false,
    },
    {
      id: Math.floor(Math.random()*1000),
      task_name: 'Electricity',
      isCompleted: false,
      isEditing: false,
    },
  ])

  function deleteTask(id) {
    setTask(tasks.filter(task => task.id !== id));
  }

  function setIsComplete(id) {
    setTask(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  }

  function setIsEditing(id) {
    setTask(tasks.map(task => task.id === id ? { ...task, isEditing: !task.isEditing } : { ...task, isEditing: false }));
  }

  function updateToDo(e, id) {
    setTask(tasks.map(task => {
        if (task.id === id && e.target.value.trim().length !== 0) {
          task.task_name = e.target.value
        }
        task.isEditing = false

        return task
      }
    ))
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        {/* Adding Form */}
        <form action="#">
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        {/* Tasklist with functions */}
        <ul className="todo-list">
          { tasks.map((task, index) => (
            <li key={ task.id } className="todo-item-container">
              <div className="todo-item">
                <input type="checkbox"
                  onClick={ () => setIsComplete(task.id) }
                  checked={ task.isCompleted ? true : false }
                  onChange={ () => {} }
                />
                { !task.isEditing ? (
                <span
                  onDoubleClick={ () => setIsEditing(task.id) }
                  className={ `todo-item-label ${ task.isCompleted ? 'line-through' : '' }` }
                >
                  { task.task_name }
                </span>
                ) : (
                  <input
                    type="text"
                    defaultValue={ task.task_name }
                    className='todo-item-input'
                    onBlur={ e => updateToDo(e, task.id)}
                    onKeyDown={ e => {
                      if (e.key === 'Enter') {
                        updateToDo(e, task.id)
                      } else if (e.key === 'Escape') {
                        updateToDo(e, "")
                      }
                    }}
                    onChange={ () => {} }
                    autoFocus
                  />
                )}
              </div>
              <button onClick={ () => deleteTask(task.id) } className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={ 2 }
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}

        </ul>
        
        {/* function set 1 */}
        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>{ tasks.length } items remaining</span>
        </div>

        {/* function set 1 */}
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
