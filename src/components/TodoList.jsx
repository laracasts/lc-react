import { useContext } from "react";
import { TodosContext } from "../context/TodosContext";

function TodoList({ filteredTask }) {

  const { tasks, setTask } = useContext(TodosContext)

  function deleteTask(id) {
    console.log(`delete task: ${id}`)
    setTask(tasks.filter(task => task.id !== id));
  }

  function setIsComplete(id) {
    console.log(`toggle ${id} IsComplete`)
    setTask(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  }

  function setIsEditing(id) {
    console.log(`toggle edit status on ${id}`)
    setTask(tasks.map(task => task.id === id ? { ...task, isEditing: !task.isEditing } : { ...task, isEditing: false }));
  }

  function updateToDo(e, id) {
    setTask(tasks.map(task => {
      if (task.id === id && e.target.value.trim().length !== 0) {
        console.log(`Update ${id}`)
        task.task_name = e.target.value
      }
      task.isEditing = false

      return task
    } ))
  }

  return (
    <section>
      <ul className="todo-list">
        { filteredTask.map((task, index) => (
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
    </section>
  )
}

export default TodoList